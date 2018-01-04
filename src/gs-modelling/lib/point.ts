import * as gs from "gs-json";

//  ===============================================================================================================
//  Point Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Copy a point from one model to another model
 *
 * If the specified model is the same as the model the point is located in, the specified point is
 * duplicated
 * @param model Model to add the point to
 * @param point Point to copy in other model
 * @returns Added point in specified model
 */
export function Copy(model: gs.IModel, point: gs.IPoint): gs.IPoint {
    return model.getGeom().addPoint(point.getPosition());
}

// - WEEK 2 -
/**
 * Adds a point that is the center of a list of points
 *
 * Calculates the mean of the X, Y and Z coordinates of the list of points and returns a point using the
 * results<br/>
 * Point returned is the three dimensional centroid of the specified list of points<br/>
 * If points inputed are co-planar, this returns their area centroid<br/>
 * If two points are inputed, this returns their mid-point
 * @param points List of points
 * @returns New point if successful, null if unsuccessful or on error
 */
export function FromPointsMean(points: gs.IPoint[]): gs.IPoint {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Adds a point or list of points to the model
 *
 * X, Y and Z coordinates are assumed to follow the world coordinate system<br/>
 * Points are returned in order of input
 * @param model Model to add point to
 * @param xyz List of X, Y and Z coordinates of point
 * @returns New point or list of points if successful, null if unsuccessful or on error
 */
export function FromXYZ(model: gs.IModel, xyz: number[]): gs.IPoint {
    return model.getGeom().addPoint(xyz);
}

// - WEEK 2 -
/**
 * Gets a point from the model based on an index number
 * @param model Model to get point from
 * @param index Index of point to get
 * @returns Specified point if successful, null if unsuccessful or on error
 */
export function GetFromModel(model: gs.IModel, index: number[]): gs.IPoint {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Point Functions ===============================================================================================
//  ===============================================================================================================

// - WEEK 5 -
/**
 * Finds closest point on an object to a test point
 *
 * Distance between the test point and every point in an object is calculated and returns the point that gives
 * the shortest distance<br/>
 * Points must already exist in the object<br/>
 * A new point along an edge or face of the object will not be created
 * @param point Test point to consider
 * @param obj Object to test for closest point
 * @returns Closest point on object if successful, null if unsuccessful or on error
 */
export function closestPoint(point: gs.IPoint, obj: gs.IObj): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Fuses two points into a single point
 *
 * Returns a new point that is the center of the two points if they have the same position (within a
 * tolerance of 1) and deletes input points
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
 * Gets all the points from an object
 * @param obj Object
 * @returns List of points
 */
export function getPointsFromObj(obj: gs.IObj): gs.IPoint[] {
    return obj.getPointsArr();
}
