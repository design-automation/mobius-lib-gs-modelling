/**
 * Split functions find points of intersection and conics, polylines and polymeshes where two objects
 * overlap and split the input objects. They return the split segments, arcs or polymeshes in a list of lists.
 *
 * <code>[0][i]</code> contains the split parts of the first input, where <code>i</code> is the index number
 * of each individual part obtained from the split function.<br/>
 * <code>[1][i]</code> contains the split parts of the second input, if available, where <code>i</code> is the
 * index number of each individual part obtained from the split function.
 */

import * as gs from "gs-json";
import * as gsm from "./_export_dev";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as math_conic from "./_math_conic_dev";

//  ===============================================================================================================
//  Split Constructors ============================================================================================
//  ===============================================================================================================

//  ===============================================================================================================
//  Split Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Returns the intersection points and/or overlapping arcs of two intersecting co-planar conic curves
 *
 * List of points returned is in order (starts from t=0 to t=1 of curve_1)<br/>
 * Conic curves must lie on the same plane<br/>
 * Returns null if conic curves are not co-planar<br/>
 * Returns null if conic curves do not intersect
 * @param circle1 Conic curve 1
 * @param circle2 Conic curve 2
 * @returns List of intersection points and/or overlapping arcs if successful,
 *          null if unsuccessful or on error
 */
export function circleCircle2D(circle1: gs.ICircle, circle2: gs.ICircle): gs.ICircle[] {
    if (!circle1.exists()) {throw new Error("circle1 has been deleted.");}
    if (!circle2.exists()) {throw new Error("circle2 has been deleted.");}
    const model: gs.IModel = circle1.getModel();
    const geom: gs.IGeom = model.getGeom();
    const points: gs.IPoint[] = math_conic._isectCircleCircle2D(circle1, circle2);
    if (points.length !== 2) {return null;}
    const circle1_origin: gs.IPoint = circle1.getOrigin();
    const circle2_origin: gs.IPoint = circle2.getOrigin();
    //arc 1 a
    const vec1_x: three.Vector3 = threex.vectorFromPointsAtoB(circle1_origin, points[0]);
    const vec1_2nd_x: three.Vector3 = threex.vectorFromPointsAtoB(circle1_origin, points[1]);
    const vec1_y: three.Vector3 = threex.orthoVectors(vec1_x, vec1_2nd_x);
    const angle1: number = vec1_x.angleTo(vec1_2nd_x);
    const vec1_x_xyz: gs.XYZ = vec1_x.toArray() as gs.XYZ;
    const vec1_y_xyz: gs.XYZ = vec1_y.toArray() as gs.XYZ;
    const arc1_a: gs.ICircle = geom.addCircle(circle1_origin, vec1_x_xyz, vec1_y_xyz, [0, angle1]);
    // arc 1 b
    const vec1_2nd_x_xyz: gs.XYZ = vec1_2nd_x.toArray() as gs.XYZ;
    const vec1_2nd_y_xyz: gs.XYZ = threex.orthoVectors(vec1_x, vec1_2nd_x).toArray() as gs.XYZ;
    const arc1_b: gs.ICircle = geom.addCircle(circle1_origin, vec1_2nd_x_xyz, vec1_2nd_y_xyz, [0, 360 - angle1]);
    //arc 2 a
    const vec2_x: three.Vector3 = threex.vectorFromPointsAtoB(circle2_origin, points[0]);
    const vec2_2nd_x: three.Vector3 = threex.vectorFromPointsAtoB(circle2_origin, points[1]);
    const vec2_y: three.Vector3 = threex.orthoVectors(vec2_x, vec2_2nd_x);
    const angle2: number = vec1_x.angleTo(vec2_2nd_x);
    const vec2_x_xyz: gs.XYZ = vec2_x.toArray() as gs.XYZ;
    const vec2_y_xyz: gs.XYZ = vec2_y.toArray() as gs.XYZ;
    const arc2_a: gs.ICircle = geom.addCircle(circle2_origin, vec2_x_xyz, vec2_y_xyz, [0, angle2]);
    // arc 2 b
    const vec2_2nd_x_xyz: gs.XYZ = vec2_2nd_x.toArray() as gs.XYZ;
    const vec2_2nd_y_xyz: gs.XYZ = threex.orthoVectors(vec2_x, vec2_2nd_x).toArray() as gs.XYZ;
    const arc2_b: gs.ICircle = geom.addCircle(circle2_origin, vec2_2nd_x_xyz, vec2_2nd_y_xyz, [0, 360 - angle2]);
    // return arcs
    return [arc1_b, arc1_a, arc2_a, arc2_b];
}
