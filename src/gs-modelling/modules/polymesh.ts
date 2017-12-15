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

/**
 * Performs a boolean difference operation on two 2D input polymeshes on a plane.
 * http://www.angusj.com/delphi/clipper.php
 * @param m Model
 * @param input0 Polymesh to subtract from.
 * @param input1 Polymesh to subtract.
 * @param plane Plane on which input polymeshes lie.
 * @param delete__input Deletes all input objects if true.
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function BooleanDifference2D(m: gs.IModel, input0: gs.IPolymesh, input1: gs.IPolymesh,
                             plane: string, delete_input: boolean=true ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a polymesh by lofting polylines.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddLoftSrf
 * http://verbnurbs.com/docs/eval/Make/#loftedsurface
 * @param m Model
 * @param objs List of polylines to loft
 * @param closed Closes the loft back to the first polyline if true. (optional)
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function AddLoftPolymesh(m: gs.IModel, objs: [ gs.IPolyline, gs.IPolyline],
                         closed: boolean=false ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a polymesh from 3 or 4 corner points.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddSrfPt
 * @param m Model
 * @param points List of 3 or 4 corner points
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function AddPolymeshPt(m: gs.IModel, points: [ gs.IPoint, gs.IPoint, gs.IPoint,
                                              gs.IPoint ]): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a pipe surface along a input polyline.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPipe
 * @param m Model
 * @param polyline Rail polyline
 * @param radius List of radius values
 * @param cap Caps end with a flat surface if true.
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function AddPipe(m: gs.IModel, polyline: gs.IPolyline, radius: [number, number],
                 cap: boolean=false ): gs.IPolymesh {
    throw new Error("Method not implemented");
}
