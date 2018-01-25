"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.genModelTest1 = genModelTest1;

var _export_dev = require("./../lib/_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Generates a model with 4 points. Two of the points have the same position.
 */
function genModelTest1() {
    var m = gsm.model.New();
    gsm.point.FromXYZs(m, [[0, 0, 0], [10, 0, 0], [10, 10, 0]]);
    return m;
}
//# sourceMappingURL=gen_gs_models.js.map