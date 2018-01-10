/**
 * Conic curves are a type of object. They consist of circles, ellipses, hyperbolas, parabolas and arcs.
 *
 * Conic curves are represented by a point and a set of vectors.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Conic Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a plane from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Direction vector describing x-axis of plane
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
export function _FromOriginVectors(origin: gs.IPoint,
                                   vec_x: number[], vec_y: number[], angles: [number, number]): gs.IPlane {
    return origin.getGeom().addCircle(origin, vec_x, vec_y, angles);
}

//  ===============================================================================================================
//  Conic Functions ===============================================================================================
//  ===============================================================================================================

