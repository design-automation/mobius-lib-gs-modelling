"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._solve_trigo = _solve_trigo;
/**
 * Finds roots of the trigonometric equation A + B.cos(t) + C.sin(t) = 0
 * @param A, real number, parameter of the trigonometric equation
 * @param B, real number, parameter of the trigonometric equation
 * @param C, real number, parameter of the trigonometric equation
 * @return a set of 2 solutions maximum
 */
function _solve_trigo(A, B, C) {
    if (B === 0 && C === 0) {
        return null;
    }
    if (C === 0) {
        return [-Math.acos(-A / B), Math.acos(-A / B)];
    }
    if (B === 0) {
        return [Math.asin(-A / C), Math.PI - Math.asin(-A / C)];
    }
    var m = -C / B;
    var p = -A / C;
    return [Math.asin(-p / m), Math.PI - Math.asin(-p / m)];
}
//# sourceMappingURL=trigo_dev.js.map