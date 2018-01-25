"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.xfromXYZ = xfromXYZ;
exports.xfromXYZfromGlobal = xfromXYZfromGlobal;

var _three = require("three");

var three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function xfromXYZ(xyz_list, from_origin, from_vectors, to_origin, to_vectors) {
    var e1 = new three.Vector3(from_vectors[0][0]).normalize();
    var e2 = new three.Vector3(from_vectors[0][1]).normalize();
    var e3 = new three.Vector3(from_vectors[0][2]).normalize();
    var b1 = new three.Vector3(to_vectors[0][0]).normalize();
    var b2 = new three.Vector3(to_vectors[0][1]).normalize();
    var b3 = new three.Vector3(to_vectors[0][2]).normalize();
    if (e1.dot(e2) === 0) {
        throw new Error("Orthonormal initial basis required");
    }
    if (e1.dot(e3) === 0) {
        throw new Error("Orthonormal initial basis required");
    }
    if (e2.dot(e3) === 0) {
        throw new Error("Orthonormal initial basis required");
    }
    if (b1.dot(b2) === 0) {
        throw new Error("Orthonormal initial basis required");
    }
    if (b1.dot(b3) === 0) {
        throw new Error("Orthonormal initial basis required");
    }
    if (b2.dot(b3) === 0) {
        throw new Error("Orthonormal initial basis required");
    }
    var matrix = new three.Matrix3();
    matrix.set(e1.dot(b1), e1.dot(b2), e1.dot(b3), e2.dot(b1), e2.dot(b2), e2.dot(b3), e3.dot(b1), e3.dot(b2), e3.dot(b3));
    var t_x = to_origin[0] - from_origin[0];
    var t_y = to_origin[1] - from_origin[1];
    var t_z = to_origin[2] - from_origin[2];
    return [[e1.dot(b1), e1.dot(b2), e1.dot(b3), t_x], [e2.dot(b1), e2.dot(b2), e2.dot(b3), t_y], [e3.dot(b1), e3.dot(b2), e3.dot(b3), t_z], [0, 0, 0, 1]];
}
function xfromXYZfromGlobal(xyz_list, to_origin, to_vectors) {
    return xfromXYZ(xyz_list, [0, 0, 0], [[1, 0, 0], [0, 1, 0], [0, 0, 1]], to_origin, to_vectors);
}
//# sourceMappingURL=_math_xform_dev.js.map