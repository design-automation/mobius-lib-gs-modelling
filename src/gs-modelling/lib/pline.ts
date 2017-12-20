import * as gs from "gs-json";
import * as utils from "./utils";

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a polyline to the model
 * @param m Model to add to.
 * @param points A list of points.
 * @returns Polyline object
 */
export function add(m: gs.IModel, points: gs.IPoint[], is_closed: boolean): gs.IPolyline {
    return m.getGeom().addPolyline(points, is_closed);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a line to the model
 * @param m Model to add to.
 * @param start Start point of line
 * @param end End point of line
 * @returns Polyline object, consisting of a single segment.
 */
export function addLine(m: gs.IModel, start: gs.IPoint, end: gs.IPoint): gs.IPolyline {
    return m.getGeom().addPolyline([start, end], false);
}

//  http://verbnurbs.com/docs/geom/Circle/
/**
 * Returns an circular closed polyline.
 * @param m Model to add to.
 * @param plane Plane on which the elliptical polyline will lie.
 * @param radius Circle radius.
 * @param segments Number of segments in ellipes.
 * @returns The circular closed polyline object.
 */
export function addCircle(m: gs.IModel, plane: gs.IPlane, rad: number, segs: number):
                          gs.IPolyline {
    const angle: number = (Math.PI * 2) / segs;
    let xyz_list: number[][] = [];
    for (let i = 0; i < segs; i++) {
        xyz_list.push([rad * Math.cos(angle), rad * Math.sin(angle), 0]);
    }
    xyz_list = utils.transfromXYZfromGlobal(xyz_list, plane.getOrigin(), plane.getVectors());
    return m.getGeom().addPolyline(m.getGeom().addPoints(xyz_list), true);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddEllipse
/**
 * Returns an eliptical closed polyline.
 * @param m Model to add to.
 * @param plane Plane on which the elliptical polyline will lie.
 * @param radiusX Radius in X-axis direction.
 * @param radiusY Radius in Y-axis direction.
 * @param segments Number of segments in ellipes.
 * @returns The elliptical polyline object.
 */
export function addEllipse(m: gs.IModel, plane: gs.IPlane, rad_x: number, rad_y: number,
                           segs: number): gs.IPolyline {
    const angle: number = (Math.PI * 2) / segs;
    let xyz_list: number[][] = [];
    for (let i = 0; i < segs; i++) {
        xyz_list.push([rad_x * Math.cos(angle), rad_y * Math.sin(angle), 0]);
    }
    xyz_list = utils.transfromXYZfromGlobal(xyz_list, plane.getOrigin(), plane.getVectors());
    return m.getGeom().addPolyline(m.getGeom().addPoints(xyz_list), true);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
/**
 * Extends a non-closed polyline by specified distance
 * @param pline Polyline object
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @returns New polyline object if successful, none if unsuccessful or on error
 */
export function extend(pline: gs.IPolyline, extrusion_side: number, length: number): void {
    const points: gs.IPoint[] = pline.getPointsArr();
    switch (extrusion_side) {
        case 0: case 2:
            let pos0: number[] = utils.extendLine(
                points[1].getPosition(), points[0].getPosition(), length);
            points[0].setPosition(pos0);
            break;
        case 1: case 2:
            const num_points: number = points.length;
            let pos1: number[] = utils.extendLine(
                points[num_points - 2].getPosition(), points[num_points - 1].getPosition(), length);
            points[num_points - 1].setPosition(pos1);
            break;
    }
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
//  http://verbnurbs.com/docs/geom/ICurve/#point
/**
 * Evaluate a point on a polyline
 * @param pline Polyline object
 * @param t Parameter to evaluate
 * @returns 3D point if successful, none if unsuccessful or on error
 */
export function evaluate(pline: gs.IPolyline, t: number): gs.IPoint {
    throw new Error("Method not implemented");
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveClosestPoint
//  http://verbnurbs.com/docs/geom/NurbsSurface/#closestparam
/**
 * Finds closest point on polyline to test point
 * @param m Model
 * @param pline Polyline object
 * @param point Test point
 * @returns Param on polyline if successful, none if unsuccessful or on error
 */
export function closestPoint(pline: gs.IPolyline, point: gs.IPoint): gs.IPoint {
    throw new Error("Method not implemented");
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-DivideCurve
//  http://verbnurbs.com/docs/geom/NurbsCurve/#dividebyequalarclength
/**
 * Divide polyline into specified number of segments.
 * @param m Model to add to.
 * @param pline Polyline object
 * @param segs Number of segments
 */
export function divide(pline: gs.IPolyline, segs: number): void {
    throw new Error("Method not implemented");
}

// TODO
// isClosed(pline: gs.IPolyline)
// setIsClosed(pline,: gs.IPolyline, is_closed: boolean = true)
