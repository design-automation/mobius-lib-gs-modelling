/**
 * Function for doing various geometric calculations.
 */

/**
 *
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./libs/threex/threex";

//  ===============================================================================================================
//  Pline Get and Copy ============================================================================================
//  ===============================================================================================================

/**
 * Calculate the distance between two points.
 * @param point1 The first point.
 * @param point2 The second point.
 * @returns The distance.
 */
export function distBetweenPoints(point1: gs.IPoint, point2: gs.IPoint): number {
    if (!point1.exists()) {throw new Error("point1 has been deleted.");}
    if (!point2.exists()) {throw new Error("point2 has been deleted.");}
    return threex.vectorFromPointsAtoB(point1, point2).length();
}
