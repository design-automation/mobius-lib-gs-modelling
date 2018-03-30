import * as mathjs from "mathjs";
import * as three from "three";
import * as roots from "poly-roots";
import * as quadratic from "solve-quadratic-equation";
import * as kld from "kld-intersections";

import * as gs from "gs-json";
import * as threex from "../threex/threex";
import * as trigo from "./trigo";

import * as pl from "../../plane_dev"; // TODO - can be reomved?

const EPS = 1e-6;

/**
 * Find the center of a circle that passes through three XYZ positions in 3D space.
 * @returns An array of intersection points
 */
function _circleCenterFrom3Points(a: gs.XYZ, b: gs.XYZ, c: gs.XYZ): gs.XYZ {
    //https://math.stackexchange.com/questions/1076177/3d-coordinates-of-circle-center-given-three-point-on-the-circle
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    const cx = c[0];
    const cy = c[1];
    const cz = c[2];
    const Cx = bx - ax;
    const Cy = by - ay;
    const Cz = bz - az;
    const Bx = cx - ax;
    const By = cy - ay;
    const Bz = cz - az;
    const B2 = ax ** 2 - cx ** 2 + ay ** 2 - cy ** 2 + az ** 2 - cz ** 2;
    const C2 = ax ** 2 - bx ** 2 + ay ** 2 - by ** 2 + az ** 2 - bz ** 2;
    const CByz = Cy * Bz - Cz * By;
    const CBxz = Cx * Bz - Cz * Bx;
    const CBxy = Cx * By - Cy * Bx;
    const ZZ1 = -(Bz - Cz * Bx / Cx) / (By - Cy * Bx / Cx);
    const Z01 = -(B2 - Bx / Cx * C2) / (2 * (By - Cy * Bx / Cx));
    const ZZ2 = -(ZZ1 * Cy + Cz) / Cx;
    const Z02 = -(2 * Z01 * Cy + C2) / (2 * Cx);
    // and finally the coordinates of the center:
    const dz = -((Z02 - ax) * CByz - (Z01 - ay) * CBxz - az * CBxy) / (ZZ2 * CByz - ZZ1 * CBxz + CBxy);
    const dx = ZZ2 * dz + Z02;
    const dy = ZZ1 * dz + Z01;
    return [dx, dy, dz] as gs.XYZ;
}

export function _circleFrom3Points(xyz1: gs.XYZ, xyz2: gs.XYZ, xyz3: gs.XYZ, is_closed: boolean):
        { origin: gs.XYZ, vec_x: gs.XYZ, vec_y: gs.XYZ, angle: number } {
    // create vectors
    const p1: three.Vector3 = new three.Vector3(...xyz1);
    const p2: three.Vector3 = new three.Vector3(...xyz2);
    const p3: three.Vector3 = new three.Vector3(...xyz3);
    const world_x: three.Vector3 = new three.Vector3(1, 0, 0);
    const world_y: three.Vector3 = new three.Vector3(0, 1, 0);
    const world_z: three.Vector3 = new three.Vector3(0, 0, 1);
    // calc vectors for xform matrix
    const x_axis: three.Vector3 = threex.subVectors(p2, p1); // .normalize();
    const tmp_vec: three.Vector3 = threex.subVectors(p3, p2);
    const z_axis: three.Vector3 = threex.crossVectors(x_axis, tmp_vec); // .normalize();
    const y_axis: three.Vector3 = threex.crossVectors(z_axis, x_axis); // .normalize();
    // create the xform matrices to map 3d -> 2d
    const m: three.Matrix4 = threex.xformMatrixNeg(p1, x_axis, y_axis);
    const m_inv: three.Matrix4 = threex.matrixInverse(m);
    // calc the circle origin
    const p2_2d: three.Vector3 = threex.multVectorMatrix(p2, m);
    const p3_2d: three.Vector3 = threex.multVectorMatrix(p3, m);
    const origin_2d_xyz: gs.XYZ = _circleCenterFrom3Points(
        [0, 0, 0], p2_2d.toArray() as gs.XYZ, p3_2d.toArray() as gs.XYZ);
    const origin_2d: three.Vector3 = new three.Vector3(...origin_2d_xyz);
    const circle_origin: three.Vector3 = threex.multVectorMatrix(origin_2d, m_inv);
    // calc the circle radius
    // const radius: number = origin_2d.length();
    // is not arc? then return data for circle
    m_inv.setPosition(new three.Vector3());
    if (is_closed) {
        const circle_x_axis_2d: three.Vector3 = new three.Vector3(origin_2d.length(), 0, 0);
        const circle_x_axis: three.Vector3 = threex.multVectorMatrix(circle_x_axis_2d, m_inv);
        const circle_y_axis_2d: three.Vector3 = new three.Vector3(0, 1, 0);
        const circle_y_axis: three.Vector3 = threex.multVectorMatrix(circle_y_axis_2d, m_inv);
        return {
            origin: circle_origin.toArray() as gs.XYZ,
            vec_x: circle_x_axis.toArray() as gs.XYZ,
            vec_y: circle_y_axis.toArray() as gs.XYZ,
            angle: null
        };
    }
    // calc the circle vectors
    const circle_x_axis_2d: three.Vector3 = threex.vectorNegate(origin_2d);
    const circle_x_axis: three.Vector3 = threex.multVectorMatrix(circle_x_axis_2d, m_inv);
    const circle_y_axis_2d: three.Vector3 = threex.crossVectors(world_z, circle_x_axis_2d);
    const circle_y_axis: three.Vector3 = threex.multVectorMatrix(circle_y_axis_2d, m_inv);
    // calc the circle angles
    const angle_vec_2d: three.Vector3 = threex.subVectors(p3_2d, origin_2d);
    let angle: number = circle_x_axis_2d.angleTo(angle_vec_2d);
    angle = angle * 180 / Math.PI;
    const angle_gt_180: boolean = (threex.crossVectors(circle_x_axis_2d, angle_vec_2d).z < 0);
    const y_gt_0: boolean = (circle_origin.y > 0);
    if (angle_gt_180) {
        angle = 360 - angle;
    }
    // return the data for arc
    return {
        origin: circle_origin.toArray() as gs.XYZ,
        vec_x: circle_x_axis.toArray() as gs.XYZ,
        vec_y: circle_y_axis.toArray() as gs.XYZ,
        angle: angle
    };
}

/**
 * Check if a points is within the circle arc
 * @param circle
 * @param point
 * @returns True is it is inside
 */
function _pointInCircle(circle: gs.ICircle, point: gs.IPoint) {
    if (circle.isClosed()) {return true;}
    // create matrix to map from the 3D plane for circle into the XY plane
    const origin: gs.XYZ = circle.getOrigin().getPosition();
    const axes: [gs.XYZ, gs.XYZ, gs.XYZ] = circle.getAxes();
    const matrix: three.Matrix4 = threex.xformMatrixFromXYZAxes(origin, axes, true);
    // map the point onto the XY plane
    const vpoint: three.Vector3 = new three.Vector3(...point.getPosition());
    vpoint.applyMatrix4(matrix);
    // calculate the angle between the point vector and the x axis, in radians
    let angle_rad = Math.atan2(vpoint.y, vpoint.x);
    if (angle_rad < 0) {angle_rad += (2 * Math.PI); }
    const angle_deg: number = angle_rad * (180 / Math.PI);
    // mow check angle
    return _angleInCircle(circle, angle_deg);
}

/**
 * Check if a t value (for closed circle) is within the circle arc
 * @param circle
 * @param t
 * @returns True is it is inside
 */
function _tInCircle(circle: gs.ICircle, t: number) {
    if (circle.isClosed()) {return true;}
    const angle: number = t * (180 / Math.PI);
    return _angleInCircle(circle, angle);
}

/**
 * Check if an angle (in degrees) isf within the circle arc
 * @param circle
 * @param angle
 * @returns True is it is inside
 */
function _angleInCircle(circle: gs.ICircle, angle: number) {
    if (circle.isClosed()) {return true;}
    // convert angle to 0 to 360
    if (angle < 0) {angle = 360 + (angle % 360);}
    if (angle > 360) {angle = angle % 360;}
    // get the angles, calc start and end, incl EPS
    const angles: [number, number] = circle.getAngles();
    const start: number = angles[0] - EPS;
    const end: number = angles[1] + EPS;
    // return result
    if (angles[0] < angles[1]) {
        if ((angle > start) && (angle < end)) {return true;}
    } else {
        if ((angle < start) || (angle > end)) {return true;}
    }
    return false;
}

/**
 * Circle-circle intersection
 * @param circle1
 * @param circle2
 * @returns An array of intersection points
 */
export function _isectCircleCircle2D(circle1: gs.ICircle, circle2: gs.ICircle): gs.IPoint[] {
    const m1: gs.IModel = circle1.getModel();
    const m2: gs.IModel = circle2.getModel();
    if (m1 !== m2) { throw new Error("Entities must be in the same model."); }
    const v1: [gs.XYZ, gs.XYZ, gs.XYZ] = circle1.getAxes();
    const v2: [gs.XYZ, gs.XYZ, gs.XYZ] = circle2.getAxes();
    if (!threex.planesAreCoplanar(circle1.getOrigin(), v1[2], circle2.getOrigin(), v2[2])) {
        throw new Error("Entities must be coplanar.");
    }
    const g1: gs.IGeom = m1.getGeom();
    const r: number = circle1.getRadius() + circle2.getRadius();
    const O1O2: three.Vector3 = threex.vectorFromPointsAtoB(circle1.getOrigin(), circle2.getOrigin(), false);
    if (O1O2.length() > r) { return null; }
    // Direct Orthonormal Basis of reference
    const O1: three.Vector3 = new three.Vector3(0, 0, 0);
    const e1: three.Vector3 = new three.Vector3(1, 0, 0);
    const e2: three.Vector3 = new three.Vector3(0, 1, 0);
    const e3: three.Vector3 = new three.Vector3(0, 0, 1);
    // Circle 1 Direct Orthonormal Basis
    const C1: three.Vector3 = new three.Vector3(...circle1.getOrigin().getPosition());
    const U1: three.Vector3 = new three.Vector3(...v1[0]).normalize();
    const V1: three.Vector3 = new three.Vector3(...v1[1]).normalize();
    const W1: three.Vector3 = threex.crossVectors(U1, V1, true);
    let angles1: [number, number] = circle1.getAngles();
    if (angles1 === null) { angles1 = [0, 360]; }
    const angles_circle_1: number = angles1[1] - angles1[0];
    // Circle 2 Direct Orthonormal Basis
    const C2: three.Vector3 = new three.Vector3(...circle2.getOrigin().getPosition());
    const U2: three.Vector3 = new three.Vector3(...v2[0]).normalize();
    const V2: three.Vector3 = new three.Vector3(...v2[1]).normalize();
    const W2: three.Vector3 = threex.crossVectors(U2, V2, true);
    let angles2: [number, number] = circle2.getAngles();
    if (angles2 === null) { angles2 = [0, 360]; }
    const angles_circle_2: number = angles2[1] - angles2[0];

    // Rotation Matrix expressed in the reference direct orthonormal basis
    // Circle 1
    const C1O1: three.Vector3 = threex.subVectors(O1, C1, false);
    const vec_O_1: three.Vector3 = new three.Vector3(
        threex.dotVectors(C1O1, U1),
        threex.dotVectors(C1O1, V1),
        threex.dotVectors(C1O1, W1),
    );
    const x1: three.Vector3 = new three.Vector3(
        threex.dotVectors(e1, U1),
        threex.dotVectors(e1, V1),
        threex.dotVectors(e1, W1),
    );
    const y1: three.Vector3 = new three.Vector3(
        threex.dotVectors(e2, U1),
        threex.dotVectors(e2, V1),
        threex.dotVectors(e2, W1),
    );
    const rotation1: three.Matrix4 = threex.xformMatrixNeg(vec_O_1, x1, y1);
    // Initial Rotation Matrix expressed in the reference direct orthonormal basis
    // Circle 1
    const O1C1: three.Vector3 = threex.subVectors(C1, O1, false);
    const init_vec_O_1: three.Vector3 = new three.Vector3(
        threex.dotVectors(O1C1, e1),
        threex.dotVectors(O1C1, e2),
        threex.dotVectors(O1C1, e3),
    );
    const init_x1: three.Vector3 = new three.Vector3(
        threex.dotVectors(U1, e1),
        threex.dotVectors(U1, e2),
        threex.dotVectors(U1, e3),
    );
    const init_y1: three.Vector3 = new three.Vector3(
        threex.dotVectors(V1, e1),
        threex.dotVectors(V1, e2),
        threex.dotVectors(V1, e3),
    );
    const init_rotation1: three.Matrix4 = threex.xformMatrixNeg(init_vec_O_1, init_x1, init_y1);
    const a: three.Vector3 = threex.multVectorMatrix(C1, init_rotation1);
    const b: three.Vector3 = threex.multVectorMatrix(C2, init_rotation1);
    const circle_1 = {
        center: new kld.Point2D(a.x, a.y),
        radius: circle1.getRadius(),
    };
    const circle_2 = {
        center: new kld.Point2D(b.x, b.y),
        radius: circle2.getRadius(),
    };
    const result: kld.Intersection = kld.Intersection.intersectCircleCircle(circle_1.center, circle_1.radius,
        circle_2.center, circle_2.radius);
    // Retransforming into original coordinates system
    const results: three.Vector3[] = [];
    for (const point of result.points) {
        results.push(new three.Vector3(point.x, point.y, 0));
    }
    const results_c1: three.Vector3[] = [];
    for (const point of results) {
        results_c1.push(threex.multVectorMatrix(point, rotation1));
    }
    const points: gs.IPoint[] = [];
    for (const point of results_c1) {
        const c1_to_point: three.Vector3 = new three.Vector3(point.x - C1.x, point.y - C1.y, point.z - C1.z);
        const c2_to_point: three.Vector3 = new three.Vector3(point.x - C2.x, point.y - C2.y, point.z - C2.z);
        let angle_1: number = U1.angleTo(c1_to_point) * 180 / Math.PI;
        if (threex.crossVectors(U1, c1_to_point).dot(threex.crossVectors(U1, V1)) < 0) { angle_1 = 360 - angle_1; }
        let angle_2: number = U2.angleTo(c2_to_point) * 180 / Math.PI;
        if (threex.crossVectors(U2, c2_to_point).dot(threex.crossVectors(U2, V2)) < 0) { angle_2 = 360 - angle_2; }
        if (angles_circle_1 - angle_1 >= 0 && angles_circle_2 - angle_2 >= 0) {
            points.push(g1.addPoint([point.x, point.y, point.z]));
        }
    }
    return points;
}

/**
 * Circle-Plane intersection
 * @param circle
 * @param plane
 * @returns Adds intersecting points to the geometry if successfull, [] if empty or coplanar
 */
export function _isectCirclePlane3D(circle: gs.ICircle, plane: gs.IPlane): gs.IPoint[] {
    // http://mathforum.org/library/drmath/view/69136.html
    const m: gs.IModel = circle.getModel();
    const eps: number = 1e-7;
    if (plane.getModel() !== m) {
        throw new Error("The circle and the plane must be in teh same model.");
    }
    // get plane
    const PO: number[] = plane.getOrigin().getPosition();
    const n1: number[] = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    // get circle
    const C0: number[] = circle.getOrigin().getPosition();
    const CA: [gs.XYZ, gs.XYZ, gs.XYZ] = circle.getAxes();
    const U1: three.Vector3 = new three.Vector3(...CA[0]);
    const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(U1.length());
    const _n1: three.Vector3 = new three.Vector3(n1[0], n1[1], n1[2]);
    // calculate t
    const A: number = n1[0] * (C0[0] - PO[0]) + n1[1] * (C0[1] - PO[1]) + n1[2] * (C0[2] - PO[2]);
    const B: number = n1[0] * U1.x + n1[1] * U1.y + n1[2] * U1.z;
    const C: number = n1[0] * V1.x + n1[1] * V1.y + n1[2] * V1.z;
    const _t: number[] = trigo._solve_trigo(A, B, C);
    if (_t === null) { return []; }
    const result: gs.IPoint[] = [];
    // create intersection points
    for (const t of _t) {
        if (t !== null) {
            const angle: number = t * (180 / Math.PI);
            if (_angleInCircle(circle, angle)) {
                const point1: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x - PO[0],
                    C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y - PO[1],
                    C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z - PO[2],
                );
                if (Math.abs(_n1.dot(point1)) < eps) {
                    result.push(m.getGeom().addPoint([
                        C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x,
                        C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y,
                        C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z
                    ]));
                }
                const point2: three.Vector3 = new three.Vector3(
                    C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x - PO[0],
                    C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y - PO[1],
                    C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z - PO[2],
                );
                if (Math.abs(_n1.dot(point2)) < eps) {
                    result.push(m.getGeom().addPoint([
                        C0[0] + Math.cos(t + Math.PI) * U1.x + Math.sin(t + Math.PI) * V1.x,
                        C0[1] + Math.cos(t + Math.PI) * U1.y + Math.sin(t + Math.PI) * V1.y,
                        C0[2] + Math.cos(t + Math.PI) * U1.z + Math.sin(t + Math.PI) * V1.z
                    ]));
                }
            }
        }
    }
    return result;
}

/**
 * Circle-Line intersection
 * @param circle
 * @param Line, represented by 2 Points
 * @returns An array of intersection points
 */
export function _isectCircleLine2D(): void {
    throw new Error("Method not implemented.");
}

/**
 * Calculates distance between two points or two clusters of points
 * @param points_1 Point 1 or first cluster of points
 * @param points_2 Point 2 or second cluster of points
 * @param min Returns minimum distance between two clusters of points if true, maximum distance if false
 * @returns Dist0ance between points if successful, none if unsuccessful or on error
 */
export function distBetweenPoints(point_1: gs.IPoint[], point_2: gs.IPoint[], minimum: boolean = true) {
    let min: number = 0;
    let max: number = 0;
    let distance: number = 0;
    for (const p1 of point_1) {
        for (const p2 of point_2) {
            distance = Math.sqrt(
                (p1.getPosition()[0] - p2.getPosition()[0]) * (p1.getPosition()[0] - p2.getPosition()[0]) +
                (p1.getPosition()[1] - p2.getPosition()[1]) * (p1.getPosition()[1] - p2.getPosition()[1]) +
                (p1.getPosition()[2] - p2.getPosition()[2]) * (p1.getPosition()[2] - p2.getPosition()[2]));
            if (distance > max) { max = distance; }
            if (distance < min) { min = distance; }
        }
    }
    if (minimum === true) { return min; }
    return max;
}

/**
 * Find the inner tangents of two coplanar circles.
 * @param circle1
 * @param circle2
 * @returns An array of start and end points of the two tangent lines
 */
export function innerTangentsCircleCircle2D(circle1: gs.ICircle, circle2: gs.ICircle): [gs.IPolyline, gs.IPolyline] {
    const c1_origin: three.Vector3 = new three.Vector3(...circle1.getOrigin().getPosition());
    const c1_axes: three.Vector3[] = circle1.getAxes().map((v) => new three.Vector3(...v));
    const c2_origin: three.Vector3 = new three.Vector3(...circle2.getOrigin().getPosition());
    const c2_axes: three.Vector3[] = circle2.getAxes().map((v) => new three.Vector3(...v));
    if (!threex.planesAreCoplanar(c1_origin, c1_axes[2], c2_origin, c2_axes[2])) {
        throw new Error("Circles must be coplanar.");
    }
    // set the x axis to be from o1 to o2
    const x_vec: three.Vector3 = new three.Vector3().subVectors(c2_origin, c1_origin).normalize();
    const y_vec: three.Vector3 = new three.Vector3().crossVectors(x_vec, c1_axes[2]);
    // make matrixes
    const matrix_pos: three.Matrix4 = threex.xformMatrixPos(c1_origin, x_vec, y_vec);
    const matrix_neg: three.Matrix4 = threex.xformMatrixNeg(c1_origin, x_vec, y_vec);
    // transform origins from 3d to 2d
    c1_origin.applyMatrix4(matrix_neg);
    c2_origin.applyMatrix4(matrix_neg);
    // get the radii
    const r1: number = circle1.getRadius();
    const r2: number = circle2.getRadius();
    // check that circles do not overlap
    if ((r1 + r2) >= c2_origin.x) {return null;}
    // calc mid point
    const dist: number = c2_origin.x;
    const dist1: number = dist * ( r1 / (r1 + r2));
    const dist2: number = dist - dist1;
    // calc angles, a1 is the angle to the start point
    const a1: number = Math.acos(r1 / dist1);
    // calc start and end of each inner tangent line
    const t1_start: three.Vector3 = new three.Vector3(
        r1 * Math.cos(a1), r1 * Math.sin(a1), 0);
    const t2_start: three.Vector3 = new three.Vector3(t1_start.x, -t1_start.y, 0);
    const t1_end: three.Vector3 = new three.Vector3(
        dist - (r2 * Math.cos(a1)), -r2 * Math.sin(a1), 0);
    const t2_end: three.Vector3 = new three.Vector3(t1_end.x, -t1_end.y, 0);
    // tranform points from 2d to 3d
    t1_start.applyMatrix4(matrix_pos);
    t2_start.applyMatrix4(matrix_pos);
    t1_end.applyMatrix4(matrix_pos);
    t2_end.applyMatrix4(matrix_pos);
    // create points in the model
    const g: gs.IGeom = circle1.getModel().getGeom();
    const t1_start_point: gs.IPoint = g.addPoint(t1_start.toArray() as gs.XYZ);
    const t2_start_point: gs.IPoint = g.addPoint(t2_start.toArray() as gs.XYZ);
    const t1_end_point: gs.IPoint = g.addPoint(t1_end.toArray() as gs.XYZ);
    const t2_end_point: gs.IPoint = g.addPoint(t2_end.toArray() as gs.XYZ);
    // return the two polylines
    return [
        g.addPolyline([t1_start_point, t1_end_point], false),
        g.addPolyline([t2_start_point, t2_end_point], false)
    ];
}

/**
 * Find the outer tangents of two coplanar circles.
 * @param circle1
 * @param circle2
 * @returns An array of two tangent lines
 */
export function outerTangentsCircleCircle2D(circle1: gs.ICircle, circle2: gs.ICircle): [gs.IPolyline, gs.IPolyline] {
    const c1_origin: three.Vector3 = new three.Vector3(...circle1.getOrigin().getPosition());
    const c1_axes: three.Vector3[] = circle1.getAxes().map((v) => new three.Vector3(...v));
    const c2_origin: three.Vector3 = new three.Vector3(...circle2.getOrigin().getPosition());
    const c2_axes: three.Vector3[] = circle2.getAxes().map((v) => new three.Vector3(...v));
    if (!threex.planesAreCoplanar(c1_origin, c1_axes[2], c2_origin, c2_axes[2])) {
        throw new Error("Circles must be coplanar.");
    }
    // set the x axis to be from o1 to o2
    const x_vec: three.Vector3 = new three.Vector3().subVectors(c2_origin, c1_origin).normalize();
    const y_vec: three.Vector3 = new three.Vector3().crossVectors(x_vec, c1_axes[2]);
    // make matrixes
    const matrix_pos: three.Matrix4 = threex.xformMatrixPos(c1_origin, x_vec, y_vec);
    const matrix_neg: three.Matrix4 = threex.xformMatrixNeg(c1_origin, x_vec, y_vec);
    // transform origins from 3d to 2d
    c1_origin.applyMatrix4(matrix_neg);
    c2_origin.applyMatrix4(matrix_neg);
    // get the radii
    const r1: number = circle1.getRadius();
    const r2: number = circle2.getRadius();
    // check that circles do not overlap
    if ((r1 + r2) >= c2_origin.x) {return null;}
    // dist between origins
    const dist: number = c2_origin.x;
    // calc angles, a1 is the angle to the start point
    let a1: number;
    if (r1 > r1) {
        a1 = Math.acos((r2 - r1) / dist);
    } else {
        a1 = -Math.acos((r1 - r2) / dist);
    }
    // calc start and end of each inner tangent line
    const t1_start: three.Vector3 = new three.Vector3(
        r1 * Math.cos(a1), r1 * Math.sin(a1), 0);
    const t1_end: three.Vector3 = new three.Vector3(
        dist + (r2 * Math.cos(a1)), r2 * Math.sin(a1), 0);
    const t2_start: three.Vector3 = new three.Vector3(t1_start.x, -t1_start.y, 0);
    const t2_end: three.Vector3 = new three.Vector3(t1_end.x, -t1_end.y, 0);
    // tranform points from 2d to 3d
    t1_start.applyMatrix4(matrix_pos);
    t2_start.applyMatrix4(matrix_pos);
    t1_end.applyMatrix4(matrix_pos);
    t2_end.applyMatrix4(matrix_pos);
    // create points in the model
    const g: gs.IGeom = circle1.getModel().getGeom();
    const t1_start_point: gs.IPoint = g.addPoint(t1_start.toArray() as gs.XYZ);
    const t2_start_point: gs.IPoint = g.addPoint(t2_start.toArray() as gs.XYZ);
    const t1_end_point: gs.IPoint = g.addPoint(t1_end.toArray() as gs.XYZ);
    const t2_end_point: gs.IPoint = g.addPoint(t2_end.toArray() as gs.XYZ);
    // return the two polylines
    return [
        g.addPolyline([t1_start_point, t1_end_point], false),
        g.addPolyline([t2_start_point, t2_end_point], false)
    ];
}
