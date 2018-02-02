/**
 * Function for intersecting geometric objects.
 */

/**
 * Intersect functions find points of intersection where the geometry of two objects intersect.
 * The functions return the intersections and overlaps and do not alter the original input objects.
 * Intersecting can be done either in 2D or in 3D, as indicated by the name of the intersect function.
 * The result of a intersect function will vary depending on the types of objects being intersected.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as math_conic from "./_math_conic_dev";

//  ===============================================================================================================
//  Intersect Functions ===========================================================================================
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
export function circleCircle2D(circle1: gs.ICircle, circle2: gs.ICircle): gs.IPoint[] {
    if (!circle1.exists()) {throw new Error("circle1 has been deleted.");}
    if (!circle2.exists()) {throw new Error("circle2 has been deleted.");}
    return math_conic._isectCircleCircle2D(circle1, circle2);
}

/**
 *
 * @param circle Conic curve 1
 * @param plane Conic curve 2
 * @returns List of intersection points and/or overlapping arcs if successful,
 *          null if unsuccessful or on error
 */
export function circlePlane3D(circle: gs.ICircle, plane: gs.IPlane): gs.IPoint[] {
    if (!circle.exists()) {throw new Error("circle has been deleted.");}
    if (!plane.exists()) {throw new Error("plane has been deleted.");}
    return math_conic._isectCirclePlane3D(circle, plane);
}

