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
 * @returns An object. Null if object does not exist.
 */
export function Get(model: gs.IModel, id: number): gs.IObj {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null; }
    switch (obj.getObjType()) {
        case gs.EObjType.ray:
            return obj as gs.IRay;
        case gs.EObjType.plane:
            return obj as gs.IPlane;
        case gs.EObjType.circle:
            return obj as gs.ICircle;
        case gs.EObjType.ellipse:
            return obj as gs.IEllipse;
        case gs.EObjType.polyline:
            return obj as gs.IPolyline;
        case gs.EObjType.polymesh:
            return obj as gs.IPolymesh;
        default:
            throw new Error("Object type not found: " + obj.getObjType());
    }
}

/**
 * Gets a list of objects from the model.
 * @param model Model to get objects from.
 * @param ids A list of object IDs.
 * @returns A list of objects.
 */
export function Gets(model: gs.IModel, ids: number[]): gs.IObj[] {
    let objs: gs.IObj[] = [];
    for (const id of ids) {
        const obj: gs.IObj = Get(model, id);
        if (obj !== null) {objs.push(obj);}
    }
    return objs;
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
 * @param keep_unused_points If true, points that are not used in any other obejcts will be deleted.
 * @returns True if successful
 */
export function del(objs: gs.IObj | gs.IObj[], keep_unused_points: boolean): boolean {
    if (Array.isArray(objs)) {
        let result = false;
        for (const obj of objs) {
            if (obj.exists()) {
                const geom: gs.IGeom = obj.getGeom();
                const obj_result: boolean = geom.delObj(obj, keep_unused_points);
                if (obj_result) {result = true;}
            }
        }
        return result;
    } else { // a single entity
        if (!objs.exists()) {return false;}
        const geom: gs.IGeom = objs.getGeom();
        return geom.delObj(objs, keep_unused_points);
    }
}

