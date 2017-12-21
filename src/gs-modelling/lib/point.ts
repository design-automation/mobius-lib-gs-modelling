import * as gs from "gs-json";
//import * as gs from "../../../dist/src/libs/gs-json/utils/gs-json";

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
    return m.getGeom().addPoints(xyz_list);
}

/**
 * Adds a point to the model
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-AddPoint
 * @param point List of x, y and z coordinates of point (x,y,z)
 * @returns Point if successful, none if unsuccessful or on error
 */
export function copy(m: gs.IModel, point: gs.IPoint) {
    m.getGeom().addPoint(point.getPosition());
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

//getPointsFromObj()
