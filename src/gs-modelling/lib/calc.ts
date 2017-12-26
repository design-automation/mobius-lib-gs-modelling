import * as gs from "gs-json";

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

    // const S: number = Math.pow();
    // const Q: number = Math.pow();

    return [];
     }
