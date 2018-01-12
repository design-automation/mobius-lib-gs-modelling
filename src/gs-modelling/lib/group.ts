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
 * @param model Model to add to
 * @param name Name of new group
 * @returns New group
 */
export function Create(model: gs.IModel, name: string ): gs.IGroup {
    return model.addGroup(name);
}

//  ===============================================================================================================
//  Group Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Checks if a group contains a specified geometry
 * @param group Group to check
 * @param geom Geometry to check
 * @returns True if group contains geometry, false if group does not contain geometry
 */
export function contains(group: gs.IGroup, geom: gs.IEnt | gs.ITopo): boolean {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.hasPoint(geom as gs.IPoint);
        case gs.EGeomType.objs:
            return group.hasObj(geom as gs.IObj);
        default:
            return group.hasTopo(geom as gs.ITopo);
    }
}

/**
 * Deletes a group
 * @param group Group to delete
 * @param deleteGeom Deletes geometry contained in group if true
 * @returns True if successful
 */
export function del(group: gs.IGroup, deleteGeom: boolean): boolean {
    if (deleteGeom) {
        throw new Error("Method not implemented");
    }
    return group.getModel().delGroup(group);
}

/**
 * Gets the name of a group
 * @param group Group
 * @returns Name of specified group
 */
export function getName(group: gs.IGroup): string {
    return group.getName();
}

/**
 * Gets the parent group of a group
 *
 * Returns null if specified group does not have a parent group
 * @param group Group
 * @returns Parent group of specified group if successful, null if unsuccessful or on error
 */
export function getParent(group: gs.IGroup): gs.IGroup {
    return group.getParentGroup();
}

/**
 * Sets the name of a group
 * @param group Group
 * @param name New name of group
 * @returns Old name of specified group
 */
export function setName(group: gs.IGroup, name: string ): string {
    return group.setName(name);
}

/**
 * Sets the parent group of a group
 * @param group Group
 * @param parent New parent group
 * @returns The old parent.
 */
export function setParent(group: gs.IGroup, parent: gs.IGroup): gs.IGroup {
    return group.setParentGroup(group);
}

/**
 * Add geometry to a group
 *
 * Returns null if objects is already present in group
 * @param group Group to add to
 * @param geom Geometry to add, can be IPoint, IObj, or ITopo
 * @returns True if successful, null if unsuccessful or on error
 */
export function addGeom(group: gs.IGroup, geom: gs.IPoint | gs.IObj | gs.ITopo): boolean {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.addPoint(geom as gs.IPoint);
        case gs.EGeomType.objs:
            return group.addObj(geom as gs.IObj);
        default:
            //return group.addTopo(geom as gs.ITopo); TODO
    }
}

/**
 * Remove geometry from a group
 *
 * Returns null if specified geometry cannot be found in specified group
 * @param group Group
 * @param geom Geometry to remove,  can be IPoint, IObj, or ITopo
 * @returns True if successful, null if unsuccessfull or on error
 */
export function removeGeom(group: gs.IGroup, geom: gs.IPoint | gs.IObj | gs.ITopo): boolean {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.removePoint(geom as gs.IPoint);
        case gs.EGeomType.objs:
            return group.removeObj(geom as gs.IObj);
        default:
            //return group.removeTopo(geom as gs.ITopo); TODO
    }
}
