/**
 * Ellipses are a type of object.
 *
 * Ellipses are represented by a point and a set of vectors.
 */

import * as gs from "gs-json";
import * as util from "./circle_dev";
import * as three from "three";
//  ===============================================================================================================
//  Ellipse Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a ellipse from the model based on an index number
 * @param model Model to get ellipse from
 * @param id Index number of ellipse
 * @returns Ellipse object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IEllipse {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.ellipse) {
        throw new Error("Object is not a ellipse. Object type is: " + obj.getObjType());
    }
    return obj as gs.IEllipse;
}

//  ===============================================================================================================
//  Ellipse Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a ellipse from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the radius
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New ellipse if successful, null if unsuccessful or on error
 */
export function FromOriginVectors(origin: gs.IPoint, vec_x: gs.XYZ, vec_y: gs.XYZ): gs.IEllipse {
    return origin.getGeom().addEllipse(origin, vec_x, vec_y);
}

/**
 * Adds a closed ellipse to the model based on an origin point and radius
 *
 * Ellipse will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the ellipse
 * @param origin Center point of ellipse
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @returns New ellipse if successful
 */
export function FromOrigin(origin: gs.IPoint, radius_x: number, radius_y: number): gs.IEllipse {
    return origin.getGeom().addEllipse(origin, [radius_x, 0, 0], [0, radius_y, 0]);
}

/**
 * Adds a closed ellipse to the model based on a plane and radius
 *
 * Ellipse will be constructed parallel to the plane with the origin of the plane as the center point of the
 * ellipse
 * @param plane Plane to construct ellipse on
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @returns New ellipse if successful
 */
export function FromPlane(plane: gs.IPlane, radius_x: number, radius_y: number): gs.IEllipse {
    const vecs: gs.XYZ[] = plane.getAxes();
    const vec_x: gs.XYZ = new three.Vector3(...vecs[0]).setLength(radius_x).toArray() as gs.XYZ;
    const vec_y: gs.XYZ = new three.Vector3(...vecs[1]).setLength(radius_y).toArray() as gs.XYZ;
    return plane.getGeom().addEllipse(plane.getOrigin(), vec_x, vec_y);
}

//  ===============================================================================================================
//  Arc Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a ellipse from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the x radius
 * @param vec_y Vector describing x-axis of plane, and the y radius
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @returns New ellipse if successful, null if unsuccessful or on error
 */
export function ArcFromOriginVectors(origin: gs.IPoint,
                                     vec_x: gs.XYZ, vec_y: gs.XYZ, angles: [number, number]): gs.IEllipse {
    return origin.getGeom().addEllipse(origin, vec_x, vec_y, util._argsCheckAngles(angles));
}

/**
 * Adds a closed ellipse to the model based on an origin point and radius
 *
 * Arc will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the arc
 * @param origin Center point of arc
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @returns New ellipse if successful
 */
export function ArcFromOrigin(origin: gs.IPoint, radius_x: number, radius_y: number, angles: [number, number] ): gs.IEllipse {
    return origin.getGeom().addEllipse(origin, [radius_x, 0, 0], [0, radius_y, 0], util._argsCheckAngles(angles));
}

/**
 * Adds a circular arc to the model based on a plane and radius
 *
 * Arc will be constructed parallel to the plane with the origin of the plane as the center point of the
 * ellipse that forms the arc<br/>
 * Arc will be constructed starting from the x-axis of the specified plane and follows the ellipse in the
 * specified direction until it reaches the angle specified
 * @param plane Plane to construct arc on
 * @param radius_x Radius x of ellipse
 * @param radius_y Radius y of ellipse
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @param clockwise Constructs arc in a clockwise direction of true, anticlockwise if false
 * @returns New arc  (ellipse) if successful
 */
export function ArcFromPlane(plane: gs.IPlane, radius_x: number, radius_y: number, angles: [number, number]): gs.IEllipse {
    const vecs: gs.XYZ[] = plane.getAxes();
    const vec_x: gs.XYZ = new three.Vector3(...vecs[0]).setLength(radius_x).toArray() as gs.XYZ;
    const vec_y: gs.XYZ = new three.Vector3(...vecs[1]).setLength(radius_y).toArray() as gs.XYZ;
    return plane.getGeom().addEllipse(plane.getOrigin(), vec_x, vec_y, util._argsCheckAngles(angles));
}

//  ===============================================================================================================
//  Get and Set ===================================================================================================
//  ===============================================================================================================

/**
 * Gets the origin of a Ellipse
 * @param ellipse Ellipse to obtain origin from
 * @returns Origin point of Ellipse
 */
export function getOrigin(ellipse: gs.IEllipse): gs.IPoint {
    return ellipse.getOrigin();
}

/**
 * Gets the x and y vectors of a Ellipse
 *
 * Direction of x and y vectors reflect the x and y axis of the underlying ellipse or ellipse of the ellipse<br/>
 * Magnitude of x and y vectors reflect the x and y radius of the underlying ellipse or ellipse of the ellipse
 * @param ellipse Ellipse to obtain vectors from
 * @returns List of x and y vectors of a Ellipse
 */
export function getAxes(ellipse: gs.IEllipse): gs.XYZ[] {
    return ellipse.getAxes();
}

/**
 * Sets the angles for the arc. If this object was previously a closed ellipse, it will now become an open arc.
 *
 * @param ellipse Ellipse to get angles from.
 * @returns The angles, or null.
 */
export function getArcAngles(ellipse: gs.IEllipse): [number, number] {
    return ellipse.getAngles();
}

/**
 * Sets the angles for the arc. If this object was previously a closed ellipse, it will now become an open arc.
 *
 * @param ellipse Ellipse to set value for
 * @param angles The value to set
 * @returns True if successful, null if unsuccessful or on error
 */
export function setArcAngles(ellipse: gs.IEllipse, angles: [number, number]): void {
    if (angles === null) {
        ellipse.setAngles(undefined);
    } else {
        ellipse.setAngles(util._argsCheckAngles(angles));
    }
}

/**
 * Checks if a Ellipse is closed. If it is not closed, then it must be an arc.
 * @param ellipse Ellipse to test
 * @returns True if Ellipse is closed
 */
export function isClosed(ellipse: gs.IEllipse): boolean {
    return ellipse.isClosed();
}

/**
 * Closes the arc, so that it becomes a ellipse.
 *
 * @param arc Ellipse to set value for
 * @returns True if successful, null if unsuccessful or on error
 */
export function close(arc: gs.IEllipse): void {
    arc.setAngles(undefined);
}

//  ===============================================================================================================
//  Functions =====================================================================================================
//  ===============================================================================================================

/**
 * Returns the length of a Ellipse
 *
 * If specified ellipse is a closed ellipse or ellipse, returns the circumference of the ellipse or ellipse
 * @param ellipse Ellipse to obtain length from
 * @returns Length of ellipse
 */
export function length(ellipse: gs.IEllipse): number {
    throw new Error("Method not implemented.");
}
