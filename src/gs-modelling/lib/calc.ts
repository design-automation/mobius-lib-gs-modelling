/**
 * Calcs
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";

//  ===============================================================================================================
//  Pline Get and Copy ============================================================================================
//  ===============================================================================================================

/**
 * Dist
 * @param point1
 * @param point2
 * @returns
 */
export function distBetweenPoints(point1: gs.IPoint, point2: gs.IPoint): number {
    if (!point1.exists()) {throw new Error("point1 has been deleted.");}
    if (!point2.exists()) {throw new Error("point2 has been deleted.");}
    return threex.vectorFromPointsAtoB(point1, point2).length();
}
