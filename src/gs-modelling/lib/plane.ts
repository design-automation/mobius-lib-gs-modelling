/**
 * Planes are a type of object.
 *
 * Planes are imaginary flat surfaces that stretch infinitely along an x and y axis and are defined by two
 * perpendicular vectors.
 */

import * as gs from "gs-json";
import {Txyz} from "./types_dev";

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
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.plane) {
        throw new Error("Object is not a plane. Object type is: " + obj.getObjType());
    }
    return obj as gs.IPlane;
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
export function _FromOriginVectors(origin: gs.IPoint, vec_x: Txyz, vec_y: Txyz): gs.IPlane {
    return origin.getGeom().addPlane(origin, vec_x, vec_y);
}

//  ===============================================================================================================
//  Plane Functions ===============================================================================================
//  ===============================================================================================================

/**
 *
 */


