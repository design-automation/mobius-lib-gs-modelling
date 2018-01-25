"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closestPoint = closestPoint;
exports.fuse = fuse;
exports.getPointsFromObj = getPointsFromObj;
/**
 * Finds closest point on an object to a test point.
 * @param point Test point to consider
 * @param obj Object to test for closest point
 * @returns Closest point on object if successful, null if unsuccessful or on error
 */
function closestPoint(point, obj) {
  throw new Error("Method not implemented");
}
/**
 * Fuses two points into a single point.
 * @param points Points to fuse
 * @param tolerance Max distance between the two points allowed
 * @param copy Performs transformation on duplicate copy of input points
 * @returns New point if successful, null if unsuccessful or on error
 */
function fuse(points, tolerance, copy) {
  throw new Error("Method not implemented");
}
//  ===============================================================================================================
//  Old Functions No Longer in API ================================================================================
//  ===============================================================================================================
/**
 * Gets all the points from an object.
 * @param obj Object
 * @returns List of points.
 */
function getPointsFromObj(obj) {
  return obj.getPointsArr();
}
//# sourceMappingURL=point_dev.js.map