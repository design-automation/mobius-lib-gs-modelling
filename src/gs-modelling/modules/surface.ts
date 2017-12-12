/**
*Creates one or more surfaces from planar curves
*@param m Model
*@param object_ids List of curves to create planar surfaces from
*@returns List of ids of surfaces created if successful, none if unsuccessful or on error
http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPlanarSrf
http://verbnurbs.com/docs/geom/ISurface/ (?)
*/
function AddPlanarSrf( m: model, object_ids: [string,...] )

/**
*Creates a surface by extruding a surface along a path curve
*@param m Model
*@param surface Id of surface to extrude
*@param curve Id of path curve to extrude along
*@param cap Extrusion capped at both ends if true. Open if false.
*@returns Id of new surface if successful, none if unsuccessful or on error
http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-ExtrudeSurface
*/
function ExtrudeSurface( m: model, surface: string, curve: string, cap: true )
