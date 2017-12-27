import * as gs from "gs-json";

/**
 * Adds an arc to the model based on three points
 * - WEEK 3 -
 * @param pt1 First point on arc
 * @param pt2 Second point on arc
 * @param pt3 Third point on arc
 * @returns New arc if successful, none if unsuccessful or on error
 */
export function arcFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ) gs.IConic {
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
export function arcFromPlane(plane: gs.IPlane, radius: number, ang: number ) gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on three points
 * @param pt1 First point on circle
 * @param pt2 Second point on circle
 * @param pt3 Third point on circle
 * @returns New circle if successful, none if unsuccessful or on error
 */
export function circleFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ) gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on an origin point and radius, using the world XY plane
 * - WEEK 2 -
 * @param origin Center point of circle
 * @param radius Radius of circle  
 * @returns New circle if successful, none if unsuccessful or on error
 */
export function circleFromOrigin(origin: gs.IPoint, radius: number ) gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds a circle to the model based on a plane and radius
 * @param plane Plane to construct circle on. The origin of the plane is the center of the circle
 * @param radius Radius of circle  
 * @returns New circle if successful, none if unsuccessful or on error
 */
export function circleFromPlane(plane: gs.IPlane, radius: number ) gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Adds an ellipse to the model based on a plane and radius
 * @param plane Plane to construct ellipse on. The origin of the plane is the center of the ellipse
 * @param radius_x Radius of ellipse in x-direction 
 * @param radius_y Radius of ellipse in y-direction  
 * @returns New ellipse if successful, none if unsuccessful or on error
 */
export function ellipseFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number ) gs.IConic {
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
							 ang_e: number ) gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Gets a conic curve from an edge
 * @param edge Edge to get curve from
 * @returns New conic curve if successful, none if unsuccessful or on error
 */
export function fromEdge(edge: gs.IEdge ) gs.IConic {
    throw new Error("Method not implemented");
}

/**
 * Gets a conic curve from the model
 * - WEEK 2 -
 * @param m Model to get curve from
 * @param i Index number of conic curve  
 * @returns Conic curve if successful, none if unsuccessful or on error
 */
export function getFromModel(m: gs.IModel, i: number ) gs.IConic {
    throw new Error("Method not implemented");
}