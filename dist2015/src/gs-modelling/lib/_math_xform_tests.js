"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_transfromXYZ = test_transfromXYZ;

var _math_xform_dev = require("./_math_xform_dev");

var test = _interopRequireWildcard(_math_xform_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_transfromXYZ() {
    var xyz_list = [[1, 2, 3], [4, 5, 6]];
    var from_origin = [1, 1, 1];
    var from_vectors = [[1, 1, 0], [-1, 1, 0]];
    var to_origin = [8, 7, 6];
    var to_vectors = [[1, 0, 1], [-1, 0, 1]];
    test.xfromXYZ(xyz_list, from_origin, from_vectors, to_origin, to_vectors);
    return true;
}
//# sourceMappingURL=_math_xform_tests.js.map