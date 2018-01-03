import * as gs from "gs-json";

//  ===============================================================================================================
//  Conic Constructors ============================================================================================
//  ===============================================================================================================

//- WEEK 3 -
/**
 * Adds an arc to the model based on three points
 * @param pt1 First point on arc
 * @param pt2 Second point on arc
 * @param pt3 Third point on arc
 * @returns New arc if successful, null if unsuccessful or on error
 */
export function arcFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

//- WEEK 3 -
/**
 * Adds an arc to the model based on a plane and radius
 * @param plane Plane to construct arc on. The origin of the plane is the center of the arc
 * @param radius Radius of arc
 * @param angle Angle of arc in degrees
 * @returns New arc if successful, null if unsuccessful or on error
 */
export function arcFromPlane(plane: gs.IPlane, radius: number, angle: number ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on three points
 * @param pt1 First point on circle
 * @param pt2 Second point on circle
 * @param pt3 Third point on circle
 * @returns New circle if successful, null if unsuccessful or on error
 */
export function circleFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.IConicCurve {
    throw new Error("Method not implemented");
}


//- WEEK 2 -
/**
 * Adds a circle to the model based on an origin point and radius, using the world XY plane
 * @param origin Center point of circle
 * @param radius Radius of circle
 * @returns New circle if successful, null if unsuccessful or on error
 */
export function circleFromOrigin(origin: gs.IPoint, radius: number ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on a plane and radius
 * @param plane Plane to construct circle on. The origin of the plane is the center of the circle
 * @param radius Radius of circle
 * @returns New circle if successful, null if unsuccessful or on error
 */
export function circleFromPlane(plane: gs.IPlane, radius: number ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

/**
 * Adds an ellipse to the model based on a plane and radius
 * @param plane Plane to construct ellipse on. The origin of the plane is the center of the ellipse
 * @param radius_x Radius of ellipse in x-direction
 * @param radius_y Radius of ellipse in y-direction
 * @returns New ellipse if successful, null if unsuccessful or on error
 */
export function ellipseFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

/**
 * Adds an elliptical arc to the model based on a plane and radius
 * @param plane Plane to construct arc on. The origin of the plane is the center of the arc
 * @param radius_x Radius of arc in x-direction
 * @param radius_y Radius of arc in y-direction
 * @param angle_s Starting angle of arc in degrees
 * @param angle_e Ending angle of arc in degrees
 * @returns New arc if successful, null if unsuccessful or on error
 */
export function ellipticalArcFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number, angle_s: number,
                                       angle_e: number ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

/**
 * Gets a conic curve from an edge
 * @param edge Edge to get curve from
 * @returns New conic curve if successful, null if unsuccessful or on error
 */
export function fromEdge(edge: gs.IEdge ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Gets a conic curve from the model
 * @param model Model to get curve from
 * @param index Index number of conic curve
 * @returns Conic curve if successful, null if unsuccessful or on error
 */
export function getFromModel(model: gs.IModel, index: number ): gs.IConicCurve {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Conic Functions ===============================================================================================
//  ===============================================================================================================

//- WEEK 6 -
/**
 * Returns a point based on conic curve parameter
 * @param curve Conic curve to evaluate
 * @param t Parameter along curve to evaluate
 * @returns Point on curve
 */
export function evalParam(curve: gs.IConicCurve, t: number): gs.IPoint {
    throw new Error("Method not implemented");
}

//- WEEK 6 -
/**
 * Returns a parameter along a conic curve based on a point on the curve
 * @param curve Conic curve to evaluate
 * @param point Point to evaluate
 * @returns Parameter on curve
 */
export function evalPoint(curve: gs.IConicCurve, point: gs.IPoint): number {
    throw new Error("Method not implemented");
}

/**
 * Extends a conic curve
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @param copy Performs transformation on a duplicate of the input curve if true
 * @returns Extended conic curve
 */
export function extend(curve: gs.IConicCurve, direction: number, distance: number, copy: boolean): gs.IConicCurve {
    throw new Error("Method not implemented");
}

//- WEEK 4 -
/**
 * Returns number of segments a conic curve is divided into
 * @param curve Conic curve to obtain number of segments from
 * @returns Number of segments in curve
 */
export function getNumSegs(curve: gs.IConicCurve): number {
    throw new Error("Method not implemented");
}

/**
 * Gets the origin of a conic curve
 * @param curve Conic curve to obtain origin from
 * @returns Origin point of conic curve
 */
export function getOrigin(curve: gs.IConicCurve): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Gets the type of a conic curve
 * @param curve Conic curve to obtain type
 * @returns Number describing type of conic curve (0-Circle, 1-Ellipse, 2-Hyperbola, 3-Parabola)
 */
export function getType(curve: gs.IConicCurve): number /*enum TO-DO*/ {
    throw new Error("Method not implemented");
}

/**
 * Gets the x and y vectors of a conic curve
 * @param curve Conic curve to obtain vectors from
 * @returns List of x and y vectors of a conic curve
 */
export function getVectors(curve: gs.IConicCurve): number[] {
    throw new Error("Method not implemented");
}

/**
 * Checks if conic curve is closed
 * @param curve Conic curve to test
 * @returns True if conic curve is closed
 */
export function isClosed(curve: gs.IConicCurve): boolean {
    throw new Error("Method not implemented");
}

//- WEEK 4 -
/**
 * Returns length of a conic curve
 * @param curve Conic curve to obtain length from
 * @returns Length of curve
 */
export function length(curve: gs.IConicCurve): number {
    throw new Error("Method not implemented");
}

/**
 * Sets the polyline to be open or cosed.
 * @param curve Conic curve to close
 * @param is_closed The value to set
 */
export function setIsClosed(curve: gs.IConicCurve, is_closed: boolean): void {
    throw new Error("Method not implemented");
}

//- WEEK 4 -
/**
 * Changes number of segments a conic curve is divided into
 * @param curve Conic curve to change
 * @param segments New number of segments
 * @param copy Performs transformation on a duplicate of the input curve if true
 * @returns Conic curve with updated segments
 */
export function setNumSegs(curve: gs.IConicCurve, segments: number, copy: boolean): gs.IConicCurve {
    throw new Error("Method not implemented");
}
