"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_point_FromXYZ = test_point_FromXYZ;
exports.test_point_FromXYZs = test_point_FromXYZs;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _export_dev = require("./_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_point_FromXYZ() {
    var m = new gs.Model();
    var point = gsm.point.FromXYZ(m, [1, 2, 3]);
    if (point === undefined) {
        return false;
    }
    return true;
}
function test_point_FromXYZs() {
    var m = new gs.Model();
    var point = gsm.point.FromXYZs(m, [[1, 2, 3], [2, 2, 2], [-1, -2, -33], [1.1, 2.2, 3.3]]);
    if (point === undefined) {
        return false;
    }
    return true;
}
//# sourceMappingURL=point_tests.js.map