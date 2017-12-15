import * as gs from "../../libs/gs-json/utils/gs-json";
import * as arr from "../../libs/gs-json/utils/arr";

// http://verbnurbs.com/
// http://verbnurbs.com/docs/geom/NurbsCurve/

/**
 * Returns an elliptical curve.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddEllipse
 * http://verbnurbs.com/docs/geom/Circle/
 * @param m Model
 * @param plane Plane on which the circle will lie.
 * @param radiusX Radius in X-axis direction
 * @param radiusY Radius in Y-axis direction (in THREE.js, Y is vertical for some reason,
 * not sure how that would affect?)
 * @returns New curve object
 */
export function AddEllipse(m: gs.IModel, plane: string, radiusX: number, radiusY: number ): gs.INurbsCurve {
    throw new Error("Method not implemented");
}

/**
 * Returns midpoint of a curve object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveMidPoint
 * http://verbnurbs.com/docs/eval/Tess/#midpoint
 * @param m Model
 * @param curve Curve object
 * @param segment_index Curve segment index if 'curve_id' identifies a polycurve (optional, omit?)
 * @returns 3D point of midpoint of curve if successful, none if unsuccessful or on error
 */
export function CurveMidPoint(m: gs.IModel, curve: gs.INurbsCurve, segment_index: number ) {
    throw new Error("Method not implemented");
}

/**
 * Returns length of a curve object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveLength
 * http://verbnurbs.com/docs/geom/NurbsCurve/#length
 * @param m Model
 * @param curve Curve object
 * @param segment_index Curve segment index if 'curve_id' identifies a polycurve (optional, omit?)
 * @param sub_domain List of two numbers identifying the subdomain of the curve to calculate.
 * Ascending order. If omitted, entire curve length is used. (optional, omit?)
 * @returns Length of curve as number if successful, none if unsuccessful or on error
 */
export function CurveLength(m: gs.IModel, curve: gs.INurbsCurve, segment_index: number,
                            sub_domain: [number,number] ) {
    throw new Error("Method not implemented");
}

/**
 * Divide curve into specified number of segments
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-DivideCurve
 * http://verbnurbs.com/docs/geom/NurbsCurve/#dividebyequalarclength
 * @param m Model
 * @param curve Curve object
 * @param segments Number of segments
 * @param return_points Returns list of 3D division points if true. Returns list of parameters if false.
 * @returns Returns list of 3D division points if 'returns_points' is true. 
 Returns list of parameters if 'returns_points' false. None if unsuccessful or on error
 */
export function DivideCurve(m: gs.IModel, curve: gs.INurbsCurve, segments: number,
                            return_points: boolean=true ) {
    throw new Error("Method not implemented");
}

/**
 * Creates an interpolated curve object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddInterpCurve
 * http://verbnurbs.com/docs/geom/NurbsCurve/#bypoints
 * @param m Model
 * @param points List of points to interpolate
 * @returns New curve object if successful, none if unsuccessful or on error
 */
export function AddInterpCurve(m: gs.IModel, points: [gs.IPoint, gs.IPoint]): gs.INurbsCurve {
    throw new Error("Method not implemented");
}

/**
 * Extends a non-closed curve by specified distance
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
 * @param m Model
 * @param curve Curve object
 * @param extrusion_type 0 = line, 1 = smooth, 2 = arc
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @returns New curve object if successful, none if unsuccessful or on error
 */
export function ExtendCurveLength(m: gs.IModel, curve: gs.INurbsCurve, extrusion_type: number,
                            extrusion_side: number,  ): gs.INurbsCurve {
    throw new Error("Method not implemented");
}

/**
 * Evaluate a point on a curve
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
 * http://verbnurbs.com/docs/geom/ICurve/#point
 * @param m Model
 * @param curve Curve object
 * @param t Parameter to evaluate
 * @returns 3D point if successful, none if unsuccessful or on error
 */
export function EvaluateCurve(m: gs.IModel, curve: gs.INurbsCurve, t: number): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Finds closest point on curve to test point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveClosestPoint
 * http://verbnurbs.com/docs/geom/NurbsSurface/#closestparam
 * @param m Model
 * @param curve Curve object
 * @param point Test point
 * @returns Param on curve if successful, none if unsuccessful or on error
 */
export function CurveClosestPoint(m: gs.IModel, curve: gs.INurbsCurve, point: gs.IPoint) {
    throw new Error("Method not implemented");
}
