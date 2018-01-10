/**
 * Planes are a type of object.
 *
 * Planes are imaginary flat surfaces that stretch infinitely along an x and y axis and are defined by two
 * perpendicular vectors.
 */

/**
 *
 */

import * as gs from "gs-json";

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
export function _FromOriginVectors(origin: gs.IPoint, vec_x: number[], vec_y: number[]): gs.IPlane {
    return origin.getGeom().addPlane(origin, vec_x, vec_y);
}

//  ===============================================================================================================
//  Plane Functions ===============================================================================================
//  ===============================================================================================================

/**
 *
 */


