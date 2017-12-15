import * as gs from "gs-json";

/**
 * Adds a line to the model
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
 * http://verbnurbs.com/docs/geom/Line/
 * @param m Model
 * @param start Start point of line
 * @param end End point of line
 * @returns Polyline object
 */
export function AddLine(m: gs.IModel, start: gs.IPoint, end: gs.IPoint): gs.IPolyline {
    throw new Error("Method not implemented");
}

/**
 * Adds a polyline to the model
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
 * http://verbnurbs.com/docs/geom/Line/
 * @param m Model
 * @param points An array of points.
 * @returns Polyline object
 */
export function AddPolyline(m: gs.IModel, points: gs.IPoint[]): gs.IPolyline {
    throw new Error("Method not implemented");
}

/**
 * Returns an elliptical polyline.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddEllipse
 * http://verbnurbs.com/docs/geom/Circle/
 * @param m Model.
 * @param plane Plane on which the elliptical polyline will lie. //TODO
 * @param radiusX Radius in X-axis direction.
 * @param radiusY Radius in Y-axis direction.
 * @param segments Number of segments in ellipes.
 * @returns The elliptical polyline object.
 */
export function AddPolyEllipse(m: gs.IModel, plane: string, radiusX: number, radiusY: number,
                               segments: number ): gs.IPolyline {
    throw new Error("Method not implemented");
}

/**
 * Returns length of a polyline object
 * @param m Model
 * @param polyline Polyline object.
 * @param segment_index Polyline segment index.
 * @param sub_domain List of two numbers identifying the subdomain of the curve to calculate.
 * Ascending order. If omitted, entire polyline length is used. (optional, omit?)
 * @returns Length of polyline as number if successful, none if unsuccessful or on error
 */
export function PolylineLength(m: gs.IModel, polyline: gs.IPolyline, segment_index: number,
                               sub_domain: [number,number] ) {
    throw new Error("Method not implemented");
}

/**
 * Divide polyline into specified number of segments (not sure if applicable?)
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-DivideCurve
 * http://verbnurbs.com/docs/geom/NurbsCurve/#dividebyequalarclength
 * @param m Model
 * @param polyline Polyline object
 * @param segments Number of segments
 * @param return_points Returns list of 3D division points if true. Returns list of parameters if false.
 * @returns Returns list of 3D division points if 'returns_points' is true.
 * Returns list of parameters if 'returns_points' false. None if unsuccessful or on error
 */
export function DivideCurve(m: gs.IModel, polyline: gs.IPolyline, segments: number,
                            return_points: boolean=true ) {
    throw new Error("Method not implemented");
}

/**
 * Creates an interpolated polyline object (not sure if applicable?)
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddInterpCurve
 * http://verbnurbs.com/docs/geom/NurbsCurve/#bypoints
 * @param m Model
 * @param points List of points to interpolate
 * @returns New polyline object if successful, none if unsuccessful or on error
 */
export function AddInterpPolyline(m: gs.IModel, points: [gs.IPoint, gs.IPoint]): gs.IPolyline {
    throw new Error("Method not implemented");
}

/**
 * Extends a non-closed polyline by specified distance
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
 * @param m Model
 * @param curve Polyline object
 * @param extrusion_type 0 = line, 1 = smooth, 2 = arc (not sure if applicable?)
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @returns New polyline object if successful, none if unsuccessful or on error
 */
export function ExtendPolylineLength(m: gs.IModel, polyline: gs.IPolyline,
                                     extrusion_type: number, extrusion_side: number): gs.IPolyline {
    throw new Error("Method not implemented");
}

/**
 * Evaluate a point on a polyline
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
 * http://verbnurbs.com/docs/geom/ICurve/#point
 * @param m Model
 * @param polyline Polyline object
 * @param t Parameter to evaluate
 * @returns 3D point if successful, none if unsuccessful or on error
 */
export function EvaluatePolyline(m: gs.IModel, polyline: gs.IPolyline, t: number): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Finds closest point on polyline to test point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveClosestPoint
 * http://verbnurbs.com/docs/geom/NurbsSurface/#closestparam
 * @param m Model
 * @param polyline Polyline object
 * @param point Test point
 * @returns Param on polyline if successful, none if unsuccessful or on error
 */
export function PolylineClosestPoint(m: gs.IModel, polyline: gs.IPolyline, point: gs.IPoint) {
    throw new Error("Method not implemented");
}
