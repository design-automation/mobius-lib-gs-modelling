"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.Copy = Copy;
exports.FromOriginVector = FromOriginVector;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Ray Get =======================================================================================================
//  ===============================================================================================================
/**
 * Gets a ray from the model based on an index number
 * @param model Model to get ray from
 * @param id Index number of ray
 * @returns Ray object if successful
 */
function Get(model, id) {
    // check args
    var obj = model.getGeom().getObj(id);
    if (obj === undefined) {
        return null;
    }
    if (obj.getObjType() !== 1 /* ray */) {
            throw new Error("Object is not a ray. Object type is: " + obj.getObjType());
        }
    // return the ray
    return obj;
}
/**
 * Create a copy of a ray.
 *
 * @param ray The ray to copy.
 * @returns A new ray.
 */
/**
 * Rays are a type of object.
 *
 * Rays are imaginary lines that stretch infinitely along an axis and are defined by a single vector.
 */
function Copy(ray, copy_attribs) {
    // check args
    if (!ray.exists()) {
        throw new Error("ray has been deleted.");
    }
    // copy and return
    return ray.copy(copy_attribs);
}
//  ===============================================================================================================
//  Ray Constructors ==============================================================================================
//  ===============================================================================================================
/**
 * Creates a ray from an origin point and one direction vector describing its direction
 * @param origin 3D point to use as origin of plane
 * @param vector Direction vector describing direction of ray
 * @returns New ray if successful, null if unsuccessful or on error
 */
function FromOriginVector(origin, vector) {
    // check args
    if (!origin.exists()) {
        throw new Error("Arg origin has been deleted.");
    }
    // create the new ray and return
    return origin.getGeom().addRay(origin, vector);
}
//  ===============================================================================================================
//  Ray Functions =================================================================================================
//  ===============================================================================================================
//# sourceMappingURL=ray.js.map