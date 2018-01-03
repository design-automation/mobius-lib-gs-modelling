import * as gs from "gs-json";
import * as mathjs from "mathjs";
import * as quartic from "quartic";
import * as cubic from "poly-roots";
import * as quadratic from "solve-quadratic-equation";

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
 * Analyze a set of 5 coefficients and returns its associated polynomial roots
 * @param the set of five coefficients by descending order
 * @returns the set of real roots if any
 */
export function solver(coeff: number[]): number[] {
    // To Do: use set;
    if(!(coeff.length === 5)) {throw new Error("5 coefficients expected");}
    if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0 && coeff[4] === 0 ) { coeff = [] ;}
    if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0 ) { coeff.splice(0,4) ;}
    if( coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 ) { coeff.splice(0,3) ;}
    if( coeff[0] === 0 && coeff[1] === 0 ) { coeff.splice(0,2) ;}
    if( coeff[0] === 0 ) { coeff.splice(0,1) ;}
    switch(coeff.length) {
        case 5: {
            const order_4: number = quartic(coeff);
            const sol: number[] = [];
            if(order_4[0].im === 0) {sol.push(order_4[0].re);}
            if(order_4[1].im === 0) {sol.push(order_4[1].re);}
            if(order_4[2].im === 0) {sol.push(order_4[2].re);}
            if(order_4[3].im === 0) {sol.push(order_4[3].re);}
            return sol; // use Set in Sol.
        }
        case 4: {
            let root: number[] = [];
            if( coeff[3] === 0) {
                root = quadratic(coeff[0],coeff[1],coeff[2]);
                root.push(0);
                return root;}
            // Third degree polynomial has at least 1 real root
            const threshold: number = 1e-10;
            if ( Math.abs(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[1][0])
             < threshold) {root.push(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[0][0]);}
            if ( Math.abs(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[1][1])
             < threshold) {root.push(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[0][1]);}
            if ( Math.abs(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[1][2])
             < threshold) {root.push(cubic([coeff[0],coeff[1],coeff[2],coeff[3]])[0][2]);}
            if(root.length === 0) {throw new Error("Smaller threshold required in solver");}
            return root;
       }
        case 3: {
            return quadratic(coeff[0],coeff[1],coeff[2]);
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
