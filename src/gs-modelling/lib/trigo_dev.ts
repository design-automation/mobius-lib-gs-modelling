import * as gs from "gs-json";

 /**
  * Finds roots of the trigonometric equation A + B.cos(t) + C.sin(t) = 0
  * @param A, real number, parameter of the trigonometric equation
  * @param B, real number, parameter of the trigonometric equation
  * @param C, real number, parameter of the trigonometric equation
  * @return a set of 2 solutions maximum
  */
export function _solve_trigo(A: number, B: number, C: number): number[] {
    if(B===0 && C===0) {return null;}
    if(C===0) {return [-Math.acos(-A/B), Math.acos(-A/B)];}
    if(B===0) {return [Math.asin(-A/C), Math.PI - Math.asin(-A/C)];}
    const m: number = -C/B;
    const p: number = -A/C;
    return [Math.asin(-p/m), Math.PI - Math.asin(-p/m)];
    }
