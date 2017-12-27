import * as gs from "gs-json";

//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Gets a polymesh from the model based on an index number
 * - WEEK 2 -
 * @param model Model to get polymesh from
 * @param index Index number of polymesh
 * @returns Polymesh object if successful
 */
export function getFromModel(model: gs.IModel, index: number): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a polymesh from 3 or 4 corner points.
 * - WEEK 5 -
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddSrfPt
 * @param m Model
 * @param points List of 3 or 4 corner points
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function fromPoints(m: gs.IModel, points: gs.IPoint[][]): gs.IPolymesh {
    if( points.length >= 5) {throw new Error("Select 4 corner points maximum");}
    return m.getGeom().addPolymesh(points);
    }

/**
 * Creates one or more polygons from planar polylines.
 * - WEEK 2 -
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPlanarSrf
 * http://verbnurbs.com/docs/geom/ISurface/ (?)
 * @param m Model
 * @param objs List of polylines to create planar polygon from
 * @returns List of polygons created if successful, none if unsuccessful or on error
 */

function fromPolyline(m: gs.IModel, polyline: gs.IPolyline ): gs.IPolymesh {
    return m.getGeom().addPolyline(polyline.getPointsArr(), false);
}

/**
 * Creates a closed box polymesh on a plane
 * @param plane Plane to construct box on. Origin will be center of the box
 * @param length_x Length in x-direction
 * @param length_y Length in y-direction
 * @param length_z Length in z-direction
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function boxFromPlane(plane: gs.IPlane, length_x: number, length_y: number, length_z: number ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a piped polymesh along a input polyline
 * - WEEK 2/3/6 -
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPipe
 * @param m Model
 * @param polyline Rail polyline
 * @param radius List of radius values
 * @param cap Caps end with a flat surface if true.
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function pipeFromPline(polyline: gs.IPolyline, radius: [number, number], cap: boolean=false ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a rectangular polygon on a plane
 * @param plane Plane to construct rectangle on. Origin will be center of the rectangle
 * @param length_x Length in x-direction
 * @param length_y Length in y-direction
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function rectFromPlane(plane: gs.IPlane, length_x: number, length_y: number ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Pmesh Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Calculates total surface area of a polymesh
 * @param pmesh Polymesh object
 * @returns Total surface area of polymesh if successful
 */
export function area(pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if the polymesh is closed
 * @param pmesh Polymesh object
 * @returns True if the polymesh is closed
 */
export function isCLosed(pmesh: gs.IPolymesh): number {
    return pmesh.isClosed();
}

/**
 * Calculates perimeter of a polymesh
 * @param pmesh Polymesh object
 * @returns Perimeter of polymesh if successful
 */
export function perimeter(pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}

/**
 * Unwelds a polygon from a polymesh
 * @param pmesh Polymesh to unweld polygon from
 * @param polygon_index Index number of polygon to unweld
 * @returns New polymeshes created from unweld
 */
export function unweld(pmesh: gs.IPolymesh, polygon_index: number): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}

/**
 * Weld a list of polylines together
 * @param plines List of polyline to weld
 * @param is_closed Creates a closed polyline object if true
 * @returns New polyline created from weld
 */
export function weld(plines: gs.IPolyline[], is_closed: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Old Functions No Longer in API ================================================================================
//  ===============================================================================================================

/**
 * Creates a polymesh by extruding a polymesh along a path polyline.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-ExtrudeSurface
 * @param m Model
 * @param polymesh Polymesh to extrude.
 * @param polyline Polyline to extrude along.
 * @param cap Extrusion capped at both ends if true. Open if false.
 * @returns New polymesh if successful, none if unsuccessful or on error
 */
function Extrude(m: gs.IModel, polymesh: gs.IPolymesh, polyline: gs.IPolyline, cap: boolean=true ): gs.IPolymesh {
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
                             plane: gs.IPlane, delete_input: boolean=true ): gs.IPolymesh {
    throw new Error("Method not implemented");
}