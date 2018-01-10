import * as gs from "gs-json";

//  ===============================================================================================================
//  Conic Constructors ============================================================================================
//  ===============================================================================================================

// - WEEK 3 -
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

// - WEEK 3 -
/**
 * Adds a circular arc to the model based on a plane and radius
 *
 * Arc will be constructed parallel to the plane with the origin of the plane as the center point of the
 * circle that forms the arc<br/>
 * Arc will be constructed starting from the x-axis of the specified plane and follows the circle in the
 * specified direction until it reaches the angle specified
 * @param plane Plane to construct arc on
 * @param radius Radius of arc
 * @param angle Angle of arc in degrees
 * @param clockwise Constructs arc in a clockwise direction of true, anticlockwise if false
 * @returns New arc if successful
 */
export function ArcFromPlane(plane: gs.IPlane, radius: number, angle: number, clockwise: boolean ):
                gs.ICircle {
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

// - WEEK 2 -
/**
 * Adds a closed circle to the model based on an origin point and radius
 *
 * Circle will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the circle
 * @param origin Center point of circle
 * @param radius Radius of circle
 * @returns New circle if successful
 */
export function CircleFromOrigin(origin: gs.IPoint, radius: number ): gs.ICircle {
    throw new Error("Method not implemented");
}

/**
 * Adds a closed circle to the model based on a plane and radius
 *
 * Circle will be constructed parallel to the plane with the origin of the plane as the center point of the
 * circle
 * @param plane Plane to construct circle on
 * @param radius Radius of circle
 * @returns New circle if successful
 */
export function CircleFromPlane(plane: gs.IPlane, radius: number ): gs.ICircle {
    throw new Error("Method not implemented");
}

/**
 * Adds a closed ellipse to the model based on a plane and radius
 *
 * Ellipse will be constructed parallel to the plane with the origin of the plane as the center point of the
 * ellipse
 * @param plane Plane to construct ellipse on
 * @param radius_x Radius of ellipse in x-direction of plane
 * @param radius_y Radius of ellipse in y-direction of plane
 * @returns New ellipse if successful
 */
export function EllipseFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number ): gs.IEllipse {
    throw new Error("Method not implemented");
}

/**
 * Adds an elliptical arc to the model based on a plane and radius
 *
 * Arc will be constructed parallel to the plane with the origin of the plane as the center point of the
 * ellipse that forms the arc<br/>
 * Arc will be constructed starting from angle_s in the specifed direction from the x-axis of the plane and
 * follows the ellipse in the same direction until it reaches the angle_e specified
 * @param plane Plane to construct arc on. The origin of the plane is the center of the arc
 * @param radius_x Radius of arc in x-direction of plane
 * @param radius_y Radius of arc in y-direction of plane
 * @param angle_s Starting angle of arc in degrees
 * @param angle_e Ending angle of arc in degrees
 * @param clockwise Constructs arc in a clockwise direction of true, anticlockwise if false
 * @returns New arc if successful
 */
export function EllArcFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number, angle_s: number,
                                 angle_e: number, clockwise: boolean ): gs.IEllipse {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Gets a conic curve from the model based on its index number
 *
 * Returns null if index number cannot be found in model<br/>
 * Returns null if object linked to index number is not a conic curve
 * @param model Model to get curve from
 * @param index Index number of conic curve
 * @returns Conic curve if successful, null if unsuccessful or on error
 */
export function GetCircleByIndex(model: gs.IModel, index: number ): gs.ICircle {
    throw new Error("Method not implemented");
}

/**
 * Gets a conic curve from the model based on its index number
 *
 * Returns null if index number cannot be found in model<br/>
 * Returns null if object linked to index number is not a conic curve
 * @param model Model to get curve from
 * @param index Index number of conic curve
 * @returns Conic curve if successful, null if unsuccessful or on error
 */
export function GetEllipseByIndex(model: gs.IModel, index: number ): gs.IEllipse {
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

/**
 * Gets the origin of a conic curve
 * @param curve Conic curve to obtain origin from
 * @returns Origin point of conic curve
 */
export function getOrigin(curve: gs.ICircle|gs.IEllipse): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Gets the type of a conic curve
 * @param curve Conic curve to obtain type
 * @returns Number describing type of conic curve (0-Circle, 1-Ellipse, 2-Hyperbola, 3-Parabola)
 */
export function getType(curve: gs.ICircle|gs.IEllipse): number /*enum TO-DO*/ {
    throw new Error("Method not implemented");
}

/**
 * Gets the x and y vectors of a conic curve
 *
 * Direction of x and y vectors reflect the x and y axis of the underlying circle or ellipse of the curve<br/>
 * Magnitude of x and y vectors reflect the x and y radius of the underlying circle or ellipse of the curve
 * @param curve Conic curve to obtain vectors from
 * @returns List of x and y vectors of a conic curve
 */
export function getVectors(curve: gs.ICircle|gs.IEllipse): number[] {
    throw new Error("Method not implemented");
}

/**
 * Checks if a conic curve is closed
 * @param curve Conic curve to test
 * @returns True if conic curve is closed
 */
export function isClosed(curve: gs.ICircle|gs.IEllipse): boolean {
    throw new Error("Method not implemented");
}

// - WEEK 4 -
/**
 * Returns the length of a conic curve
 *
 * If specified curve is a closed circle or ellipse, returns the circumference of the circle or ellipse
 * @param curve Conic curve to obtain length from
 * @returns Length of curve
 */
export function length(curve: gs.ICircle|gs.IEllipse): number {
    throw new Error("Method not implemented");
}

/**
 * Sets a conic curve to be open or closed
 *
 * Specified curve should be a circle, circular arc, ellipse or elliptical arc<br/>
 * Returns null if a hyperbola or parabola is specified<br/>
 * If an open circular arc or elliptical arc is specified, returns a closed circle or ellipse
 * @param curve Conic curve to set value for
 * @param is_closed The value to set
 * @returns True if successful, null if unsuccessful or on error
 */
export function setIsClosed(curve: gs.ICircle|gs.IEllipse, is_closed: boolean): void {
    throw new Error("Method not implemented");
}

//  ==========================================================================================================
//  TO BE DELETED
//  ==========================================================================================================

// the number of segs can be defined when we divide the curve

// - WEEK 4 -
/**
 * Changes the number of segments a conic curve is divided into
 * @param curve Conic curve to change
 * @param segments New number of segments
 * @param copy Performs transformation on a duplicate of the input curve if true
 * @returns Conic curve with updated segments
 */
export function setNumSegs(curve: gs.ICircle|gs.IEllipse, segments: number, copy: boolean): gs.ICircle|gs.IEllipse {
    throw new Error("Method not implemented");
}

// - WEEK 4 -
/**
 * Gets the number of segments a conic curve is divided into
 * @param curve Conic curve to obtain number of segments from
 * @returns Number of segments in curve
 */
export function getNumSegs(curve: gs.ICircle|gs.IEllipse): number {
    throw new Error("Method not implemented");
}

// we can do this at the geom level

// - WEEK 3 -
// *
//  * Copies conic curves from one model to another
//  * @param model Model to copy from
//  * @param circle Model to copy to
//  * @returns List of conic curves copied into specified model if successful

// export function CopyCircleToModel(model: gs.IModel, circle: gs.ICircle ): gs.IConicCurve[] {
//     throw new Error("Method not implemented");
// }

// this is difficult, edges are straight lines

// *
//  * Converts an edge into a conic curve
//  *
//  * Returns null if specified edge does not describe a conic curve
//  * @param edge Edge to get curve from
//  * @returns New conic curve if successful, null if unsuccessful or on error

// export function FromEdge(edge: gs.IEdge ): gs.IEllipse {
//     throw new Error("Method not implemented");
// }

