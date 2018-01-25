"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.FromOriginVectors = FromOriginVectors;
exports.FromOrigin = FromOrigin;
exports.FromPlane = FromPlane;
exports.ArcFromOriginVectors = ArcFromOriginVectors;
exports.ArcFromOrigin = ArcFromOrigin;
exports.ArcFromPlane = ArcFromPlane;
exports.getOrigin = getOrigin;
exports.getVectors = getVectors;
exports.getArcAngles = getArcAngles;
exports.setArcAngles = setArcAngles;
exports.isClosed = isClosed;
exports.close = close;
exports.length = length;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _circle_dev = require("./circle_dev");

var util = _interopRequireWildcard(_circle_dev);

var _three = require("three");

var three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Ellipses are a type of object.
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * Ellipses are represented by a point and a set of vectors.
                                                                                                                                                                                                     */


//  ===============================================================================================================
//  Ellipse Get =====================================================================================================
//  ===============================================================================================================
/**
 * Gets a ellipse from the model based on an index number
 * @param model Model to get ellipse from
 * @param id Index number of ellipse
 * @returns Ellipse object if successful
 */
function Get(model, id) {
    var obj = model.getGeom().getObj(id);
    if (obj === undefined) {
        return null;
    }
    if (obj.getObjType() !== 4 /* ellipse */) {
            throw new Error("Object is not a ellipse. Object type is: " + obj.getObjType());
        }
    return obj;
}
//  ===============================================================================================================
//  Ellipse Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Creates a ellipse from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the radius
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New ellipse if successful, null if unsuccessful or on error
 */
function FromOriginVectors(origin, vec_x, vec_y) {
    return origin.getGeom().addEllipse(origin, vec_x, vec_y);
}
/**
 * Adds a closed ellipse to the model based on an origin point and radius
 *
 * Ellipse will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the ellipse
 * @param origin Center point of ellipse
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @returns New ellipse if successful
 */
function FromOrigin(origin, radius_x, radius_y) {
    return origin.getGeom().addEllipse(origin, [radius_x, 0, 0], [0, radius_y, 0]);
}
/**
 * Adds a closed ellipse to the model based on a plane and radius
 *
 * Ellipse will be constructed parallel to the plane with the origin of the plane as the center point of the
 * ellipse
 * @param plane Plane to construct ellipse on
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @returns New ellipse if successful
 */
function FromPlane(plane, radius_x, radius_y) {
    var vecs = plane.getVectors();
    var vec_x = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[0]))))().setLength(radius_x).toArray();
    var vec_y = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[1]))))().setLength(radius_y).toArray();
    return plane.getGeom().addEllipse(plane.getOrigin(), vec_x, vec_y);
}
//  ===============================================================================================================
//  Arc Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Creates a ellipse from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the x radius
 * @param vec_y Vector describing x-axis of plane, and the y radius
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @returns New ellipse if successful, null if unsuccessful or on error
 */
function ArcFromOriginVectors(origin, vec_x, vec_y, angles) {
    return origin.getGeom().addEllipse(origin, vec_x, vec_y, util._argsCheckAngles(angles));
}
/**
 * Adds a closed ellipse to the model based on an origin point and radius
 *
 * Arc will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the arc
 * @param origin Center point of arc
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @returns New ellipse if successful
 */
function ArcFromOrigin(origin, radius_x, radius_y, angles) {
    return origin.getGeom().addEllipse(origin, [radius_x, 0, 0], [0, radius_y, 0], util._argsCheckAngles(angles));
}
/**
 * Adds a circular arc to the model based on a plane and radius
 *
 * Arc will be constructed parallel to the plane with the origin of the plane as the center point of the
 * ellipse that forms the arc<br/>
 * Arc will be constructed starting from the x-axis of the specified plane and follows the ellipse in the
 * specified direction until it reaches the angle specified
 * @param plane Plane to construct arc on
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @param clockwise Constructs arc in a clockwise direction of true, anticlockwise if false
 * @returns New arc  (ellipse) if successful
 */
function ArcFromPlane(plane, radius_x, radius_y, angles) {
    var vecs = plane.getVectors();
    var vec_x = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[0]))))().setLength(radius_x).toArray();
    var vec_y = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[1]))))().setLength(radius_y).toArray();
    return plane.getGeom().addEllipse(plane.getOrigin(), vec_x, vec_y, util._argsCheckAngles(angles));
}
//  ===============================================================================================================
//  Get and Set ===================================================================================================
//  ===============================================================================================================
/**
 * Gets the origin of a Ellipse
 * @param ellipse Ellipse to obtain origin from
 * @returns Origin point of Ellipse
 */
function getOrigin(ellipse) {
    return ellipse.getOrigin();
}
/**
 * Gets the x and y vectors of a Ellipse
 *
 * Direction of x and y vectors reflect the x and y axis of the underlying ellipse or ellipse of the ellipse<br/>
 * Magnitude of x and y vectors reflect the x and y radius of the underlying ellipse or ellipse of the ellipse
 * @param ellipse Ellipse to obtain vectors from
 * @returns List of x and y vectors of a Ellipse
 */
function getVectors(ellipse) {
    return ellipse.getVectors();
}
/**
 * Sets the angles for the arc. If this object was previously a closed ellipse, it will now become an open arc.
 *
 * @param ellipse Ellipse to get angles from.
 * @returns The angles, or null.
 */
function getArcAngles(ellipse) {
    return ellipse.getAngles();
}
/**
 * Sets the angles for the arc. If this object was previously a closed ellipse, it will now become an open arc.
 *
 * @param ellipse Ellipse to set value for
 * @param angles The value to set
 * @returns True if successful, null if unsuccessful or on error
 */
function setArcAngles(ellipse, angles) {
    if (angles === null) {
        ellipse.setAngles(undefined);
    } else {
        ellipse.setAngles(util._argsCheckAngles(angles));
    }
}
/**
 * Checks if a Ellipse is closed. If it is not closed, then it must be an arc.
 * @param ellipse Ellipse to test
 * @returns True if Ellipse is closed
 */
function isClosed(ellipse) {
    return ellipse.isClosed();
}
/**
 * Closes the arc, so that it becomes a ellipse.
 *
 * @param arc Ellipse to set value for
 * @returns True if successful, null if unsuccessful or on error
 */
function close(arc) {
    arc.setAngles(undefined);
}
//  ===============================================================================================================
//  Functions =====================================================================================================
//  ===============================================================================================================
/**
 * Returns the length of a Ellipse
 *
 * If specified ellipse is a closed ellipse or ellipse, returns the circumference of the ellipse or ellipse
 * @param ellipse Ellipse to obtain length from
 * @returns Length of ellipse
 */
function length(ellipse) {
    throw new Error("Method not implemented.");
}
//# sourceMappingURL=ellipse.js.map