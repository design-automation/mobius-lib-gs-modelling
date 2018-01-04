import * as gs from "gs-json";
import {_pointsExtend, _pointsEvaluate} from "./_pline";
import * as utils from "./utils";
import * as three from "three";

//  ===============================================================================================================
//  Pline Constructors ============================================================================================
//  ===============================================================================================================

// - WEEK 2 -
/**
 * Gets a polyline from the model based on an index number
 * @param model Model to get polyline from
 * @param index Index number of polyline
 * @returns Polyline object if successful
 */
export function getFromModel(model: gs.IModel, id: number): gs.IPolyline {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj.getObjType() !== gs.EObjType.polyline) {
        throw new Error("Object is not a polyline. Object type is: " + obj.getObjType());
    }
    return obj as gs.IPolyline;
}

// - WEEK 2 -
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a polyline to the model by joining a list of points
 * @param points A list of points (in order)
 * @param is_closed Creates a closed polyline object by joining the last point to the first point if true
 * @returns New polyline object if successful
 */
export function fromPoints(points: gs.IPoint[], is_closed: boolean): gs.IPolyline {
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
 * Adds a line to the model from two points
 * @param start Start point of line
 * @param end End point of line
 * @returns New polyline object, consisting of a single segment.
 */
export function lineFromPoints(start: gs.IPoint, end: gs.IPoint): gs.IPolyline {
    return this.fromPoints([start, end], false);
}

//  ===============================================================================================================
//  Pline Functions ===============================================================================================
//  ===============================================================================================================

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
//  http://verbnurbs.com/docs/geom/ICurve/#point
/**
 * Returns a point on a polyline based on a parameter along the polyline
 * @param pline Polyline to evaluate
 * @param t Parameter to evaluate
 * @param segment_index The segment of the polyline to evaluate.
 * @returns 3D point if successful, null if unsuccessful or on error
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
 * @param pline Polyline to explode
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns List of new polylines created from explode
 */
export function explode(pline: gs.IPolyline, copy: boolean): gs.IPolyline[] {
    return this.extract(pline, gs.Arr.makeSeq(pline.getWires()[0].numEdges()), copy);
}

// - WEEK 5 -
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
/**
 * Extends a non-closed polyline by specified distance
 * @param pline Polyline object
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns New polyline object if successful, null if unsuccessful or on error
 */
export function extend(pline: gs.IPolyline, extrusion_side: number, length: number,
                       create_points: boolean, copy: boolean): gs.IPoint[] {
    const points: gs.IPoint[] = pline.getPointsArr();
    const extended_points: gs.IPoint[] = [];
    switch (extrusion_side) {
        case 0: case 2:
            extended_points.push(_pointsExtend(points[1], points[0], length));
            break;
        case 1: case 2:
            const num_points: number = points.length;
            extended_points.push(_pointsExtend(points[num_points - 2], points[num_points - 1], length));
            break;
    }
    return extended_points;
}

/**
 * Extracts a list of segments from a polyline
 * @param pline Polyline to extract segments from
 * @param segment_index Index numbers of polyline segments to extract
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns List of new polylines created from extract
 */
export function extract(pline: gs.IPolyline, segment_index: number[], copy: boolean): gs.IPolyline[] {
    const m: gs.IModel = pline.getModel();
    const plines: gs.IPolyline[] = [];
    const points: gs.IPoint[] = pline.getPointsArr();
    for (const i of  segment_index) {
        if (i < points.length - 2) {
            plines.push(m.getGeom().addPolyline([points[i], points[i+1]], false));
        }
    }
    if (!copy) {
        m.getGeom().delObj(pline.getID(), false);
    }
    return plines;
}

/**
 * Extrudes a polyline according to a specified vector to create a polymesh
 * @param pline Polyline to extrude
 * @param vector Vector describing direction and distance of extrusion
 * @param cap Closes polymesh by creating a flat surface on each end of the extrusion if true
 * @returns Polymesh created from extrusion
 */
 // TODO joie update docs
export function extrude(pline: gs.IPolyline, vector: number[], cap: boolean, copy: boolean): gs.IPolymesh {
    const m: gs.IModel = pline.getModel();
    const points: gs.IPoint[] = pline.getPointsArr();
    const mesh_points: gs.IPoint[][] = [];
    for (let i = 0; i < points.length; i++) {
        const i2 = i%2;
        if (i2 === 2) {mesh_points.push([]);}
        const face: gs.IPoint[] = mesh_points[mesh_points.length - 1];
        const pos: number[] = points[i].getPosition();
        face[i2] = points[i];
        face[3 - i2] = m.getGeom().addPoint([pos[0] + vector[0], pos[1] + vector[1], pos[2] + vector[2]]);
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    if (!copy) {
        m.getGeom().delObj(pline.getID(), false);
    }
    return pmesh;
}

/**
 * Checks if the polyline is closed
 * @param pline Polyline object
 * @return True if the polyline is closed
 */
export function isCLosed(pline: gs.IPolyline): boolean {
    return pline.isClosed();
}

// - WEEK 4 -
/**
 * Lofts a list of polylines with the same number of segments to create a polymesh
 * @param plines List of polylines to loft (in order)
 * @param is_closed Closes polymesh by lofting back to first polyline if true
 * @returns Polymesh created from loft
 */
  // TODO joie update docs
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
            m.getGeom().delObj(pline.getID(), false);
        }
    }
    return pmesh;
}

/**
 * Sweeps a polyline along a specified polyline to create a polymesh
 * @param pline Polyline to sweep
 * @param rail Rail polyline to sweep along
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
            const rail_pos1: number[] = rail_points[j].getPosition();
            const rail_pos2: number[] = rail_points[j+1].getPosition();
            const j2 = j%2;
            let vec: number[];
            if (j2 === 0) {
                mesh_points.push([]);
                vec = vec1;
            } else {
                vec = vec2;
            }
            const face: gs.IPoint[] = mesh_points[mesh_points.length - 1];
            const pos1: number[] = [rail_pos1[0] + vec[0], rail_pos1[1] + vec[1], rail_pos1[2] + vec[2]];
            const pos2: number[] = [rail_pos2[0] + vec[0], rail_pos2[1] + vec[1], rail_pos2[2] + vec[2]];
            face[j2] = m.getGeom().addPoint(pos1);
            face[3 - j2] = m.getGeom().addPoint(pos2);
        }
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    if (!copy) {
        m.getGeom().delObj(pline.getID(), false);
        m.getGeom().delObj(rail.getID(), false);
    }
    return pmesh;
}
