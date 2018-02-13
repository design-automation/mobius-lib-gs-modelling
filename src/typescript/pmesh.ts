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
import * as threex from "./libs/threex/threex";
import * as poly from "./libs/poly/poly";
import * as utils from "./_utils_dev";
import * as error from "./_error_msgs_dev";
import {Arr} from "./libs/arr/arr";

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
    const obj: gs.IObj = error.checkObjID(model, id, gs.EObjType.polymesh);
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
    error.checkObj(polymesh, gs.EObjType.polymesh);
    return polymesh.copy(copy_attribs) as gs.IPolymesh;
}

/**
 * Copies a polymesh from one model into another model.
 *
 * @param model The model to copy to.
 * @param polymesh The polymesh object to copy.
 * @returns The copied polymesh object in the model.
 */
export function CopyToModel(model: gs.IModel, polymesh: gs.IPolymesh): gs.IPolymesh {
    error.checkObj(polymesh, gs.EObjType.polymesh);
    if (polymesh.getModel() === model) {throw new Error("Error: polymesh is already in model.");}
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
    const model: gs.IModel = error.checkPointNestedList(points, 1, 3);
    return model.getGeom().addPolymesh(points);
}

/**
 * Creates a polymesh from a polyline. The polymesh will have a single face.
 *
 * @param pline Polyline object to create the polymesh from.
 * @returns Polymesh object with single face.
 */

export function FromPline(pline: gs.IPolyline): gs.IPolymesh {
    const model: gs.IModel = error.checkObj(pline, gs.EObjType.polyline);
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
    error.checkObj(pmesh, gs.EObjType.polymesh);
    return pmesh.numWires() === 0;
}

/**
 * Get the number of faces in a polymesh.
 *
 * @param pmesh Polymesh object.
 * @return The number of faces.
 */
export function numFaces(pmesh: gs.IPolymesh): number {
    error.checkObj(pmesh, gs.EObjType.polymesh);
    return pmesh.numFaces();
}

/**
 * Get the number of wires in a polymesh.
 *
 * @param pmesh Polymesh object.
 * @return The number of wires.
 */
export function numWires(pmesh: gs.IPolymesh): number {
    error.checkObj(pmesh, gs.EObjType.polymesh);
    return pmesh.numWires();
}

/**
 * Get the number of edges in a polymesh, for both the wires and the faces.
 *
 * @param pmesh Polymesh object.
 * @return List of two numbers, number of wire edges and number of face edges.
 */
export function numEdges(pmesh: gs.IPolymesh): [number, number] {
    error.checkObj(pmesh, gs.EObjType.polymesh);
    return [pmesh.numWireEdges(), pmesh.numFaceEdges()];
}

/**
 * Get the number of vertices in the polymesh, for both the wires and the faces.
 *
 * @param pmesh Polymesh object.
 * @return List of two numbers, number of wire vertices and number of face vertices.
 */
export function numVertices(pmesh: gs.IPolymesh): [number, number] {
    error.checkObj(pmesh, gs.EObjType.polymesh);
    return [pmesh.numWireVertices(), pmesh.numFaceVertices()];
}

/**
 * Get all points in a polymesh. The sequence of points is in face order.
 *
 * @param pmesh Polymesh object.
 * @return List of points.
 */
export function getPoints(pmesh: gs.IPolymesh): gs.IPoint[] {
    error.checkObj(pmesh, gs.EObjType.polymesh);
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
    const model: gs.IModel = error.checkObj(pmesh, gs.EObjType.polymesh);
    error.checkXYZ(vector);
    // make a copy
    const pmesh1_points: gs.IPoint[][][] = pmesh.getPoints();
    const pmesh2_points: gs.IPoint[][][] = utils.copyObjPoints(pmesh, false);
    threex.movePointsAddXYZ(Arr.flatten(pmesh2_points), vector);
    // create the sides
    const sides: gs.IPoint[][] = poly.pointsLoftLoop([pmesh1_points[0], pmesh2_points[0]], true);
    // combine everything
    const pmesh_points = [...pmesh1_points[1], ...pmesh2_points[1], ...sides];
    // return the new polymesh
    return model.getGeom().addPolymesh(pmesh_points);
}
