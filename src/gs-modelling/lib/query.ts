import * as gs from "gs-json";

//  ===============================================================================================================
//  Query Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Checks geometry for its type and returns it as its corresponding type
 * @param geom Geometry to check and cast
 * @returns Geometry as its corresponding type
 */
export function cast(geom: gs.IGeom): any {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a polyline
 * @param point Point to check
 * @param pline Polyline to check
 * @returns True if point lies on polyline
 */
export function pointIsOnPline(point: gs.IPoint, pline: gs.IPolyline): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a conic curve
 * @param point Point to check
 * @param curve Conic curve to check
 * @returns True if point lies on conic curve
 */
export function pointIsOnConic(point: gs.IPoint, curve: gs.IConic): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a polymesh
 * @param point Point to check
 * @param pmesh Polymesh to check
 * @returns True if point lies on polymesh
 */
export function pointIsOnPmesh(point: gs.IPoint, pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a ray
 * @param point Point to check
 * @param ray Ray to check
 * @returns True if point lies on ray
 */
export function pointIsOnRay(point: gs.IPoint, ray: gs.IRay): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies on a plane
 * @param point Point to check
 * @param plane Plane to check
 * @returns True if point lies on plane
 */
export function pointIsOnPlane(point: gs.IPoint, plane: gs.IPlane): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a point lies in a closed polymesh
 * @param point Point to check
 * @param pmesh Polymesh to check
 * @returns True if point lies in polymesh
 */
export function pointIsInPmesh(point: gs.IPoint, pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}
