/**
 * Polymeshes are a type of object.
 *
 * Polymeshes are formed from flat polygons joined to form a continuous surface.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as math_poly from "./_math_poly_dev";
import * as utils from "./_utils_dev";
import * as poly from "./_math_poly_dev";

//  ===============================================================================================================
//  Pmesh Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a polymesh from the model based on an index number
 * @param model Model to get polymesh from
 * @param id Index number of polymesh
 * @returns Polymesh object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IPolymesh {
    // check args
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null; }
    if (obj.getObjType() !== gs.EObjType.polymesh) {
        throw new Error("Object is not a polymesh. Object type is: " + obj.getObjType());
    }
    // return the polymesh
    return obj as gs.IPolymesh;
}

/**
 * Create a copy of a polymesh.
 *
 * @param polymesh The polymesh to copy.
 * @returns A new polymesh.
 */
export function Copy(polymesh: gs.IPolymesh, copy_attribs?: boolean): gs.IPolymesh {
    // check args
    if (!polymesh.exists()) {throw new Error("polymesh has been deleted.");}
    // copy and return
    return polymesh.copy(copy_attribs) as gs.IPolymesh;
}

//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a polymesh from face corner points.
 *
 * List of points, assumed to be in order.
 * @param points List of lists of face corner points.
 * @returns New polymesh with a single face if successful, null if unsuccessful or on error
 */
export function FromPoints(points: gs.IPoint[][]): gs.IPolymesh {
    // check args
    if (points.length === 0 || points[0].length === 0)  {throw new Error("Not enough points specified.");}
    const model: gs.IModel = points[0][0].getModel();
    for (const face_points of points) {
        if (face_points.length < 3) {throw new Error("Each face must have at least three points.");}
        for (const point of face_points) {
            if  (point.getModel() !== model) {
                throw new Error("All points must be in the same model.");
            }
            if (!point.exists()) {
                throw new Error("Point has been deleted.");
            }
        }
    }
    // create the pmesh and return
    return model.getGeom().addPolymesh(points);
}

/**
 * Creates ...
 *
 * @param pline A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */

export function FromPline(pline: gs.IPolyline): gs.IPolymesh {
    // check args
    if (!pline.exists()) {throw new Error("polymesh has been deleted.");}
    const model: gs.IModel = pline.getModel();
    // create the pmesh and return
    return model.getGeom().addPolymesh([pline.getPointsArr()]);
}

//  ===============================================================================================================
//  Pmesh Simple Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Checks if the polymesh is closed
 * @param pmesh Polyline object
 * @return True if the polyline is closed
 */
export function isClosed(pmesh: gs.IPolymesh): boolean {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.numWires() === 0;
}

/**
 * Returns the number of edges in the polyline
 * @param pmesh Polymesh object.
 * @return The number of edges.
 */
export function numFaces(pmesh: gs.IPolymesh): number {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.numFaces();
}

/**
 * Returns the number of vertices in the Polymesh
 * @param pmesh Polymesh object.
 * @return The number of vertices.
 */
export function numWires(pmesh: gs.IPolymesh): number {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.numWires();
}

/**
 * Returns the number of edges in the Polymesh
 * @param pmesh Polymesh object.
 * @return The number of edges.
 */
export function numEdges(pmesh: gs.IPolymesh): [number, number] {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return [pmesh.numWireEdges(), pmesh.numFaceEdges()];
}

/**
 * Returns the number of vertices in the Polymesh
 * @param pmesh Polymesh object.
 * @return The number of vertices.
 */
export function numVertices(pmesh: gs.IPolymesh): [number, number] {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return [pmesh.numWireVertices(), pmesh.numFaceVertices()];
}

/**
 * Returns all points that for this polymesh.
 *
 * @param pmesh Polymesh object.
 * @return The number of vertices.
 */
export function getPoints(pmesh: gs.IPolymesh): gs.IPoint[] {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.getPointsArr();
}

//  ===============================================================================================================
//  Pmesh Modelling Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Extrude by vector...
 *
 * @param pmesh A polymesh to extrude
 * @param vector The vector defining the extrusion length and direction.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */
export function extrude(pmesh: gs.IPolymesh, vector: gs.XYZ): gs.IPolymesh {
    // check args
    if (!pmesh.exists()) {throw new Error("polymesh has been deleted.");}
    const m: gs.IModel = pmesh.getModel();
    const g: gs.IGeom = m.getGeom();
    // make a copy
    const pmesh1_points: gs.IPoint[][][] = pmesh.getPoints();
    const pmesh2_points: gs.IPoint[][][] = utils.copyObjPoints(pmesh, false);
    threex.movePointsAddXYZ(gs.Arr.flatten(pmesh2_points), vector);
    // create the sides
    const sides: gs.IPoint[][] = poly.pointsLoftLoop([pmesh1_points[0], pmesh2_points[0]], true);
    // combine everything
    const pmesh_points = [...pmesh1_points[1], ...pmesh2_points[1], ...sides];
    // return the new polymesh
    return g.addPolymesh(pmesh_points);
}
