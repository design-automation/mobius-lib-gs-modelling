"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.copyToModel = copyToModel;
exports.copy = copy;
exports.del = del;
exports.mirror = mirror;
exports.rotate = rotate;
exports.scale = scale;
exports.transform = transform;
exports.CopyObject = CopyObject;
exports.CopyObjects = CopyObjects;
//  ===============================================================================================================
//  Geom Functions ================================================================================================
//  ===============================================================================================================
/**
 * Copies geometry from one model to another
 * @param entity Geometry or list of geometry to copy
 * @param model Model to copy to
 * @returns New copied geometry
 */
function copyToModel(entity, model) {
    throw new Error("Method not implemented");
}
/**
 * Makes a clone of geometry in this model
 * @param entity Geometry or list of geometry to copy
 * @returns New copied geometry
 */
function copy(entity) {
    throw new Error("Method not implemented");
}
/**
 * Deletes geometry or a list of geometry from the model
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to delete
 * @returns Number of items deleted if successful
 */
function del(entity) {
    throw new Error("Method not implemented");
}
/**
 * Mirrors geometry or a list of geometry about a plane.
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to mirror
 * @param plane Plane to mirror object
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Mirrored geometry if successful
 */
function mirror(entity, plane, copy) {
    throw new Error("Method not implemented");
}
// - WEEK 2 -
/**
 * Rotates geometry or a list of geometry on a plane.
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to rotate
 * @param rotation Rotation angle in degrees
 * @param plane Plane to rotate objects
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Rotated geometry if successful, null if unsuccessful or on error
 */
function rotate(entity, rotation, plane, copy) {
    throw new Error("Method not implemented");
}
/**
 * Scales geometry or a list of geometry based on an origin and a scale factor
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to scale
 * @param origin Origin of scale function
 * @param scale Scale factor
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Scaled geometry if successful, null if unsuccessful or on error
 */
function scale(entity, origin, scale, copy) {
    throw new Error("Method not implemented");
}
/**
 * Moves, scales, or rotates geometry or a list of geometry given a rotation angle,
 * an origin point, scaling factor and translation vector
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to move
 * @param rotation Rotation angle in degrees
 * @param origin Origin point of function
 * @param scale Scale factor
 * @param translation Translation vector
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Geometry in new location if successful, null if unsuccessful or on error
 */
function transform(entity, rotation, origin, scale, translation, copy) {
    throw new Error("Method not implemented");
}
//  ===============================================================================================================
//  Transformation Functions From Object No Longer in API =========================================================
//  ===============================================================================================================
/**
 * Copies object from one location to another, or in-place
 * @ parameters Object to copy and optional translation vector
 * @ return Object ID if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObject
function CopyObject(m, obj, translation) {
    // To implement
    if (obj.getID() === undefined) {
        throw new Error("Undefined object");
    }
    return obj.getID();
}
/**
 * Copies a set of objects from one location to another, or in-place
 * @ parameters Object to copy and optional translation vector
 * @ return Object IDs if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObjects
function CopyObjects(m, objs, translation) {
    // To implement
    if (objs === undefined) {
        return [];
    }
    var ids = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = objs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var obj = _step.value;

            if (obj.getID() === undefined) {
                throw new Error("Undefined object");
            }
            ids.push(obj.getID());
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return ids;
}
//# sourceMappingURL=entity_dev.js.map