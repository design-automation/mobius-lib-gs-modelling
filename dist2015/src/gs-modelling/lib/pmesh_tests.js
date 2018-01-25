"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_pmesh_fromPoints = test_pmesh_fromPoints;
exports.test_pmesh_fromPline = test_pmesh_fromPline;
exports.test_pmesh_offset = test_pmesh_offset;
exports.test_pmesh_thicken = test_pmesh_thicken;

var _export_dev = require("./_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_pmesh_fromPoints() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pmesh = gsm.pmesh.FromPoints([[p1, p2, p3]]);
    if (pmesh === undefined) {
        return false;
    }
    return true;
}
function test_pmesh_fromPline() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pline = gsm.pline.FromPoints([p1, p2, p3], false);
    var pmesh = gsm.pmesh.FromPline(pline);
    if (pmesh === undefined) {
        return false;
    }
    return true;
}
function test_pmesh_offset() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    var pmesh = gsm.pmesh.FromPoints([[p1, p2, p3]]);
    gsm.pmesh.offset(pmesh, 0.2);
    if (pmesh === undefined) {
        return false;
    }
    if (pmesh.numFaces() !== 1) {
        return false;
    }
    return true;
}
function test_pmesh_thicken() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [10, 0, 0]);
    var p3 = gsm.point.FromXYZ(m, [0, 10, 0]);
    // const pmesh: gs.IPolymesh = gsm.pmesh.FromPoints([[p1, p2, p3]]);
    // const pmesh_thick: gs.IPolymesh = gsm.pmesh.thicken(pmesh, 0.2, 0.4);
    // if (pmesh_thick === undefined) {return false;}
    // if (pmesh_thick.numFaces() !== 5) {return false;}
    return true;
}
//# sourceMappingURL=pmesh_tests.js.map