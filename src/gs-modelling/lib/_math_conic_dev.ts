import * as gs from "gs-json";
import * as mathjs from "mathjs";
import * as roots from "poly-roots";
import * as quadratic from "solve-quadratic-equation";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as kld from "kld-intersections";
import * as pl from "./plane_dev";
import * as trigo from "./trigo_dev";

const EPS = 1e-6;

/**
 * Find the center of a circle that passes through three XYZ positions in 3D space.
 * @returns An array of intersection points
 */
function _circleCenterFrom3Points(a: gs.XYZ, b: gs.XYZ, c: gs.XYZ): gs.XYZ {
    //https://math.stackexchange.com/questions/1076177/3d-coordinates-of-circle-center-given-three-point-on-the-circle
    const ax = a[0]; const ay = a[1]; const az = a[2];
    const bx = b[0]; const by = b[1]; const bz = b[2];
    const cx = c[0]; const cy = c[1]; const cz = c[2];
    const Cx = bx-ax;
    const Cy = by-ay;
    const Cz = bz-az;
    const Bx = cx-ax;
    const By = cy-ay;
    const Bz = cz-az;
    const B2 = ax**2-cx**2+ay**2-cy**2+az**2-cz**2;
    const C2 = ax**2-bx**2+ay**2-by**2+az**2-bz**2;
    const CByz = Cy*Bz-Cz*By;
    const CBxz = Cx*Bz-Cz*Bx;
    const CBxy = Cx*By-Cy*Bx;
    const ZZ1 = -(Bz-Cz*Bx/Cx)/(By-Cy*Bx/Cx);
    const Z01 = -(B2-Bx/Cx*C2)/(2*(By-Cy*Bx/Cx));
    const ZZ2 = -(ZZ1*Cy+Cz)/Cx;
    const Z02 = -(2*Z01*Cy+C2)/(2*Cx);
    // and finally the coordinates of the center:
    const dz = -((Z02-ax)*CByz-(Z01-ay)*CBxz-az*CBxy)/(ZZ2*CByz-ZZ1*CBxz+CBxy);
    const dx = ZZ2*dz + Z02;
    const dy = ZZ1*dz + Z01;
    return [dx, dy, dz] as gs.XYZ;
}

export function _circleFrom3Points(xyz1: gs.XYZ, xyz2: gs.XYZ, xyz3: gs.XYZ, is_closed: boolean):
        {origin: gs.XYZ, vec_x: gs.XYZ, vec_y: gs.XYZ, angle: number} {
    // create vectors
    const p1: three.Vector3 = new three.Vector3(...xyz1);
    const p2: three.Vector3 = new three.Vector3(...xyz2);
    const p3: three.Vector3 = new three.Vector3(...xyz3);
    const world_x: three.Vector3 = new three.Vector3(1,0,0);
    const world_y: three.Vector3 = new three.Vector3(0,1,0);
    const world_z: three.Vector3 = new three.Vector3(0,0,1);
    // calc vectors for xform matrix
    const x_axis: three.Vector3 = threex.subVectors(p2, p1); // .normalize();
    const tmp_vec: three.Vector3 = threex.subVectors(p3, p2);
    const z_axis: three.Vector3 = threex.crossVectors(x_axis, tmp_vec); // .normalize();
    const y_axis: three.Vector3 = threex.crossVectors(z_axis, x_axis); // .normalize();
    // create the xform matrices to map 3d -> 2d
    const m: three.Matrix4 = threex.xformMatrix(p1, x_axis, y_axis);
    const m_inv: three.Matrix4 = threex.matrixInverse(m);
    // calc the circle origin
    const p2_2d: three.Vector3 = threex.multVectorMatrix(p2, m);
    const p3_2d: three.Vector3 = threex.multVectorMatrix(p3, m);
    const origin_2d_xyz: gs.XYZ = _circleCenterFrom3Points(
        [0,0,0], p2_2d.toArray() as gs.XYZ, p3_2d.toArray() as gs.XYZ);
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
            angle: null};
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
        angle: angle};
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
    if (m1 !== m2) {throw new Error("Entities must be in the same model.");}
    const v1: [gs.XYZ, gs.XYZ, gs.XYZ] = circle1.getAxes();
    const v2: [gs.XYZ, gs.XYZ, gs.XYZ] = circle2.getAxes();
    if(!threex.planesAreCoplanar(circle1.getOrigin(), v1[2], circle2.getOrigin(), v2[2])) {
        throw new Error("Entities must be coplanar.");
    }
    const g1: gs.IGeom = m1.getGeom();
    const r: number = circle1.getRadius() + circle2.getRadius();
    const O1O2: three.Vector3 = threex.vectorFromPointsAtoB(circle1.getOrigin(),circle2.getOrigin(),false);
    if (O1O2.length() > r ) {return null;}
    // Direct Orthonormal Basis of reference
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    // Circle 1 Direct Orthonormal Basis
    const C1: three.Vector3 = new three.Vector3(...circle1.getOrigin().getPosition());
    const U1: three.Vector3 = new three.Vector3(...v1[0]).normalize();
    const V1: three.Vector3 = new three.Vector3(...v1[1]).normalize();
    const W1: three.Vector3 = threex.crossVectors(U1,V1,true);
    const angles_circle_1: number = circle1.getAngles()[1]-circle1.getAngles()[0];
    // Circle 2 Direct Orthonormal Basis
    const C2: three.Vector3 = new three.Vector3(...circle2.getOrigin().getPosition());
    const U2: three.Vector3 = new three.Vector3(...v2[0]).normalize();
    const V2: three.Vector3 = new three.Vector3(...v2[1]).normalize();
    const W2: three.Vector3 = threex.crossVectors(U2,V2,true);
    const angles_circle_2: number = circle2.getAngles()[1]-circle2.getAngles()[0];

    // Rotation Matrix expressed in the reference direct orthonormal basis
        // Circle 1
    const C1O1: three.Vector3 = threex.subVectors(O1,C1,false);
    const vec_O_1: three.Vector3 = new three.Vector3(
        threex.dotVectors(C1O1,U1),
        threex.dotVectors(C1O1,V1),
        threex.dotVectors(C1O1,W1),
        );
    const x1: three.Vector3 = new three.Vector3(
        threex.dotVectors(e1,U1),
        threex.dotVectors(e1,V1),
        threex.dotVectors(e1,W1),
        );
    const y1: three.Vector3 = new three.Vector3(
        threex.dotVectors(e2,U1),
        threex.dotVectors(e2,V1),
        threex.dotVectors(e2,W1),
        );
    const rotation1: three.Matrix4 = threex.xformMatrix(vec_O_1,x1,y1);
    // Initial Rotation Matrix expressed in the reference direct orthonormal basis
        // Circle 1
    const O1C1: three.Vector3 = threex.subVectors(C1,O1,false);
    const init_vec_O_1: three.Vector3 = new three.Vector3(
        threex.dotVectors(O1C1,e1),
        threex.dotVectors(O1C1,e2),
        threex.dotVectors(O1C1,e3),
        );
    const init_x1: three.Vector3 = new three.Vector3(
        threex.dotVectors(U1,e1),
        threex.dotVectors(U1,e2),
        threex.dotVectors(U1,e3),
        );
    const init_y1: three.Vector3 = new three.Vector3(
        threex.dotVectors(V1,e1),
        threex.dotVectors(V1,e2),
        threex.dotVectors(V1,e3),
        );
    const init_rotation1: three.Matrix4 = threex.xformMatrix(init_vec_O_1,init_x1,init_y1);
    const a: three.Vector3 = threex.multVectorMatrix(C1,init_rotation1);
    const b: three.Vector3 = threex.multVectorMatrix(C2,init_rotation1);
    const circle_1 = {
        center: new kld.Point2D(a.x,a.y),
        radius: circle1.getRadius(),
    };
    const circle_2 = {
        center: new kld.Point2D(b.x,b.y),
        radius: circle2.getRadius(),
    };
    const result: kld.Intersection = kld.Intersection.intersectCircleCircle(circle_1.center, circle_1.radius,
        circle_2.center, circle_2.radius);
    // Retransforming into original coordinates system
    const results: three.Vector3[] = [];
    for (const point of result.points) {
        results.push(new three.Vector3(point.x,point.y,0));
    }
    const results_c1: three.Vector3[] = [];
    for (const point of results) {
        results_c1.push(threex.multVectorMatrix(point,rotation1));
    }
    const points: gs.IPoint[] = [];
    for(const point of results_c1) {
        const C1_to_Point: three.Vector3 = new three.Vector3(point.x - C1.x,point.y - C1.y,point.z - C1.z);
        const C2_to_Point: three.Vector3 = new three.Vector3(point.x - C2.x,point.y - C2.y,point.z - C2.z);
        const angle_1: number = U1.angleTo(C1_to_Point);
        const angle_2: number = U2.angleTo(C2_to_Point);
        if(angles_circle_1 - angle_1 >= 0 && angles_circle_2 - angle_2 >= 0) {
        points.push(g1.addPoint([point.x,point.y,point.z]));
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
    if(plane.getModel() !== m) {
        throw new Error("Identical models are required for the circle and the plane");
    }
    // get plane
    const PO: number[] = plane.getOrigin().getPosition();
    const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    // get circle
    const C0: number[] = circle.getOrigin().getPosition();
    const CA: [gs.XYZ,gs.XYZ,gs.XYZ] = circle.getAxes();
    const U1: three.Vector3 = new three.Vector3(...CA[0]);
    const V1: three.Vector3 = new three.Vector3(...CA[1]).setLength(U1.length());
    // calculate t
    const A: number = n1[0]*(C0[0] - PO[0]) + n1[1]*(C0[1] - PO[1]) + n1[2]*(C0[2] - PO[2]);
    const B: number = n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z;
    const C: number = n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z;
    const _t: number[] = trigo._solve_trigo(A,B,C);
    if (_t === null) {return [];}
    // create points of intersection based on the t values
    const result: gs.IPoint[] = [];
//    console.log("T VALUES", A, B, C, _t);
    for (const t of _t) {
        if (t !== null) {
            let ok: boolean = false;
            if (circle.isClosed()) {
                ok = true;
            } else {
                let angle: number = t * (180/Math.PI);
                if (t < 0) {angle = angle + 360;}
                const circle_angles: [number, number] = circle.getAngles();
                if (angle >= circle_angles[0] && angle < circle_angles[1]) {ok = true;}
            }
            if (ok) {
                result.push(m.getGeom().addPoint([
                    C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                    C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                    C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z]));
            }
        }
    }
    return result;
}

/**
 * Ellipse-Plane intersection
 * @param ellipse
 * @param plane
 * @returns Adds intersecting points to the geometry if successfull, null if empty or coplanar
 */
export function _isectEllipsePlane3D(ellipse: gs.IEllipse, plane: gs.IPlane): gs.IPoint[] {
    const m1: gs.IModel = ellipse.getModel();
    const m2: gs.IModel = plane.getModel();
    if(m1 !== m2) {
        throw new Error("Identical models are required for the circle and the plane");
    }
    const O: number[] = plane.getOrigin().getPosition();
    const C0: number[] = ellipse.getOrigin().getPosition();
    const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    const U1: three.Vector3 = new three.Vector3(
        ellipse.getAxes()[0][0],
        ellipse.getAxes()[0][1],
        ellipse.getAxes()[0][2]);
    const V1: three.Vector3 = new three.Vector3(
        ellipse.getAxes()[1][0],
        ellipse.getAxes()[1][1],
        ellipse.getAxes()[1][2]);
    let W1: three.Vector3 = new three.Vector3();
    W1 = W1.crossVectors(U1,V1);
    const coplanar: number = W1.length();
    if (coplanar === 0) {return null;}
    const a: number = U1.length();
    const b: number = V1.length();
    if(b>a) {
        const m: gs.IModel = new gs.Model();
        const g: gs.IGeom = m.getGeom();
        const ellipse_or_2nd: gs.IPoint = g.addPoint([C0[0],C0[1],C0[2]]);
        const u1_2nd: three.Vector3 = (V1.normalize()).multiplyScalar(b);
        const v1_2nd: three.Vector3 = (U1.normalize()).multiplyScalar(-a);
        const ellipse2: gs.IEllipse = g.addEllipse(
        ellipse_or_2nd,[u1_2nd.x,u1_2nd.y,u1_2nd.z],[v1_2nd.x,v1_2nd.y,v1_2nd.z],[0,360]);
        const O2: gs.IPoint = g.addPoint([O[0],O[1],O[2]]);
        const plane2: gs.IPlane = g.addPlane(O2, plane.getAxes()[0],plane.getAxes()[1]);
        const m_results: gs.IPoint[] = _isectEllipsePlane3D(ellipse2, plane2);
        const resultat: gs.IPoint[] = [];
        for (const m_r of m_results) {
            resultat.push(m1.getGeom().addPoint(m_r.getPosition()));
        }
        return resultat;
    }
    const e: number = Math.sqrt(1 - (b/a)*(b/a));
    const p: number = b*b/a;
    const CF: number[] = [C0[0] + Math.sqrt(a*a-b*b)*U1.x,
                          C0[1] + Math.sqrt(a*a-b*b)*U1.y,
                          C0[2] + Math.sqrt(a*a-b*b)*U1.z];
    const A_: number = n1[0]*(CF[0] - O[0]) + n1[1]*(CF[1] - O[1]) + n1[2]*(CF[2] - O[2]);
    const B_: number = (n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z)*p;
    const C_: number = (n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z)*p;
    const A: number = A_;
    const B: number = B_ + A_*e;
    const C: number = C_;
    const _t: number[] = trigo._solve_trigo(A,B,C);
    if (_t === null) {return null;}
    const result: gs.IPoint[] = [];
    for (const t of _t) {
    result.push(m1.getGeom().addPoint([C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
                          C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
                          C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z]));
    }
    if (result.length === 0) {return null;}
    return result;
}

// /**
//  * Hyperbola-Plane intersection
//  * @param Hyperbola
//  * @param Plane
//  * @returns Adds intersecting points to the geometry if successfull, null if empty or coplanar
//  */
// export function _isectHyperbolaPlane3D(hyperbola: gs.IHyperbola, plane: gs.IPlane): gs.IPoint[] {
//     const m1: gs.IModel = hyperbola.getModel();
//     const m2: gs.IModel = plane.getModel();
//     if(m1 !== m2) {
//         throw new Error("Identical models are required for the circle and the plane");
//     }
//     const O: number[] = plane.getOrigin().getPosition();
//     const C0: number[] = hyperbola.getOrigin().getPosition();
//     const n1: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
//     const U1: three.Vector3 = new three.Vector3(
//         hyperbola.getVectors()[0][0],
//         hyperbola.getVectors()[0][1],
//         hyperbola.getVectors()[0][2]);
//     const V1: three.Vector3 = new three.Vector3(
//         hyperbola.getVectors()[1][0],
//         hyperbola.getVectors()[1][1],
//         hyperbola.getVectors()[1][2]);
//     let W1: three.Vector3 = new three.Vector3();
//     W1 = W1.crossVectors(U1,V1);
//     const coplanar: number = W1.length();
//     if (coplanar === 0) {return null;}
//     const a: number = U1.length();
//     const b: number = V1.length();
//     const e: number = Math.sqrt(1 + (b/a)*(b/a));
//     const p: number = b*b/a;
//     const A_: number = n1[0]*(C0[0] - O[0]) + n1[1]*(C0[1] - O[1]) + n1[2]*(C0[2] - O[2]);
//     const B_: number = (n1[0]*U1.x + n1[1]*U1.y + n1[2]*U1.z)*p;
//     const C_: number = (n1[0]*V1.x + n1[1]*V1.y + n1[2]*V1.z)*p;
//     const A: number = A_;
//     const B: number = B_ + A_*e;
//     const C: number = C_;
//     const _t: number[] = trigo._solve_trigo(A,B,C);
//     if (_t === null) {return null;}
//     const result: gs.IPoint[] = [];
//     for (const t of _t) {
//     result.push(m1.getGeom().addPoint([C0[0] + Math.cos(t)*U1.x + Math.sin(t)*V1.x,
//                           C0[1] + Math.cos(t)*U1.y + Math.sin(t)*V1.y,
//                           C0[2] + Math.cos(t)*U1.z + Math.sin(t)*V1.z]));
//     }
//     if (result.length === 0) {return null;}
//     return result;
// }

/**
 * Circle-Line intersection
 * @param circle
 * @param Line, represented by 2 Points
 * @returns An array of intersection points
 */
export function _isectCircleLine2D(): void {
    // const result: kld.Intersection = kld.Intersection.intersectCircleLine(new kld.Point2D(0,0), 1,
    // new kld.Point2D(-1,-1), new kld.Point2D(1,1));
    // for (const point of result.points) {
    // console.log([point.x,point.y]);
    // }
       throw new Error("Method not implemented.");

}
/**
 * Circle-ellipse intersection
 * @param circle
 * @param ellipse
 * @returns An array of intersection points
 */
export function _isectCircleEllipse2D(circle: gs.ICircle, ellipse: gs.IEllipse): gs.IPoint[] {

    throw new Error("Method not implemented.");

}

/**
 * Circle-ellipse intersection
 * @param ellipse1
 * @param ellipse2
 * @returns An array of intersection points
 */
export function _isectEllipseEllipse2D(ellipse1: gs.IEllipse, ellipse2: gs.IEllipse): gs.IPoint[] {

    throw new Error("Method not implemented.");

}

/**
 * Calculates distance between two points or two clusters of points
 * @param points_1 Point 1 or first cluster of points
 * @param points_2 Point 2 or second cluster of points
 * @param min Returns minimum distance between two clusters of points if true, maximum distance if false
 * @returns Dist0ance between points if successful, none if unsuccessful or on error
 */
export function distBetweenPoints(point_1: gs.IPoint[], point_2: gs.IPoint[], minimum: boolean=true ) {
        let min: number = 0;
        let max: number = 0;
        let distance: number = 0;
        for(const p1 of point_1) {
            for(const p2 of point_2) {
                        distance = Math.sqrt(
                        (p1.getPosition()[0] - p2.getPosition()[0])*(p1.getPosition()[0] - p2.getPosition()[0])
                       + (p1.getPosition()[1] - p2.getPosition()[1])*(p1.getPosition()[1] - p2.getPosition()[1])
                       + (p1.getPosition()[2] - p2.getPosition()[2])*(p1.getPosition()[2] - p2.getPosition()[2]) );
                        if( distance > max) { max = distance;}
                        if( distance < min) { min = distance;}
            }
        }
        if( minimum === true) {return min;}
        return max;
}

export function identifier(coeff: number[]): number[] {
    if(!(coeff.length === 5)) {throw new Error("5 coefficients expected");}
    if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0 && coeff[4] === 0 ) { coeff = [] ;}
    if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0 ) { coeff.splice(0,4) ;}
    if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 ) { coeff.splice(0,3) ;}
    if( coeff[0] === 0 && coeff[1] === 0 ) { coeff.splice(0,2) ;}
    if( coeff[0] === 0 ) { coeff.splice(0,1) ;}
    switch(coeff.length) {
        case 5: {
            const root: number[] = [];
//            const threshold1: number = 1e-10; // to couple with an additional test
            // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][0]) < threshold1)
            // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][0]);}
            // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][1]) < threshold1)
            // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][1]);}
            // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][2]) < threshold1)
            // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][2]);}
            // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][3]) < threshold1)
            // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][3]);}

            root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][0]);
            root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][1]);
            root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][2]);
            root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][3]);

            return root;
        }
        case 4: {
            let root: number[] = [];
            if( coeff[3] === 0) {
            root = quadratic(coeff[0],coeff[1],coeff[2]);
            root.push(0);
            return root;}
            // Third degree polynomial has at least 1 real root
            if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[1][0])
                < EPS) {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[0][0]);}
            if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[1][1])
                < EPS) { root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[0][1]);}
            if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[1][2])
                < EPS) { root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[0][2]);}
            if(root.length === 0) {throw new Error("Smaller threshold required in solver");}
            return root;
       }
        case 3: {
            // return quadratic(coeff[0],coeff[1],coeff[2]);
            const a: number = coeff[0];
            const b: number = coeff[1];
            const c: number = coeff[2];
            const delta: number = b*b - 4*a*c;
            // console.log("delta is " + delta);
            if (delta === 0) {return [-b/(2*a)];}
            if (delta < 0) {return [];}
            if (delta > 0) {return [(-b - Math.sqrt(delta))/(2*a), (-b + Math.sqrt(delta))/(2*a)];}
        }
        case 2: {
            if(coeff[0] === 0) {return [];}
            return [-coeff[1]/coeff[0]];
        }
        case 1: {
            return [];
        }
        case 0: {
            return [];
        }
        default: {throw new Error(" ");}
        }
}

///////////////////////////////
// 4 types of conics, individually expressed as [a,b,p,e]
// e = +1 : ellipse/circle & {a,b}
// e = -1 : hyperbola & {a,b}
// e = 0 : parabola & p
///////////////////////////////

export function General_Form(conic1: number[], origin1: number[], origin2: number[], alpha: number): number[] {
 // change of coordinates of orthonormal basis (angle + translation) with an appearing x.y term due to the Alpha
    // General form of C1 expressed in R2

    // change of coordinates of orthonormal basis (angle + translation) with an appearing x.y term due to the Alpha
    // General form of C1 expressed in R2
    // We use the reducted form of the C1 expression in R1 that we
    // transform by translating (x0,y0) (in R1'),
    // then rotating (by alpha degrees, alpha is the Direct Angle from R2 to R1')
    // The general form is then C1 in R2.
    // Alpha is espressed in degrees, we convert it into radians

    const alpha_rd: number = alpha * ( 2* Math.PI) /360;

    const a: number = conic1[0];
    const b: number = conic1[1];
    const p: number = conic1[2];
    const e: number = conic1[3];
    const x0: number = origin1[0] - origin2[0];
    const y0: number = origin1[1] - origin2[1];
    let A: number = null;
    let B: number = null;
    let C: number = null;
    let D: number = null;
    let E: number = null;
    let F: number = null;
    switch(e) {
        case 1:
            A = (Math.cos(alpha_rd)/a)*(Math.cos(alpha_rd)/a) + e*(Math.sin(alpha_rd)/b)*(Math.sin(alpha_rd)/b);
            B = Math.sin(2 * alpha_rd)*( 1/(a*a) - e/(b*b) );
            C = (Math.sin(alpha_rd)/a)*(Math.sin(alpha_rd)/a) + e*(Math.cos(alpha_rd)/b)*(Math.cos(alpha_rd)/b);
            D = -2*x0*Math.cos(alpha_rd)/(a*a) + e*2*y0*Math.sin(alpha_rd)/(b*b);
            E = -2*x0*Math.sin(alpha_rd)/(a*a) - e*2*y0*Math.cos(alpha_rd)/(b*b);
            F = x0*x0/(a*a) + e*y0*y0/(b*b) - 1;
            return [A,B,C,D,E,F];
        case -1:
            A = (Math.cos(alpha_rd)/a)*(Math.cos(alpha_rd)/a) + e*(Math.sin(alpha_rd)/b)*(Math.sin(alpha_rd)/b);
            B = Math.sin(2 * alpha_rd)*( 1/(a*a) - e/(b*b) );
            C = (Math.sin(alpha_rd)/a)*(Math.sin(alpha_rd)/a) + e*(Math.cos(alpha_rd)/b)*(Math.cos(alpha_rd)/b);
            D = -2*x0*Math.cos(alpha_rd)/(a*a) + e*2*y0*Math.sin(alpha_rd)/(b*b);
            E = -2*x0*Math.sin(alpha_rd)/(a*a) - e*2*y0*Math.cos(alpha_rd)/(b*b);
            F = x0*x0/(a*a) + e*y0*y0/(b*b) - 1;
            return [A,B,C,D,E,F];
        case 0:
            A = 1;
            B = 0;
            C = 0;
            D = -2*x0;
            E = -2*p ;
            F = 2*p*y0 + Math.pow(x0,2);
            return [A,B,C,D,E,F];
        default:
            throw new Error("e must be +1, -1 or 0");
    }
}

export function Split(conic1: number[], conic2: number[], origin1: number[], origin2: number[], alpha: number): number[][] {
    // Results expressed in R2
    const a: number = conic2[0];
    const b: number = conic2[1];
    const p: number = conic2[2];
    const e: number = conic2[3];
    const A: number = General_Form(conic1,origin1,origin2,alpha)[0];
    const B: number = General_Form(conic1,origin1,origin2,alpha)[1];
    const C: number = General_Form(conic1,origin1,origin2,alpha)[2];
    const D: number = General_Form(conic1,origin1,origin2,alpha)[3];
    const E: number = General_Form(conic1,origin1,origin2,alpha)[4];
    const F: number = General_Form(conic1,origin1,origin2,alpha)[5];
    const L1: number = null;
    const L2: number = null;
    const L3: number = null;
    const L4: number = null;
    const L5: number = null;
    const R1: number = null;
    const R2: number = null;
    const R3: number = null;
    const R4: number = null;
    const R5: number = null;
    let x1: number = null;
    let x2: number = null;
    let x3: number = null;
    let x4: number = null;
    let x5: number = null;
    let x11: number = null;
    let x12: number = null;
    let x13: number = null;
    let x14: number = null;
    let x15: number = null;
    const x21: number = null;
    const x22: number = null;
    const x23: number = null;
    const x24: number = null;
    const x25: number = null;
    let identify_x: number[] = null;
    let identify_y: number[] = null;
    const sol: number[][] = [];
    const precision: number = 1000 ;

    switch(e) {
        case 1:
            x1 = Math.pow(A, 2) + Math.pow(C, 2) * Math.pow(b / a, 4)
            - 2 * A * C * e * Math.pow(b / a, 2) + e * Math.pow(B * b / a, 2);
            x2 = 2 * A * D - 2 * C * D * e * Math.pow(b / a, 2) + 2 * e * E * B * Math.pow(b / a, 2);
            x3 = Math.pow(D, 2) + 2 * A * C * e + 2 * A * F - 2 * Math.pow(C * b * b / a, 2)
            - 2 * C * F * e * Math.pow(b / a, 2) - e * Math.pow(b * B, 2) + e * Math.pow(E * b / a, 2);
            x4 = 2 * C * D * e * Math.pow(b, 2) + 2 * D * F - 2 * e * E * B * Math.pow(b, 2);
            x5 = Math.pow(C, 2) * Math.pow(b, 4) + Math.pow(F, 2)
            + 2 * e * C * F * Math.pow(b, 2) - e * Math.pow(b * E, 2);
            identify_x = identifier([x1, x2, x3, x4, x5]) ;
            for (const x of identify_x) {
                // is on C1 ?
                // console.log(identify_x)
                x11 = 0;
                x12 = 0;
                x13 = C;
                x14 = B * x + E;
                x15 = A * x * x + D * x + F;
                identify_y = identifier([x11, x12, x13, x14, x15]);
                for(const y of identify_y) {
                // is on C2 ?
                if (Math.abs((x / a) * (x / a) + e * (y / b) * (y / b) * e - 1) < EPS) {
                sol.push([Math.round(x * precision) / precision, Math.round(y * precision) / precision]);}
                }
                }
            return sol;
        case -1:
            x1 = Math.pow(A, 2) + Math.pow(C, 2) * Math.pow(b / a, 4)
            - 2 * A * C * e * Math.pow(b / a, 2) + e * Math.pow(B * b / a, 2);
            x2 = 2 * A * D - 2 * C * D * e * Math.pow(b / a, 2) + 2 * e * E * B * Math.pow(b / a, 2);
            x3 = Math.pow(D, 2) + 2 * A * C * e + 2 * A * F - 2 * Math.pow(C * b * b / a, 2)
            - 2 * C * F * e * Math.pow(b / a, 2) - e * Math.pow(b * B, 2) + e * Math.pow(E * b / a, 2);
            x4 = 2 * C * D * e * Math.pow(b, 2) + 2 * D * F - 2 * e * E * B * Math.pow(b, 2);
            x5 = Math.pow(C, 2) * Math.pow(b, 4) + Math.pow(F, 2)
            + 2 * e * C * F * Math.pow(b, 2) - e * Math.pow(b * E, 2);
            identify_x = identifier([x1, x2, x3, x4, x5]) ;
            for (const x of identify_x) {
                // is on C1 ?
                // console.log(identify_x)
                x11 = 0;
                x12 = 0;
                x13 = C;
                x14 = B * x + E;
                x15 = A * x * x + D * x + F;
                identify_y = identifier([x11, x12, x13, x14, x15]);
                for(const y of identify_y) {
                // is on C2 ?
                if (Math.abs((x / a) * (x / a) + e * (y / b) * (y / b) * e - 1) < EPS) {
                sol.push([Math.round(x * precision) / precision, Math.round(y * precision) / precision]);}
                }
                }
            return sol;
        case 0:
            x1 = C/(4*p*p);
            x2 = B/(2*p);
            x3 = (A + E/(2*p));
            x4 = D;
            x5 = F;
            identify_x = identifier([x1, x2, x3, x4, x5]) ;
            for (const x of identify_x) {
                // is on C1 ?
                x11 = 0;
                x12 = 0;
                x13 = C;
                x14 = B * x + E;
                x15 = A * x * x + D * x + F;
                identify_y = identifier([x11, x12, x13, x14, x15]);
                for(const y of identify_y) {
                    // is on C2 ?
                    if (Math.abs(2*p*y - x*x) < EPS) {
                        sol.push([Math.round(x * precision) / precision, Math.round(y * precision) / precision]);}
                        // sol.push([Math.round(x * precision) / precision, y]) }
                }
                }
            return sol;
    }
}

// let conic1:number[] = [7,0.5,0,1];
// let origin1:number[] = [5,0];
// let conic2:number[] = [1,1,0,1];
// let origin2:number[] = [0,0];
// let alpha:number = 45;

// // Unit test = OK
// // no sol if a<4
// // 1 sol if a = 4
// // 2 sols if 4<a<6
// // 3 sols if a = 6
// // 4 sols if a>6

// console.log("Split Conics");
// //console.log(General_Form(conic1,origin1,origin2,alpha));
// console.log(Split(conic1,conic2,origin1,origin2,alpha));

// Next steps:
// (1) r, theta instead of x0,y0
// (2) plug-in
// (3) check "solve-quadratic-equation" & "poly-roots" (2nd order polynomial & Jenkins Traub)
// (4) further robustness checking
// Looks to work well

//////

export function Function_F(x: number): number {
    let y: number = null;
    const t1: number = Math.sqrt(1 + x*x);
    y = (1/2)* ( x*t1 + Math.log( x + t1 )  );
    return y;
}

export function parabola_lenght(conic: number[] , x1: number, x2: number): number {
    const a: number = conic[0];
    const b: number = conic[1];
    const p: number = conic[2];
    const e: number = conic[3];
    let distance: number = null;
    if (!(e === 0)) { throw new Error("Parabola required");}
    distance = p * ( Function_F(x2/p) - Function_F(x1/p)  ) ;
    return Math.abs(distance);
}

// console.log("parabola length is " + parabola_length([1,1,0.5,0],0,1))
// 1.47, looks ok
// Next step: Unit test + plug

export function ellipse_length(conic: number[], theta_1: number, theta_2: number): number {
    // convention = Direct sense for angles ;
    // Input angles in degrees ;
    // Double check angles ;
    const K: number = 1000;
    let curve: number = 0;
    let theta: number = null;
    const a: number = Math.max(conic[0],conic[1]);
    const b: number = Math.min(conic[0],conic[1]);
    const e: number = Math.sqrt( 1 - (b/a)*(b/a) );
    theta_1 = theta_1 *(2*Math.PI)/360 ;
    theta_2 = theta_2 *(2*Math.PI)/360 ;
    const d_th: number = (theta_2 - theta_1)/K ;
    for(let k = 0; k < K ; k++ ) {
    theta = theta_1 + k*(theta_2 - theta_1)/K ;
    curve = curve + d_th * Math.sqrt(1 - e*Math.sin(theta)*e*Math.sin(theta));}
    curve = a * curve ;
    return curve;
}
// console.log(ellipse_length([1,3,0,1],0,360))
export function hyperbola_length(conic: number[], theta_1: number, theta_2: number): number {
    // convention = Direct sense for angles ;
    // Input angles in degrees ;
    const K: number = 100;
    let curve: number = 0;
    let theta: number = null;
    const a: number = conic[0];
    const b: number = conic[1];
    const e: number = Math.sqrt(1 + (b/a)*(b/a));
    const theta_min: number = Math.min(theta_1, theta_2);
    const theta_max: number = Math.max(theta_1, theta_2);
    theta_1 = theta_min *(2*Math.PI)/360 ;
    theta_2 = theta_max *(2*Math.PI)/360 ;
    const d_th: number = (theta_2 - theta_1)/K ;
    if(((b/a) - Math.tan(Math.abs(theta_1))) <= 0) {throw new Error("Theta_1 not on curve");}
    if(((b/a) - Math.tan(Math.abs(theta_2))) <= 0) {throw new Error("Theta_2 not on curve");}
    for(let k = 0; k < K ; k++ ) {
        theta = theta_1 + k*(theta_2 - theta_1)/K ;
        curve = curve + d_th * b/(Math.sqrt((e*Math.cos(theta))*(e*Math.cos(theta)) - 1));
        // console.log(theta);
    }
    return curve;
}
// Unit test to perform
// console.log(hyperbola_length([1,100,0,-1],0,45));
// console.log(Math.tan(45 * 2 * Math.PI / 360));

/////////////////////////////////// old functions no longer in API list///////////////////////////////////////////////

/**
 * Returns length of a polyline object
 * @param m Model
 * @param polyline Polyline object.
 * @param segment_index Polyline segment index.
 * @param sub_domain List of two numbers identifying the subdomain of the curve to calculate.
 * Ascending order. If omitted, entire polyline length is used. (optional, omit?)
 * @returns Length of polyline as number if successful, none if unsuccessful or on error
 */
export function plineLength(m: gs.IModel, pline: gs.IPolyline, segment_index: number, sub_domain: [number,number] ) {
    throw new Error("Method not implemented");
}
