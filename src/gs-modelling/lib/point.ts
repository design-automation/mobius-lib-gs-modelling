import * as gs from "gs-json";

//  ===============================================================================================================
//  Point Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Copy a point from one model to another model.
 * @param model Model to add the point to.
 * @param point Point to copy in other model.
 * @returns Added point in specified model.
 */
export function copy(model: gs.IModel, point: gs.IPoint): gs.IPoint {
    return model.getGeom().addPoint(point.getPosition());
}

// - WEEK 2 -
/**
 * Find the mean of a list of points and adds a new point to the model.
 * @param points List of points
 * @returns New point if successful, null if unsuccessful or on error
 */
export function fromPointsMean(points: gs.IPoint[]): gs.IPoint {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Adds a point or list of points to the model.
 * @param model Model to add point to
 * @param xyz List of X, Y and Z coordinates of point
 * @returns New point or list of points if successful, null if unsuccessful or on error
 */
export function fromXYZ(model: gs.IModel, xyz: number[]): gs.IPoint {
    return model.getGeom().addPoint(xyz);
}

// - WEEK 2 -
/**
 * Gets a point from the model.
 * @param model Model to get point from
 * @param index Index of point to get
 * @returns Specified point if successful, null if unsuccessful or on error
 */
export function getFromModel(model: gs.IModel, index: number[]): gs.IPoint {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Point Functions ===============================================================================================
//  ===============================================================================================================

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
