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
 * Adds a point or list of points to the model.
 * @param model Model to add point to
 * @param xyz List of X, Y and Z coordinates of point
 * @returns New point or list of points if successful, null if unsuccessful or on error
 */
export function fromXYZ(model: gs.IModel, xyz: number[]): gs.IPoint {
    return model.getGeom().addPoint(xyz);
}

//  ===============================================================================================================
//  Point Functions ===============================================================================================
//  ===============================================================================================================
