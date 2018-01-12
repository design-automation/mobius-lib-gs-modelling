/**
 * Polylines are a type of object.
 *
 * Polylines are formed from straight line segments joined to form a continuous line.
 */

import * as gs from "gs-json";
import {_pointsExtend, _pointsEvaluate} from "./pline_dev";
import * as three from "three";

//  ===============================================================================================================
//  Pline Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Gets a polyline from the model based on an index number
 * @param model Model to get polyline from
 * @param id Index number of polyline
 * @returns Polyline object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IPolyline {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null; }
    if (obj.getObjType() !== gs.EObjType.polyline) {
        throw new Error("Object is not a polyline. Object type is: " + obj.getObjType());
    }
    return obj as gs.IPolyline;
}

//  ===============================================================================================================
//  Pline Constructors ============================================================================================
//  ===============================================================================================================

// - WEEK 2 -
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a polyline to the model by joining a list of points
 *
 * Creates a straight line segment between every two points and joins them to create a polyline
 * @param points A list of points (in order)
 * @param is_closed Creates a closed polyline object by joining the last point to the first point if true
 * @returns New polyline object if successful
 */
export function FromPoints(points: gs.IPoint[], is_closed: boolean): gs.IPolyline {
    if (points.length < 2) {
        throw new Error("A minimum of two points are required.");
    }
    const model: gs.IModel = points[0].getModel();
    for (const point of points) {
        if  (point.getModel() !== model) {
            throw new Error("All points must be in the same model.");
        }
    }
    return model.getGeom().addPolyline(points, is_closed);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a straight line to the model from two points
 *
 * Returns null if both points have the same position
 * @param start Start point of line
 * @param end End point of line
 * @returns New polyline object, consisting of a single segment if successful, null if unsuccesful or on error
 */
export function LineFromPoints(start: gs.IPoint, end: gs.IPoint): gs.IPolyline {
    return this.FromPoints([start, end], false);
}

//  ===============================================================================================================
//  Pline Functions ===============================================================================================
//  ===============================================================================================================

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
//  http://verbnurbs.com/docs/geom/ICurve/#point
/**
 * Returns a point on a polyline based on a parameter along the polyline
 * @param pline Polyline to evaluate
 * @param t Parameter to evaluate (0 is the start of the polyline, 1 is the end of the polyline)
 * @param segment_index The segment of the polyline to evaluate.
 * @returns Point if successful
 */
export function evalParam(pline: gs.IPolyline, t: number, segment_index: number = -1): gs.IPoint {
    let points: gs.IPoint[] = pline.getPointsArr();
    if (pline.isClosed()) {points.push(points[0]); }
    if (segment_index !== -1) {
        if (segment_index > points.length - 1) {throw new Error("segments_index is out of range."); }
        points = points.splice(segment_index, 2);
    }
    return _pointsEvaluate(points, t);
}

/**
 * Explodes a polyline into individual segments
 *
 * Each straight line segment in the polyline is returned as a separate polyline object
 * @param pline Polyline to explode
 * @param copy Performs transformation on duplicate copy of input polyline if true
 * @returns List of new polylines created from explode
 */
export function explode(pline: gs.IPolyline, copy: boolean): gs.IPolyline[] {
    return this.extract(pline, gs.Arr.makeSeq(pline.getWires()[0].numEdges()), copy);
}

// - WEEK 5 -
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
/**
 * Extends a non-closed polyline by specified distance
 *
 * Extention is straight and continues in the same direction as the extended segment<br/>
 * Returns null if distance is negative
 * @param pline Polyline object
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @param copy Performs transformation on duplicate copy of input polyline if true
 * @returns New polyline object if successful, null if unsuccessful or on error
 */
export function extend(pline: gs.IPolyline, extrusion_side: number, length: number,
                       create_points: boolean, copy: boolean): gs.IPolyline {
    const points: gs.IPoint[] = pline.getPointsArr();
    switch (extrusion_side) {
        case 0: case 2:
            const a1: gs.IPoint = points[1];
            const b1: gs.IPoint = points[0];
            const c1: gs.IPoint = _pointsExtend(a1, b1, length, create_points);
            if (create_points) { points.unshift(c1); }
        case 1: case 2:
            const a2: gs.IPoint = points[points.length - 2];
            const b2: gs.IPoint = points[points.length - 1];
            const c2: gs.IPoint = _pointsExtend(a2, b2, length, create_points);
            if (create_points) { points.push(c2); }
    }
    const m: gs.IModel = pline.getModel();
    const new_pline = m.getGeom().addPolyline(points, false);
    if (!copy) {
        m.getGeom().delObj(pline, false);
    }
    return new_pline;
}

/**
 * Extracts a list of segments from a polyline
 *
 * Specified straight line segments are removed from the polyline and returned as individual polyline objects<br/>
 * The remainder of the polyline is rejoined as much as possible and returned as one polyline if still intact,
 * or multiple polylines if they have been broken up<br/>
 * List returned is in order (from t=0 to t=1 of orginal input pline)
 * @param pline Polyline to extract segments from
 * @param segment_index Index numbers of polyline segments to extract
 * @param return_remainder Returns polylines created from the remainder of the polyline if true, returns only
 *                         specified segments if false
 * @param copy Performs transformation on duplicate copy of input polyline if true
 * @returns List of new polylines created from extract
 */
export function extract(pline: gs.IPolyline, segment_index: number[], copy: boolean): gs.IPolyline[] {
    const m: gs.IModel = pline.getModel();
    const plines: gs.IPolyline[] = [];
    const points: gs.IPoint[] = pline.getPointsArr();
    for (const i of  segment_index) {
        if (i < points.length - 1) {
            plines.push(m.getGeom().addPolyline([points[i], points[i+1]], false));
        }
    }
    if (!copy) {
        m.getGeom().delObj(pline, false);
    }
    return plines;
}

/**
 * Extrudes a polyline according to a specified vector to create a polymesh
 *
 * Pline is moved by the specified vector and straight line segments are created between the vertices of
 * the input pline and moved pline. The resulting straight line segments and the straight line segments of the
 * input and moved plines are used to define the edges of four-sided polygons. The polygons are joined to
 * create a polymesh<br/>
 *
 * If cap is true, input pline and moved pline are used as edges to create two polygons. The polygones are
 * joined to the polymesh from above.
 * @param pline Polyline to extrude
 * @param vector Vector describing direction and distance of extrusion
 * @param cap Closes polymesh by creating a flat polygon on each end of the extrusion if true
 * @param copy Performs transformation on duplicate copy of input polyline if true
 * @returns Polymesh created from extrusion
 */
export function extrude(pline: gs.IPolyline, vector: gs.XYZ, cap: boolean, copy: boolean): gs.IPolymesh {
    const m: gs.IModel = pline.getModel();
    const points: gs.IPoint[] = pline.getPointsArr();
    const mesh_points: gs.IPoint[][] = [];
    for (let i = 0; i < points.length; i++) {
        const i2 = i%2;
        if (i2 === 0) {mesh_points.push([]);}
        const face: gs.IPoint[] = mesh_points[mesh_points.length - 1];
        const pos: number[] = points[i].getPosition();
        face[i2] = points[i];
        face[3 - i2] = m.getGeom().addPoint([pos[0] + vector[0], pos[1] + vector[1], pos[2] + vector[2]]);
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    if (!copy) {
        m.getGeom().delObj(pline, false);
    }
    return pmesh;
    //  TODO deal with cap
}

/**
 * Checks if the polyline is closed
 * @param pline Polyline object
 * @return True if the polyline is closed
 */
export function isCLosed(pline: gs.IPolyline): boolean {
    return pline.isClosed();
}

/**
 * Lofts a list of polylines with the same number of segments to create a polymesh
 *
 * Straight line segments are created between the vertices of every two input plines. The resulting
 * straight line segments and the straight line segments of the plines are used to define the edges of
 * four-sided polygons. The polygons created from all the plines are joined to create a polymesh<br/>
 *
 * Returns null if polylines do not have the same number of segments
 * @param plines List of polylines to loft (in order)
 * @param is_closed Closes polymesh by lofting back to first polyline if true
 * @param copy Performs transformation on duplicate copy of input polyline if true
 * @returns Polymesh created from loft if successful, null if unsuccessful or on error
 */
export function loft(plines: gs.IPolyline[], is_closed: boolean=false, copy: boolean): gs.IPolymesh {
    const m: gs.IModel = plines[0].getModel();
    if (is_closed) {plines.push(plines[0]);}
    if (plines.length < 2) {throw new Error("Too few polylines to loft.");}
    const num_points: number = plines[0].getWires()[0].numVertices();
    const num_plines: number = plines.length;
    const plines_closed: boolean = plines[0].isClosed();
    for (let i = 1; i< num_plines; i++) {
        if (plines[i].getWires()[0].numVertices() !== num_points) {
            throw new Error("Plines do not have equal numbers of points.");
        }
        if (plines[i].isClosed() !== plines_closed) {
            throw new Error("Plines must all be either open or closed.");
        }
    }
    const mesh_points: gs.IPoint[][] = [];
    for (let i=0; i< num_plines-1;i++) {
        const points0: gs.IPoint[] = plines[i].getPointsArr();
        const points1: gs.IPoint[] = plines[i+1].getPointsArr();
        if (plines_closed) {
            points0.push(points0[0]);
            points1.push(points1[0]);
        }
        for (let j=0; j< num_points-1;j++) {
            const j2 = j%2;
            if (j2 === 0) {mesh_points.push([]);}
            const face: gs.IPoint[] = mesh_points[mesh_points.length - 1];
            face[j2] = points0[j];
            face[3 - j2] = points1[j];
        }
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    if (!copy) {
        for (const pline of plines) {
            m.getGeom().delObj(pline, false);
        }
    }
    return pmesh;
}

/**
 * Sweeps a polyline along a specified polyline to create a polymesh
 *
 * Polyline is used as the cross-section of the polymesh to create
 * @param pline Polyline to sweep
 * @param rail Rail polyline to sweep along
 * @param copy Performs transformation on duplicate copy of input polyline if true
 * @returns Polymesh created from sweep
 */
export function sweep(pline: gs.IPolyline, rail: gs.IPolyline, copy: boolean=true): gs.IPolymesh {
    const m: gs.IModel = pline.getModel();
    if (rail.getModel() !== m) {throw new Error("The pline and the rail must be in the same model.");}
    const pline_points: gs.IPoint[] = pline.getPointsArr();
    if (pline.isClosed) {pline_points.push(pline_points[0]);}
    const rail_points: gs.IPoint[] = rail.getPointsArr();
    if (rail.isClosed) {rail_points.push(rail_points[0]);}
    const mesh_points: gs.IPoint[][] = [];
    const pline_start_pos: number[] = pline_points[0].getPosition();
    for (let i = 0; i< pline_points.length - 1; i++) {
        const pline_pos1: number[] = pline_points[i].getPosition();
        const pline_pos2: number[] = pline_points[i+1].getPosition();
        const vec1: number[] = [
            pline_pos1[0] - pline_start_pos[0],
            pline_pos1[1] - pline_start_pos[1],
            pline_pos1[2] - pline_start_pos[2],
        ];
        const vec2: number[] = [
            pline_pos2[0] - pline_start_pos[0],
            pline_pos2[1] - pline_start_pos[1],
            pline_pos2[2] - pline_start_pos[2],
        ];
        for (let j=0; j< rail_points.length-1;j++) {
            const rail_pos1: gs.XYZ = rail_points[j].getPosition();
            const rail_pos2: gs.XYZ = rail_points[j+1].getPosition();
            const j2 = j%2;
            let vec: number[];
            if (j2 === 0) {
                mesh_points.push([]);
                vec = vec1;
            } else {
                vec = vec2;
            }
            const face: gs.IPoint[] = mesh_points[mesh_points.length - 1];
            const pos1: gs.XYZ = [rail_pos1[0] + vec[0], rail_pos1[1] + vec[1], rail_pos1[2] + vec[2]];
            const pos2: gs.XYZ = [rail_pos2[0] + vec[0], rail_pos2[1] + vec[1], rail_pos2[2] + vec[2]];
            face[j2] = m.getGeom().addPoint(pos1);
            face[3 - j2] = m.getGeom().addPoint(pos2);
        }
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    if (!copy) {
        m.getGeom().delObj(pline, false);
        m.getGeom().delObj(rail, false);
    }
    return pmesh;
}
