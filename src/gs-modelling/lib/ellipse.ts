/**
 * TO BE COMPLETED
 */

import * as gs from "gs-json";
import {Txyz} from "./types_dev";

//  ===============================================================================================================
//  Ellipse Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a ellipse from the model based on an index number
 * @param model Model to get ellipse from
 * @param id Index number of ellipse
 * @returns Ellipse object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IEllipse {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.ellipse) {
        throw new Error("Object is not a ellipse. Object type is: " + obj.getObjType());
    }
    return obj as gs.IEllipse;
}

//  ===============================================================================================================
//  Ellipse Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a ellipse from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the x radius
 * @param vec_y Vector describing y-axis of plane, and the y radius
 * @returns New ellipse if successful, null if unsuccessful or on error
 */
export function FromOriginVectors(origin: gs.IPoint,
                                  vec_x: Txyz, vec_y: Txyz, angles: [number, number]): gs.IEllipse {
    return origin.getGeom().addEllipse(origin, vec_x, vec_y, angles);
}

//  ===============================================================================================================
//  Ellipse Functions ===============================================================================================
//  ===============================================================================================================
