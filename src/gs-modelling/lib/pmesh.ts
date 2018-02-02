/**
 * Functions for working with polymehes.
 */

/**
 * Polymeshes are geometric objects that can have multiple faces and multiple closed wires.
 * Faces define the surfaces in the polymesh. They can have three or more vertices,
 * they can be concave or convex, and planar or non-planar.
 * Wires define the naked edges, i.e. edges without any neighbours.
 * The wires in a polymesh are calculated automatically based on the connectivity between the faces.
 * The edges are straight line segments joining two vertices.
 * The polymesh can be either a closed or an open. A closed polymesh has no wires.
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
 * Gets a polymesh from the model based on an ID number.
 * In the viewer, the object label can display (it starts with 'o'), which contains the ID.
 * For example, if the label is "o123", then the ID is the number 123.
 *
 * @param model Model to get polymesh from.
 * @param id ID number of polymesh.
 * @returns Polymesh object.
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
 * @param copy_attribs If true, attributes are copied to the new circle.
 * @returns Polymesh object.
 */
export function Copy(polymesh: gs.IPolymesh, copy_attribs?: boolean): gs.IPolymesh {
    // check args
    if (!polymesh.exists()) {throw new Error("polymesh has been deleted.");}
    // copy and return
    return polymesh.copy(copy_attribs) as gs.IPolymesh;
}

/**
 * Copies a polymesh from one model into another model.
 *
 * @param model The model to copy to.
 * @param polyline The polymesh object to copy.
 * @returns The copied polymesh object in the model.
 */
export function CopyToModel(model: gs.IModel, polymesh: gs.IPolymesh): gs.IPolymesh {
    // check args
    if (!polymesh.exists()) {throw new Error("Error: polymesh has been deleted.");}
    // check it is not already in the model
    if (polymesh.getModel() === model) {throw new Error("Error: polymesh is already in model.");}
    // copy circle and return it
    //return model.getGeom().copyPolymeshFromModel(polymesh);
    throw new Error("Function not implemented yet.")
}

//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a polymesh from a list of lists of face corner points.
 * For example [[p1, p2, p3], [p3, p2, p4]] would create a polymesh with two triangular faces.
 * In this example, the two faces share points p2 and p3.
 *
 * @param points List of lists of face corner points.
 * @returns Polymesh object.
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
 * Creates a polymesh from a polyline. The polymesh will have a single face.
 *
 * @param pline Polyline object to create the polymesh from.
 * @returns Polymesh object with single face.
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
 * Checks if the polymesh is closed.
 *
 * @param pmesh Polymesh object.
 * @return True if the polymesh is closed.
 */
export function isClosed(pmesh: gs.IPolymesh): boolean {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.numWires() === 0;
}

/**
 * Get the number of faces in a polymesh.
 *
 * @param pmesh Polymesh object.
 * @return The number of faces.
 */
export function numFaces(pmesh: gs.IPolymesh): number {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.numFaces();
}

/**
 * Get the number of wires in a polymesh.
 *
 * @param pmesh Polymesh object.
 * @return The number of wires.
 */
export function numWires(pmesh: gs.IPolymesh): number {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.numWires();
}

/**
 * Get the number of edges in a polymesh, for both the wires and the faces.
 *
 * @param pmesh Polymesh object.
 * @return List of two numbers, number of wire edges and number of face edges.
 */
export function numEdges(pmesh: gs.IPolymesh): [number, number] {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return [pmesh.numWireEdges(), pmesh.numFaceEdges()];
}

/**
 * Get the number of vertices in the polymesh, for both the wires and the faces.
 *
 * @param pmesh Polymesh object.
 * @return List of two numbers, number of wire vertices and number of face vertices.
 */
export function numVertices(pmesh: gs.IPolymesh): [number, number] {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return [pmesh.numWireVertices(), pmesh.numFaceVertices()];
}

/**
 * Get all points in a polymesh. The sequence of points is in face order.
 *
 * @param pmesh Polymesh object.
 * @return List of points.
 */
export function getPoints(pmesh: gs.IPolymesh): gs.IPoint[] {
    if (!pmesh.exists()) {throw new Error("pmesh has been deleted.");}
    return pmesh.getPointsArr();
}

//  ===============================================================================================================
//  Pmesh Modelling Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Create a new polymesh by extruding an existing polymesh by a specified vector.
 * The original polymesh is not modified.
 *
 * New points are created by translating the existing points by the specified vector.
 * Four-sided faces are the created between the original and new points.
 * The faces are joined to create a polymesh.
 *
 * @param pmesh Polymesh to extrude.
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
