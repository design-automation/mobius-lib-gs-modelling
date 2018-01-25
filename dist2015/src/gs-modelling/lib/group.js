"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.GetAll = GetAll;
exports.Create = Create;
exports.contains = contains;
exports.del = del;
exports.getName = getName;
exports.getParent = getParent;
exports.setName = setName;
exports.setParent = setParent;
exports.addGeom = addGeom;
exports.removeGeom = removeGeom;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Group Get =====================================================================================================
//  ===============================================================================================================
/**
 * Gets groups from a model
 * @param model Model to get group from
 * @returns List of groups
 */
function Get(model, name) {
    return model.getGroup(name);
}
/**
 * Gets groups from a model
 * @param model Model to get group from
 * @returns List of groups
 */
/**
 * Groups are collections of geometry. This includes objects, points, and topos.
 */
function GetAll(model) {
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
function Create(model, name) {
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
function contains(group, geom) {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.hasPoint(geom);
        case gs.EGeomType.objs:
            return group.hasObj(geom);
        default:
            return group.hasTopo(geom);
    }
}
/**
 * Deletes a group
 * @param group Group to delete
 * @param deleteGeom Deletes geometry contained in group if true
 * @returns True if successful
 */
function del(group, deleteGeom) {
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
function getName(group) {
    return group.getName();
}
/**
 * Gets the parent group of a group
 *
 * Returns null if specified group does not have a parent group
 * @param group Group
 * @returns Parent group of specified group if successful, null if unsuccessful or on error
 */
function getParent(group) {
    return group.getParentGroup();
}
/**
 * Sets the name of a group
 * @param group Group
 * @param name New name of group
 * @returns Old name of specified group
 */
function setName(group, name) {
    return group.setName(name);
}
/**
 * Sets the parent group of a group
 * @param group Group
 * @param parent New parent group
 * @returns The old parent.
 */
function setParent(group, parent) {
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
function addGeom(group, geom) {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.addPoint(geom);
        case gs.EGeomType.objs:
            return group.addObj(geom);
        default:
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
function removeGeom(group, geom) {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.removePoint(geom);
        case gs.EGeomType.objs:
            return group.removeObj(geom);
        default:
    }
}
//# sourceMappingURL=group.js.map