"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Copy = Copy;
exports.getAttribs = getAttribs;
exports.getGroups = getGroups;
exports.removeFromAllGroups = removeFromAllGroups;
exports.move = move;

var _three = require("three");

var three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Functions for manipulating entities. Entities are points and objects.
                                                                                                                                                                                                     */


//  ===============================================================================================================
//  Geom Constructors =============================================================================================
//  ===============================================================================================================
/**
 * Create a copy of an entity.
 *
 * @param entity Geometry
 * @returns Copy
 */
function Copy(entity) {
    // check args
    if (!entity.exists()) {
        throw new Error("entity has been deleted.");
    }
    // copy and return
    return entity.copy();
}
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
function getAttribs(entity) {
    // check args
    if (!entity.exists()) {
        throw new Error("Entity has been deleted.");
    }
    // get attribs for this attrib
    return entity.getAttribs();
}
/**
 * Gets groups that contain specified geometry
 *
 * Returns null if specified geometry is not found in any groups
 * @param entity Geometry
 * @returns List of groups that contain specified geometry if successful, null if unsuccessful or on error
 */
function getGroups(entity) {
    // check args
    if (!entity.exists()) {
        throw new Error("Entity has been deleted.");
    }
    // get groups for this entity
    return entity.getGroups();
}
/**
 * Removes geometry from all groups that contain it
 * @param entity Geometry
 * @returns True if successful
 */
function removeFromAllGroups(entity) {
    // check args
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
function move(entity, translation, copy) {
    if (!entity.exists()) {
        throw new Error("Entity has been deleted.");
    }
    if (copy) {
        // TODO
    }
    var matrix = new three.Matrix4();
    matrix.setPosition(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(translation))))());
    entity.xform(matrix);
    return entity;
}
//# sourceMappingURL=entity.js.map