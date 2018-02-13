/**
 * Objects are a type of entity. They consist of conics, polylines, polymeshes, planes and rays.
 *
 * Objects are formed by a combination of topologies. More information can be found on the page for topo.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as error from "./_error_msgs_dev";

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
    const obj: gs.IObj = error.checkObjID(model, id);
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
 * @param ids A point ID or list of point IDs, integer numbers. If null, then all objects are returned.
 * @returns A list of objects.
 */
export function Gets(model: gs.IModel, ids?: number | number[]): gs.IObj[] {
    if (ids === undefined || ids === null) {return model.getGeom().getAllObjs();}
    if (!Array.isArray(ids)) {ids = [ids];}
    let objs: gs.IObj[] = [];
    for (const id of ids) {
        const obj: gs.IObj = Get(model, id);
        if (obj !== null) {objs.push(obj);}
    }
    return objs;
}

/**
 * Gets all the objects from a group.
 * @param model Model to get the objects from.
 * @param group_name The group name.
 * @returns List of objects.
 */
export function GetFromGroup(model: gs.IModel, group_name: string): gs.IObj[] {
    const group: gs.IGroup = error.checkGroup(model, group_name);
    return group.getObjs();
}

//  ===============================================================================================================
//  Object Constructors ===========================================================================================
//  ===============================================================================================================

//  ===============================================================================================================
//  Object Functions ==============================================================================================
//  ===============================================================================================================

/**
 * Moves objects.
 *
 * @param entities A single point or object, or a list of points and/or objects.
 * @param vector Translation vector.
 * @param copy If true, entities are copied before being moved.
 * @returns The moved netities.
 */
export function move(objs: gs.IObj | gs.IObj[], vector: gs.XYZ, copy: boolean = false): gs.IObj | gs.IObj[] {
    const is_array: boolean = !Array.isArray(objs);
    if (!Array.isArray(objs)) {objs = [objs];}
    const model: gs.IModel = error.checkObjList(objs, 1);
    error.checkXYZ(vector);
    const matrix: three.Matrix4 = new three.Matrix4();
    matrix.setPosition(new three.Vector3(...vector));
    if (copy) {objs = model.getGeom().copyObjs(objs, true); }
    model.getGeom().xformObjs(objs, matrix);
    if (is_array) {return objs;}
    return objs[0];
}

/**
 * Deletes object or a list of objects from the model.
 *
 * @param objs Object or list of objects to delete.
 * @param keep_points If false, points that are not used in any other objects will be deleted.
 * @returns True if all objects we successfully deleted.
 */
export function del(objs: gs.IObj | gs.IObj[], keep_points: boolean = false): boolean {
    if (!Array.isArray(objs)) {objs = [objs];}
    const model: gs.IModel = error.checkObjList(objs, 1);
    let ok: boolean = true;
    for (const obj of objs) {
        if (!model.getGeom().delObj(obj, keep_points)) {ok = false;}
    }
    return ok;
}

//  ===============================================================================================================
//  Groups ==============================================================================================
//  ===============================================================================================================

/**
 * Add objects to a group.
 *
 * @param group Name of group to add to.
 * @param objs List of objects to add.
 * @returns True if all objects we successfully added.
 */
export function addToGroup(objs: gs.IObj | gs.IObj[], group_name: string): boolean {
    if (!Array.isArray(objs)) {objs = [objs];}
    const model: gs.IModel = error.checkObjList(objs, 1);
    const group: gs.IGroup = error.checkGroup(model, group_name);
    let ok: boolean = true;
    for (const obj of objs) {
        if (!group.addObj(obj as gs.IObj)) {ok = false;}
    }
    return ok;
}

/**
 * Remove object from a group.
 *
 * @param group Name of group to add to.
 * @param objs List of object to remove.
 * @returns True if all objects we successfully removed.
 */
export function removeFromGroup(objs: gs.IObj | gs.IObj[], group_name: string): boolean {
    if (!Array.isArray(objs)) {objs = [objs];}
    const model: gs.IModel = error.checkObjList(objs, 1);
    const group: gs.IGroup = error.checkGroup(model, group_name);
    let ok: boolean = true;
    for (const obj of objs) {
        if (!group.removeObj(obj as gs.IObj)) {ok = false;}
    }
    return ok;
}
