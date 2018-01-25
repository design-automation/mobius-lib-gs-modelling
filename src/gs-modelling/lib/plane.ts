/**
 * Planes are a type of object.
 *
 * Planes are imaginary flat surfaces that stretch infinitely along an x and y axis and are defined by two
 * perpendicular vectors.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";

//  ===============================================================================================================
//  Plane Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a plane from the model based on an index number
 * @param model Model to get polyline from
 * @param id Index number of polyline
 * @returns Plane object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IPlane {
    // check args
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.plane) {
        throw new Error("Object is not a plane. Object type is: " + obj.getObjType());
    }
    // return the plane
    return obj as gs.IPlane;
}

/**
 * Create a copy of a plane.
 *
 * @param plane The plane to copy.
 * @returns A new plane.
 */
export function Copy(plane: gs.IPlane, copy_attribs?: boolean): gs.IPlane {
    // check args
    if (!plane.exists()) {throw new Error("plane has been deleted.");}
    // copy and return
    return plane.copy(copy_attribs) as gs.IPlane;
}

//  ===============================================================================================================
//  Plane Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a plane from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Direction vector describing x-axis of plane
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function FromOriginVectors(origin: gs.IPoint, vec_x: gs.XYZ, vec_y: gs.XYZ): gs.IPlane {
    // check args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    // create the new plane
    return origin.getGeom().addPlane(origin, vec_x, vec_y);
}

/**
 * Creates a plane from an origin point and the World x and y axis
 *
 * Creates a plane parallel to the World XY plane
 * @param origin 3D point to use as origin of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function FromOriginWCS(origin: gs.IPoint): gs.IPlane {
    // check args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    // create the new plane
    return origin.getGeom().addPlane(origin, [1,0,0],[0,1,0]);
}

/**
 * Creates a plane from an origin point and two points describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param pt_x Point that lies on x-axis of plane
 * @param pt_y Point that lies on y-axis of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function FromOriginPoints(origin: gs.IPoint, point_on_x: gs.IPoint, point_on_y: gs.IPoint ):
                                gs.IPlane {
    // check the args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    if (!point_on_x.exists()) {throw new Error("Arg point_on_x has been deleted.");}
    if (!point_on_y.exists()) {throw new Error("Arg point_on_y has been deleted.");}
    const model: gs.IModel = origin.getModel();
    if(point_on_x.getModel() !== model) { throw new Error("Points need to be in the same model");}
    if(point_on_y.getModel() !== model) { throw new Error("Points need to be in the same model");}
    // create the plane
    const vec_x: gs.XYZ = threex.vectorFromPointsAtoB(origin, point_on_x).toArray() as gs.XYZ;
    const vec_y: gs.XYZ = threex.vectorFromPointsAtoB(origin, point_on_y).toArray() as gs.XYZ;
    const plane: gs.IPlane = model.getGeom().addPlane(origin, vec_x, vec_y);
    // return the new plane
    return plane;
}

//  ===============================================================================================================
//  Plane Functions ===============================================================================================
//  ===============================================================================================================

/**
 *
 */


