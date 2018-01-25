"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.circleCircle2D = circleCircle2D;

var _three_utils_dev = require("./_three_utils_dev");

var threex = _interopRequireWildcard(_three_utils_dev);

var _math_conic_dev = require("./_math_conic_dev");

var math_conic = _interopRequireWildcard(_math_conic_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Split Constructors ============================================================================================
//  ===============================================================================================================
//  ===============================================================================================================
//  Split Functions ===============================================================================================
//  ===============================================================================================================
/**
 * Returns the intersection points and/or overlapping arcs of two intersecting co-planar conic curves
 *
 * List of points returned is in order (starts from t=0 to t=1 of curve_1)<br/>
 * Conic curves must lie on the same plane<br/>
 * Returns null if conic curves are not co-planar<br/>
 * Returns null if conic curves do not intersect
 * @param circle1 Conic curve 1
 * @param circle2 Conic curve 2
 * @returns List of intersection points and/or overlapping arcs if successful,
 *          null if unsuccessful or on error
 */
/**
 * Split functions find points of intersection and conics, polylines and polymeshes where two objects
 * overlap and split the input objects. They return the split segments, arcs or polymeshes in a list of lists.
 *
 * <code>[0][i]</code> contains the split parts of the first input, where <code>i</code> is the index number
 * of each individual part obtained from the split function.<br/>
 * <code>[1][i]</code> contains the split parts of the second input, if available, where <code>i</code> is the
 * index number of each individual part obtained from the split function.
 */
function circleCircle2D(circle1, circle2) {
    if (!circle1.exists()) {
        throw new Error("circle1 has been deleted.");
    }
    if (!circle2.exists()) {
        throw new Error("circle2 has been deleted.");
    }
    var model = circle1.getModel();
    var geom = model.getGeom();
    var points = math_conic._isectCircleCircle2D(circle1, circle2);
    if (points === null) {
        return null;
    }
    if (points.length !== 2) {
        return null;
    }
    var circle1_origin = circle1.getOrigin();
    var circle2_origin = circle2.getOrigin();
    var order_pt0 = threex.vectorFromPointsAtoB(circle1_origin, points[0]);
    var order_pt1 = threex.vectorFromPointsAtoB(circle1_origin, points[1]);
    var angle_check = order_pt0.angleTo(order_pt1) * 180 / Math.PI;
    if (angle_check > 180) {
        points = [points[1], points[0]];
    }
    // arc 1 a
    var vec1_x = threex.vectorFromPointsAtoB(circle1_origin, points[1]);
    var vec1_2nd_x = threex.vectorFromPointsAtoB(circle1_origin, points[0]);
    var vec1_y = threex.orthoVectors(vec1_x, vec1_2nd_x).normalize().multiplyScalar(vec1_x.length());
    var angle1 = vec1_x.angleTo(vec1_2nd_x);
    var vec1_x_xyz = vec1_x.toArray();
    var vec1_y_xyz = vec1_y.toArray();
    var arc1_a = geom.addCircle(circle1_origin, vec1_x_xyz, vec1_y_xyz, [0, angle1 * 180 / Math.PI]);
    // arc 1 b
    var vec1_2nd_x_xyz = vec1_2nd_x.toArray();
    var vec1_2nd_y_xyz = threex.orthoVectors(vec1_2nd_x, vec1_x).normalize().multiplyScalar(-vec1_2nd_x.length()).toArray();
    var arc1_b = geom.addCircle(circle1_origin, vec1_2nd_x_xyz, vec1_2nd_y_xyz, [0, 360 - angle1 * 180 / Math.PI]);
    // arc 2 a
    var vec2_x = threex.vectorFromPointsAtoB(circle2_origin, points[0]);
    var vec2_2nd_x = threex.vectorFromPointsAtoB(circle2_origin, points[1]);
    var vec2_y = threex.orthoVectors(vec2_x, vec2_2nd_x).normalize().multiplyScalar(vec2_x.length());
    var angle2 = vec2_x.angleTo(vec2_2nd_x);
    var vec2_x_xyz = vec2_x.toArray();
    var vec2_y_xyz = vec2_y.toArray();
    var arc2_a = geom.addCircle(circle2_origin, vec2_x_xyz, vec2_y_xyz, [0, angle2 * 180 / Math.PI]);
    // arc 2 b
    var vec2_2nd_x_xyz = vec2_2nd_x.toArray();
    var vec2_2nd_y_xyz = threex.orthoVectors(vec2_2nd_x, vec2_x).normalize().multiplyScalar(-vec2_x.length()).toArray();
    var arc2_b = geom.addCircle(circle2_origin, vec2_2nd_x_xyz, vec2_2nd_y_xyz, [0, 360 - angle2 * 180 / Math.PI]);
    // return arcs
    return [arc1_b, arc1_a, arc2_a, arc2_b];
}
//# sourceMappingURL=split.js.map