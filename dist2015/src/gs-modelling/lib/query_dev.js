"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cast = cast;
exports.pointIsOnPline = pointIsOnPline;
exports.pointIsOnConic = pointIsOnConic;
exports.pointIsOnPmesh = pointIsOnPmesh;
exports.pointIsOnRay = pointIsOnRay;
exports.pointIsOnPlane = pointIsOnPlane;
exports.pointIsInPmesh = pointIsInPmesh;
//  ===============================================================================================================
//  Query Functions ===============================================================================================
//  ===============================================================================================================
/**
 * Checks entity for its type and returns it as its corresponding type
 *
 * Entity that describes a point will be returned as IPoint (etc.)
 * @param ent Entity to check and cast
 * @returns Entity as its corresponding type
 */
function cast(geom) {
  throw new Error("Method not implemented");
}
/**
 * Checks if a point lies on a polyline
 *
 * Checks if the distance between point and polyline is less than the tolerance of 0.1
 * @param point Point to check
 * @param pline Polyline to check
 * @returns True if point lies on polyline
 */
function pointIsOnPline(point, pline) {
  throw new Error("Method not implemented");
}
/**
 * Checks if a point lies on a conic curve
 *
 * Checks if the distance between point and conic curve is less than the tolerance of 0.1
 * @param point Point to check
 * @param curve Conic curve to check
 * @returns True if point lies on conic curve
 */
function pointIsOnConic(point, curve) {
  throw new Error("Method not implemented");
}
/**
 * Checks if a point lies on a polymesh
 *
 * Checks if the distance between point and polymesh is less than the tolerance of 0.1
 * @param point Point to check
 * @param pmesh Polymesh to check
 * @returns True if point lies on polymesh
 */
function pointIsOnPmesh(point, pmesh) {
  throw new Error("Method not implemented");
}
/**
 * Checks if a point lies on a ray
 *
 * Checks if the distance between point and ray is less than the tolerance of 0.1
 * @param point Point to check
 * @param ray Ray to check
 * @returns True if point lies on ray
 */
function pointIsOnRay(point, ray) {
  throw new Error("Method not implemented");
}
/**
 * Checks if a point lies on a plane
 *
 * Checks if the distance between point and plane is less than the tolerance of 0.1
 * @param point Point to check
 * @param plane Plane to check
 * @returns True if point lies on plane
 */
function pointIsOnPlane(point, plane) {
  throw new Error("Method not implemented");
}
/**
 * Checks if a point lies in a closed polymesh
 *
 * Checks if the point is within the space enclosed by the faces of the closed polymesh
 * @param point Point to check
 * @param pmesh Polymesh to check
 * @returns True if point lies in polymesh
 */
function pointIsInPmesh(point, pmesh) {
  throw new Error("Method not implemented");
}
//# sourceMappingURL=query_dev.js.map