/**
 * Polymeshes are a type of object.
 *
 * Polymeshes are formed from flat polygons joined to form a continuous surface.
 */

import * as gs from "gs-json";
import {Txyz} from "./types_dev";

//  ===============================================================================================================
//  Pmesh Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a polymesh from the model based on an index number
 * @param model Model to get polymesh from
 * @param id Index number of polymesh
 * @returns Polymesh object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IPolymesh {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null; }
    if (obj.getObjType() !== gs.EObjType.polymesh) {
        throw new Error("Object is not a polymesh. Object type is: " + obj.getObjType());
    }
    return obj as gs.IPolymesh;
}

//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================

//  ===============================================================================================================
//  Pmesh Functions ===============================================================================================
//  ===============================================================================================================
