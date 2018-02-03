/**
 * Functions for splitting geometric objects that insersect with one another.
 */

/**
 * Split functions split one geometric object with another geometric object.
 * Splitting can be done either in 2D or in 3D, as indicated by the name of the split function.
 * The result of a split function will vary depending on the types of objects being split.
 */

import * as gs from "gs-json";
import * as gsm from "./_export_dev";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as math_conic from "./_math_conic_dev";
import * as error from "./_error_msgs_dev";

//  ===============================================================================================================
//  Split Constructors ============================================================================================
//  ===============================================================================================================

//  ===============================================================================================================
//  Split Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Splits two co-planar circles.
 * If an intersection is found, then new arcs will be generated and the old circles will be deleted.
 * Returns null if circles are not co-planar.
 * Returns null if circles do not intersect.
 *
 * @param circle1 Circle object, the circle to split.
 * @param circle2 Circle object.
 * @returns Four circle objects (arcs) if successful, null if no intersection was found.
 */
export function circleCircle2D(circle1: gs.ICircle, circle2: gs.ICircle): gs.ICircle[] {
    const model: gs.IModel = error.checkObjList([circle1, circle2], 2, gs.EObjType.circle);
    const geom: gs.IGeom = model.getGeom();
    // do intersection
    let points: gs.IPoint[] = math_conic._isectCircleCircle2D(circle1, circle2);
    if (points === null) {return null;}
    if (points.length !== 2) {return null;}
    const circle1_origin: gs.IPoint = circle1.getOrigin();
    const circle2_origin: gs.IPoint = circle2.getOrigin();
    // get the 2 intersection points in the right order
    const order_pt0: three.Vector3 = threex.vectorFromPointsAtoB(circle1_origin, points[0]);
    const order_pt1: three.Vector3 = threex.vectorFromPointsAtoB(circle1_origin, points[1]);
    const angle_check: number = order_pt0.angleTo(order_pt1)*180/Math.PI;
    if(angle_check > 180) {points = [points[1],points[0]];}

    // arc 1 vectors
    const vec1_x: three.Vector3 = threex.vectorFromPointsAtoB(circle1_origin, points[1]);
    const vec1_2nd_x: three.Vector3 = threex.vectorFromPointsAtoB(circle1_origin, points[0]);
    const vec1_y: three.Vector3 = (threex.orthoVectors(vec1_x, vec1_2nd_x).normalize())
        .multiplyScalar(vec1_x.length());
    const vec1_2nd_y: three.Vector3 = threex.orthoVectors(vec1_2nd_x,vec1_x).normalize()
        .multiplyScalar(-vec1_2nd_x.length());
    // arc 1 angle
    const angle1: number = vec1_x.angleTo(vec1_2nd_x) * 180/Math.PI;
    // arc 1 a
    const vec1_x_xyz: gs.XYZ = vec1_x.toArray() as gs.XYZ;
    const vec1_y_xyz: gs.XYZ = vec1_y.toArray() as gs.XYZ;
    const arc1_a: gs.ICircle = geom.addCircle(
        circle1_origin, vec1_x_xyz, vec1_y_xyz, [0, angle1]);
    // arc 1 b
    const vec1_2nd_x_xyz: gs.XYZ = vec1_2nd_x.toArray() as gs.XYZ;
    const vec1_2nd_y_xyz: gs.XYZ = vec1_2nd_y.toArray() as gs.XYZ;
    const arc1_b: gs.ICircle = geom.addCircle(
        circle1_origin, vec1_2nd_x_xyz, vec1_2nd_y_xyz, [0, (360 - angle1)]);

    // arc 2 vectors
    const vec2_x: three.Vector3 = threex.vectorFromPointsAtoB(circle2_origin, points[0]);
    const vec2_2nd_x: three.Vector3 = threex.vectorFromPointsAtoB(circle2_origin, points[1]);
    const vec2_y: three.Vector3 = (threex.orthoVectors(vec2_x, vec2_2nd_x).normalize())
        .multiplyScalar(vec2_x.length());
    const vec2_2nd_y: three.Vector3 = (threex.orthoVectors(vec2_2nd_x, vec2_x).normalize())
        .multiplyScalar(-vec2_x.length());
    // arc 2 angle
    const angle2: number = vec2_x.angleTo(vec2_2nd_x) * 180/Math.PI;
    // arc 2 a
    const vec2_x_xyz: gs.XYZ = vec2_x.toArray() as gs.XYZ;
    const vec2_y_xyz: gs.XYZ = vec2_y.toArray() as gs.XYZ;
    const arc2_a: gs.ICircle = geom.addCircle(
        circle2_origin, vec2_x_xyz, vec2_y_xyz, [0, angle2]);
    // arc 2 b
    const vec2_2nd_x_xyz: gs.XYZ = vec2_2nd_x.toArray() as gs.XYZ;
    const vec2_2nd_y_xyz: gs.XYZ = vec2_2nd_y.toArray() as gs.XYZ;
    const arc2_b: gs.ICircle = geom.addCircle(
        circle2_origin, vec2_2nd_x_xyz, vec2_2nd_y_xyz, [0, (360 - angle2)]);

    // delete the old circles
    geom.delObj(circle1, false);
    geom.delObj(circle2, false);

    // return arcs
    return [arc1_b, arc1_a, arc2_a, arc2_b];

}
