import * as gs from "gs-json";

//  ===============================================================================================================
//  Split Functions ===============================================================================================
//  ===============================================================================================================

//- WEEK 2 -
/**
 * Splits 2 intersecting co-planar conic curves at their intersection points
 * @param curve_1 Conic curve 1
 * @param curve_2 Conic curve 2
 * @returns List of new conic curves if successful, none if unsuccessful or on error
            ([[List of curves from curve_1],[List of curves from curve_2]])
 */
export function conicConic2D(curve_1: gs.IConic, curve_2: gs.IConic): [gs.IConic[],gs.IConic[]] {
    throw new Error("Method not implemented");
}

/**
 * Splits a conic curve using an intersecting plane at their intersection points
 * @param curve Conic curve
 * @param plane Plane
 * @returns List of new conic curves if successful, none if unsuccessful or on error
 */
export function conicPlane(curve: gs.IConic, plane: gs.IPlane): gs.IConic[] {
    throw new Error("Method not implemented");
}

/**
 * Splits a coplanar conic curve and polyline at their intersection points
 * @param curve Conic curve
 * @param pline Polyline
 * @returns List of new conic curves and polylines if successful, none if unsuccessful or on error
            ([[List of curves from curve],[List of polylines from pline]])
 */
export function conicPline2D(curve: gs.IConic, pline: gs.IPolyline): [gs.IConic[],gs.IPolyline[]] {
    throw new Error("Method not implemented");
}

/**
 * Splits a conic curve and a polymesh at their intersection points and/or intersecting edges
 * @param curve Conic curve
 * @param pmesh Polymesh
 * @returns List of new conic curves and polymeshes if successful, none if unsuccessful or on error
 */
export function conicPmesh(curve: gs.IConic, pmesh: gs.IPolymesh): [gs.IConic[],gs.IPolymesh[]] {
    throw new Error("Method not implemented");
}

/**
 * Splits 2 coplanar intersecting polylines at their intersection points
 * @param pline_1 Polyline 1
 * @param pline_2 Polyline 2
 * @returns List of new polylines if successful, none if unsuccessful or on error
            ([[List of polylines from pline_1],[List of polylines from pline_2]])
 */
export function plinePline2D(pline_1: gs.IPolyline, pline_2: gs.IPolyline): [gs.IPolyline[],gs.IPolyline[]] {
    throw new Error("Method not implemented");
}

/**
 * Splits a polyline using an intersecting plane at their intersection points
 * @param pline Polyline
 * @param plane Plane
 * @returns List of new polylines if successful, none if unsuccessful or on error
 */
export function plinePlane(pline: gs.IPolyline, plane: gs.IPlane): gs.IPolyline[] {
    throw new Error("Method not implemented");
}

/**
 * Splits a polyline and a polymesh at their intersection points and/or intersecting edges
 * @param pline Polyline
 * @param pmesh Polymesh
 * @returns List of new polylines and polymeshes if successful, none if unsuccessful or on error
 */
export function plinePmesh(pline: gs.IPolyline, pmesh: gs.IPolymesh): [gs.IPolyline[],gs.IPolymesh[]] {
    throw new Error("Method not implemented");
}

/**
 * Splits 2 intersecting polymeshes along their intersecting edges
 * @param pmesh_1 Polymesh 1
 * @param pmesh_2 Polymesh 2
 * @returns List of new polymeshes if successful, none if unsuccessful or on error
            ([[List of polymeshes from pmesh_1],[List of polymeshes from pmesh_2]])
 */
export function pmeshPmesh(pmesh_1: gs.IPolymesh, pmesh_2: gs.IPolymesh): [gs.IPolymesh[],gs.IPolymesh[]] {
    throw new Error("Method not implemented");
}

/**
 * Splits a polymesh using an intersecting plane along their intersecting edges
 * @param pmesh Polymesh
 * @param plane Plane
 * @returns List of new polylines if successful, none if unsuccessful or on error
 */
export function pmeshPlane(pmesh: gs.IPolymesh, plane: gs.IPlane): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}