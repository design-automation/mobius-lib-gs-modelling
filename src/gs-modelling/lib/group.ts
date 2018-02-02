/**
 * Groups are collections of geometry. This includes objects, points, and topos.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Group Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets groups from a model
 * @param model Model to get group from
 * @returns List of groups
 */
export function Get(model: gs.IModel, name: string): gs.IGroup {
    return model.getGroup(name);
}

/**
 * Gets groups from a model
 * @param model Model to get group from
 * @returns List of groups
 */
export function GetAll(model: gs.IModel): gs.IGroup[] {
    return model.getAllGroups();
}

//  ===============================================================================================================
//  Group Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Adds a group to a model
 * @param model Model to add.
 * @param name Name of new group
 * @returns New group
 */
export function Create(model: gs.IModel, name: string): gs.IGroup {
    return model.addGroup(name);
}

/**
 * Adds groups to a model.
 * @param model Models to add.
 * @param name Name of new group
 * @returns New group
 */
export function Creates(model: gs.IModel, names: string[]): gs.IGroup[] {
    return names.map((name) => model.addGroup(name));
}

//  ===============================================================================================================
//  Group Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Deletes a group
 * @param group Group to delete
 * @param delete_geom Deletes geometry contained in group if true
 * @returns True if successful
 */
export function del(model: gs.IModel, group_name: string, delete_geom: boolean): boolean {
    const group: gs.IGroup = model.getGroup(group_name);
    if (delete_geom) {
        model.getGeom().delObjs(group.getObjs(), false);
        model.getGeom().delPoints(group.getPoints());
    }
    return group.getModel().delGroup(group);
}

/**
 * Gets the parent group of a group
 *
 * Returns null if specified group does not have a parent group
 * @param group Group
 * @returns Parent group of specified group if successful, null if unsuccessful or on error
 */
export function getParent(model: gs.IModel, group_name: string): string {
    const group: gs.IGroup = model.getGroup(group_name);
    return group.getParentGroup().getName();
}

/**
 * Sets the parent group of a group
 * @param group Group
 * @param parent New parent group
 * @returns The old parent.
 */
export function setParent(model: gs.IModel, group_name: string, parent_name: string): string {
    const group: gs.IGroup = model.getGroup(group_name);
    const parent: gs.IGroup = model.getGroup(parent_name);
    return group.setParentGroup(group).getName();
}

