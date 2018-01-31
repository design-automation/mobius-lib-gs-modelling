/**
 * Polylines are a type of geometric object.
 *
 * Polylines are formed from straight line segments joined to form a continuous line.
 * They can be open or closed. A closed polyline has not fill.
 */

import * as gs from "gs-json";
import {_pointsExtend, _pointsEvaluate} from "./pline_dev";
import * as three from "three";

//  ===============================================================================================================
//  Pline Get and Copy ============================================================================================
//  ===============================================================================================================

/**
 * Gets a polyline from the model based on an index number
 * @param model Model to get polyline from
 * @param id Index number of polyline
 * @returns Polyline object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IPolyline {
    // check args
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null; }
    if (obj.getObjType() !== gs.EObjType.polyline) {
        throw new Error("Object is not a polyline. Object type is: " + obj.getObjType());
    }
    // return the polyline
    return obj as gs.IPolyline;
}

/**
 * Create a copy of a polyline.
 *
 * @param polyline The polyline to copy.
 * @returns A new polyline.
 */
export function Copy(polyline: gs.IPolyline, copy_attribs?: boolean): gs.IPolyline {
    // check args
    if (!polyline.exists()) {throw new Error("polyline has been deleted.");}
    // copy and return
    return polyline.copy(copy_attribs) as gs.IPolyline;
}

/**
 * Copies polylines from one model to another
 * @param model_1 Model to copy from
 * @param model_2 Model to copy to
 * @returns List of polylines copied into specified model if successful
 */
export function CopyFromModel(model_1: gs.IModel, model_2: gs.IModel ): gs.IPolyline[] {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Pline Constructors ============================================================================================
//  ===============================================================================================================

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
        if (!point.exists()) {
            throw new Error("Point has been deleted.");
        }
    }
    return model.getGeom().addPolyline(points, is_closed);
}

/**
 * Adds a polyline from the model based on a conic curve.
 *
 * Creates equally spaced points along a circle or arc and joins them to create a polyline<br/>
 * If it is a circle, then a a closed polyline is returned.
 * @param circle Circle or circular arc to construct polyline from.
 * @param segments Number of segments in polyline.
 * @returns Polyline object if successful.
 */
export function FromCircle(circle: gs.ICircle, segments: number): gs.IPolyline {
    if (!circle.exists()) {throw new Error("Circle has been deleted.");}
    const m: gs.IModel = circle.getModel();
    const points: gs.IPoint[] = circle.equiPoints(segments + 1);
    return m.getGeom().addPolyline(points, circle.isClosed());
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
export function From2Points(start: gs.IPoint, end: gs.IPoint): gs.IPolyline {
    return this.FromPoints([start, end], false);
}

//  ===============================================================================================================
//  Pline Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Checks if the polyline is closed
 * @param pline Polyline object
 * @return True if the polyline is closed
 */
export function isClosed(pline: gs.IPolyline): boolean {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    return pline.isClosed();
}

/**
 * Sets the polyline to be open or cosed
 * @param pline Polyline object
 * @param is_closed The value to set
 */
export function setIsClosed(pline: gs.IPolyline, is_closed: boolean): void {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    pline.setIsClosed(is_closed);
}

/**
 * Returns numner of edges in the polyline
 * @param pline Polyline object.
 * @return The number of edges.
 */
export function numEdges(pline: gs.IPolyline): number {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    return pline.numEdges();
}

/**
 * Returns numner of vertices in the polyline
 * @param pline Polyline object.
 * @return The number of vertices.
 */
export function numVertices(pline: gs.IPolyline): number {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    return pline.numVertices();
}

/**
 * Returns all points
 * @param pline Polyline object.
 * @return The number of vertices.
 */
export function getPoints(pline: gs.IPolyline): gs.IPoint[] {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    return pline.getPointsArr();
}

/**
 * Returns the start and end points of this polyline. If it is closed, returns null.
 * @param pline Polyline object.
 * @return The number of vertices.
 */
export function getEndPoints(pline: gs.IPolyline): gs.IPoint[] {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    if (pline.isClosed()) {return null;}
    const points: gs.IPoint[] = pline.getPointsArr();
    return [points[0], points[points.length - 1]];
}

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
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    let points: gs.IPoint[] = pline.getPointsArr();
    if (pline.isClosed()) {points.push(points[0]); }
    if (segment_index !== -1) {
        if (segment_index > points.length - 1) {throw new Error("segments_index is out of range."); }
        points = points.splice(segment_index, 2);
    }
    return _pointsEvaluate(points, t);
}

/**
 * Join a set of polylines. Only polylies that are connected end to end will be joined,
 *
 * Joins polymeshes together and returns a single polymesh<br/>
 * Returns null if polymeshes do not intersect or touch
 * @param pmeshes List of polymeshes to weld
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
export function join(plines: gs.IPolyline[]): gs.IPolyline[] {
    // get the model
    const model: gs.IModel = plines[0].getModel();
    const geom: gs.IGeom = model.getGeom();
    // check
    for (const pline of plines) {
        if (!pline.exists()) {throw new Error("Polyline has been deleted.");}
        if (pline.getModel() !== model) {throw new Error("Polylines have to be in same model.");}
    }
    // create an array of array of points
    const point_ids_arrays: number[][] = [];
    for (const pline of plines) {
        const points: gs.IPoint[] = pline.getPointsArr();
        const start_end: [number, number] = [points[0].getID(), points[points.length - 1].getID()];
        if (start_end[1] < start_end[0]) {
            points.reverse();
        }
        point_ids_arrays.push(points.map((p) => p.getID()));
    }
    point_ids_arrays.sort();
    // create disjoint set
    const disjoint_sets: number[][][] = [];
    disjoint_sets.push([point_ids_arrays[0]]);
    point_ids_arrays.splice(0, 1);
    let max: number = 0;
    while (point_ids_arrays.length > 0 && max < 100) {
        max++;
        let tried_all: boolean = false;
        const last_disjoint_set: number[][] = disjoint_sets[disjoint_sets.length - 1];
        const last_point_ids = last_disjoint_set[last_disjoint_set.length - 1];
        let current_start: number = last_disjoint_set[0][0];
        let current_end: number = last_point_ids[last_point_ids.length - 1];
        tried_all = true;
        for (let i = 0; i < point_ids_arrays.length; i++) {
            const point_ids:number[] = point_ids_arrays[i];
            const point_ids_start: number = point_ids[0];
            const point_ids_end: number = point_ids[point_ids.length - 1];
            if (current_end === point_ids_start) {
                tried_all = false;
                last_disjoint_set.push(point_ids);
                current_end = last_point_ids[last_point_ids.length - 1];
                point_ids_arrays.splice(i, 1);
                break;
            } else if (current_start === point_ids_end) {
                tried_all = false;
                last_disjoint_set.unshift(point_ids);
                current_start = last_disjoint_set[0][0];
                point_ids_arrays.splice(i, 1);
                break;
            } else if (current_end === point_ids_end) {
                tried_all = false;
                last_disjoint_set.push(point_ids.reverse());
                current_end = last_point_ids[last_point_ids.length - 1];
                point_ids_arrays.splice(i, 1);
                break;
            } else if (current_start === point_ids_start) {
                tried_all = false;
                last_disjoint_set.unshift(point_ids.reverse());
                current_start = last_disjoint_set[0][0];
                point_ids_arrays.splice(i, 1);
                break;
            }
        }
        if (tried_all || (current_start === current_end)) {
            disjoint_sets.push([point_ids_arrays[0]]);
            point_ids_arrays.splice(0, 1);
        }
    }
    // create polylines
    const new_plines: gs.IPolyline[] = [];
    for (const disjoint_set of disjoint_sets) {
        const points: gs.IPoint[] = [];
        for (const point_ids of disjoint_set) {
            for (let i = 0; i< point_ids.length - 1; i++) {
                points.push(geom.getPoint(point_ids[i]));
            }
        }
        const start: number = disjoint_set[0][0];
        const last_array: number[] = disjoint_set[disjoint_set.length - 1];
        const end: number = last_array[last_array.length - 1];
        if (start === end) {
            new_plines.push(geom.addPolyline(points, true));
        } else {
            points.push(geom.getPoint(end));
            new_plines.push(geom.addPolyline(points, false));
        }
    }
    // delete the old polylines
    geom.delObjs(plines, true);
    // return the new plines
    return new_plines;
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
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    return this.extract(pline, gs.Arr.makeSeq(pline.numEdges()), copy);
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
 * @returns List of new polylines created from extract
 */
export function extract(pline: gs.IPolyline, segment_index: number[]): gs.IPolyline[] {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    // do the extraction
    const m: gs.IModel = pline.getModel();
    const plines: gs.IPolyline[] = [];
    const points: gs.IPoint[] = pline.getPointsArr();
    if (pline.isClosed()) {points.push(points[0]); }
    for (const i of  segment_index) {
        if (i < points.length - 1) {
            plines.push(m.getGeom().addPolyline([points[i], points[i+1]], false));
        }
    }
    return plines;
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
/**
 * Extends a non-closed polyline by specified distance
 *
 * Extention is straight and continues in the same direction as the extended segment<br/>
 * Returns null if distance is negative
 * @param pline Polyline object
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @returns Polyline object if successful, null if unsuccessful or on error
 */
export function extend(pline: gs.IPolyline, extrusion_side: number, length: number,
                       create_points: boolean): gs.IPolyline {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    // extend? which side?
    switch (extrusion_side) {
        case 0: case 2:
            const edges1: gs.IEdge[] = pline.getEdges()[0][0];
            const first_edge = edges1[0];
            const points1: gs.IPoint[] = first_edge.getVertices().map((v) => v.getPoint());
            const extended1: gs.IPoint = _pointsExtend(points1[1], points1[0], length, create_points);
            if (create_points) {
                pline.insertVertex(first_edge, extended1);
            }
        case 1: case 2:
            const edges2: gs.IEdge[] = pline.getEdges()[0][0];
            const last_edge = edges2[edges2.length - 1];
            const points2: gs.IPoint[] = last_edge.getVertices().map((v) => v.getPoint());
            const extended2: gs.IPoint = _pointsExtend(points2[0], points2[1], length, create_points);
            if (create_points) {
                pline.insertVertex(last_edge, extended2);
            }
    }
    return pline;
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
 * @param cap Closes polymesh by creating a polygon on each end of the extrusion if true
 * @returns Polymesh created from extrusion
 */
export function extrude(pline: gs.IPolyline, vector: gs.XYZ, cap: boolean): gs.IPolymesh {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    const m: gs.IModel = pline.getModel();
    const points: gs.IPoint[] = pline.getPointsArr();
    const new_points: gs.IPoint[] = [];
    const mesh_points: gs.IPoint[][] = [];
    for (let i = 0; i < points.length; i++) {
        const i2 = i%2;
        if (i2 === 0) {mesh_points.push([]);}
        const face: gs.IPoint[] = mesh_points[mesh_points.length - 1];
        const pos: number[] = points[i].getPosition();
        face[i2] = points[i];
        // create the new point by adding the vector
        const new_point: gs.IPoint = m.getGeom().addPoint([pos[0] + vector[0], pos[1] + vector[1], pos[2] + vector[2]]);
        new_points.push(new_point);
        face[3 - i2] = new_point;
    }
    if (cap) {
        mesh_points.push(points.reverse());
        mesh_points.push(new_points);
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    return pmesh;
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
 * @returns Polymesh created from loft if successful, null if unsuccessful or on error
 */
export function loft(plines: gs.IPolyline[], is_closed: boolean=false): gs.IPolymesh {
    for (const pline of plines) {
        if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    }
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
            const face: gs.IPoint[] = [points0[j], points0[j+1], points1[j+1], points1[j]];
            mesh_points.push(face);
        }
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    return pmesh;
}

/**
 * Sweeps a cross_section polyline along a rail polyline to create a polymesh.
 * The cross sesctions remain parallel.
 *
 * @param cross_section Polyline to sweep
 * @param rail Rail polyline to sweep along
 * @returns Polymesh created from sweep
 */
export function sweepParallel(cross_section: gs.IPolyline, rail: gs.IPolyline): gs.IPolymesh {
    if (!cross_section.exists()) {throw new Error("Cross section has been deleted.");}
    if (!rail.exists()) {throw new Error("Rail has been deleted.");}
    if (cross_section.getModel() !== rail.getModel()) {throw new Error("Cross section and rail must be in the same model.");}
    const m: gs.IModel = cross_section.getModel();
    if (rail.getModel() !== m) {throw new Error("The cross_section and the rail must be in the same model.");}
    const cross_points: gs.IPoint[] = cross_section.getPointsArr();
    if (cross_section.isClosed) {cross_points.push(cross_points[0]);}
    const rail_points: gs.IPoint[] = rail.getPointsArr();
    if (rail.isClosed) {rail_points.push(rail_points[0]);}
    const mesh_points: gs.IPoint[][] = [];
    const pline_start_pos: number[] = cross_points[0].getPosition();
    for (let i = 0; i< cross_points.length - 1; i++) {
        const pline_pos1: number[] = cross_points[i].getPosition();
        const pline_pos2: number[] = cross_points[i+1].getPosition();
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
    return pmesh;
}
