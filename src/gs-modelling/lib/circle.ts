/**
 * Conic curves are a type of object. They consist of circles, ellipses, hyperbolas, parabolas and arcs.
 *
 * Conic curves are represented by a point and a set of vectors.
 */

import * as gs from "gs-json";
import {Txyz} from "./types_dev";

//  ===============================================================================================================
//  Circle Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a circle from the model based on an index number
 * @param model Model to get circle from
 * @param id Index number of circle
 * @returns Circle object if successful
 */
export function Get(model: gs.IModel, id: number): gs.ICircle {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.circle) {
        throw new Error("Object is not a circle. Object type is: " + obj.getObjType());
    }
    return obj as gs.ICircle;
}

//  ===============================================================================================================
//  Circle Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a circle from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the radius
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New circle if successful, null if unsuccessful or on error
 */
export function FromOriginVectors(origin: gs.IPoint,
                                  vec_x: Txyz, vec_y: Txyz, angles: [number, number]): gs.ICircle {
    return origin.getGeom().addCircle(origin, vec_x, vec_y, angles);
}

//  ===============================================================================================================
//  Circle Functions ===============================================================================================
//  ===============================================================================================================

