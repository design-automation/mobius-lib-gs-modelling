import * as gs from "gs-json";
import * as three from "three";

/**
 * Creates a plane from an origin point and normal direction vector
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneFromNormal
 * @param m Model
 * @param origin 3D point to use as origin of plane
 * @param normal 3D vector to define normal direction of plane
 * @param xaxis Vector to use define x-axis of plane (optional)
 * @returns New plane if successful, none if unsuccessful or on error
 */
export function AddPlane(m: gs.IModel, origin: gs.IPoint, normal: [number, number, number]): gs.IPlane {
    const e3: three.Vector3 = new three.Vector3(...normal).normalize();
    const e1: three.Vector3 = new three.Vector3(-e3.y,e3.x,0).normalize();
    const e2: three.Vector3 = e3.cross(e1);
    const x_axis_point: gs.IPoint = m.getGeom().addPoint(e1.toArray());
    const y_axis_point: gs.IPoint = m.getGeom().addPoint(e2.toArray());
    return m.getGeom().addPlane(origin, x_axis_point, y_axis_point);
}

/**
 * Returns intersections between an infinite plane and a curve/polyline object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneCurveIntersection
 * @param m Model
 * @param plane Plane to intersect
 * @param polyline Polyline to intersect
 * @returns List of intersection information if successful, none if unsuccessful or on error.
 * [0] = type of intersection. 1 = point, 2 = overlap
 * [1] = intersection point if [0] = 1, list of intersection start point and end point if [0] = 2
 */
export function PlanePolylineIntersection(m: gs.IModel, plane: gs.IPlane, polyline: gs.IPolyline): void {
    throw new Error("Method not implemented");
}
