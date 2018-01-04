import * as gs from "gs-json";
import * as mathjs from "mathjs";
import * as roots from "poly-roots";
import * as quadratic from "solve-quadratic-equation";

/**
 * Calculates distance between two points or two clusters of points
 * @param points_1 Point 1 or first cluster of points
 * @param points_2 Point 2 or second cluster of points
 * @param min Returns minimum distance between two clusters of points if true, maximum distance if false
 * @returns Distance between points if successful, none if unsuccessful or on error
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

// let conic1: number[] = [2,0.9,0.5,0];
// let origin1: number[] = [0.4,0];
// let conic2: number[] = [1,1,0,1];
// let origin2: number[] = [0,0];
// let alpha: number = 0;
// console.log("Split Conics");
// console.log(Split(conic1,conic2,origin1,origin2,alpha));
// conic1 = [2,0.9,-0.5,0];
// origin1 = [0.4,0];
// conic2 = [1,1,0,1];
// origin2 = [0,0];
// alpha = 0;
// console.log("Split Conics");
// console.log(Split(conic1,conic2,origin1,origin2,alpha));

// /**
//  * Analyze a set of 5 coefficients and returns its associated polynomial roots
//  * @param the set of five coefficients by descending order
//  * @returns the set of real roots if any
//  */
// export function solver(coeff: number[]): number[] {
//     // To Do: use set;
//     if(!(coeff.length === 5)) {throw new Error("5 coefficients expected");}
//     if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0 && coeff[4] === 0 ) { coeff = [] ;}
//     if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0 ) { coeff.splice(0,4) ;}
//     if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 ) { coeff.splice(0,3) ;}
//     if( coeff[0] === 0 && coeff[1] === 0 ) { coeff.splice(0,2) ;}
//     if( coeff[0] === 0 ) { coeff.splice(0,1) ;}
//     switch(coeff.length) {
//         case 5: {
//             const order_4: number = quartic(coeff);
//             const sol: number[] = [];
//             if(order_4[0].im === 0) {sol.push(order_4[0].re);}
//             if(order_4[1].im === 0) {sol.push(order_4[1].re);}
//             if(order_4[2].im === 0) {sol.push(order_4[2].re);}
//             if(order_4[3].im === 0) {sol.push(order_4[3].re);}
//             return sol; // use Set in Sol.
//         }
//         case 4: {
//             let root: number[] = [];
//             if( coeff[3] === 0) {
//                 root = quadratic(coeff[0],coeff[1],coeff[2]);
//                 root.push(0);
//                 return root;}
//             // Third degree polynomial has at least 1 real root
//             const threshold: number = 1e-10;
//             if ( Math.abs(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[1][0])
//              < threshold) {root.push(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[0][0]);}
//             if ( Math.abs(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[1][1])
//              < threshold) {root.push(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[0][1]);}
//             if ( Math.abs(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[1][2])
//              < threshold) {root.push(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[0][2]);}
//             if(root.length === 0) {throw new Error("Smaller threshold required in solver");}
//             return root;
//        }
//         case 3: {
//             return quadratic(coeff[0],coeff[1],coeff[2]);
//         }
//         case 2: {
//             if(coeff[0] === 0) {return [];}
//             return [-coeff[1]/coeff[0]];
//         }
//         case 1: {
//             return [];
//         }
//         case 0: {
//             return [];
//         }
//         default: {throw new Error(" ");}
//         }
//     }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// DRAFT /////////////////////////////////////////////////////////////////////

// import * as quartic from "quartic";
// import * as math from "mathjs";
// import * as algebra from "algebra.js";

// export function c2_coefficients( /* c1 */ ):number[]{
//     let a:number = null;
//     let b:number = null;
//     let r:number = null;
//     let p:number = null;
//     return [a,b,r,p];
// }

// export function c1_coefficients(  /* c1 and c2 */ ):number[]{
//     let A:number = null;
//     let B:number = null;
//     let C:number = null;
//     let D:number = null;
//     let E:number = null;
//     return [A,B,C,D,E];
// }

// export function quartic_coefficients( /* c1, c2 */):number[]{
//     let a: number = null;
//     let b: number = null;
//     let c: number = null;
//     let d: number = null;
//     let e: number = null;

//     return [a,b,c,d,e];
// }

// export function split_conic_conic( /* c1, c2*/ ):number[]{

//     /* solver(quartic_coefficients(c1, c2)) */

// }

// // console.log(solver([1,0,0,0]));

// export function conics_to_quartics():any{
//     // ellipse: origin, radius 1, radius2
//     // circle: origin, radius 1, radius2
//     // hyperbola:
//     // parabola:

// // 1 equation centree reduite
// // de forme x/

// // 1 equation non centree reduite
//     return null }

// let order_3: algebra.Expression = new algebra.Expression("x");
// order_3 = order_3.multiply(3);
// console.log(order_3.toString());
// order_3 = ((order_3.multiply(3)).multiply(order_3)).add(order_3.multiply(order_3));
// console.log(order_3.toString());

// order_3 = ((((order_3.multiply(order_3.multiply(order_3.multiply(coeff[0]))))
// .add((order_3.multiply(order_3.multiply(coeff[1])))))).add(order_3.multiply(coeff[2]))).add(coeff[3]);

// // let y: algebra.Expression = new algebra.Expression("y");
// // let x: algebra.Expression = new algebra.Expression("x");
// // let m1:algebra.Expression = x.multiply(y);
// // let m2:algebra.Expression = m1.eval({y:order_3});
// // console.log(m1.toString());
// // console.log(m2.toString());

// // P1: member1
// // P2: member 2
// // expression = P1 - P2 ;
// // expression y =
// // expression 2 = expression.eval({})

// // get Coefficients
// let a3: number = 4.5;
// let a4: number = 5;
// let a5: number = 6;

// console.log(a3);

// let x: algebra.Expression = new algebra.Expression("x")
// let order_1 = algebra.Expression = x.multiply(x.multiply(a3));
// order_1 = order_1.add(x.multiply(a4));
// order_1 = order_1.add(a5);
// console.log(order_1.toString());

// console.log(order_1.terms[0].coefficients[0])

// // .simplify
// // console.log(m1.eval({}))
// // const equation = new algebra.Equation(x.multiply(y),0);
// // console.log(equation.toString());
// // const answer = y.eval({x: y});
// // console.log(equation.toString());

///////////////////////////////////////// DRAFT /////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
