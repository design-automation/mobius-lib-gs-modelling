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
 * @returns Id of new curve object
 */
export function AddEllipse(m: gs.IModel, plane: string, radiusX: number, radiusY: number ): gs.IPolyline {
    throw new Error("Method not implemented");
}

/**
 * Returns midpoint of a curve object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveMidPoint
 * http://verbnurbs.com/docs/eval/Tess/#midpoint
 * @param m Model
 * @param curve_id Id of curve object
 * @param segment_index Curve segment index if 'curve_id' identifies a polycurve (optional, omit?)
 * @returns 3D point of midpoint of curve if successful, none if unsuccessful or on error
 */
export function CurveMidPoint(m: gs.IModel, curve: string, segment_index: number ) {
    throw new Error("Method not implemented");
}

/**
 * Returns length of a curve object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveLength
 * http://verbnurbs.com/docs/geom/NurbsCurve/#length
 * @param m Model
 * @param curve_id Id of curve object
 * @param segment_index Curve segment index if 'curve_id' identifies a polycurve (optional, omit?)
 * @param sub_domain List of two numbers identifying the subdomain of the curve to calculate.
 * Ascending order. If omitted, entire curve length is used. (optional, omit?)
 * @returns Length of curve as number if successful, none if unsuccessful or on error
 */
export function CurveLength(m: gs.IModel, curve_id: string, segment_index: number,
                            sub_domain: [number,number] ) {
    throw new Error("Method not implemented");
}
