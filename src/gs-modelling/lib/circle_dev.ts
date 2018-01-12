import * as gs from "gs-json";

//  ===============================================================================================================
//  Circle Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Adds an arc to the model based on three points
 *
 * All points are taken to be points along the arc
 * @param pt1 Start point of arc
 * @param pt2 Second point on arc
 * @param pt3 End point of arc
 * @returns New arc if successful
 */
export function ArcFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.ICircle {
    throw new Error("Method not implemented");
}

/**
 * Adds a closed circle to the model based on three points
 *
 * All points are taken to be points along the circumference of the circle
 * @param pt1 First point on circle
 * @param pt2 Second point on circle
 * @param pt3 Third point on circle
 * @returns New circle if successful
 */
export function CircleFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.ICircle {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Conic Functions ===============================================================================================
//  ===============================================================================================================

// - WEEK 6 -
/**
 * Returns a point on a conic curve based on a parameter between 0 and 1
 *
 * @param curve Conic curve to evaluate
 * @param t Parameter along curve to evaluate (0 is the start of the curve and 1 is the end)
 * @returns Point on curve
 */
export function evalParam(curve: gs.ICircle|gs.IEllipse, t: number): gs.IPoint {
    throw new Error("Method not implemented");
}

// - WEEK 6 -
/**
 * Returns a parameter along a conic curve based on a point on the curve
 *
 * Returns null if point specified does not lie on the curve (within a tolerance of 0.1)
 * @param curve Conic curve to evaluate
 * @param point Point to evaluate
 * @returns Parameter on curve if successful, null if unsuccessful or on error
 */
export function evalPoint(curve: gs.ICircle|gs.IEllipse, point: gs.IPoint): number {
    throw new Error("Method not implemented");
}

/**
 * Extends an arc
 *
 * Changes the starting and ending angles for a conic curve such that the curve is lengthened<br/>
 * Conic curve should be either a circular arc or an elliptical arc<br/>
 * Extension will follow the original curvature of the circle or ellipse the arc was constructed from<br>
 * If extension causes length of curve to exceed the circumference of the underlying circle or ellipse,
 * returns a closed circle or ellipse.<br/>
 * Returns null if distance is negative
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @param copy Performs transformation on a duplicate copy of the input curve if true
 * @returns Extended conic curve, null if unsuccessful or on error
 */
export function extendArc(curve: gs.ICircle, direction: number, distance: number, copy: boolean):
                gs.ICircle {
    throw new Error("Method not implemented");
}

/**
 * Extends an elliptical arc
 *
 * Changes the starting and ending angles for a conic curve such that the curve is lengthened<br/>
 * Conic curve should be either a circular arc or an elliptical arc<br/>
 * Extension will follow the original curvature of the circle or ellipse the arc was constructed from<br>
 * If extension causes length of curve to exceed the circumference of the underlying circle or ellipse,
 * returns a closed circle or ellipse.<br/>
 * Returns null if distance is negative
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @param copy Performs transformation on a duplicate copy of the input curve if true
 * @returns Extended conic curve, null if unsuccessful or on error
 */
export function extendEllArc(curve: gs.IEllipse, direction: number, distance: number, copy: boolean):
                gs.IEllipse {
    throw new Error("Method not implemented");
}

//  ==========================================================================================================
//  Util method
//  ==========================================================================================================

export function _argsCheckAngles(angles: [number, number]): [number, number] {
    if (angles[0] < 0) {angles[0] = Math.abs(angles[0]);} else if (angles[0] > 360) {angles[0] = angles[0]%360;}
    if (angles[1] < 0) {angles[1] = Math.abs(angles[1]);} else if (angles[1] > 360) {angles[1] = angles[0]%360;}
    if (angles[0] > angles[1]) {angles.reverse();}
    return angles;
}
