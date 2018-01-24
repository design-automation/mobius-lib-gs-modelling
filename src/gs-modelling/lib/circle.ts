/**
 * Circles are a type of object.
 *
 * Circles are represented by a point and a set of vectors.
 */

import * as gs from "gs-json";
import * as util from "./circle_dev";
import * as three from "three";
//  ===============================================================================================================
//  Circle Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a circle from the model based on an index number
 * @param model Model to get circle from
 * @param id Index number of circle
 * @returns Circle object if successful
 */
export function Get(model: gs.IModel, id: number): gs.ICircle {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null;}
    if (obj.getObjType() !== gs.EObjType.circle) {
        throw new Error("Object is not a circle. Object type is: " + obj.getObjType());
    }
    return obj as gs.ICircle;
}

//  ===============================================================================================================
//  Circle Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a circle from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the radius
 * @param vec_y Direction vector describing y-axis of plane
 * @returns New circle if successful, null if unsuccessful or on error
 */
export function FromOriginVectors(origin: gs.IPoint, vec_x: gs.XYZ, vec_y: gs.XYZ): gs.ICircle {
    return origin.getGeom().addCircle(origin, vec_x, vec_y);
}

/**
 * Adds a closed circle to the model based on an origin point and radius
 *
 * Circle will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the circle
 * @param origin Center point of circle
 * @param radius Radius of circle
 * @returns New circle if successful
 */
export function FromOrigin(origin: gs.IPoint, radius: number ): gs.ICircle {
    return origin.getGeom().addCircle(origin, [radius, 0, 0], [0, radius, 0],[0,360]);
}

/**
 * Adds a closed circle to the model based on a plane and radius
 *
 * Circle will be constructed parallel to the plane with the origin of the plane as the center point of the
 * circle
 * @param plane Plane to construct circle on
 * @param radius Radius of circle
 * @returns New circle if successful
 */
export function FromPlane(plane: gs.IPlane, radius: number ): gs.ICircle {
    const vecs: gs.XYZ[] = plane.getVectors();
    const vec_x: gs.XYZ = new three.Vector3(...vecs[0]).setLength(radius).toArray() as gs.XYZ;
    const vec_y: gs.XYZ = vecs[1];
    return plane.getGeom().addCircle(plane.getOrigin(), vec_x, vec_y);
}

//  ===============================================================================================================
//  Arc Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a circle from an origin point and two direction vectors describing the x and y axis
 * @param origin 3D point to use as origin of plane
 * @param vec_x Vector describing x-axis of plane, and the radius
 * @param vec_y Direction vector describing y-axis of plane
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @returns New circle if successful, null if unsuccessful or on error
 */
export function ArcFromOriginVectors(origin: gs.IPoint,
                                     vec_x: gs.XYZ, vec_y: gs.XYZ, angles: [number, number]): gs.ICircle {
    return origin.getGeom().addCircle(origin, vec_x, vec_y, util._argsCheckAngles(angles));
}

/**
 * Adds a closed circle to the model based on an origin point and radius
 *
 * Arc will be constructed parallel to the world XY plane with the specifed origin point as the center
 * point of the arc
 * @param origin Center point of arc
 * @param radius Radius of arc
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @returns New arc (circle) if successful
 */
export function ArcFromOrigin(origin: gs.IPoint, radius: number, angles: [number, number] ): gs.ICircle {
    return origin.getGeom().addCircle(origin, [radius, 0, 0], [0, 1, 0], util._argsCheckAngles(angles));
}

/**
 * Adds a circular arc to the model based on a plane and radius
 *
 * Arc will be constructed parallel to the plane with the origin of the plane as the center point of the
 * circle that forms the arc<br/>
 * Arc will be constructed starting from the x-axis of the specified plane and follows the circle in the
 * specified direction until it reaches the angle specified
 * @param plane Plane to construct arc on
 * @param radius Radius of arc
 * @param angles Two angles between 0 and 360, for start and end of arc.
 * @param clockwise Constructs arc in a clockwise direction of true, anticlockwise if false
 * @returns New arc  (circle) if successful
 */
export function ArcFromPlane(plane: gs.IPlane, radius: number, angles: [number, number]): gs.ICircle {
    const vecs: gs.XYZ[] = plane.getVectors();
    const vec_x: gs.XYZ = new three.Vector3(...vecs[0]).setLength(radius).toArray() as gs.XYZ;
    const vec_y: gs.XYZ = vecs[1];
    return plane.getGeom().addCircle(plane.getOrigin(), vec_x, vec_y, util._argsCheckAngles(angles));
}

//  ===============================================================================================================
//  Get and Set ===================================================================================================
//  ===============================================================================================================

/**
 * Gets the origin of a Circle
 * @param circle Circle to obtain origin from
 * @returns Origin point of Circle
 */
export function getOrigin(circle: gs.ICircle): gs.IPoint {
    return circle.getOrigin();
}

/**
 * Gets the x and y vectors of a Circle
 *
 * Direction of x and y vectors reflect the x and y axis of the underlying circle or ellipse of the circle<br/>
 * Magnitude of x and y vectors reflect the x and y radius of the underlying circle or ellipse of the circle
 * @param circle Circle to obtain vectors from
 * @returns List of x and y vectors of a Circle
 */
export function getVectors(circle: gs.ICircle): gs.XYZ[] {
    return circle.getVectors();
}

/**
 * Sets the angles for the arc. If this object was previously a closed circle, it will now become an open arc.
 *
 * @param circle Circle to get angles from.
 * @returns The angles, or null.
 */
export function getArcAngles(circle: gs.ICircle): [number, number] {
    return circle.getAngles();
}

/**
 * Sets the angles for the arc. If this object was previously a closed circle, it will now become an open arc.
 *
 * @param circle Circle to set value for
 * @param angles The value to set
 * @returns True if successful, null if unsuccessful or on error
 */
export function setArcAngles(circle: gs.ICircle, angles: [number, number]): void {
    if (angles === null) {
        circle.setAngles(undefined);
    } else {
        circle.setAngles(util._argsCheckAngles(angles));
    }
}

/**
 * Checks if a Circle is closed. If it is not closed, then it must be an arc.
 * @param circle Circle to test
 * @returns True if Circle is closed
 */
export function isClosed(circle: gs.ICircle): boolean {
    return circle.isClosed();
}

/**
 * Closes the arc, so that it becomes a circle.
 *
 * @param arc Circle to set value for
 * @returns True if successful, null if unsuccessful or on error
 */
export function close(arc: gs.ICircle): void {
    arc.setAngles(undefined);
}

//  ===============================================================================================================
//  Functions =====================================================================================================
//  ===============================================================================================================

/**
 * Returns the length of a Circle
 *
 * If specified circle is a closed circle or ellipse, returns the circumference of the circle or ellipse
 * @param circle Circle to obtain length from
 * @returns Length of circle
 */
export function length(circle: gs.ICircle): number {
    const circle_length: number = 2 * Math.PI * Math.pow(circle.getRadius(), 2);
    if (circle.isClosed()) {return circle_length;}
    const angles: [number, number] = circle.getAngles();
    return circle_length * ((angles[1] - angles[0]) / 360);
}
