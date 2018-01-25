"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.getAll = getAll;
exports.getAllEnts = getAllEnts;
exports.getAllTopos = getAllTopos;
exports.Create = Create;
exports.del = del;
exports.getName = getName;
exports.setName = setName;
exports.getEntValue = getEntValue;
exports.setEntValue = setEntValue;
exports.getTopoValue = getTopoValue;
exports.setTopoValue = setTopoValue;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Attributes are properties assigned to each object.
                                                                                                                                                                                                     */


//  ===============================================================================================================
//  Attrib Get ====================================================================================================
//  ===============================================================================================================
/**
 * Gets attribute that apply for a specified geometry type from a model
 * @param model Model to get attribute from
 * @param name The attribute name
 * @param geom_type Type of geometry to get attribute from
 * @returns List of attributes
 */
function Get(model, name, geom_type) {
    switch (geom_type) {
        case gs.EGeomType.points:
        case gs.EGeomType.objs:
            return model.getEntAttrib(name, geom_type);
        default:
            return model.getTopoAttrib(name, geom_type);
    }
}
/**
 * Gets all entity attribs
 * @param model Model to get attribute from
 * @returns List of attributes
 */
function getAll(model) {
    return [].concat(_toConsumableArray(model.getAllEntAttribs()), _toConsumableArray(model.getAllTopoAttribs()));
}
/**
 * Gets all entity attribs
 * @param model Model to get attribute from
 * @returns List of attributes
 */
function getAllEnts(model) {
    return model.getAllEntAttribs();
}
/**
 * Gets all topo attribs
 * @param model Model to get attribute from
 * @returns List of attributes
 */
function getAllTopos(model) {
    return model.getAllTopoAttribs();
}
//  ===============================================================================================================
//  Attrib Constructors ===========================================================================================
//  ===============================================================================================================
/**
 * Adds an attribute to a model
 * @param model Model to add to
 * @param name Name of new attribute
 * @param geom_type Type of geometry to add to
 * @param geom_type Data type for attribute values. (number, string, boolean, number[], string[], boolean[])
 * @returns New attribute
 */
function Create(model, name, geom_type, data_type) {
    switch (geom_type) {
        case gs.EGeomType.points:
        case gs.EGeomType.objs:
            return model.addEntAttrib(name, geom_type, data_type);
        default:
            return model.addTopoAttrib(name, geom_type, data_type);
    }
}
//  ===============================================================================================================
//  Attrib Functions ==============================================================================================
//  ===============================================================================================================
/**
 * Deletes an attribute
 * @param attrib Attribute to delete
 * @returns True if successful
 */
function del(attrib) {
    return attrib.getModel().delAttrib(attrib);
}
/**
 * Gets the name of an attribute
 * @param attrib Attribute to get name of
 * @returns Name of specified attribute
 */
function getName(attrib) {
    return attrib.getName();
}
/**
 * Sets the name of an attribute
 * @param attrib Attribute to set name
 * @param name New name of attribute
 * @returns Old name of specified attribute
 */
function setName(attrib, name) {
    return attrib.setName(name);
}
// TODO - see if these set and get methods can be combined
/**
 * Gets the value of a ent attribute for a specified geometry
 * @param attrib Attribute
 * @param ent Geometry
 * @returns Value of attribute
 */
function getEntValue(attrib, ent) {
    return ent.getAttribValue(attrib);
}
/**
 * Sets the value of a ent attribute for a specified geometry
 * @param attrib Attribute
 * @param ent Geometry
 * @param value New value of attribute
 * @returns Old value of specified attribute
 */
function setEntValue(attrib, ent, value) {
    return ent.setAttribValue(attrib, value);
}
/**
 * Gets the value of a topo attribute for a specified geometry
 * @param attrib Attribute
 * @param topo Geometry
 * @returns Value of attribute
 */
function getTopoValue(attrib, topo) {
    return topo.getAttribValue(attrib);
}
/**
 * Sets the value of a topo attribute for a specified geometry
 * @param attrib Attribute
 * @param topo Geometry
 * @param value New value of attribute
 * @returns Old value of specified attribute
 */
function setTopoValue(attrib, topo, value) {
    return topo.setAttribValue(attrib, value);
}
//# sourceMappingURL=attrib.js.map