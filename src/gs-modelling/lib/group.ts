import * as gs from "gs-json";

//  ===============================================================================================================
//  Group Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Adds a group to a model
 * @param model Model to add to
 * @param name Name of new group
 * @returns New group
 */
export function Add(model: gs.IModel, name: string ): gs.IGroup {
    throw new Error("Method not implemented");
}

/**
 * Gets groups from a model
 * @param model Model to get group from
 * @returns List of groups
 */
export function GetFromModel(model: gs.IModel): gs.IGroup[] {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Group Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Add geometry to a group
 *
 * Returns null if geometry is already present in group
 * @param group Group to add to
 * @param geom Geometry to add
 * @returns True if successful, null if unsuccessful or on error
 */
export function addGeom(group: gs.IGroup, geom: gs.IGeom): boolean {
    throw new Error("Method not implemented");
}

/**
 * Checks if a group contains a specified geometry
 * @param group Group to check
 * @param geom Geometry to check
 * @returns True if group contains geometry, false if group does not contain geometry
 */
export function contains(group: gs.IGroup, geom: gs.IGeom): boolean {
    /* Old Implementation for one group (using obj)
    if(obj === undefined) {return false;}
    if(obj.getID() === undefined) {throw new Error("Undefined object");}
    return group.hasObj(obj.getID());
    */

    /* Old Implementation for multiple groups (using obj)
    if(obj === undefined) {return false;}
    if(obj.getID() === undefined) {throw new Error("Undefined object");}
    const objGps: boolean = true ;
    for(const group of groups) {
    if(!(objGps === true)) {return false;}
        objGps === group.hasObj(obj.getID()); // TODO ???
    }
    return true;
    */

    throw new Error("Method not implemented");
}

/**
 * Deletes a group
 * @param group Group to delete
 * @param deleteGeom Deletes geometry contained in group if true
 * @returns True if successful
 */
export function del(group: gs.IGroup, deleteGeom: boolean): boolean {
    throw new Error("Method not implemented");
}

/**
 * Gets the name of a group
 * @param group Group
 * @returns Name of specified group
 */
export function getName(group: gs.IGroup): string {
    throw new Error("Method not implemented");
}

/**
 * Gets the parent group of a group
 *
 * Returns null if specified group does not have a parent group
 * @param group Group
 * @returns Parent group of specified group if successful, null if unsuccessful or on error
 */
export function getParent(group: gs.IGroup): gs.IGroup {
    throw new Error("Method not implemented");
}

/**
 * Remove geometry from a group
 *
 * Returns null if specified geometry cannot be found in specified group
 * @param group Group
 * @param geom Geometry to remove
 * @returns True if successful, null if unsuccessfull or on error
 */
export function removeGeom(group: gs.IGroup, geom: gs.IGeom): boolean {
    throw new Error("Method not implemented");
}

/**
 * Sets the name of a group
 * @param group Group
 * @param name New name of group
 * @returns Old name of specified group
 */
export function setName(group: gs.IGroup, name: string ): string {
    throw new Error("Method not implemented");
}

/**
 * Sets the parent group of a group
 * @param group Group
 * @param parent New parent group
 * @returns True if successful
 */
export function setParent(group: gs.IGroup, parent: gs.IGroup): gs.IGroup {
    throw new Error("Method not implemented");
}
