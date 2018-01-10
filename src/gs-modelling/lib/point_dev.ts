import * as gs from "gs-json";

// - WEEK 2 -
/**
 * Gets a point from the model.
 * @param model Model to get point from
 * @param index Index of point to get
 * @returns Specified point if successful, null if unsuccessful or on error
 */
export function _GetByIndex(model: gs.IModel, index: number[]): gs.IPoint {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Copies points from one model to another
 * @param model_1 Model to copy from
 * @param model_2 Model to copy to
 * @returns List of points copied into specified model if successful
 */
export function _CopyFromModel(model_1: gs.IModel, model_2: gs.Model): gs.IPoint[] {
    throw new Error("Method not implemented");
}

// - WEEK 5 -
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
 * Obtains x, y and z coordinates of 3D point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-PointCoordinates
 * @param point Point
 * @returns List of x, y and z coordinates of point if successful, null if unsuccessful or on error
 */
export function getXYZ(point: gs.IPoint): number[] {
    return point.getPosition();
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
