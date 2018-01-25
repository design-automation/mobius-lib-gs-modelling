"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_model_New = test_model_New;
exports.test_model_FromData = test_model_FromData;
exports.test_model_Save = test_model_Save;

var _export_dev = require("./_export_dev");

var gsm = _interopRequireWildcard(_export_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_model_New() {
    var m = gsm.model.New();
    if (m === undefined) {
        return false;
    }
    return true;
}
function test_model_FromData() {
    var m = gsm.model.New();
    if (m === undefined) {
        return false;
    }
    gsm.point.FromXYZs(m, [[1, 2, 3], [2, 3, 4], [3, 4, 5]]);
    var data = m.toJSON();
    var m2 = gsm.model.FromData(data);
    if (m2 === undefined) {
        return false;
    }
    if (m2.getGeom().numPoints() !== 3) {
        return false;
    }
    return true;
}
function test_model_Save() {
    var m = gsm.model.New();
    if (m === undefined) {
        return false;
    }
    gsm.point.FromXYZs(m, [[1, 2, 3], [2, 3, 4], [3, 4, 5]]);
    //gsm.model.save(m, "file.json"); // diable to avoid model being downloaded every time
    return true;
}
//# sourceMappingURL=model_tests.js.map