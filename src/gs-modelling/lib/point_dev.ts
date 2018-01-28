import * as gs from "gs-json";

/**
 * Finds closest point on an object to a test point.
 * @param point Test point to consider
 * @param obj Object to test for closest point
 * @returns Closest point on object if successful, null if unsuccessful or on error
 */
export function closestPoint(point: gs.IPoint, obj: gs.IObj): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Fuses two points into a single point.
 * @param points Points to fuse
 * @param tolerance Max distance between the two points allowed
 * @param copy Performs transformation on duplicate copy of input points
 * @returns New point if successful, null if unsuccessful or on error
 */
export function fuse(points: gs.IPoint[], tolerance: number, copy: boolean): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Merges point or a list of points in the model.
 *
 * @param points Point or list of points to delete.
 * @returns True if successful, false otherwise.
 */
export function mergeByTol(points: gs.IPoint[], tolerance: number): gs.IPoint[] {
    if (points.length === 0) {return null;}
    const model: gs.IModel = points[0].getModel();
    for (const point of points) {
        if (point.getModel() !== model) {throw new Error("Points must all be in same model.");}
        if (!point.exists()) {throw new Error("Point has been deleted.");}
    }
    return model.getGeom().mergePoints(points, tolerance);
}

/**
 * Merges a cluster of points into a single point.
 * The cluster of points are deletetd and replaced by one new point located at the center of the cluster.
 * All objects in the model that are using those points will be updated.
 *
 * @param points Cluster of points to merge.
 * @returns New point if successful, null if unsuccessful or on error.
 */
export function merge(points: gs.IPoint[]): gs.IPoint {
    if (points.length === 0) {return null;}
    const model: gs.IModel = points[0].getModel();
    for (const point of points) {
        if (point.getModel() !== model) {throw new Error("Points must all be in same model.");}
        if (!point.exists()) {throw new Error("Point has been deleted.");}
    }
    return model.getGeom().mergePoints(points,4)[0];
}

//  ===============================================================================================================
//  Old Functions No Longer in API ================================================================================
//  ===============================================================================================================

/**
 * Gets all the points from an object.
 * @param obj Object
 * @returns List of points.
 */
export function getPointsFromObj(obj: gs.IObj): gs.IPoint[] {
    return obj.getPointsArr();
}
