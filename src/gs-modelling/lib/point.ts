import * as gs from "gs-json";

/**
 * Adds a point to the model.
 */
export function addByXYZ(m: gs.IModel, xyz: number[]): gs.IPoint {
    return m.getGeom().addPoint(xyz);
}

/**
 * Adds a set of points to the model.
 */
export function addByXYZList(m: gs.IModel, xyz_list: number[][]): gs.IPoint[] {
    return m.getGeom().addPoints(xyz_list);
}

/**
 * Copy a point from one model to another model.
 * @param model The model to add the point to.
 * @param point The point, in some other model.
 * @returns The point.
 */
export function copy(m: gs.IModel, point: gs.IPoint): gs.IPoint {
    return m.getGeom().addPoint(point.getPosition());
}

/**
 * Obtains x, y and z coordinates of 3D point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-PointCoordinates
 * @param point Point
 * @returns List of x, y and z coordinates of point if successful, none if unsuccessful or on error
 */
export function getXYZ(point: gs.IPoint) {
    point.getPosition();
}

/**
 * Gets all the points from an object.
 * @param obj Object
 * @returns List of points.
 */
export function getPointsFromObj(obj: gs.IObj): gs.IPoint[] {
    return obj.getPointsArr();
}
