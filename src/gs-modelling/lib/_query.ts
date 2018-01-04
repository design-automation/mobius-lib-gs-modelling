import * as gs from "gs-json";

//  ===============================================================================================================
//  Query Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Checks entity for its type and returns it as its corresponding type
 *
 * Entity that describes a point will be returned as IPoint (etc.)
 * @param ent Entity to check and cast
 * @returns Entity as its corresponding type
 */
export function _cast(geom: gs.IEnt): any {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a polyline
 *
 * Checks if the distance between point and polyline is less than the tolerance of 0.1
 * @param point Point to check
 * @param pline Polyline to check
 * @returns True if point lies on polyline
 */
export function _pointIsOnPline(point: gs.IPoint, pline: gs.IPolyline): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a conic curve
 *
 * Checks if the distance between point and conic curve is less than the tolerance of 0.1
 * @param point Point to check
 * @param curve Conic curve to check
 * @returns True if point lies on conic curve
 */
export function _pointIsOnConic(point: gs.IPoint, curve: gs.IConicCurve): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a polymesh
 *
 * Checks if the distance between point and polymesh is less than the tolerance of 0.1
 * @param point Point to check
 * @param pmesh Polymesh to check
 * @returns True if point lies on polymesh
 */
export function _pointIsOnPmesh(point: gs.IPoint, pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a ray
 *
 * Checks if the distance between point and ray is less than the tolerance of 0.1
 * @param point Point to check
 * @param ray Ray to check
 * @returns True if point lies on ray
 */
export function _pointIsOnRay(point: gs.IPoint, ray: gs.IRay): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a plane
 *
 * Checks if the distance between point and plane is less than the tolerance of 0.1
 * @param point Point to check
 * @param plane Plane to check
 * @returns True if point lies on plane
 */
export function _pointIsOnPlane(point: gs.IPoint, plane: gs.IPlane): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies in a closed polymesh
 *
 * Checks if the point is within the space enclosed by the faces of the closed polymesh
 * @param point Point to check
 * @param pmesh Polymesh to check
 * @returns True if point lies in polymesh
 */
export function _pointIsInPmesh(point: gs.IPoint, pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}
