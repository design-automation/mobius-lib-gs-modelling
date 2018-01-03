import * as gs from "gs-json";
import * as mathjs from "mathjs";
// import * as quartic from "quartic";

/**
 * Calculates distance between two points or two clusters of points
 * @param points_1 Point 1 or first cluster of points
 * @param points_2 Point 2 or second cluster of points
 * @param min Returns minimum distance between two clusters of points if true, maximum distance if false
 * @returns Distance between points if successful, none if unsuccessful or on error
 */
export function distBetweenPoints(point_1: gs.IPoint, point_2: gs.IPoint, min: boolean=true ) {
    throw new Error("Method not implemented");
}

/**
 * Returns the roots of a four degree polynomial
 * @param the five coefficients of the polynomial
 * @returns the four roots
 */
export function quarticRoots(coefficients: number[]): number[] {

    if(!(coefficients.length === 5)) {throw new Error("5 coefficients required for a quartic");}
    const a: number = coefficients[0];
    const b: number = coefficients[1];
    const c: number = coefficients[2];
    const d: number = coefficients[3];
    const e: number = coefficients[4];
    const p: number = (8*a*c - 3*Math.pow(b,2))/(8*Math.pow(a,2));
    const q: number = (Math.pow(b,3) - 4*a*b*c + 8*Math.pow(a,2)*d)/(8*Math.pow(a,3));
    if(a === 0) {throw new Error("Non quartic polynomial");}
    const delta: number =  256*Math.pow(a,3) - 192*Math.pow(a,2)*b*d*Math.pow(e,2)
                         - 128*Math.pow(a,2)*Math.pow(c,2)*Math.pow(e,2) + 144*Math.pow(a,2)*c*Math.pow(d,2)*e
                         - 27*Math.pow(a,2)*Math.pow(d,4) + 144*a*Math.pow(b,2)*c*Math.pow(e,2)
                         - 6*a*Math.pow(b,2)*Math.pow(d,2)*e - 80*a*b*Math.pow(c,2)*d*e + 18*a*b*c*Math.pow(d,3)
                         + 16*a*Math.pow(c,4)*e - 4*a*Math.pow(c,3)*Math.pow(d,2) - 27*Math.pow(b,4)*Math.pow(e,2)
                         + 18*Math.pow(b,3)*c*d*e - 4*Math.pow(b,3)*Math.pow(d,3) - 4*Math.pow(b,3)*Math.pow(d,3)
                         - 4*Math.pow(b,2)*Math.pow(c,3)*e + Math.pow(b*c*d,2);

    const P: number = 8*a*c - 3*Math.pow(b,2);
    const R: number = Math.pow(b,3) + 8*d*Math.pow(a,2);
    const delta_0: number = Math.pow(c,2) - 3*b*d + 12*a*e;
    const delta_1: number = 2*Math.pow(c,3) - 9*b*c*d + 27*Math.pow(b,2)*e +27*a*Math.pow(d,2) - 72*a*c*e;
    const D: number =  64*Math.pow(a,3)*e - 16* Math.pow(a,2)*Math.pow(c,2) + 16*a*Math.pow(b,2)*c
                     - 16*Math.pow(a,2)*b*d - 3*Math.pow(b,4);

    const Q: number = Math.pow((delta_1 + Math.pow(Math.pow(delta_1,2) - 4*Math.pow(delta_0,3),1/2))/2,1/3);
    const S: number = Math.pow(-2/3*p + (Q + delta_0/Q) /(3*a),2 )/2 ;

    const x1: number = -b/(4*a) - S + Math.sqrt(-4*Math.pow(S,2) - 2*p + q/S)/2 ;
    const x2: number = -b/(4*a) - S - Math.sqrt(-4*Math.pow(S,2) - 2*p + q/S)/2 ;
    const x3: number = -b/(4*a) + S + Math.sqrt(-4*Math.pow(S,2) - 2*p - q/S)/2 ;
    const x4: number = -b/(4*a) + S + Math.sqrt(-4*Math.pow(S,2) - 2*p - q/S)/2 ;

    // return [x1, x2, x3, x4]; // To Do
    const xx: number[] = [];
    switch(xx.length) {
        case 5: {const coeff4: number[] = xx;}
        case 4: {const coeff3: number[] = xx;}
        case 3: {const coeff2: number[] = xx;}
        case 2: {const coeff1: number[] = xx;}
        case 1: {const coeff0: number[] = xx;}
        //default: {throw new Error("Quartic solver, max polynomial degree is 4");}                    }
    }
    return [];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// DRAFT /////////////////////////////////////////////////////////////////////

// import * as quartic from "quartic";
// import * as math from "mathjs";
// import * as algebra from "algebra.js";

// export function solver(coeff: number[]): number[]{
//     switch(coeff.length){
//         case 5: {
//             const order_4:number = quartic(coeff);
//             const sol: number[] = [];
//             if(order_4[0].im === 0){sol.push(order_4[0].re);}
//             if(order_4[1].im === 0){sol.push(order_4[1].re);}
//             if(order_4[2].im === 0){sol.push(order_4[2].re);}
//             if(order_4[3].im === 0){sol.push(order_4[3].re);}
//             return sol; // use Set in Sol.
//         }
//         case 4: {
//             let order_3: algebra.Expression = new algebra.Expression("x");
//             order_3 = ((((order_3.multiply(order_3.multiply(order_3.multiply(coeff[0]))))
// .add((order_3.multiply(order_3.multiply(coeff[1])))))).add(order_3.multiply(coeff[2]))).add(coeff[3]);
//             const eq1: algebra.cubic = new algebra.Equation(order_3,0);
//             console.log(eq1.toString())
//             return eq1.solveFor("x");
//         }
//         case 3: {
//             let order_2: algebra.Expression = new algebra.Expression("x");
//             order_2 = ((((order_2.multiply(order_2.multiply(coeff[0]))))))
// .add(order_2.multiply(coeff[1])).add(coeff[2]);
//             const eq2: algebra.quadratic = new algebra.Equation(order_2,0);
//             console.log(eq2.toString())
//             console.log(33);
//             return eq2.solveFor("x");
//         }
//         case 2: {
//             let order_1: algebra.Expression = new algebra.Expression("x");
//             order_1 = (order_1.multiply(coeff[0])).add(coeff[1]);
//             const eq3: algebra.cubic = new algebra.Equation(order_1,0);
//             console.log(eq3.toString());
//             return eq3.solveFor("x");
//         }
//         default: {throw new Error("Quartic solver, polynomial degree is 4");}
//         }
// }

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
