"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_circle_FromOriginVectors = test_circle_FromOriginVectors;
exports.test_circle_From3Points = test_circle_From3Points;
exports.test_circle_ArcFrom3Points = test_circle_ArcFrom3Points;

var _export_dev = require("./_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_circle_FromOriginVectors() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var circle = gsm.circle.FromOriginVectors(p1, [0, 1, 0], [0, 0, 1]);
    if (circle === undefined) {
        return false;
    }
    return true;
}
function test_circle_From3Points() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [4, 10, 7]);
    var p3 = gsm.point.FromXYZ(m, [2, 1, -3]);
    var circle = gsm.circle.From3Points(p1, p2, p3);
    if (circle === undefined) {
        return false;
    }
    return true;
}
function test_circle_ArcFrom3Points() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [10, 10, 0]);
    var arc = gsm.circle.ArcFrom3Points(p1, p2, p3);
    if (arc === undefined) {
        return false;
    }
    var p4 = gsm.point.FromXYZ(m, [10, 0, 10]);
    var arc2 = gsm.circle.ArcFrom3Points(p1, p2, p4);
    if (arc2 === undefined) {
        return false;
    }
    return true;
}
//# sourceMappingURL=circle_tests.js.map