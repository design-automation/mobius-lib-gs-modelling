"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_calc_distBetweenPoints = test_calc_distBetweenPoints;

var _export_dev = require("./_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_calc_distBetweenPoints() {
    var m = gsm.model.New();
    var p1 = gsm.point.FromXYZ(m, [0, 0, 0]);
    var p2 = gsm.point.FromXYZ(m, [12, 0, 0]);
    var dist = gsm.calc.distBetweenPoints(p1, p2);
    if (dist !== 12) {
        return false;
    }
    return true;
}
//# sourceMappingURL=calc_tests.js.map