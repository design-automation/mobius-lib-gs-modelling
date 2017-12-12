import * as gs from "../../libs/gs-json/utils/gs-json";
import * as arr from "../../libs/gs-json/utils/arr";

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
