"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_multVectorMatrix = test_multVectorMatrix;
exports.test_xformMatrixPointXYZs = test_xformMatrixPointXYZs;
exports.test_xformMatrix = test_xformMatrix;
exports.test_subVectors = test_subVectors;
exports.test_planesAreCoplanar = test_planesAreCoplanar;
exports.test_pointIsOnPlane = test_pointIsOnPlane;
exports.test_vectorsAreCodir = test_vectorsAreCodir;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _three_utils_dev = require("./_three_utils_dev");

var test = _interopRequireWildcard(_three_utils_dev);

var _three = require("three");

var three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Matrices ======================================================================================================
function test_multVectorMatrix() {
    var O = new three.Vector3(-2, -1, -3);
    var v11 = new three.Vector3(1, 0, 0);
    var v12 = new three.Vector3(0, 1, 0);
    var m1 = test.xformMatrix(O, v11, v12);
    var vector1 = new three.Vector3(1, 1, 1);
    var vector2 = test.multVectorMatrix(vector1, m1);
    if (!gs.Arr.equal([vector2.x, vector2.y, vector2.z], [3, 2, 4])) {
        return false;
    }
    var O2 = new three.Vector3(10, -5, -2);
    var v21 = new three.Vector3(0, 1, 0);
    var v22 = new three.Vector3(-1, 0, 0);
    var m2 = test.xformMatrix(O2, v21, v22);
    var vector21 = new three.Vector3(2, 4, 4);
    var vector22 = test.multVectorMatrix(vector21, m2);
    if (!gs.Arr.equal([vector22.x, vector22.y, vector22.z], [9, 8, 6])) {
        return false;
    }
    return true;
}
function test_xformMatrixPointXYZs() {
    return true;
}
function test_xformMatrix() {
    var O1 = new three.Vector3(1, 0, 0);
    var v11 = new three.Vector3(1, 0, 0);
    var v12 = new three.Vector3(0, 1, 0);
    var m1 = test.xformMatrix(O1, v11, v12);
    // console.log(m1.elements);
    return true;
}
//  Vectors =======================================================================================================
function test_subVectors() {
    var A = new three.Vector3(0, 1, 4);
    var B = new three.Vector3(2, 8, 6);
    var BA = test.subVectors(A, B, false);
    if (!gs.Arr.equal([BA.x, BA.y, BA.z], [-2, -7, -2])) {
        return false;
    }
    return true;
}
//  Query ======================================================================================================
function test_planesAreCoplanar() {
    var m = new gs.Model();
    var g = m.getGeom();
    var O1 = g.addPoint([0, 0, 0]);
    var O2 = g.addPoint([1, 0, 1]);
    if (!test.planesAreCoplanar(O1, [0, 0, 1], O1, [0, 0, 1])) {
        return false;
    }
    if (test.planesAreCoplanar(O1, [0, 0, 1], O2, [0, 0, 1])) {
        return false;
    }
    if (test.planesAreCoplanar(O1, [0, 0, 1], O1, [0, 1, 1])) {
        return false;
    }
    return true;
}
function test_pointIsOnPlane() {
    var m = new gs.Model();
    var g = m.getGeom();
    var O = g.addPoint([0, 0, 0]);
    var normal1 = [0, 0, 1];
    var normal2 = [0, 1, 0];
    var pt1 = g.addPoint([1, 1, 0]);
    if (!test.pointIsOnPlane(O, normal1, pt1)) {
        return false;
    }
    if (test.pointIsOnPlane(O, normal2, pt1)) {
        return false;
    }
    return true;
}
function test_vectorsAreCodir() {
    var xyz1 = [1, 0, 0];
    var xyz2 = [4, 0, 0];
    var xyz3 = [0, 1, 0];
    var xyz4 = [0.0000009, 0, 0];
    var xyz5 = [0, 0, 0];
    if (!test.vectorsAreCodir(xyz1, xyz1)) {
        return false;
    }
    if (!test.vectorsAreCodir(xyz1, xyz2)) {
        return false;
    }
    if (test.vectorsAreCodir(xyz1, xyz3)) {
        return false;
    }
    if (!test.vectorsAreCodir(xyz1, xyz4)) {
        return false;
    }
    if (test.vectorsAreCodir(xyz1, xyz5)) {
        return false;
    }
    return true;
}
//# sourceMappingURL=_three_utils_tests.js.map