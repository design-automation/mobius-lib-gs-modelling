"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.conicConic2D = conicConic2D;
exports.conicPlane = conicPlane;
exports.conicPline2D = conicPline2D;
exports.conicPmesh = conicPmesh;
exports.conicRay = conicRay;
exports.plinePline2D = plinePline2D;
exports.plinePline = plinePline;
exports.plinePlane = plinePlane;
exports.plinePmesh = plinePmesh;
exports.plineRay = plineRay;
exports.pmeshPmesh = pmeshPmesh;
exports.pmeshPlane = pmeshPlane;
exports.pmeshRay = pmeshRay;
exports.planePlane = planePlane;
exports.planeRay = planeRay;
exports.rayRay = rayRay;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _math_conic_dev = require("./_math_conic_dev");

var conic = _interopRequireWildcard(_math_conic_dev);

var _three_utils_dev = require("./_three_utils_dev");

var threex = _interopRequireWildcard(_three_utils_dev);

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
 * @param curve1 Conic curve 1
 * @param curve2 Conic curve 2
 * @returns List of intersection points and/or overlapping arcs if successful,
 *          null if unsuccessful or on error
 */
function conicConic2D(curve1, curve2) {
    // check that the curves have the same plane
    if (!threex.planesAreCoplanar(curve1.getOrigin(), curve1.getVectors()[2], curve2.getOrigin(), curve2.getVectors()[2])) {
        return null;
    }
    // calculate the intersection points
    if (curve1.getObjType() === 3 /* circle */) {
            if (curve2.getObjType() === 3 /* circle */) {
                    return conic._isectCircleCircle2D(curve1, curve2);
                } else {
                return conic._isectCircleEllipse2D(curve1, curve2);
            }
        } else {
        if (curve2.getObjType() === 3 /* circle */) {
                return conic._isectCircleEllipse2D(curve2, curve1);
            } else {
            return conic._isectEllipseEllipse2D(curve1, curve2);
        }
    }
}
/**
 * Returns the intersection points and/or overlapping arcs of a conic curve and an intersecting plane
 *
 * List of entities returned is in order (starts from t=0 to t=1 of curve)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if curve and plane do not intersect
 * @param curve Conic curve
 * @param plane Plane
 * @returns List of intersection points and/or overlapping arcs if successful,
 *          null if unsuccessful or on error
 */
function conicPlane(curve, plane) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points of a co-planar conic curve and polyline
 *
 * List of points returned is in order (starts from t=0 to t=1 of curve)<br/>
 * Conic curve and polyline must be parallel and lie on the same plane<br/>
 * Returns null if curve and pline are not co-planar<br/>
 * Returns null if curve and pline do not intersect
 * @param curve Conic curve
 * @param pline Polyline
 * @returns List of intersection points if successful, null if unsuccessful or on error
 */
function conicPline2D(curve, pline) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or overlapping arcs of a conic curve and a polymesh
 *
 * List of entities returned is in order (starts from t=0 to t=1 of curve)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if curve and polymesh do not intersect
 * @param curve Conic curve
 * @param pmesh Polymesh
 * @returns List of intersection points and/or overlapping arcs if successful,
 *          null if unsuccessful or on error
 */
function conicPmesh(curve, pmesh) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points of a conic curve and a ray
 *
 * List of points returned is in order (starts from t=0 to t=1 of curve)<br/>
 * Returns null if curve and ray do not intersect
 * @param curve Conic curve
 * @param ray Ray
 * @returns List of intersection points if successful, null if unsuccessful or on error
 */
function conicRay(curve, ray) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or overlapping segments of two intersecting co-planar polylines
 *
 * List of entities returned is in order (starts from t=0 to t=1 of pline_1)<br/>
 * List must be cast before being used for other functions<br/>
 * Polylines must be parallel and lie on the same plane<br/>
 * Returns null if polylines are not co-planar<br/>
 * Returns null if polylines do not intersect
 * @param pline_1 Polyline 1
 * @param pline_2 Polyline 2
 * @returns List of intersection points and/or overlapping segments if successful,
 *          null if unsuccessful or on error
 */
function plinePline2D(pline_1, pline_2) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or overlapping segments of two intersecting polylines
 *
 * List of entities returned is in order (starts from t=0 to t=1 of pline_1)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if polylines do not intersect
 * @param pline_1 Polyline 1
 * @param pline_2 Polyline 2
 * @returns List of intersection points and/or overlaping segments if successful,
 *          null if unsuccessful or on error
 */
function plinePline(pline_1, pline_2) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or overlapping segments of a polyline and an intersecting plane
 *
 * List of entities returned is in order (starts from t=0 to t=1 of pline)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if polyline and plane do not intersect
 * @param pline Polyline
 * @param plane Plane
 * @returns List of intersection points and/or overlapping segments if successful,
 *          null if unsuccessful or on error
 */
function plinePlane(pline, plane) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or overlapping segments of a polyline and a polymesh
 *
 * List of entities returned is in order (starts from t=0 to t=1 of pline)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if polyline and polymesh do not intersect
 * @param pline Polyline
 * @param pmesh Polymesh
 * @returns List of intersection points and/or overlapping segments if successful,
 *          null if unsuccessful or on error
 */
function plinePmesh(pline, pmesh) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or overlapping segments of a polyline and a ray
 *
 * List of entities returned is in order (starts from t=0 to t=1 of pline)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if polyline and ray do not intersect
 * @param pline Polyline
 * @param ray Ray
 * @returns List of intersection points and/or overlapping segments if successful,
 *          null if unsuccessful or on error
 */
function plineRay(pline, ray) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or intersecting edges and/or overlapping polymeshes of two intersecting
 * polymeshes
 *
 * List of entities returned is in order (starts from face 0 of pmesh_1)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if polymeshes do not intersect
 * @param pmesh_1 Polymesh 1
 * @param pmesh_2 Polymesh 2
 * @returns List of intersection points and/or intersecting edges and/or overlapping polymeshes if successful,
 *          null if unsuccessful or on error
 */
function pmeshPmesh(pmesh_1, pmesh_2) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or intersecting edges and/or overlapping polymeshes of a polymesh and
 * an intersecting plane
 *
 * List of entities returned is in order (starts from face 0 of pmesh)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if polymesh and plane do not intersect
 * @param pmesh Polymesh
 * @param plane Plane
 * @returns List of intersection points and/or intersecting edges and/or overlapping polymeshes if successful,
 *          null if unsuccessful or on error
 */
function pmeshPlane(pmesh, plane) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection points and/or overlapping segments of a polymesh and a ray
 *
 * List of entities returned is in order (starts from face 0 of pmesh)<br/>
 * List must be cast before being used for other functions<br/>
 * Returns null if polymesh and ray do not intersect
 * @param pmesh Polymesh
 * @param ray Ray
 * @returns List of intersection points and/or overlapping segments if successful,
 *          null if unsuccessful or on error
 */
function pmeshRay(pmesh, ray) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersecting edge of two non-coplanar intersecting planes
 *
 * Returns null if planes do not intersect<br/>
 * Returns null if planes are co-planar
 * @param plane_1 Plane
 * @param plane_2 Plane
 * @returns Intersecting edge as a ray if successful, null if unsuccessful or on error
 */
function planePlane(plane_1, plane_2) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection point of a non-coplanar plane and ray
 *
 * Returns null if plane and ray do not intersect<br/>
 * Returns null if plane and ray are co-planar
 * @param plane Plane
 * @param ray Ray
 * @returns Intersection point if successful, null if unsuccessful or on error
 */
function planeRay(plane, ray) {
    throw new Error("Method not implemented");
}
/**
 * Returns the intersection point 2 intersecting rays
 *
 * Returns null if rays do not intersect
 * @param ray_1 Ray 1
 * @param ray_2 Ray 1
 * @returns Intersection point if successful, null if unsuccessful or on error
 */
function rayRay(ray_1, ray_2) {
    throw new Error("Method not implemented");
}
//# sourceMappingURL=intersect_dev.js.map