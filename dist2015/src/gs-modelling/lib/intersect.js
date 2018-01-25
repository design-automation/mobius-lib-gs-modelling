"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.circleCircle2D = circleCircle2D;
exports.circlePlane3D = circlePlane3D;

var _math_conic_dev = require("./_math_conic_dev");

var math_conic = _interopRequireWildcard(_math_conic_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Intersect Functions ===========================================================================================
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
function circleCircle2D(circle1, circle2) {
    if (!circle1.exists()) {
        throw new Error("circle1 has been deleted.");
    }
    if (!circle2.exists()) {
        throw new Error("circle2 has been deleted.");
    }
    return math_conic._isectCircleCircle2D(circle1, circle2);
}
/**
 *
 * @param circle Conic curve 1
 * @param plane Conic curve 2
 * @returns List of intersection points and/or overlapping arcs if successful,
 *          null if unsuccessful or on error
 */
/**
 * Intersect functions find points of intersection and conics, polylines and polymeshes where two objects
 * overlap. They return these intersections and overlaps and do not alter the original input objects.
 */
function circlePlane3D(circle, plane) {
    if (!circle.exists()) {
        throw new Error("circle has been deleted.");
    }
    if (!plane.exists()) {
        throw new Error("plane has been deleted.");
    }
    return math_conic._isectCirclePlane3D(circle, plane);
}
//# sourceMappingURL=intersect.js.map