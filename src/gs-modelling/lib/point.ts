/**
 * Points define a point in a model, as x, y and z coordinates.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Point Get Copy ================================================================================================
//  ===============================================================================================================

/**
 * Gets a point from a model.
 * @param model Model to get point from.
 * @param index Index of point to get.
 * @returns Specified point if successful, null if unsuccessful or on error.
 */
export function Get(model: gs.IModel, id: number): gs.IPoint {
    const point: gs.IPoint = model.getGeom().getPoint(id);
    if (point === undefined) {return null; }
    return point;
}

/**
 * Copy a point wihin a model.
 *
 * @param point Point to copy.
 * @returns New point.
 */
export function Copy(point: gs.IPoint): gs.IPoint {
    if (!point.exists()) {throw new Error("Point has been deleted.");}
    const model: gs.IModel = point.getModel();
    return model.getGeom().addPoint(point.getPosition());
}

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
export function FromModel(model: gs.IModel, point: gs.IPoint): gs.IPoint {
    if (!point.exists()) {throw new Error("Point has been deleted.");}
    return model.getGeom().addPoint(point.getPosition());
}

/**
 * Adds a point to the model
 *
 * X, Y and Z coordinates are assumed to follow the world coordinate system<br/>
 * Points are returned in order of input
 * @param model Model to add points to.
 * @param xyz List of XYZ coordinates.
 * @returns New point if successful, null if unsuccessful or on error
 */
export function FromXYZ(model: gs.IModel, xyz: gs.XYZ): gs.IPoint {
    return model.getGeom().addPoint(xyz);
}

/**
 * Adds a set of points to the model
 *
 * X, Y and Z coordinates are assumed to follow the world coordinate system<br/>
 * Points are returned in order of input
 * @param model Model to add points to.
 * @param xyz A list of lists of XYZ coordinates.
 * @returns New list of points if successful, null if unsuccessful or on error
 */
export function FromXYZs(model: gs.IModel, xyzs: gs.XYZ[]): gs.IPoint[] {
    const points: gs.IPoint[] = [];
    for (const xyz of xyzs as gs.XYZ[]) {
        points.push(model.getGeom().addPoint(xyz));
    }
    return points;
}

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
    const m: gs.IModel = points[0].getModel();
    for (const point of points) {
        if (point.getModel() !== m) {
            throw new Error("All points must be in the same model.");
        }
        if (!point.exists()) {
            throw new Error("Point has been deleted.");
        }
    }
    const xyz: number[] = [0,0,0];
    for (const point of points) {
        const pos: number[] = point.getPosition();
        xyz[0] += pos[0];
        xyz[1] += pos[1];
        xyz[2] += pos[2];
    }
    return m.getGeom().addPoint([xyz[0]/points.length, xyz[1]/points.length, xyz[2]/points.length]);
}

//  ===============================================================================================================
//  Point Functions ============================================================================================
//  ===============================================================================================================

/**
 * Obtains x, y and z coordinates of 3D point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-PointCoordinates
 * @param point Point
 * @returns List of x, y and z coordinates of point if successful, null if unsuccessful or on error
 */
export function getXYZ(point: gs.IPoint): gs.XYZ {
    if (!point.exists()) {throw new Error("Point has been deleted.");}
    return point.getPosition() as gs.XYZ;
}
