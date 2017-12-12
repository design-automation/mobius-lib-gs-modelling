//http://verbnurbs.com/
//http://verbnurbs.com/docs/geom/NurbsCurve/

/**
*Adds a line curve to the model
*@param m Model
*@param start Start point of line
*@param end End point of line
*@returns Id of new curve object
http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
http://verbnurbs.com/docs/geom/Line/
*/
function CurveMidPoint( m: model, curve_id: string, segment_index: number )

/**
*Returns length of a curve object
*@param m Model
*@param plane_or_center Plane on which the circle will lie. If a point is passed, it will be the center of the circle on active construction plane. (center tends to give unpredictable results, omit and only accept plane?)
*@param radiusX Radius in X-axis direction
*@param radiusY Radius in Y-axis direction (in THREE.js, Y is vertical for some reason, not sure how that would affect?)
*@returns Id of new curve object
http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddEllipse
http://verbnurbs.com/docs/geom/Circle/
*/
function AddEllipse( m: model, plane_or_center: string, radiusX: number, radiusY: number )

/**
*Returns midpoint of a curve object
*@param m Model
*@param curve_id Id of curve object
*@param segment_index Curve segment index if 'curve_id' identifies a polycurve (optional, omit?)
*@returns 3D point of midpoint of curve if successful, none if unsuccessful or on error
*http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveMidPoint
*http://verbnurbs.com/docs/eval/Tess/#midpoint
*/
function CurveMidPoint( m: model, curve_id: string, segment_index: number )

/**
*Returns length of a curve object
*@param m Model
*@param curve_id Id of curve object
*@param segment_index Curve segment index if 'curve_id' identifies a polycurve (optional, omit?)
*@param sub_domain List of two numbers identifying the subdomain of the curve to calculate. Ascending order. If omitted, entire curve length is used. (optional, omit?)
*@returns Length of curve as number if successful, none if unsuccessful or on error
*http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveLength
*http://verbnurbs.com/docs/geom/NurbsCurve/#length
*/
function CurveLength( m: model, curve_id: string, segment_index: number, sub_domain: [number,number] )

