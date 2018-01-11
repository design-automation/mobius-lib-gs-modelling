/**
 * Objects are a type of entity. They consist of conics, polylines, polymeshes, planes and rays.
 *
 * Objects are formed by a combination of topologies. More information can be found on the page for topo.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Object Get ====================================================================================================
//  ===============================================================================================================

/**
 * Gets an object from the model
 * @param model Model to get object from
 * @param id ID of object to get
 * @returns An object if successful, null if unsuccessful or on error
 */
export function Get(model: gs.IModel, id: number): gs.IObj {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null; }
    switch (obj.getObjType()) {
        case gs.EObjType.ray:
            return obj as gs.IRay;
        case gs.EObjType.ray:
            return obj as gs.IPlane;
        case gs.EObjType.ray:
            return obj as gs.ICircle;
        case gs.EObjType.ray:
            return obj as gs.IEllipse;
        case gs.EObjType.ray:
            return obj as gs.IPolyline;
        case gs.EObjType.ray:
            return obj as gs.IPolymesh;
    }
}

//  ===============================================================================================================
//  Object Constructors ===========================================================================================
//  ===============================================================================================================


//  ===============================================================================================================
//  Object Functions ==============================================================================================
//  ===============================================================================================================



