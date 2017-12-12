import * as gs from "../../libs/gs-json/utils/gs-json";
import * as arr from "../../libs/gs-json/utils/arr";

/**
 * Creates one or more polygons from planar polylines.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPlanarSrf
 * http://verbnurbs.com/docs/geom/ISurface/ (?)
 * @param m Model
 * @param objs List of polylines to create planar polygon from
 * @returns List of polygons created if successful, none if unsuccessful or on error
 */

function AddPlanarPolymesh(m: gs.IModel, objs: gs.IPolyline ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a polymesh by extruding a polymesh along a path polyline.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-ExtrudeSurface
 * @param m Model
 * @param polymesh Polymesh to extrude.
 * @param polyline Polyline to extrude along.
 * @param cap Extrusion capped at both ends if true. Open if false.
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function ExtrudePolymesh(m: gs.IModel, polymesh: gs.IPolymesh, polyline: gs.IPolyline,
                         cap: boolean=true ): gs.IPolymesh {
    throw new Error("Method not implemented");
}
