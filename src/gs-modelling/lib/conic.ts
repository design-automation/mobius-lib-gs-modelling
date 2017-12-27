import * as gs from "gs-json";

//  ===============================================================================================================
//  Conic Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Adds an arc to the model based on three points
 * - WEEK 3 -
 * @param pt1 First point on arc
 * @param pt2 Second point on arc
 * @param pt3 Third point on arc
 * @returns New arc if successful, none if unsuccessful or on error
 */
export function arcFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds an arc to the model based on a plane and radius
 * - WEEK 3 -
 * @param plane Plane to construct arc on. The origin of the plane is the center of the arc
 * @param radius Radius of arc  
 * @param ang Angle of arc in degrees
 * @returns New arc if successful, none if unsuccessful or on error
 */
export function arcFromPlane(plane: gs.IPlane, radius: number, ang: number ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on three points
 * @param pt1 First point on circle
 * @param pt2 Second point on circle
 * @param pt3 Third point on circle
 * @returns New circle if successful, none if unsuccessful or on error
 */
export function circleFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on an origin point and radius, using the world XY plane
 * - WEEK 2 -
 * @param origin Center point of circle
 * @param radius Radius of circle  
 * @returns New circle if successful, none if unsuccessful or on error
 */
export function circleFromOrigin(origin: gs.IPoint, radius: number ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on a plane and radius
 * @param plane Plane to construct circle on. The origin of the plane is the center of the circle
 * @param radius Radius of circle  
 * @returns New circle if successful, none if unsuccessful or on error
 */
export function circleFromPlane(plane: gs.IPlane, radius: number ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds an ellipse to the model based on a plane and radius
 * @param plane Plane to construct ellipse on. The origin of the plane is the center of the ellipse
 * @param radius_x Radius of ellipse in x-direction 
 * @param radius_y Radius of ellipse in y-direction  
 * @returns New ellipse if successful, none if unsuccessful or on error
 */
export function ellipseFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds an elliptical arc to the model based on a plane and radius
 * @param plane Plane to construct arc on. The origin of the plane is the center of the arc
 * @param radius_x Radius of arc in x-direction 
 * @param radius_y Radius of arc in y-direction 
 * @param ang_s Starting angle of arc in degrees
 * @param ang_e Ending angle of arc in degrees
 * @returns New arc if successful, none if unsuccessful or on error
 */
export function ellipticalArcFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number, ang_s: number,
							           ang_e: number ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Gets a conic curve from an edge
 * @param edge Edge to get curve from
 * @returns New conic curve if successful, none if unsuccessful or on error
 */
export function fromEdge(edge: gs.IEdge ): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Gets a conic curve from the model
 * - WEEK 2 -
 * @param m Model to get curve from
 * @param i Index number of conic curve  
 * @returns Conic curve if successful, none if unsuccessful or on error
 */
export function getFromModel(m: gs.IModel, i: number ): gs.IConic {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Conic Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Returns a point based on conic curve parameter
 * - WEEK 6 -
 * @param curve Conic curve to evaluate
 * @param t Parameter along curve to evaluate
 * @returns Point on curve
 */
export function evalParam(curve: gs.IConic, t: number): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Returns a parameter along a conic curve based on a point on the curve
 * - WEEK 6 -
 * @param curve Conic curve to evaluate
 * @param point Point to evaluate
 * @returns Parameter on curve
 */
export function evalPoint(curve: gs.IConic, point: gs.IPoint): number {
    throw new Error("Method not implemented");
}

/**
 * Extends a conic curve
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @returns Extended conic curve
 */
export function extend(curve: gs.IConic): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Extrudes a conic curve according to a specified vector to create a polymesh
 * @param curve Conic curve to extrude
 * @param vector Vector describing direction and distance of extrusion
 * @param cap Closes polymesh by creating a flat surface on each end of the extrusion if true
 * @returns Polymesh created from extrusion
 */
export function extrude(curve: gs.IConic, vector: number[], cap: boolean=false): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Returns number of segments a conic curve is divided into
 * - WEEK 4 -
 * @param curve Conic curve to obtain number of segments from
 * @returns Number of segments in curve
 */
export function getNumSegs(curve: gs.IConic): number {
    throw new Error("Method not implemented");
}

/**
 * Gets the origin of a conic curve
 * @param curve Conic curve to obtain origin from
 * @returns Origin point of conic curve
 */
export function getOrigin(curve: gs.IConic): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Gets the type of a conic curve
 * @param curve Conic curve to obtain type
 * @returns Number describing type of conic curve (0-Circle, 1-Ellipse, 2-Hyperbola, 3-Parabola)
 */
export function getType(curve: gs.IConic): number {
    throw new Error("Method not implemented");
}

/**
 * Gets the x and y vectors of a conic curve
 * @param curve Conic curve to obtain vectors from
 * @returns List of x and y vectors of a conic curve
 */
export function getVectors(curve: gs.IConic): number[] {
    throw new Error("Method not implemented");
}

/**
 * Checks if conic curve is closed
 * @param curve Conic curve to test 
 * @returns True if conic curve is closed
 */
export function isClosed(curve: gs.IConic): boolean {
    throw new Error("Method not implemented");
}

/**
 * Returns length of a conic curve
 * - WEEK 4 -
 * @param curve Conic curve to obtain length from
 * @returns Length of curve
 */
export function length(curve: gs.IConic): number {
    throw new Error("Method not implemented");
}

/**
 * Lofts a list of conic curves with the same number of segments to create a polymesh
 * @param curves List of conic curve to loft (in order)
 * @param close Closes polymesh by lofting back to first curve if true
 * @returns Polymesh created from loft
 */
export function loft(curves: gs.IConic[], close: boolean=false): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Revolves a conic curve about a specified axis ray (or line?) to create a polymesh
 * @param curve Conic curve to revolve
 * @param axis Axis ray (or line?) to revolve about
 * @param ang_s Start angle of revolution in degrees
 * @param ang_e End angle of revolution in degrees
 * @returns Polymesh created from revolution
 */
export function revolve(curve: gs.IConic, axis: gs.IRay, ang_s: number, ang_e: number): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Sets the polyline to be open or cosed.
 * @param curve Conic curve to close 
 * @param is_closed The value to set
 */
export function setIsClosed(curve: gs.IConic, is_closed: boolean): void {
    throw new Error("Method not implemented");
}

/**
 * Changes number of segments a conic curve is divided into
 * - WEEK 4 -
 * @param curve Conic curve to change
 * @param segs New number of segments 
 * @returns Conic curve with updated segments
 */
export function setNumSegs(curve: gs.IConic, segs: number): gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Sweeps a conic curve along a specified polyline (or conic curve?) to create a polymesh
 * @param curve Conic curve to sweep
 * @param rail Rail polyline (or conic curve?) to sweep along
 * @returns Polymesh created from sweep
 */
export function sweep(curve: gs.IConic, rail: gs.IPline): gs.IPolymesh {
    throw new Error("Method not implemented");
}