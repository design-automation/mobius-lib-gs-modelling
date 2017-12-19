import * as gs from "gs-json";

/**
 * Adds a point to the model
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-AddPoint
 * @param m Model
 * @param point List of x, y and z coordinates of point (x,y,z)
 * @returns Point if successful, none if unsuccessful or on error
 */
export function AddPoint(m: gs.IModel, point: gs.IPoint) {
    m.getGeom().addPoint(point.getPosition());
}

/**
 * Obtains x, y and z coordinates of 3D point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-PointCoordinates
 * @param m Model
 * @param point Point
 * @returns List of x, y and z coordinates of point if successful, none if unsuccessful or on error
 */
export function PointCoordinates(m: gs.IModel, point: gs.IPoint) {
    m.getGeom().getPointPosition(point.getID());
}
