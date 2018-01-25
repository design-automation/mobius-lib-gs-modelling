"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.Copy = Copy;
exports.FromOriginVectors = FromOriginVectors;
exports.FromOriginWCS = FromOriginWCS;
exports.FromOriginPoints = FromOriginPoints;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _three_utils_dev = require("./_three_utils_dev");

var threex = _interopRequireWildcard(_three_utils_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Plane Get =====================================================================================================
//  ===============================================================================================================
/**
 * Gets a plane from the model based on an index number
 * @param model Model to get polyline from
 * @param id Index number of polyline
 * @returns Plane object if successful
 */
/**
 * Planes are a type of object.
 *
 * Planes are imaginary flat surfaces that stretch infinitely along an x and y axis and are defined by two
 * perpendicular vectors.
 */
function Get(model, id) {
    // check args
    var obj = model.getGeom().getObj(id);
    if (obj === undefined) {
        return null;
    }
    if (obj.getObjType() !== 2 /* plane */) {
            throw new Error("Object is not a plane. Object type is: " + obj.getObjType());
        }
    // return the plane
    return obj;
}
/**
 * Create a copy of a plane.
 *
 * @param plane The plane to copy.
 * @returns A new plane.
 */
function Copy(plane, copy_attribs) {
    // check args
    if (!plane.exists()) {
        throw new Error("plane has been deleted.");
    }
    // copy and return
    return plane.copy(copy_attribs);
}
//  ===============================================================================================================
//  Plane Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Creates a plane from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Direction vector describing x-axis of plane
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
function FromOriginVectors(origin, vec_x, vec_y) {
    // check args
    if (!origin.exists()) {
        throw new Error("Arg origin has been deleted.");
    }
    // create the new plane
    return origin.getGeom().addPlane(origin, vec_x, vec_y);
}
/**
 * Creates a plane from an origin point and the World x and y axis
 *
 * Creates a plane parallel to the World XY plane
 * @param origin 3D point to use as origin of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
function FromOriginWCS(origin) {
    // check args
    if (!origin.exists()) {
        throw new Error("Arg origin has been deleted.");
    }
    // create the new plane
    return origin.getGeom().addPlane(origin, [1, 0, 0], [0, 1, 0]);
}
/**
 * Creates a plane from an origin point and two points describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param pt_x Point that lies on x-axis of plane
 * @param pt_y Point that lies on y-axis of plane
 * @returns New plane if successful, null if unsuccessful or on error
 */
function FromOriginPoints(origin, point_on_x, point_on_y) {
    // check the args
    if (!origin.exists()) {
        throw new Error("Arg origin has been deleted.");
    }
    if (!point_on_x.exists()) {
        throw new Error("Arg point_on_x has been deleted.");
    }
    if (!point_on_y.exists()) {
        throw new Error("Arg point_on_y has been deleted.");
    }
    var model = origin.getModel();
    if (point_on_x.getModel() !== model) {
        throw new Error("Points need to be in the same model");
    }
    if (point_on_y.getModel() !== model) {
        throw new Error("Points need to be in the same model");
    }
    // create the plane
    var vec_x = threex.vectorFromPointsAtoB(origin, point_on_x).toArray();
    var vec_y = threex.vectorFromPointsAtoB(origin, point_on_y).toArray();
    var plane = model.getGeom().addPlane(origin, vec_x, vec_y);
    // return the new plane
    return plane;
}
//  ===============================================================================================================
//  Plane Functions ===============================================================================================
//  ===============================================================================================================
/**
 *
 */
//# sourceMappingURL=plane.js.map