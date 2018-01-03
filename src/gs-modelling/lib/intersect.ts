import * as gs from "gs-json";

//  ===============================================================================================================
//  Intersect Functions ===========================================================================================
//  ===============================================================================================================

/**
 * Returns the intersection points of two intersecting co-planar conic curves
 * @param curve_1 Conic curve 1
 * @param curve_2 Conic curve 2
 * @returns List of intersection points successful, null if unsuccessful or on error
 */
export function conicConic2D(curve_1: gs.IConicCurve, curve_2: gs.IConicCurve): gs.IPoint[] {
    throw new Error("Method not implemented");
}

//- WEEK 3 -
/**
 * Returns the intersection points and/or intersecting edges of a conic curve and an intersecting plane
 * @param curve Conic curve
 * @param plane Plane
 * @returns List of intersection points and/or intersecting edges if successful,
            null if unsuccessful or on error
 */
export function conicPlane(curve: gs.IConicCurve, plane: gs.IPlane): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points of a co-planar conic curve and polyline
 * @param curve Conic curve
 * @param pline Polyline
 * @returns List of intersection points if successful, null if unsuccessful or on error
 */
export function conicPline2D(curve: gs.IConicCurve, pline: gs.IPolyline): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges of a conic curve and a polymesh
 * @param curve Conic curve
 * @param pmesh Polymesh
 * @returns List of intersection points and/or intersecting edges if successful,
            null if unsuccessful or on error
 */
export function conicPmesh(curve: gs.IConicCurve, pmesh: gs.IPolymesh): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points of a conic curve and a ray
 * @param curve Conic curve
 * @param ray Ray
 * @returns List of intersection points if successful, null if unsuccessful or on error
 */
export function conicRay(curve: gs.IConicCurve, ray: gs.IRay): gs.IPoint[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges of two intersecting co-planar polylines
 * @param pline_1 Polyline 1
 * @param pline_2 Polyline 2
 * @returns List of intersection points and/or intersecting edges if successful,
            null if unsuccessful or on error
 */
export function plinePline2D(pline_1: gs.IPolyline, pline_2: gs.IPolyline): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges of two intersecting polylines
 * @param pline_1 Polyline 1
 * @param pline_2 Polyline 2
 * @returns List of intersection points and/or intersecting edges if successful,
            null if unsuccessful or on error
 */
export function plinePline(pline_1: gs.IPolyline, pline_2: gs.IPolyline): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges of a polyline and an intersecting plane
 * @param pline Polyline
 * @param plane Plane
 * @returns List of intersection points and/or intersecting edges if successful,
            null if unsuccessful or on error
 */
export function plinePlane(pline: gs.IPolyline, plane: gs.IPlane): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges of a polyline and a polymesh
 * @param pline Polyline
 * @param pmesh Polymesh
 * @returns List of intersection points and/or intersecting edges if successful,
            null if unsuccessful or on error
 */
export function plinePmesh(pline: gs.IPolyline, pmesh: gs.IPolymesh): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points of a polyline and a ray
 * @param pline Polyline
 * @param ray Ray
 * @returns List of intersection points if successful, null if unsuccessful or on error
 */
export function plineRay(pline: gs.IPolyline, ray: gs.IRay): gs.IPoint[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges and/or overlapping polymeshes of two intersecting
   polymeshes
 * @param pmesh_1 Polymesh 1
 * @param pmesh_2 Polymesh 2
 * @returns List of intersection points and/or intersecting edges and/or overlapping polymeshes if successful,
            null if unsuccessful or on error
 */
export function pmeshPmesh(pmesh_1: gs.IPolymesh, pmesh_2: gs.IPolymesh): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges and/or overlapping polymeshes of a polymesh and
   an intersecting plane
 * @param pmesh Polymesh
 * @param plane Plane
 * @returns List of intersection points and/or intersecting edges and/or overlapping polymeshes if successful,
            null if unsuccessful or on error
 */
export function pmeshPlane(pmesh: gs.IPolymesh, plane: gs.IPlane): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection points and/or intersecting edges of a polymesh and a ray
 * @param pmesh Polymesh
 * @param ray Ray
 * @returns List of intersection points and/or intersecting edges if successful,
            null if unsuccessful or on error
 */
export function pmeshRay(pmesh: gs.IPolymesh, ray: gs.IRay): gs.IGeom[] {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersecting edge of two intersecting planes
 * @param plane_1 Plane
 * @param plane_2 Plane
 * @returns Intersecting edge as a ray if successful, null if unsuccessful or on error
 */
export function planePlane(plane_1: gs.IPlane, plane_2: gs.IPlane): gs.IRay {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection point of a non-coplanar plane and ray
 * @param plane Plane
 * @param ray Ray
 * @returns Intersection point if successful, null if unsuccessful or on error
 */
export function planeRay(plane: gs.IPlane, ray: gs.IRay): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Returns the intersection point 2 intersecting rays
 * @param ray_1 Ray 1
 * @param ray_2 Ray 1
 * @returns Intersection point if successful, null if unsuccessful or on error
 */
export function rayRay(ray_1: gs.IRay, ray_2: gs.IRay): gs.IPoint {
    throw new Error("Method not implemented");
}
