/**
 * Function for intersecting geometric objects.
 */

/**
 * Intersect functions find points of intersection where the geometry of two objects intersect.
 * The functions return the intersections and overlaps and do not alter the original input objects.
 * Intersecting can be done either in 2D or in 3D, as indicated by the name of the intersect function.
 * The result of a intersect function will vary depending on the types of objects being intersected.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./libs/threex/threex";
import * as conics from "./libs/conics/circles";
import * as error from "./_error_msgs_dev";

//  ===============================================================================================================
//  Intersect Functions ===========================================================================================
//  ===============================================================================================================

/**
 * Finds the intersection points between two intersecting co-planar circles.
 *
 * @param circle1 Circle 1
 * @param circle2 Circle 2
 * @returns List of intersection points.
 */
export function circleCircle2D(circle1: gs.ICircle, circle2: gs.ICircle): gs.IPoint[] {
    error.checkObjList([circle1, circle2], 2, gs.EObjType.circle);
    return conics._isectCircleCircle2D(circle1, circle2);
}

/**
 * Finds the intersection points between a circle and a plane.
 * If no intersection points are found, or if the circle and plane are co-planar,
 * an empty list is returned.
 *
 * @param circle Circle
 * @param plane Plane
 * @returns List of intersection points (0, 1 or 2).
 */
export function circlePlane3D(circle: gs.ICircle, plane: gs.IPlane): gs.IPoint[] {
    error.checkObj(circle, gs.EObjType.circle);
    error.checkObj(plane, gs.EObjType.plane);
    error.checkObjsSameModel([circle, plane]);
    return conics._isectCirclePlane3D(circle, plane);
}

/**
 * Finds the intersection points between a polyine and a plane.
 * If no intersection points are found, an empty list is returned.
 *
 * @param pline Polyline
 * @param plane Plane
 * @returns List of intersection points.
 */
export function polylinePlane3D(pline: gs.IPolyline, plane: gs.IPlane): gs.IPoint[] {
    const model: gs.IModel = error.checkObj(pline, gs.EObjType.polyline);
    error.checkObj(plane, gs.EObjType.plane);
    error.checkObjsSameModel([pline, plane]);
    // get the points on the polyline
    let pline_xyz: gs.XYZ[] = pline.getPointsArr().map((p) => p.getPosition());
    if (pline.isClosed()) {pline_xyz.push(pline_xyz[0]);}
    // make array to store isect points
    const isect_points: gs.IPoint[] = [];
    // convert plane into three plane
    const three_plane: three.Plane = new three.Plane(
        new three.Vector3(...plane.getNormal()),
        new three.Vector3(...plane.getOrigin().getPosition()).length()
    );
    // loop through each edge, and check for intersections
    for (let i=0; i<pline_xyz.length - 1; i++) {
        const three_line: three.Line3 = new three.Line3(
            new three.Vector3(...pline_xyz[i]),
            new three.Vector3(...pline_xyz[i + 1])
        );
        const result: three.Vector3 = three_plane.intersectLine(three_line);
        if (result !== undefined) {
            const isect_point: gs.IPoint = model.getGeom().addPoint([result.x, result.y, result.z]);
            isect_points.push(isect_point);
        }
    }
    // return an array of intersection points
    return isect_points;
}
