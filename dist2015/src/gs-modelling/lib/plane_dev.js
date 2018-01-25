"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._PointOrthoProjectPlane = _PointOrthoProjectPlane;
exports._AddPlane = _AddPlane;
exports._PlanePolylineIntersection = _PlanePolylineIntersection;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _three = require("three");

var three = _interopRequireWildcard(_three);

var _three_utils_dev = require("./_three_utils_dev");

var cs = _interopRequireWildcard(_three_utils_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//  ===============================================================================================================
//  Plane Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Creates an orthogonal projected point on a plane
 * @param plane on which the orthogonal projection occurs
 * @param point to project
 * @returns New point if successful, null if unsuccessful or an error
 */
function _PointOrthoProjectPlane(point, plane) {
    var m1 = point.getModel();
    var m2 = plane.getModel();
    if (m1 !== m2) {
        throw new Error("Parameters need to be on the same model");
    }
    var vectors = plane.getVectors();
    var norm = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    var U1 = new three.Vector3(vectors[0][0], vectors[0][1], vectors[0][2]).normalize();
    var W1 = new three.Vector3(norm[0], norm[1], norm[2]).normalize();
    var V1 = new three.Vector3();
    V1 = V1.crossVectors(W1, U1).normalize();
    var m = new gs.Model();
    var _point = cs.vectorFromPointsAtoB(plane.getOrigin(), point);
    var _origin = cs.vectorFromPointsAtoB(m.getGeom().addPoint([0, 0, 0]), plane.getOrigin());
    var projected = new three.Vector3();
    projected = cs.addVectors(U1.multiplyScalar(U1.dot(_point)), V1.multiplyScalar(V1.dot(_point)), false);
    var p_xyz = cs.addVectors(_origin, projected);
    var xyz = [p_xyz.x, p_xyz.y, p_xyz.z];
    return m1.getGeom().addPoint([p_xyz.x, p_xyz.y, p_xyz.z]);
}
// - WEEK 3 -
//  ===============================================================================================================
//  Old Functions No Longer in API ================================================================================
//  ===============================================================================================================
/**
 * Creates a plane from an origin point and normal direction vector
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneFromNormal
 * @param m Model
 * @param origin 3D point to use as origin of plane
 * @param normal 3D vector to define normal direction of plane
 * @param xaxis Vector to use define x-axis of plane (optional)
 * @returns New plane if successful, null if unsuccessful or on error
 */
function _AddPlane(m, origin, normal) {
    var e3 = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(normal))))().normalize();
    var e1 = new three.Vector3(-e3.y, e3.x, 0).normalize();
    var e2 = e3.cross(e1);
    return m.getGeom().addPlane(origin, e1.toArray(), e2.toArray());
}
/**
 * Returns intersections between an infinite plane and a curve/polyline object
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane-PlaneCurveIntersection
 * @param m Model
 * @param plane Plane to intersect
 * @param polyline Polyline to intersect
 * @returns List of intersection information if successful, null if unsuccessful or on error.
 * [0] = type of intersection. 1 = point, 2 = overlap
 * [1] = intersection point if [0] = 1, list of intersection start point and end point if [0] = 2
 */
function _PlanePolylineIntersection(m, plane, polyline) {
    throw new Error("Method not implemented");
}
//# sourceMappingURL=plane_dev.js.map