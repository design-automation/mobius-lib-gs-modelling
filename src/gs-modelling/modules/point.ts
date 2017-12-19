import * as gs from "gs-json";

/**
 * Adds a point to the model
 */
export function addByXYZ(m: gs.IModel, xyz: number[]): gs.IPoint {
    return m.getGeom().addPoint(xyz);
}

/**
 * Adds a set of points to the model
 */
export function addByXYZList(m: gs.IModel, xyz_list: number[][]): gs.IPoint[] {
    const points: gs.IPoint[] = [];
    for (const xyz of xyz_list) {
        points.push(m.getGeom().addPoint(xyz));
    }
    return points;
}

/**
 * Adds a point to the model
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-AddPoint
 * @param m Model
 * @param point List of x, y and z coordinates of point (x,y,z)
 * @returns Point if successful, none if unsuccessful or on error
 */
export function add(m: gs.IModel, point: gs.IPoint) {
    m.getGeom().addPoint(point.getPosition());
}

/**
 * Obtains x, y and z coordinates of 3D point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-PointCoordinates
 * @param m Model
 * @param point Point
 * @returns List of x, y and z coordinates of point if successful, none if unsuccessful or on error
 */
export function getXYZ(point: gs.IPoint) {
    point.getPosition();
}
