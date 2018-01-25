"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArcFrom3Points = ArcFrom3Points;
exports.CircleFrom3Points = CircleFrom3Points;
exports.evalParam = evalParam;
exports.evalPoint = evalPoint;
exports.extendArc = extendArc;
exports.extendEllArc = extendEllArc;
exports._argsCheckAngles = _argsCheckAngles;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _three_utils_dev = require("./_three_utils_dev");

var threex = _interopRequireWildcard(_three_utils_dev);

var _math_conic_dev = require("./_math_conic_dev");

var math_conic = _interopRequireWildcard(_math_conic_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Circle Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Adds an arc to the model based on three points
 *
 * All points are taken to be points along the arc
 * @param pt1 Start point of arc
 * @param pt2 Second point on arc
 * @param pt3 End point of arc
 * @returns New arc if successful
 */
function ArcFrom3Points(pt1, pt2, pt3) {
    var m1 = pt1.getModel();
    var m2 = pt2.getModel();
    var m3 = pt3.getModel();
    if (m1 !== m2) {
        throw new Error("Points must be in the same model.");
    }
    if (m1 !== m3) {
        throw new Error("Points must be in the same model.");
    }
    var g1 = m1.getGeom();
    if (threex.vectorsAreCodir(threex.subPoints(pt1, pt2), threex.subPoints(pt1, pt3))) {
        throw new Error("Points must be not aligned");
    }
    var AB = threex.vectorFromPointsAtoB(pt1, pt2);
    var AC = threex.vectorFromPointsAtoB(pt1, pt3);
    var BC = threex.vectorFromPointsAtoB(pt2, pt3);
    var radius = BC.length() / (2 * threex.crossVectors(AB.normalize(), AC.normalize(), false).length());
    var m = new gs.Model();
    var g = m.getGeom();
    var circle_1 = g.addCircle(pt1, [radius, 0, 0], [0, radius, 0]);
    var circle_2 = g.addCircle(pt2, [radius, 0, 0], [0, radius, 0]);
    var circle_3 = g.addCircle(pt3, [radius, 0, 0], [0, radius, 0]);
    var c1 = math_conic._isectCircleCircle2D(circle_1, circle_2);
    var c2 = math_conic._isectCircleCircle2D(circle_1, circle_3);
    var center = null;
    if (gs.Arr.equal(c1[0].getPosition(), c2[0].getPosition())) {
        center = g.addPoint(c1[0].getPosition());
        // center = g1.addPoint(c1[0].getPosition());
    }
    if (gs.Arr.equal(c1[0].getPosition(), c2[1].getPosition())) {
        center = g.addPoint(c1[0].getPosition());
        // center = g1.addPoint(c1[0].getPosition());
    }
    if (gs.Arr.equal(c1[1].getPosition(), c2[0].getPosition())) {
        center = g.addPoint(c1[1].getPosition());
        // center = g1.addPoint(c1[1].getPosition());
    }
    if (gs.Arr.equal(c1[1].getPosition(), c2[1].getPosition())) {
        center = g.addPoint(c1[1].getPosition());
        // center = g1.addPoint(c1[1].getPosition());
    }
    if (center === null) {
        throw new Error("Review thresholds");
    }
    var center_pt1 = threex.vectorFromPointsAtoB(center, pt1);
    var center_pt2 = threex.vectorFromPointsAtoB(center, pt2);
    var center_pt3 = threex.vectorFromPointsAtoB(center, pt3);
    var angle = Math.max(Math.min(center_pt1.angleTo(center_pt2), center_pt2.angleTo(center_pt1)), Math.min(center_pt1.angleTo(center_pt3), center_pt3.angleTo(center_pt1)), Math.min(center_pt2.angleTo(center_pt3), center_pt3.angleTo(center_pt2)));
    var start_point = null;
    if (angle === center_pt1.angleTo(center_pt2)) {
        start_point = g.addPoint(pt1.getPosition());
    }
    if (angle === center_pt2.angleTo(center_pt1)) {
        start_point = g.addPoint(pt2.getPosition());
    }
    if (angle === center_pt1.angleTo(center_pt3)) {
        start_point = g.addPoint(pt1.getPosition());
    }
    if (angle === center_pt3.angleTo(center_pt1)) {
        start_point = g.addPoint(pt3.getPosition());
    }
    if (angle === center_pt2.angleTo(center_pt3)) {
        start_point = g.addPoint(pt2.getPosition());
    }
    if (angle === center_pt3.angleTo(center_pt2)) {
        start_point = g.addPoint(pt3.getPosition());
    }
    var u = threex.vectorFromPointsAtoB(center, start_point);
    var normal = null;
    normal = threex.crossVectors(u, center_pt1);
    if (normal.length() === 0) {
        normal = threex.crossVectors(u, center_pt2);
    }
    if (normal.length() === 0) {
        normal = threex.crossVectors(u, center_pt3);
    }
    var v = threex.crossVectors(normal.normalize(), u);
    return g1.addCircle(g1.addPoint(center.getPosition()), [u[0], u[1], u[2]], [v[0], v[1], v[2]], [0, angle]);
}
/**
 * Adds a closed circle to the model based on three points
 *
 * All points are taken to be points along the circumference of the circle
 * @param pt1 First point on circle
 * @param pt2 Second point on circle
 * @param pt3 Third point on circle
 * @returns New circle if successful
 */
function CircleFrom3Points(pt1, pt2, pt3) {
    var m1 = pt1.getModel();
    var m2 = pt2.getModel();
    var m3 = pt3.getModel();
    if (m1 !== m2) {
        throw new Error("Points must be in the same model.");
    }
    if (m1 !== m3) {
        throw new Error("Points must be in the same model.");
    }
    if (threex.vectorsAreCodir(threex.subPoints(pt1, pt2), threex.subPoints(pt1, pt3))) {
        throw new Error("Points must be not aligned");
    }
    var AB = threex.vectorFromPointsAtoB(pt1, pt2);
    var AC = threex.vectorFromPointsAtoB(pt1, pt3);
    var BC = threex.vectorFromPointsAtoB(pt2, pt3);
    var radius = BC.length() / (2 * threex.crossVectors(AB.normalize(), AC.normalize(), false).length());
    var m = new gs.Model();
    var g = m.getGeom();
    var circle_1 = g.addCircle(pt1, [radius, 0, 0], [0, radius, 0], [0, 360]);
    var circle_2 = g.addCircle(pt2, [radius, 0, 0], [0, radius, 0], [0, 360]);
    var circle_3 = g.addCircle(pt3, [radius, 0, 0], [0, radius, 0], [0, 360]);
    var c1 = math_conic._isectCircleCircle2D(circle_1, circle_2);
    var c2 = math_conic._isectCircleCircle2D(circle_1, circle_3);
    var g1 = m1.getGeom();
    if (gs.Arr.equal(c1[0].getPosition(), c2[0].getPosition())) {
        return g1.addCircle(g1.addPoint(c1[0].getPosition()), [radius, 0, 0], [0, radius, 0], [0, 360]);
    }
    if (gs.Arr.equal(c1[0].getPosition(), c2[1].getPosition())) {
        return g1.addCircle(g1.addPoint(c1[0].getPosition()), [radius, 0, 0], [0, radius, 0], [0, 360]);
    }
    if (gs.Arr.equal(c1[1].getPosition(), c2[0].getPosition())) {
        return g1.addCircle(g1.addPoint(c1[1].getPosition()), [radius, 0, 0], [0, radius, 0], [0, 360]);
    }
    if (gs.Arr.equal(c1[1].getPosition(), c2[1].getPosition())) {
        return g1.addCircle(g1.addPoint(c1[1].getPosition()), [radius, 0, 0], [0, radius, 0], [0, 360]);
    }
    throw new Error("Review thresholds");
}
//  ===============================================================================================================
//  Conic Functions ===============================================================================================
//  ===============================================================================================================
// - WEEK 6 -
/**
 * Returns a point on a conic curve based on a parameter between 0 and 1
 *
 * @param curve Conic curve to evaluate
 * @param t Parameter along curve to evaluate (0 is the start of the curve and 1 is the end)
 * @returns Point on curve
 */
function evalParam(curve, t) {
    throw new Error("Method not implemented");
}
// - WEEK 6 -
/**
 * Returns a parameter along a conic curve based on a point on the curve
 *
 * Returns null if point specified does not lie on the curve (within a tolerance of 0.1)
 * @param curve Conic curve to evaluate
 * @param point Point to evaluate
 * @returns Parameter on curve if successful, null if unsuccessful or on error
 */
function evalPoint(curve, point) {
    throw new Error("Method not implemented");
}
/**
 * Extends an arc
 *
 * Changes the starting and ending angles for a conic curve such that the curve is lengthened<br/>
 * Conic curve should be either a circular arc or an elliptical arc<br/>
 * Extension will follow the original curvature of the circle or ellipse the arc was constructed from<br>
 * If extension causes length of curve to exceed the circumference of the underlying circle or ellipse,
 * returns a closed circle or ellipse.<br/>
 * Returns null if distance is negative
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @param copy Performs transformation on a duplicate copy of the input curve if true
 * @returns Extended conic curve, null if unsuccessful or on error
 */
function extendArc(curve, direction, distance, copy) {
    throw new Error("Method not implemented");
}
/**
 * Extends an elliptical arc
 *
 * Changes the starting and ending angles for a conic curve such that the curve is lengthened<br/>
 * Conic curve should be either a circular arc or an elliptical arc<br/>
 * Extension will follow the original curvature of the circle or ellipse the arc was constructed from<br>
 * If extension causes length of curve to exceed the circumference of the underlying circle or ellipse,
 * returns a closed circle or ellipse.<br/>
 * Returns null if distance is negative
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @param copy Performs transformation on a duplicate copy of the input curve if true
 * @returns Extended conic curve, null if unsuccessful or on error
 */
function extendEllArc(curve, direction, distance, copy) {
    throw new Error("Method not implemented");
}
//  ==========================================================================================================
//  Util method
//  ==========================================================================================================
function _argsCheckAngles(angles) {
    if (angles[0] < 0) {
        angles[0] = Math.abs(angles[0]);
    } else if (angles[0] > 360) {
        angles[0] = angles[0] % 360;
    }
    if (angles[1] < 0) {
        angles[1] = Math.abs(angles[1]);
    } else if (angles[1] > 360) {
        angles[1] = angles[0] % 360;
    }
    if (angles[0] > angles[1]) {
        angles.reverse();
    }
    return angles;
}
//# sourceMappingURL=circle_dev.js.map