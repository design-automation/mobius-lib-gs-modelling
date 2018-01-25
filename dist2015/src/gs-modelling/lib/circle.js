"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.Copy = Copy;
exports.FromOriginVectors = FromOriginVectors;
exports.FromOrigin = FromOrigin;
exports.FromPlane = FromPlane;
exports.From3Points = From3Points;
exports.ArcFromOriginVectors = ArcFromOriginVectors;
exports.ArcFromOrigin = ArcFromOrigin;
exports.ArcFromPlane = ArcFromPlane;
exports.ArcFrom3Points = ArcFrom3Points;
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

var _math_conic_dev = require("./_math_conic_dev");

var math_conic = _interopRequireWildcard(_math_conic_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Circles are a type of object.
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * Circles are represented by a point and a set of vectors.
                                                                                                                                                                                                     */


//  ===============================================================================================================
//  Circle Get and Copy =====================================================================================================
//  ===============================================================================================================
/**
 * Gets a circle from the model based on an index number
 * @param model Model to get circle from
 * @param id Index number of circle
 * @returns Circle object if successful
 */
function Get(model, id) {
    // check args
    var obj = model.getGeom().getObj(id);
    if (obj === undefined) {
        return null;
    }
    if (obj.getObjType() !== 3 /* circle */) {
            throw new Error("Object is not a circle. Object type is: " + obj.getObjType());
        }
    // return the circle
    return obj;
}
/**
 * Create a copy of a circle.
 *
 * @param circle The circle to copy.
 * @returns A new circle.
 */
function Copy(circle, copy_attribs) {
    // check args
    if (!circle.exists()) {
        throw new Error("circle has been deleted.");
    }
    // copy and return
    return circle.copy(copy_attribs);
}
//  ===============================================================================================================
//  Circle Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Creates a circle from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the radius
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New circle if successful, null if unsuccessful or on error
 */
function FromOriginVectors(origin, vec_x, vec_y) {
    if (!origin.exists()) {
        throw new Error("Origin has been deleted.");
    }
    return origin.getGeom().addCircle(origin, vec_x, vec_y);
}
/**
 * Adds a closed circle to the model based on an origin point and radius
 *
 * Circle will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the circle
 * @param origin Center point of circle
 * @param radius Radius of circle
 * @returns New circle if successful
 */
function FromOrigin(origin, radius) {
    if (!origin.exists()) {
        throw new Error("Origin has been deleted.");
    }
    return origin.getGeom().addCircle(origin, [radius, 0, 0], [0, radius, 0], [0, 360]);
}
/**
 * Adds a closed circle to the model based on a plane and radius
 *
 * Circle will be constructed parallel to the plane with the origin of the plane as the center point of the
 * circle
 * @param plane Plane to construct circle on
 * @param radius Radius of circle
 * @returns New circle if successful
 */
function FromPlane(plane, radius) {
    if (!plane.exists()) {
        throw new Error("Plane has been deleted.");
    }
    var vecs = plane.getVectors();
    var vec_x = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[0]))))().setLength(radius).toArray();
    var vec_y = vecs[1];
    return plane.getGeom().addCircle(plane.getOrigin(), vec_x, vec_y);
}
/**
 * Adds a circle to the model based on three points
 *
 * All points are taken to be points on the circle
 * @param point1 Start point of arc
 * @param point2 Second point on arc
 * @param point3 End point of arc
 * @returns New arc if successful
 */
function From3Points(point1, point2, point3) {
    if (!point1.exists()) {
        throw new Error("point1 has been deleted.");
    }
    if (!point2.exists()) {
        throw new Error("point2 has been deleted.");
    }
    if (!point3.exists()) {
        throw new Error("point3 has been deleted.");
    }
    // check
    var model = point1.getModel();
    if (point2.getModel() !== model) {
        throw new Error("Points must all be in same model.");
    }
    if (point3.getModel() !== model) {
        throw new Error("Points must all be in same model.");
    }
    // make arc
    var result = math_conic._circleFrom3Points(point1.getPosition(), point2.getPosition(), point3.getPosition(), false);
    var origin_point = model.getGeom().addPoint(result.origin);
    return FromOriginVectors(origin_point, result.vec_x, result.vec_y);
}
//  ===============================================================================================================
//  Arc Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Creates a circle from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the radius
 * @param vec_y Direction vector describing y-axis of plane
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @returns New circle if successful, null if unsuccessful or on error
 */
function ArcFromOriginVectors(origin, vec_x, vec_y, angles) {
    if (!origin.exists()) {
        throw new Error("origin has been deleted.");
    }
    return origin.getGeom().addCircle(origin, vec_x, vec_y, util._argsCheckAngles(angles));
}
/**
 * Adds a closed circle to the model based on an origin point and radius
 *
 * Arc will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the arc
 * @param origin Center point of arc
 * @param radius Radius of arc
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @returns New arc (circle) if successful
 */
function ArcFromOrigin(origin, radius, angles) {
    if (!origin.exists()) {
        throw new Error("origin has been deleted.");
    }
    return origin.getGeom().addCircle(origin, [radius, 0, 0], [0, 1, 0], util._argsCheckAngles(angles));
}
/**
 * Adds a circular arc to the model based on a plane and radius
 *
 * Arc will be constructed parallel to the plane with the origin of the plane as the center point of the
 * circle that forms the arc<br/>
 * Arc will be constructed starting from the x-axis of the specified plane and follows the circle in the
 * specified direction until it reaches the angle specified
 * @param plane Plane to construct arc on
 * @param radius Radius of arc
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @param clockwise Constructs arc in a clockwise direction of true, anticlockwise if false
 * @returns New arc  (circle) if successful
 */
function ArcFromPlane(plane, radius, angles) {
    if (!plane.exists()) {
        throw new Error("plane has been deleted.");
    }
    var vecs = plane.getVectors();
    var vec_x = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[0]))))().setLength(radius).toArray();
    var vec_y = vecs[1];
    return plane.getGeom().addCircle(plane.getOrigin(), vec_x, vec_y, util._argsCheckAngles(angles));
}
/**
 * Adds an arc to the model based on three points
 *
 * All points are taken to be points along the arc
 * @param point1 Start point of arc
 * @param point2 Second point on arc
 * @param point3 End point of arc
 * @returns New arc if successful
 */
function ArcFrom3Points(point1, point2, point3) {
    if (!point1.exists()) {
        throw new Error("point1 has been deleted.");
    }
    if (!point2.exists()) {
        throw new Error("point2 has been deleted.");
    }
    if (!point3.exists()) {
        throw new Error("point3 has been deleted.");
    }
    // check
    var model = point1.getModel();
    if (point2.getModel() !== model) {
        throw new Error("Points must all be in same model.");
    }
    if (point3.getModel() !== model) {
        throw new Error("Points must all be in same model.");
    }
    // make arc
    var result = math_conic._circleFrom3Points(point1.getPosition(), point2.getPosition(), point3.getPosition(), true);
    var origin_point = model.getGeom().addPoint(result.origin);
    return ArcFromOriginVectors(origin_point, result.vec_x, result.vec_y, [0, result.angle]);
}
//  ===============================================================================================================
//  Get and Set ===================================================================================================
//  ===============================================================================================================
/**
 * Gets the origin of a Circle
 * @param circle Circle to obtain origin from
 * @returns Origin point of Circle
 */
function getOrigin(circle) {
    if (!circle.exists()) {
        throw new Error("circle has been deleted.");
    }
    return circle.getOrigin();
}
/**
 * Gets the x and y vectors of a Circle
 *
 * Direction of x and y vectors reflect the x and y axis of the underlying circle or ellipse of the circle<br/>
 * Magnitude of x and y vectors reflect the x and y radius of the underlying circle or ellipse of the circle
 * @param circle Circle to obtain vectors from
 * @returns List of x and y vectors of a Circle
 */
function getVectors(circle) {
    if (!circle.exists()) {
        throw new Error("circle has been deleted.");
    }
    return circle.getVectors();
}
/**
 * Sets the angles for the arc. If this object was previously a closed circle, it will now become an open arc.
 *
 * @param circle Circle to get angles from.
 * @returns The angles, or null.
 */
function getArcAngles(circle) {
    if (!circle.exists()) {
        throw new Error("circle has been deleted.");
    }
    return circle.getAngles();
}
/**
 * Sets the angles for the arc. If this object was previously a closed circle, it will now become an open arc.
 *
 * @param circle Circle to set value for
 * @param angles The value to set
 * @returns True if successful, null if unsuccessful or on error
 */
function setArcAngles(circle, angles) {
    if (!circle.exists()) {
        throw new Error("circle has been deleted.");
    }
    if (angles === null) {
        circle.setAngles(undefined);
    } else {
        circle.setAngles(util._argsCheckAngles(angles));
    }
}
/**
 * Checks if a Circle is closed. If it is not closed, then it must be an arc.
 * @param circle Circle to test
 * @returns True if Circle is closed
 */
function isClosed(circle) {
    if (!circle.exists()) {
        throw new Error("circle has been deleted.");
    }
    return circle.isClosed();
}
/**
 * Closes the arc, so that it becomes a circle.
 *
 * @param arc Circle to set value for
 * @returns True if successful, null if unsuccessful or on error
 */
function close(arc) {
    if (!arc.exists()) {
        throw new Error("circle has been deleted.");
    }
    arc.setAngles(undefined);
}
//  ===============================================================================================================
//  Functions =====================================================================================================
//  ===============================================================================================================
/**
 * Returns the length of a Circle
 *
 * If specified circle is a closed circle or ellipse, returns the circumference of the circle or ellipse
 * @param circle Circle to obtain length from
 * @returns Length of circle
 */
function length(circle) {
    var circle_length = 2 * Math.PI * Math.pow(circle.getRadius(), 2);
    if (circle.isClosed()) {
        return circle_length;
    }
    var angles = circle.getAngles();
    return circle_length * ((angles[1] - angles[0]) / 360);
}
//# sourceMappingURL=circle.js.map