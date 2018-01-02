import * as gs from "gs-json";

//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================

//- WEEK 2 -
/**
 * Gets a polymesh from the model based on an index number
 * @param model Model to get polymesh from
 * @param index Index number of polymesh
 * @returns Polymesh object if successful
 */
export function getFromModel(model: gs.IModel, index: number): gs.IPolymesh {
    throw new Error("Method not implemented");
}

//- WEEK 5 -
/**
 * Creates a polymesh from 3 or 4 corner points.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddSrfPt
 * @param points List of 3 or 4 corner points
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function fromPoints(points: gs.IPoint[][]): gs.IPolymesh {
    //if( points.length >= 5) {throw new Error("Select 4 corner points maximum");}
    //return m.getGeom().addPolymesh(points);
    throw new Error("Method not implemented");
    }

//- WEEK 2 -
/**
 * Creates one or more polygons from planar polylines.
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPlanarSrf
 * http://verbnurbs.com/docs/geom/ISurface/ (?)
 * @param plines List of polylines to create planar polygon from
 * @returns List of polygons created if successful, null if unsuccessful or on error
 */

function fromPline(plines: gs.IPolyline[] ): gs.IPolymesh {
    //return m.getGeom().addPolyline(polyline.getPointsArr(), false);
    throw new Error("Method not implemented");
}

/**
 * Creates a closed box polymesh on a plane
 * @param plane Plane to construct box on. Origin will be center of the box
 * @param length_x Length in x-direction
 * @param length_y Length in y-direction
 * @param length_z Length in z-direction
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function boxFromPlane(plane: gs.IPlane, length_x: number, length_y: number, length_z: number ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

// - WEEK 2/3/6 -
/**
 * Creates a piped polymesh along a input polyline
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPipe
 * @param polyline Rail polyline
 * @param radius List of radius values
 * @param cap Caps end with a flat surface if true.
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function pipeFromPline(polyline: gs.IPolyline, radius: [number, number], cap: boolean=false ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a rectangular polygon on a plane
 * @param plane Plane to construct rectangle on. Origin will be center of the rectangle
 * @param length_x Length in x-direction
 * @param length_y Length in y-direction
 * @returns New polymesh if successful, null if unsuccessful or on error
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
 * Explodes a polymesh into individual polygons
 * @param pmesh Polymesh to explode
 * @param copy Perfroms transformation on duplicate copy of input polymesh
 * @returns List of new polymeshes created from explode
 */
export function explode(pmesh: gs.IPolymesh, copy: boolean): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}

/**
 * Extracts a list of polygons from a polymesh
 * @param pmesh Polymesh to extract segments from
 * @param polygon_index Index numbers of polygons to extract
 * @param copy Perfroms transformation on duplicate copy of input polymesh
 * @returns List of new polymeshes created from extract
 */
export function extract(pmesh: gs.IPolymesh, polygon_index: number[], copy: boolean): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}

/**
 * Offsets a polymesh along its normal by a specified distance
 * @param pmesh Polymesh object
 * @param distance Distance to offset polymesh
 * @param copy Perfroms transformation on duplicate copy of input polymesh
 * @returns New offset polymesh if successful
 */
export function offset(pmesh: gs.IPolymesh, distance: number, copy: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
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
 * Thickens a polymesh by extruding it along its normal in both the positive and negative directions
 * @param pmesh Polymesh to thicken
 * @param dist_1 Distance to thicken in positive direction
 * @param dist_2 Distance to thicken in negative direction
 * @returns List of new polymeshes created from extract
 */
export function thicken(pmesh: gs.IPolymesh, dist_1: number, dist_2: number): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}

/**
 * Weld a list of polymeshes together
 * @param pmeshes List of polymeshes to weld
 * @param is_closed Creates a closed polymesh object if true
 * @returns New polymesh created from weld
 */
export function weld(pmeshes: gs.IPolymesh[], is_closed: boolean): gs.IPolymesh {
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
 * @returns New polymesh if successful, null if unsuccessful or on error
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
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function BooleanDifference2D(m: gs.IModel, input0: gs.IPolymesh, input1: gs.IPolymesh,
                             plane: gs.IPlane, delete_input: boolean=true ): gs.IPolymesh {
    throw new Error("Method not implemented");
}
