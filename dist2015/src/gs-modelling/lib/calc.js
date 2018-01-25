"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.distBetweenPoints = distBetweenPoints;

var _three_utils_dev = require("./_three_utils_dev");

var threex = _interopRequireWildcard(_three_utils_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Pline Get and Copy ============================================================================================
//  ===============================================================================================================
/**
 * Dist
 * @param point1
 * @param point2
 * @returns
 */
function distBetweenPoints(point1, point2) {
    if (!point1.exists()) {
        throw new Error("point1 has been deleted.");
    }
    if (!point2.exists()) {
        throw new Error("point2 has been deleted.");
    }
    return threex.vectorFromPointsAtoB(point1, point2).length();
}
//# sourceMappingURL=calc.js.map
/**
 * Calcs
 */