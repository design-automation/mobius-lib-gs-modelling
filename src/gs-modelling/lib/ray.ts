/**
 * Rays are a type of object.
 *
 * Rays are imaginary lines that stretch infinitely along an axis and are defined by a single vector.
 */

/**
 *
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Ray Constructors ==============================================================================================
//  ===============================================================================================================



/**
 * Creates a ray from an origin point and one direction vector describing its direction
 * @param origin 3D point to use as origin of plane
 * @param vector Direction vector describing direction of ray
 * @returns New ray if successful, null if unsuccessful or on error
 */
export function FromOriginVector(origin: gs.IPoint, vector: number[]): gs.IRay {
    return origin.getGeom().addRay(origin, vector);
}


//  ===============================================================================================================
//  Ray Functions =================================================================================================
//  ===============================================================================================================



