/**
 * Functions for manipulating entities. Entities are points and objects.
 */

import * as gs from "gs-json";
import * as three from "three";

//  ===============================================================================================================
//  Geom Constructors =============================================================================================
//  ===============================================================================================================

//  ===============================================================================================================
//  Geom Functions ================================================================================================
//  ===============================================================================================================

/**
 * Gets attributes of specified geometry
 *
 * Returns null if specified geometry does not have any attributes
 * @param entity Geometry
 * @returns List of attributes of specified geometry if successful, null if unsuccessful or on error
 */
export function getAttribs(entity: gs.IPoint | gs.IObj): gs.IAttrib[] {
    if (!entity.exists()) {throw new Error("Entity has been deleted.");}
    return entity.getAttribs();
}

/**
 * Gets groups that contain specified geometry
 *
 * Returns null if specified geometry is not found in any groups
 * @param entity Geometry
 * @returns List of groups that contain specified geometry if successful, null if unsuccessful or on error
 */
export function getGroups(entity: gs.IPoint | gs.IObj): gs.IGroup[] {
    if (!entity.exists()) {throw new Error("Entity has been deleted.");}
    return entity.getGroups();
}

/**
 * Removes geometry from all groups that contain it
 * @param entity Geometry
 * @returns True if successful
 */
export function removeFromAllGroups(entity: gs.IPoint | gs.IObj): boolean {
    throw new Error("method not implemented.");
}

//  ===============================================================================================================
//  Geom Transformation Functions =================================================================================
//  ===============================================================================================================

/**
 * Moves geometry or a list of geometry.
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to move
 * @param translation Translation vector
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Geometry in new location if successful
 */
export function move(entity: gs.IPoint | gs.IObj, translation: number[], copy: boolean): gs.IPoint | gs.IObj {
    if (!entity.exists()) {throw new Error("Entity has been deleted.");}
    if (copy) {
        // TODO
    }
    const matrix: three.Matrix4 = new three.Matrix4();
    matrix.setPosition(new three.Vector3(...translation));
    entity.xform(matrix);
    return entity;
}
