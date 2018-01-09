/**
 * Points are a type of entity.
 *
 * Points are defined by a set of x, y and z coordinates.
 */

/**
 *
 */

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
    const m: gs.IModel = points[0].getModel();
    for (const point of points) {
        if (point.getModel() !== m) {
            throw new Error("All points must be in the same model.");
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
