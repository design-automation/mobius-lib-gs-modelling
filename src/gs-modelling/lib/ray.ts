/**
 * Rays are a type of object.
 *
 * Rays are imaginary lines that stretch infinitely along an axis and are defined by a single vector.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Ray Get =======================================================================================================
//  ===============================================================================================================

/**
 * Gets a ray from the model based on an index number
 * @param model Model to get ray from
 * @param id Index number of ray
 * @returns Ray object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IRay {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.ray) {
        throw new Error("Object is not a ray. Object type is: " + obj.getObjType());
    }
    return obj as gs.IRay;
}

//  ===============================================================================================================
//  Ray Constructors ==============================================================================================
//  ===============================================================================================================

/**
 * Creates a ray from an origin point and one direction vector describing its direction
 * @param origin 3D point to use as origin of plane
 * @param vector Direction vector describing direction of ray
 * @returns New ray if successful, null if unsuccessful or on error
 */
export function FromOriginVector(origin: gs.IPoint, vector: gs.XYZ): gs.IRay {
    return origin.getGeom().addRay(origin, vector);
}

//  ===============================================================================================================
//  Ray Functions =================================================================================================
//  ===============================================================================================================
