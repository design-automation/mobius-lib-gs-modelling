/**
 * Polylines are a type of geometric object.
 *
 * Polylines are formed from straight line segments joined to form a continuous line.
 * They can be open or closed. A closed polyline has not fill.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as poly from "./_math_poly_dev";
import * as utils from "./_utils_dev";

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
//  Pline Simple Functions ===============================================================================================
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
 * @return True if an open polyline was closed, false is the polyline was already closed.
 */
export function setIsClosed(pline: gs.IPolyline, is_closed: boolean): boolean {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    if (pline.isClosed()) {return false;}
    pline.setIsClosed(is_closed);
    return true;
}

/**
 * Returns the number of edges in the polyline
 * @param pline Polyline object.
 * @return The number of edges.
 */
export function numEdges(pline: gs.IPolyline): number {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    return pline.numEdges();
}

/**
 * Returns the number of vertices in the polyline
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

//  ===============================================================================================================
//  Pline Modelling Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Returns a point on a polyline based on a parameter along the polyline
 * @param pline Polyline to evaluate
 * @param t Parameter to evaluate (0 is the start of the polyline, 1 is the end of the polyline)
 * @param segment_index The segment of the polyline to evaluate. When -1, the whole polyline is evaluated.
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
    return poly.pointsEvaluate(points, t);
}

/**
 * Join polylines with shared end points. The original polyline is deleted.
 *
 * @param plines List of polylines to join.
 * @returns A list of joined polylines.
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
 * Explodes a polyline into individual segments. The original polyline is not modified.
 *
 * Each straight line segment in the polyline is returned as a separate polyline object
 * @param pline Polyline to explode
 * @returns List of new polylines created from explode
 */
export function explode(pline: gs.IPolyline): gs.IPolyline[] {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    return this.extract(pline, gs.Arr.makeSeq(pline.numEdges()));
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

/**
 * Extends a non-closed polyline by specified distance. The original polyline is modified.
 *
 * Extension is straight and continues in the same direction as the extended segment<br/>
 *
 * @param pline Polyline object
 * @param extend_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @returns Polyline object if successful, null if unsuccessful or on error
 */
export function extend(pline: gs.IPolyline, extend_side: number, length: number,
                       create_points: boolean = true): gs.IPolyline {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    // extend? which side?
    switch (extend_side) {
        case 0: case 2:
            const edges1: gs.IEdge[] = pline.getEdges()[0][0];
            const first_edge = edges1[0];
            const points1: gs.IPoint[] = first_edge.getVertices().map((v) => v.getPoint());
            const extended1: gs.IPoint = poly.pointsExtend(points1[1], points1[0], length, create_points);
            if (create_points) {
                pline.insertVertex(first_edge, extended1);
            }
        case 1: case 2:
            const edges2: gs.IEdge[] = pline.getEdges()[0][0];
            const last_edge = edges2[edges2.length - 1];
            const points2: gs.IPoint[] = last_edge.getVertices().map((v) => v.getPoint());
            const extended2: gs.IPoint = poly.pointsExtend(points2[0], points2[1], length, create_points);
            if (create_points) {
                pline.insertVertex(last_edge, extended2);
            }
    }
    return pline;
}

/**
 * Extrudes a polyline according to a specified vector to create a polymesh.
 * The original polyline is not modified.
 *
 * Pline is moved by the specified vector and straight line segments are created between the vertices of
 * the input pline and moved pline. The resulting straight line segments and the straight line segments of the
 * input and moved plines are used to define the edges of four-sided polygons. The polygons are joined to
 * create a polymesh<br/>
 *
 * If cap is true, input pline and moved pline are used as edges to create two polygons. The polygones are
 * joined to the polymesh from above.
 *
 * @param pline Polyline to extrude
 * @param vector Vector describing direction and distance of extrusion
 * @param cap Closes polymesh by creating a polygon on each end of the extrusion if true
 * @returns Polymesh created from extrusion
 */
export function extrude(pline: gs.IPolyline, vector: gs.XYZ, cap: boolean): gs.IPolymesh {
    if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    const m: gs.IModel = pline.getModel();
    const g: gs.IGeom = m.getGeom();
    const points1: gs.IPoint[] = pline.getPointsArr();
    const points2: gs.IPoint[] = points1.map((p) => p.copy() as gs.IPoint);
    threex.movePointsAddXYZ(points2, vector);
    const mesh_points: gs.IPoint[][] = poly.pointsLoft([points1, points2], pline.isClosed());
    if (cap) {
        mesh_points.push(points1.reverse());
        mesh_points.push(points2);
    }
    const pmesh: gs.IPolymesh = m.getGeom().addPolymesh(mesh_points);
    return pmesh;
}

/**
 * Lofts a list of polylines with the same number of segments to create a polymesh.
 * The original polylines are not modified.
 *
 * Straight line segments are created between the vertices of every two input plines. The resulting
 * straight line segments and the straight line segments of the plines are used to define the edges of
 * four-sided polygons. The polygons created from all the plines are joined to create a polymesh<br/>
 *
 * Returns null if polylines do not have the same number of segments
 *
 * @param plines List of polylines to loft (in order)
 * @param is_closed Closes polymesh by lofting back to first polyline if true
 * @returns Polymesh created from loft if successful, null if unsuccessful or on error
 */
export function loft(plines: gs.IPolyline[], is_closed: boolean=false): gs.IPolymesh {
    // check args
    for (const pline of plines) {
        if (!pline.exists()) {throw new Error("Pline has been deleted.");}
    }
    if (plines.length < 2) {throw new Error("Too few polylines to loft.");}
    // get model and geom
    const m: gs.IModel = plines[0].getModel();
    const g: gs.IGeom = m.getGeom();
    // get data
    if (is_closed) {plines.push(plines[0]);}
    const num_points: number = plines[0].numVertices();
    const num_plines: number = plines.length;
    const plines_closed: boolean = plines[0].isClosed();
    // get points
    const points: gs.IPoint[][] = [];
    for (let i = 0; i< num_plines; i++) {
        if (plines[i].numVertices() !== num_points) {
            throw new Error("Plines do not have equal numbers of points.");
        }
        if (plines[i].isClosed() !== plines_closed) {
            throw new Error("Plines must all be either open or closed.");
        }
        points.push(plines[i].getPointsArr());
    }
    // make polymesh from points and return it
    return g.addPolymesh(poly.pointsLoft(points, plines_closed));
}
