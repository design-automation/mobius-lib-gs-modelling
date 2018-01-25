"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_circleCircle2D = test_circleCircle2D;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _split = require("./split");

var sl = _interopRequireWildcard(_split);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_circleCircle2D() {
    var m = new gs.Model();
    var g = m.getGeom();
    var pt1 = g.addPoint([-0.5, 0, 0]);
    var pt2 = g.addPoint([0.5, 0, 0]);
    var radius = 1;
    var circle1 = g.addCircle(pt1, [1, 0, 0], [0, 0, 1], [0, 360]);
    var circle2 = g.addCircle(pt2, [1, 0, 0], [0, 0, 1], [0, 360]);
    var arcs = sl.circleCircle2D(circle1, circle2);
    var k = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arcs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var arc = _step.value;

            // console.log("circle " + k);
            // console.log("    Radius " + arc.getRadius());
            // console.log("    Angles [" + arc.getAngles()[0] + "  to  " + arc.getAngles()[1] + "]");
            // console.log("    Vectors_x    ["
            // + arc.getVectors()[0][0] + "  ,  "+ arc.getVectors()[0][1] + "  ,  "+ arc.getVectors()[0][2] + "]");
            // console.log("    Vectors_y    [" + arc.getVectors()[1] + "]");
            k++;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var m1 = new gs.Model();
    var g1 = m1.getGeom();
    var p1 = g1.addPoint([-5, 0, 0]);
    var p2 = g1.addPoint([5, 0, 0]);
    var c1 = g1.addCircle(p1, [10, 0, 0], [0, 10, 0], [0, 360]);
    var c2 = g1.addCircle(p2, [10, 0, 0], [0, 10, 0], [0, 360]);
    var circles = sl.circleCircle2D(c1, c2);
    k = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = circles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var circle = _step2.value;

            // console.log("circle " + k);
            // console.log("    Radius " + circle.getRadius());
            // console.log("    Angles [" + circle.getAngles()[0] + "  to  " + circle.getAngles()[1] + "]");
            // console.log("    Vectors_x    ["
            // + circle.getVectors()[0][0]
            // + "  ,  "+ circle.getVectors()[0][1] + "  ,  "+ circle.getVectors()[0][2] + "]");
            // console.log("    Vectors_y    [" + circle.getVectors()[1] + "]");
            k++;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return true;
}
//# sourceMappingURL=split_tests.js.map