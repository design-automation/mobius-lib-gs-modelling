import * as gs from "gs-json";

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
    return [];
     }

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
