import * as gs from "gs-json";

//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================

// - WEEK 2 -
/**
 * Gets a polymesh from the model based on an index number
 * @param model Model to get polymesh from
 * @param index Index number of polymesh
 * @returns Polymesh object if successful
 */
export function _GetFromModel(model: gs.IModel, index: number): gs.IPolymesh {
    throw new Error("Method not implemented");
}

// - WEEK 5 -
/**
 * Creates a polymesh from 3 or 4 corner points
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddSrfPt
 *
 * List of points assumed to be in order
 * @param points List of 3 or 4 corner points
 * @returns New polymesh with a single face if successful, null if unsuccessful or on error
 */
function _FromPoints(points: gs.IPoint[][]): gs.IPolymesh {
    //if( points.length >= 5) {throw new Error("Select 4 corner points maximum");}
    //return m.getGeom().addPolymesh(points);
    throw new Error("Method not implemented");
    }

// - WEEK 2 -
/**
 * Creates one or more polygons from planar polylines
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPlanarSrf
 * http://verbnurbs.com/docs/geom/ISurface/ (?)
 *
 * If a closed polyline is specified, it is used as the edge of the polygon<br/>
 * If multiple open polylines are specified, their intersections are found and if the resulting segments form
 * a closed polyline, the resulting closed polyline is used as the edge of the polygon<br/>
 * Returns null if closed polylines are not planar, or if polylines specified are not coplanar<br/>
 * Returns null if polylines specified do not intersect to form a closed polyline
 * @param plines List of polylines to create planar polygon from
 * @returns List of polygons created if successful, null if unsuccessful or on error
 */

function _FromPline(plines: gs.IPolyline[] ): gs.IPolymesh[] {
    //return m.getGeom().addPolyline(polyline.getPointsArr(), false);
    throw new Error("Method not implemented");
}

/**
 * Creates a closed box polymesh on a plane
 *
 * Box will be constructed with its top and bottom faces parallel to the plane specified, with the origin as
 * its volume centroid and its sides parallel to the x and y axis of the plane.
 * @param plane Plane to construct box on
 * @param length_x Length in x-direction
 * @param length_y Length in y-direction
 * @param length_z Length in z-direction
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function _BoxFromPlane(plane: gs.IPlane, length_x: number, length_y: number, length_z: number ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

// - Assignment 1 -
/**
 * Creates a piped polymesh along a input polyline
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#surface-AddPipe
 *
 * Pipe constructed will have a circular cross section with the specified radius, angled to be perpendicular
 * to the input polyline throughout its length
 * @param polyline Rail polyline
 * @param radius List of radius values
 * @param cap Caps end with a flat surface if true
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function _PipeFromPline(polyline: gs.IPolyline, radius: [number, number], cap: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Creates a rectangular polygon on a plane
 *
 * Rectangular polygon with be constructed parallel to the specified plane, with the origin as the area
 * centroid of the rectangle and its edges parallel to the x and y axis
 * @param plane Plane to construct rectangle on. Origin will be center of the rectangle
 * @param length_x Length in x-direction
 * @param length_y Length in y-direction
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function _RectFromPlane(plane: gs.IPlane, length_x: number, length_y: number ): gs.IPolymesh {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Pmesh Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Calculates total surface area of a polymesh
 *
 * Each face is considered only once (does not take into account front and back of faces)
 * @param pmesh Polymesh object
 * @returns Total surface area of polymesh if successful
 */
export function _area(pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if the polymesh is closed
 * @param pmesh Polymesh object
 * @returns True if the polymesh is closed
 */
export function _isClosed(pmesh: gs.IPolymesh): number {
    //return pmesh.isClosed();
    throw new Error("Method not implemented");
}

/**
 * Explodes a polymesh into individual polygons
 *
 * Each polygonal face in the polymesh is returned as a separate polymesh object
 * @param pmesh Polymesh to explode
 * @param copy Perfroms transformation on duplicate copy of input polymesh
 * @returns List of new polymeshes created from explode
 */
export function _explode(pmesh: gs.IPolymesh, copy: boolean): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}

/**
 * Extracts a list of polygons from a polymesh
 *
 * Specified polygonal faces are removed from the polymesh and returned as individual polymesh objects<br/>
 * The remainder of the polymesh is rejoined as much as possible and returned as one polymesh if still intact,
 * or multiple polymeshes if they have been broken up<br/>
 * List returned is in order (from face 0 of orginal input pline)
 * @param pmesh Polymesh to extract segments from
 * @param polygon_index Index numbers of polygons to extract
 * @param return_remainder Returns polymeshes created from the remainder of the polymesh if true, returns only
 *                         specified segments if false
 * @param copy Perfroms transformation on duplicate copy of input polymesh
 * @returns List of new polymeshes created from extract
 */
export function _extract(pmesh: gs.IPolymesh, polygon_index: number[], return_remainder: boolean,
                        copy: boolean): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}

// http://docs.autodesk.com/3DSMAX/15/ENU/3ds-Max-Help/images/GUID-72B1FF18-945C-4788-813B-E8FCC491F36C-low.png
/**
 * Offsets a polymesh along its normal by a specified distance
 *
 * Each face is moved by specified distance in the direction of its normal and rejoined (extended or
 * trimmed to fit) to create a new surface
 * @param pmesh Polymesh object
 * @param distance Distance to offset polymesh
 * @param copy Perfroms transformation on duplicate copy of input polymesh
 * @returns New offset polymesh if successful
 */
export function _offset(pmesh: gs.IPolymesh, distance: number, copy: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Calculates perimeter of a polymesh
 * @param pmesh Polymesh object
 * @returns Perimeter of polymesh if successful
 */
export function _perimeter(pmesh: gs.IPolymesh): boolean {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Thickens a polymesh by extruding it along its normal in both the positive and negative directions
 *
 * Polymesh is offset by dist_1 in the positive direction along its normal and dist_2 in the negative
 * direction<br/>
 * Four-sided polygons are created using the bounding vertices (along the perimeter) of the two resulting
 * polymeshes and all polymeshes are joined to create a new closed polymesh
 * @param pmesh Polymesh to thicken
 * @param dist_1 Distance to thicken in positive direction
 * @param dist_2 Distance to thicken in negative direction
 * @returns List of new polymeshes created from extract
 */
export function _thicken(pmesh: gs.IPolymesh, dist_1: number, dist_2: number): gs.IPolymesh[] {
    throw new Error("Method not implemented");
}

/**
 * Weld a list of polymeshes together
 *
 * Joins polymeshes together and returns a single polymesh<br/>
 * Returns null if polymeshes do not intersect or touch
 * @param pmeshes List of polymeshes to weld
 * @param is_closed Creates a closed polymesh object if true
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
export function _weld(pmeshes: gs.IPolymesh[], is_closed: boolean): gs.IPolymesh {
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
function _Extrude(m: gs.IModel, polymesh: gs.IPolymesh, polyline: gs.IPolyline, cap: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/*
 * Performs a boolean difference operation on two 2D input polymeshes on a plane.
 * http://www.angusj.com/delphi/clipper.php
 * @param m Model
 * @param input0 Polymesh to subtract from.
 * @param input1 Polymesh to subtract.
 * @param plane Plane on which input polymeshes lie.
 * @param delete__input Deletes all input objects if true.
 * @returns New polymesh if successful, null if unsuccessful or on error
 */
function _BooleanDifference2D(m: gs.IModel, input0: gs.IPolymesh, input1: gs.IPolymesh,
                             plane: gs.IPlane, delete_input: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}
