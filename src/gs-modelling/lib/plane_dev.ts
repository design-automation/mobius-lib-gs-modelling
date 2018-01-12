import * as gs from "gs-json";
import * as three from "three";

//  ===============================================================================================================
//  Plane Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a plane from an origin point and two points describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param pt_x Point that lies on x-axis of plane
 * @param pt_y Point that lies on y-axis of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function _FromOriginPoints(origin: gs.IPoint, pt_x: gs.IPoint, pt_y: gs.IPoint ):
                                gs.IPlane {
    throw new Error("Method not implemented");
}

// - WEEK 3 -
/**
 * Creates a plane from an origin point and the World x and y axis
 *
 * Creates a plane parallel to the World XY plane
 * @param origin 3D point to use as origin of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function _FromOriginWCS(origin: gs.IPoint): gs.IPlane {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Old Functions No Longer in API ================================================================================
//  ===============================================================================================================

/**
 * Creates a plane from an origin point and normal direction vector
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneFromNormal
 * @param m Model
 * @param origin 3D point to use as origin of plane
 * @param normal 3D vector to define normal direction of plane
 * @param xaxis Vector to use define x-axis of plane (optional)
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function _AddPlane(m: gs.IModel, origin: gs.IPoint, normal: [number, number, number]): gs.IPlane {
     const e3: three.Vector3 = new three.Vector3(...normal).normalize();
     const e1: three.Vector3 = new three.Vector3(-e3.y,e3.x,0).normalize();
     const e2: three.Vector3 = e3.cross(e1);
     return m.getGeom().addPlane(origin, e1.toArray() as gs.XYZ, e2.toArray() as gs.XYZ);
 }

/**
 * Returns intersections between an infinite plane and a curve/polyline object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneCurveIntersection
 * @param m Model
 * @param plane Plane to intersect
 * @param polyline Polyline to intersect
 * @returns List of intersection information if successful, null if unsuccessful or on error.
 * [0] = type of intersection. 1 = point, 2 = overlap
 * [1] = intersection point if [0] = 1, list of intersection start point and end point if [0] = 2
 */
export function _PlanePolylineIntersection(m: gs.IModel, plane: gs.IPlane, polyline: gs.IPolyline): void {
    throw new Error("Method not implemented");
}
