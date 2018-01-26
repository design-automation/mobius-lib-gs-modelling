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

/**
 * Deletes object or a list of objects from the model.
 *
 * @param objs Object or list of objects to delete.
 * @returns True if successful
 */
export function del(objs: gs.IObj | gs.IObj[], delete_unused_points: boolean): boolean {
    if (Array.isArray(objs)) {
        let result = false;
        for (const obj of objs) {
            if (!obj.exists()) {
                const geom: gs.IGeom = obj.getGeom();
                const obj_result: boolean = geom.delObj(obj, delete_unused_points);
                if (obj_result) {result = true;}
            }
        }
        return result;
    } else { // a single entity
        if (!objs.exists()) {return false;}
        const geom: gs.IGeom = objs.getGeom();
        return geom.delObj(objs, delete_unused_points);
    }
}
