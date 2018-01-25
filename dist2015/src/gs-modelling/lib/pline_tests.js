"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_pline_fromPoints = test_pline_fromPoints;
exports.test_pline_From2Points = test_pline_From2Points;
exports.test_pline_evalParam = test_pline_evalParam;
exports.test_pline_join = test_pline_join;
exports.test_pline_extract = test_pline_extract;
exports.test_pline_explode = test_pline_explode;
exports.test_pline_extend = test_pline_extend;
exports.test_pline_extrude = test_pline_extrude;

var _export_dev = require("./_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function test_pline_fromPoints() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], false);
    if (pline === undefined) {
        return false;
    }
    return true;
}
function test_pline_From2Points() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var pline = gsm.pline.From2Points(p1, p2);
    if (pline === undefined) {
        return false;
    }
    return true;
}
function test_pline_evalParam() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], false);
    var pt4 = gsm.pline.evalParam(pline, 0.5);
    if (pt4 === undefined) {
        return false;
    }
    var pt5 = gsm.pline.evalParam(pline, 0.7);
    if (pt5 === undefined) {
        return false;
    }
    var pt6 = gsm.pline.evalParam(pline, 0);
    if (pt6 === undefined) {
        return false;
    }
    var pt7 = gsm.pline.evalParam(pline, 1);
    if (pt7 === undefined) {
        return false;
    }
    return true;
}
function test_pline_join() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var p4 = gsm.point.FromXYZ(m, [1, 5, 9]);
    var p5 = gsm.point.FromXYZ(m, [12, 5, 33]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], true);
    var plines = gsm.pline.extract(pline, [0, 1, 2]);
    var more = gsm.pline.FromPoints([p2, p5, p4], true);
    var more2 = gsm.pline.FromPoints([p2, p3, p5, p1], true);
    var more3 = gsm.pline.FromPoints([p3, p1], true);
    var new_plines = gsm.pline.join([].concat(_toConsumableArray(plines), [more, more2, more3]));
    return true;
}
function test_pline_extract() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], true);
    var plines = gsm.pline.extract(pline, [0, 1, 2]);
    if (plines.length !== 3) {
        return false;
    }
    return true;
}
function test_pline_explode() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], false);
    var plines = gsm.pline.explode(pline, false);
    if (plines.length !== 2) {
        return false;
    }
    var pline2 = gsm.pline.FromPoints([p1, p2, p3], true);
    var plines2 = gsm.pline.explode(pline2, false);
    if (plines2.length !== 3) {
        return false;
    }
    return true;
}
function test_pline_extend() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], false);
    gsm.pline.extend(pline, 0, 5, true); // create points and copy
    gsm.pline.extend(pline, 1, 7, false); // dont create points, dont copy
    return true;
}
function test_pline_extrude() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], false);
    var mesh = gsm.pline.extrude(pline, [1, 2, 3], false);
    var mesh2 = gsm.pline.extrude(pline, [5, 0, 0], false);
    return true;
}
//# sourceMappingURL=pline_tests.js.map