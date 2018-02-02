/**
 * Function for working with planes.
 */

/**
 * Planes are geometric objects definded by a single vertex and a set of parameters.
 * Planes represent an infinite plane in 3D space.
 * The parameters defined the orientation of the plane.
 * The orientation is defined by two vectors, the X and Y vectors of the plane. They must be orthogonal.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";

//  ===============================================================================================================
//  Plane Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a plane from the model based on an ID number.
 * In the viewer, the object label can display (it starts with 'o'), which contains the ID.
 * For example, if the label is "o123", then the ID is the number 123.
 *
 * @param model Model to get plane from.
 * @param id ID number of plane.
 * @returns The plane object.
 */
export function Get(model: gs.IModel, id: number): gs.IPlane {
    // check args
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.plane) {
        throw new Error("Object is not a plane. Object type is: " + obj.getObjType());
    }
    // return the plane
    return obj as gs.IPlane;
}

/**
 * Create a copy of an existing plane.
 *
 * @param plane The plane object to copy.
 * @returns A new plane object.
 */
export function Copy(plane: gs.IPlane, copy_attribs?: boolean): gs.IPlane {
    // check args
    if (!plane.exists()) {throw new Error("plane has been deleted.");}
    // copy and return
    return plane.copy(copy_attribs) as gs.IPlane;
}

/**
 * Copies a plane from one model into another model.
 *
 * @param model The model to copy to.
 * @param plane The plane object to copy.
 * @returns The copied plane object in the model.
 */
export function CopyToModel(model: gs.IModel, plane: gs.IPlane): gs.IPlane {
    // check args
    if (!plane.exists()) {throw new Error("Error: plane has been deleted.");}
    // check it is not already in the model
    if (plane.getModel() === model) {throw new Error("Error: plane is already in model.");}
    // copy circle and return it
    return model.getGeom().copyPlaneFromModel(plane);
}

//  ===============================================================================================================
//  Plane Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Create a plane object from an origin point and two vectors.
 *
 * @param origin Point object, the origin of plane.
 * @param vec_x XYZ vector, the x-axis of plane.
 * @param vec XYZ vector, a vector in the plane. (This vector must not be co-dir with vec_x.)
 * @returns New plane object.
 */
export function FromOriginVectors(origin: gs.IPoint, vec_x: gs.XYZ, vec: gs.XYZ): gs.IPlane {
    // check args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    // create the new plane
    return origin.getGeom().addPlane(origin, vec_x, vec);
}

/**
 * Create a plane object from an origin point, parallel to the WCS XY plane .
 *
 * @param origin Point object, the origin of plane.
 * @returns New plane object.
 */
export function FromOriginXY(origin: gs.IPoint): gs.IPlane {
    // check args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    // create the new plane
    return origin.getGeom().addPlane(origin, [1,0,0], [0,1,0]);
}

/**
 * Create a plane object from an origin point, parallel to the WCS YZ plane .
 *
 * @param origin Point object, the origin of plane.
 * @returns New plane object.
 */
export function FromOriginYZ(origin: gs.IPoint): gs.IPlane {
    // check args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    // create the new plane
    return origin.getGeom().addPlane(origin, [0,1,0], [0,0,1]);
}

/**
 * Create a plane object from an origin point, parallel to the WCS ZX plane .
 *
 * @param origin Point object, the origin of plane.
 * @returns New plane object.
 */
export function FromOriginZX(origin: gs.IPoint): gs.IPlane {
    // check args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    // create the new plane
    return origin.getGeom().addPlane(origin, [0,0,1], [1,0,0]);
}

/**
 * Creates a plane from an origin point and two other points on the plane.
 *
 * @param origin Point object, the origin of plane.
 * @param pt1 Point object, a point on the plane. This will be used to define the plane X axis.
 * @param pt2 Point object, a point on the plane.
 * @returns New plane object.
 */
export function FromOriginPoints(origin: gs.IPoint, pt1: gs.IPoint, pt2: gs.IPoint ):
                                gs.IPlane {
    // check the args
    if (!origin.exists()) {throw new Error("Arg origin has been deleted.");}
    if (!pt1.exists()) {throw new Error("Arg point_on_x has been deleted.");}
    if (!pt2.exists()) {throw new Error("Arg pt2 has been deleted.");}
    const model: gs.IModel = origin.getModel();
    if(pt1.getModel() !== model) { throw new Error("Points need to be in the same model");}
    if(pt2.getModel() !== model) { throw new Error("Points need to be in the same model");}
    // create the plane
    const vec_x: gs.XYZ = threex.vectorFromPointsAtoB(origin, pt1).toArray() as gs.XYZ;
    const vec: gs.XYZ = threex.vectorFromPointsAtoB(origin, pt2).toArray() as gs.XYZ;
    const plane: gs.IPlane = model.getGeom().addPlane(origin, vec_x, vec);
    // return the new plane
    return plane;
}

/**
 * Creates a plane from a circle. The plane will have the same origin and orientation as the circle.
 *
 * @param circle The circle to create a plane from.
 * @returns New plane object.
 */
export function FromCircle(circle: gs.ICircle): gs.IPlane {
    // check args
    if (!circle.exists()) {throw new Error("Circle has been deleted.");}
    // create the new plane
    const vectors: gs.XYZ[] = circle.getAxes();
    return circle.getGeom().addPlane(circle.getOrigin(), vectors[0], vectors[1]);
}

//  ===============================================================================================================
//  Plane Functions ===============================================================================================
//  ===============================================================================================================
