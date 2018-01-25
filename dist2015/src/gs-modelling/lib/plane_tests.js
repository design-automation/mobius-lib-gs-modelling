"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_plane_FromOriginVectors = test_plane_FromOriginVectors;
exports.test_plane_FromOriginPoints = test_plane_FromOriginPoints;
exports.test_plane_FromOriginWCS = test_plane_FromOriginWCS;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _export_dev = require("./_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_plane_FromOriginVectors() {
    var m = new gs.Model();
    var origin = m.getGeom().addPoint([1, 2, 3]);
    var vec_x = [0, 0, 1];
    var vec_y = [1, 0, 0];
    var plane = gsm.plane.FromOriginVectors(origin, vec_x, vec_y);
    if (plane === undefined) {
        return false;
    }
    return true;
}
function test_plane_FromOriginPoints() {
    var m = new gs.Model();
    var origin = m.getGeom().addPoint([1, 2, 3]);
    var point_on_x = m.getGeom().addPoint([0, 1, 0]);
    var point_on_y = m.getGeom().addPoint([1, 0, 0]);
    var plane = gsm.plane.FromOriginPoints(origin, point_on_x, point_on_y);
    if (plane === undefined) {
        return false;
    }
    return true;
}
function test_plane_FromOriginWCS() {
    var m = new gs.Model();
    var origin = m.getGeom().addPoint([1, 2, 3]);
    var plane = gsm.plane.FromOriginWCS(origin);
    if (plane === undefined) {
        return false;
    }
    return true;
}
//# sourceMappingURL=plane_tests.js.map