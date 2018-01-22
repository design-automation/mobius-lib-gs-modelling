import * as gs from "gs-json";
import * as mathjs from "mathjs";
import * as roots from "poly-roots";
import * as quadratic from "solve-quadratic-equation";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as kld from "kld-intersections";

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
    const g1: gs.IGeom = m1.getGeom();
    const threshold: number = 1e-6;
    const r: number = circle1.getRadius() + circle2.getRadius();
    const O1O2: three.Vector3 = threex.vectorFromPointsAtoB(circle1.getOrigin(),circle2.getOrigin(),false);
    if (O1O2.length() > r ) {return null;}
    const v1: number[][] = [circle1.getVectors()[0],circle1.getVectors()[1],circle1.getVectors()[2]];
    const v2: number[][] = [circle2.getVectors()[0],circle2.getVectors()[1],circle1.getVectors()[2]];
    if(!threex.planesAreCoplanar(circle1.getOrigin(),
     threex.crossXYZs([v1[0][0],v1[0][1],v1[0][2]],[v1[1][0],v1[1][1],v1[1][2]],false),
     circle2.getOrigin(),
     threex.crossXYZs([v2[0][0],v2[0][1],v2[0][2]],[v2[1][0],v2[1][1],v2[1][2]],false))
        ) {throw new Error("Entities must be coplanar.");}
    // Direct Orthonormal Basis of reference
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    // Circle 1 Direct Orthonormal Basis
    const C1: three.Vector3 = new three.Vector3(
        circle1.getOrigin().getPosition()[0],circle1.getOrigin().getPosition()[1],circle1.getOrigin().getPosition()[2]);
    const U1: three.Vector3 = new three.Vector3(v1[0][0],v1[0][1],v1[0][2]).normalize();
    const V1: three.Vector3 = new three.Vector3(v1[1][0],v1[1][1],v1[1][2]).normalize();
    const W1: three.Vector3 = threex.crossVectors(U1,V1,true);
    const C2: three.Vector3 = new three.Vector3(
        circle2.getOrigin().getPosition()[0],circle2.getOrigin().getPosition()[1],circle2.getOrigin().getPosition()[2]);
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
        points.push(g1.addPoint([point.x,point.y,point.z]));
    }
    return points;
}
/**
 * Circle-Plane intersection
 * @param circle
 * @param plane
 * @returns An array of intersection points
 */
export function _isectCirclePlane3D(circle: gs.ICircle, plane: gs.IPlane): gs.IPoint[] {
    const m1: gs.IModel = circle.getModel();
    const m2: gs.IModel = plane.getModel();
    if(m1 !== m2) {throw new Error("Identical models are required for the circle and the plane");}
    const norm: number[] = [plane.getCartesians()[0],plane.getCartesians()[1],plane.getCartesians()[2]];
    const U1: three.Vector3 = new three.Vector3(
    circle.getVectors()[0][0], circle.getVectors()[0][1], circle.getVectors()[0][2]);
    const V1: three.Vector3 = new three.Vector3(
    circle.getVectors()[1][0], circle.getVectors()[1][1], circle.getVectors()[1][2]);
    let W1: three.Vector3 = new three.Vector3();
    W1 = W1.crossVectors(U1,V1);
    const coplanar: number = W1.length();
    if (coplanar === 0) {return null;}
    const m: gs.IModel = new gs.Model();
    const m_origin: gs.IPoint = m.getGeom().addPoint(circle.getOrigin().getPosition());
    const plane_origin: gs.IPoint = m.getGeom().addPoint(plane.getOrigin().getPosition());
    const plane_vectors: gs.XYZ[] = plane.getVectors();
    const m_plane: gs.IPlane = m.getGeom().addPlane(plane_origin, plane_vectors[0], plane_vectors[1]);
    const m_circle: gs.ICircle = m.getGeom().addCircle(m_origin, circle.getVectors()[0],circle.getVectors()[1],[0,360]);
    const projected_origin: gs.IPoint = m.getGeom().addPoint(
    pl._PointOrthoProjectPlane(m_origin,m_plane).getPosition());
    const distance_to_plane = threex.vectorFromPointsAtoB(m_origin, projected_origin).length();
    const sphere_radius: number = m_circle.getRadius();
    const projected_radius: number = Math.sqrt(sphere_radius*sphere_radius - distance_to_plane*distance_to_plane);
    const m_U1: three.Vector3 = new three.Vector3();
    const m_V1: three.Vector3 = new three.Vector3();
    const projected_circle: gs.ICircle = m.getGeom().addCircle(
    projected_origin,
    [m_U1.x,m_U1.y,m_U1.z],[m_V1.x,m_V1.y,m_V1.z]);
    const points: gs.IPoint[] = _isectCircleCircle2D(m_circle, projected_circle);
    const result: gs.IPoint[] = [];
    for(const point of points) {
    result.push(m1.getGeom().addPoint(point.getPosition()));
    }
    throw new Error("Method not implemented.");
    return result;
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
            // root: number[] = [];
            const threshold: number = 1e-10;
            if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[1][0])
                < threshold) {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[0][0]);}
            if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[1][1])
                < threshold) { root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[0][1]);}
            if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[1][2])
                < threshold) { root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3]])[0][2]);}
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
    const threshold_x_y: number = 1e-4;
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
                if (Math.abs((x / a) * (x / a) + e * (y / b) * (y / b) * e - 1) < threshold_x_y) {
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
                if (Math.abs((x / a) * (x / a) + e * (y / b) * (y / b) * e - 1) < threshold_x_y) {
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
                    if (Math.abs(2*p*y - x*x) < threshold_x_y) {
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
