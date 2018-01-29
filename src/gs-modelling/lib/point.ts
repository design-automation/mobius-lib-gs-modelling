/**
 * Function for working with points.
 * Points define a point in a model, with XYZ coordinates.
 */

/**
 * Points are the fundamental building blocks of making 3D geometry.
 * Geometric objects have one or more vertices, and the position of each vertex is defined
 * by linking to a point.
 * Each vertex is linked to one point.
 * Each point can have multiple vertices linking to it.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Point Get Copy ================================================================================================
//  ===============================================================================================================

/**
 * Gets a point from a model.
 * @param model Model to get point from.
 * @param id ID of point to get.
 * @returns Point if successful. Null if the point does nor exist.
 */
export function Get(model: gs.IModel, id: number): gs.IPoint {
    const point: gs.IPoint = model.getGeom().getPoint(id);
    if (point === undefined) {return null; }
    return point;
}

/**
 * Gets a list of points from the model.
 * @param model Model to get points from.
 * @param ids A list of point IDs.
 * @returns A list of points.
 */
export function Gets(model: gs.IModel, ids: number[]): gs.IPoint[] {
    let points: gs.IPoint[] = [];
    for (const id of ids) {
        const point: gs.IPoint = Get(model, id);
        if (point !== null) {points.push(point);}
    }
    return points;
}

/**
 * Copy a point within a model.
 *
 * @param point Point to copy.
 * @returns New point.
 */
export function Copy(point: gs.IPoint): gs.IPoint {
    if (!point.exists()) {throw new Error("Point has been deleted.");}
    const model: gs.IModel = point.getModel();
    return model.getGeom().addPoint(point.getPosition());
}

/**
 * Copy a point from one model into another model.
 *
 * @param model The model to copy to.
 * @param plane The plane object to copy.
 * @returns The copied plane object in the model.
 */
export function CopyToModel(model: gs.IModel, point: gs.IPoint): gs.IPoint {
    // check args
    if (!point.exists()) {throw new Error("Error: point has been deleted.");}
    // check it is not already in the model
    if (point.getModel() === model) {throw new Error("Error: point is already in model.");}
    // copy circle and return it
    return model.getGeom().addPoint(point.getPosition());
}

//  ===============================================================================================================
//  Point Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a point from XYZ coordinates.
 *
 * @param model Model to add points to.
 * @param xyz XYZ coordinates, as a list of three numbers.
 * @returns New point if successful, null if unsuccessful or on error.
 */
export function FromXYZ(model: gs.IModel, xyz: gs.XYZ): gs.IPoint {
    return model.getGeom().addPoint(xyz);
}

/**
 * Creates a list of points from a list of X, Y and Z coordinates.
 * Points are returned in list order.
 *
 * @param model Model to add points to.
 * @param xyzs A list XYZ coordinates, as a list of lists of three numbers.
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
 * Creates a point that is at the center of a cluster of points.
 *
 * @param points List of points.
 * @returns New point if successful, null if unsuccessful or on error.
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
 * Deletes a point or a list of points from the model.
 *
 * @param points Point or list of points to delete.
 * @returns True if successful
 */
export function del(points: gs.IPoint | gs.IPoint[]): boolean {
    if (Array.isArray(points)) {
        if (!points[0].exists()) {throw new Error("Point has been deleted.");}
        return points[0].getGeom().delPoints(points);
    } else { // a single entity
        if (!points.exists()) {throw new Error("Point has been deleted.");}
        return points.getGeom().delPoint(points);
    }
}

/**
 * Get the XYZ coordinates of the point.
 *
 * @param point Point to get coordinates from.
 * @returns The XYZ coordinates if successful, null if unsuccessful or on error.
 */
export function getXYZ(point: gs.IPoint): gs.XYZ {
    if (!point.exists()) {throw new Error("Point has been deleted.");}
    return point.getPosition();
}

/**
 * Set the XYZ coordinates of the point.
 *
 * @param point Point to set coorinates for.
 * @param xyz The new XYZ coordinates, as a list of three numbers.
 * @returns The old XYZ coordinates if successful, null if unsuccessful or on error.
 */
export function setXYZ(point: gs.IPoint, xyz: gs.XYZ): gs.XYZ {
    if (!point.exists()) {throw new Error("Point has been deleted.");}
    return point.setPosition(xyz);
}
