"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_isectCircleCircle2D = test_isectCircleCircle2D;
exports.test_isectCirclePlane3D = test_isectCirclePlane3D;
exports.test_isectEllipsePlane3D = test_isectEllipsePlane3D;
exports.test_isectCircleEllipse2D = test_isectCircleEllipse2D;
exports.test_isectEllipseEllipse2D = test_isectEllipseEllipse2D;
exports.test_distBetweenPoints = test_distBetweenPoints;
exports.test_identifier = test_identifier;
exports.test_General_Form = test_General_Form;
exports.test_Split = test_Split;
exports.test_Function = test_Function;
exports.test_parabola_lenght = test_parabola_lenght;
exports.test_ellipse_length = test_ellipse_length;
exports.test_hyperbola_length = test_hyperbola_length;
exports.test_plineLength = test_plineLength;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _math_conic_dev = require("./_math_conic_dev");

var test = _interopRequireWildcard(_math_conic_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_isectCircleCircle2D() {
    // Test 1
    ////// Test with 2 Circles on 2 different models ///////////
    // const m2: gs.IModel = new gs.Model();
    // const g2: gs.IGeom = m2.getGeom();
    // const circle1: gs.ICircle = g.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    // const circle2: gs.ICircle = g2.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    ////// Test1 = Validated /////////
    // Test 2
    ////// Test with moving Origin Points in the [0,x,y] plan ////
    var m = new gs.Model();
    var g = m.getGeom();
    var radius1 = 1;
    var radius2 = 1;
    for (var ax = 0; ax < 10; ax++) {
        for (var ay = 0; ay < 10; ay++) {
            for (var az = 0; az < 10; az++) {
                var O1 = g.addPoint([0 + ax, 0 + ay, 0 + az]);
                var O2 = g.addPoint([1 + ax, 0 + ay, 0 + az]);
                var circle1 = g.addCircle(O1, [radius1, 0, 0], [0, radius1, 0], [0, 360]);
                var circle2 = g.addCircle(O2, [radius2, 0, 0], [0, radius2, 0], [0, 360]);
                var results12 = test._isectCircleCircle2D(circle1, circle2);
                if (!gs.Arr.equal(results12[0].getPosition(), [0.5 + ax, 0.8660254037844386 + ay, 0 + az])) {
                    return false;
                }
                if (!gs.Arr.equal(results12[1].getPosition(), [0.5 + ax, -0.8660254037844386 + ay, 0 + az])) {
                    return false;
                }
            }
        }
    }
    ////////// Test2 = Validated ////////////
    // Test 3
    ////// Test with moving Origin Points in the [0,x,z] plan ////
    var radius3 = 1;
    var radius4 = 1;
    for (var _ax = 0; _ax < 10; _ax++) {
        for (var _ay = 0; _ay < 10; _ay++) {
            for (var _az = 0; _az < 10; _az++) {
                var O3 = g.addPoint([0 + _ax, 0 + _ay, 0 + _az]);
                var O4 = g.addPoint([1 + _ax, 0 + _ay, 0 + _az]);
                var circle3 = g.addCircle(O3, [radius3, 0, 0], [0, 0, radius3], [0, 360]);
                var circle4 = g.addCircle(O4, [radius4, 0, 0], [0, 0, radius4], [0, 360]);
                var results34 = test._isectCircleCircle2D(circle3, circle4);
                if (!gs.Arr.equal(results34[0].getPosition(), [0.5 + _ax, 0 + _ay, 0.8660254037844386 + _az])) {
                    return false;
                }
                if (!gs.Arr.equal(results34[1].getPosition(), [0.5 + _ax, 0 + _ay, -0.8660254037844386 + _az])) {
                    return false;
                }
            }
        }
    }
    ////////// Test3 = Validated ////////////
    // Test 4
    // Test for Moving Circles in the [0,x,(z+y).normalized] plan [(x,y,z) rotated along X axis by +45 degrees]
    var radius5 = 1;
    var radius6 = 1;
    for (var _ax2 = 0; _ax2 < 10; _ax2++) {
        for (var slope = 0; slope < 10; slope++) {
            var O5 = g.addPoint([0 + _ax2, 0 + slope * Math.sqrt(2) / 2, 0 + slope * Math.sqrt(2) / 2]);
            var O6 = g.addPoint([1 + _ax2, 0 + slope * Math.sqrt(2) / 2, 0 + slope * Math.sqrt(2) / 2]);
            var circle5 = g.addCircle(O5, [radius5, 0, 0], [0, radius5 * Math.sqrt(2) / 2, radius5 * Math.sqrt(2) / 2], [0, 360]);
            var circle6 = g.addCircle(O6, [radius6, 0, 0], [0, radius6 * Math.sqrt(2) / 2, radius6 * Math.sqrt(2) / 2], [0, 360]);
            var results56 = test._isectCircleCircle2D(circle5, circle6);
            if (!gs.Arr.equal(results56[0].getPosition(), [0.5 + _ax2, 0.6123724356957945 + slope * Math.sqrt(2) / 2, 0.6123724356957945 + slope * Math.sqrt(2) / 2])) {
                return false;
            }
            if (!gs.Arr.equal(results56[1].getPosition(), [0.5 + _ax2, -0.6123724356957945 + slope * Math.sqrt(2) / 2, -0.6123724356957945 + slope * Math.sqrt(2) / 2])) {
                return false;
            }
        }
    }
    ////////// Test4 = Validated ////////////
    // Test 5
    // Test for Circles in the [-y,x,0] plan plan [(x,y,z) rotated along Z axis by -90 degrees]
    var radius7 = 1;
    var radius8 = 1;
    for (var _ax3 = 0; _ax3 < 10; _ax3++) {
        for (var _ay2 = 0; _ay2 < 10; _ay2++) {
            for (var _az2 = 0; _az2 < 10; _az2++) {
                var O7 = g.addPoint([0 + _ax3, 0 + _ay2, 0 + _az2]);
                var O8 = g.addPoint([0 + _ax3, -1 + _ay2, 0 + _az2]);
                var circle7 = g.addCircle(O7, [0, -radius7, 0], [radius7, 0, 0], [0, 360]);
                var circle8 = g.addCircle(O8, [0, -radius8, 0], [radius8, 0, 0], [0, 360]);
                var results78 = test._isectCircleCircle2D(circle7, circle8);
                if (!gs.Arr.equal(results78[0].getPosition(), [0.8660254037844386 + _ax3, -0.5 + _ay2, 0 + _az2])) {
                    return false;
                }
                if (!gs.Arr.equal(results78[1].getPosition(), [-0.8660254037844386 + _ax3, -0.5 + _ay2, 0 + _az2])) {
                    return false;
                }
            }
        }
    }
    ////////// Test5 = Validated ////////////
    // Test 6
    // Test for Circles in the [(x+z).normalize,y,(z-x).normalize] plan [(x,y,z) rotated along Y axis by +45 degrees]
    var radius9 = 1;
    var radius10 = 1;
    for (var _ay3 = 0; _ay3 < 10; _ay3++) {
        for (var _slope = 0; _slope < 10; _slope++) {
            var O9 = g.addPoint([0 + _slope * Math.sqrt(2) / 2, 0 + _ay3, 0 + _slope * Math.sqrt(2) / 2]);
            var O10 = g.addPoint([0 + _slope * Math.sqrt(2) / 2, 1 + _ay3, 0 + _slope * Math.sqrt(2) / 2]);
            var circle9 = g.addCircle(O9, [radius9 * Math.sqrt(2) / 2, 0, radius9 * Math.sqrt(2) / 2], [0, radius9, 0], [0, 360]);
            var circle10 = g.addCircle(O10, [radius10 * Math.sqrt(2) / 2, 0, radius10 * Math.sqrt(2) / 2], [0, radius10, 0], [0, 360]);
            var results910 = test._isectCircleCircle2D(circle9, circle10);
            if (!gs.Arr.equal(results910[0].getPosition(), [-0.6123724356957945 + _slope * Math.sqrt(2) / 2, 0.5 + _ay3, -0.6123724356957945 + _slope * Math.sqrt(2) / 2])) {
                return false;
            }
            if (!gs.Arr.equal(results910[1].getPosition(), [0.6123724356957945 + _slope * Math.sqrt(2) / 2, 0.5 + _ay3, 0.6123724356957945 + _slope * Math.sqrt(2) / 2])) {
                return false;
            }
        }
    }
    // Test 7
    ////// Test with moving Origin Points in the [0,y,z] plan ////
    var radius11 = 1;
    var radius12 = 1;
    for (var _ax4 = 0; _ax4 < 10; _ax4++) {
        for (var _ay4 = 0; _ay4 < 10; _ay4++) {
            for (var _az3 = 0; _az3 < 10; _az3++) {
                var O11 = g.addPoint([0 + _ax4, 0 + _ay4, 0 + _az3]);
                var O12 = g.addPoint([0 + _ax4, 0 + _ay4, 1 + _az3]);
                var circle11 = g.addCircle(O11, [0, radius11, 0], [0, 0, radius11], [0, 360]);
                var circle12 = g.addCircle(O12, [0, radius12, 0], [0, 0, radius12], [0, 360]);
                var results1112 = test._isectCircleCircle2D(circle11, circle12);
                if (!gs.Arr.equal(results1112[0].getPosition(), [0 + _ax4, -0.8660254037844386 + _ay4, 0.5 + _az3])) {
                    return false;
                }
                if (!gs.Arr.equal(results1112[1].getPosition(), [0 + _ax4, 0.8660254037844386 + _ay4, 0.5 + _az3])) {
                    return false;
                }
            }
        }
    }
    return true;
}
function test_isectCirclePlane3D() {
    var m = new gs.Model();
    var pt_circle = m.getGeom().addPoint([0, 0, 0]);
    var pt_plane = m.getGeom().addPoint([0, 0, 0]);
    var circle = m.getGeom().addCircle(pt_circle, [1, 0, 0], [0, 0, 1], [0, 360]);
    var plane = m.getGeom().addPlane(pt_plane, [1, 0, 0], [0, 1, 0]);
    var intersects = test._isectCirclePlane3D(circle, plane);
    if (intersects !== null) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = intersects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var point = _step.value;

                point.getPosition();
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
    }
    return true;
}
function test_isectEllipsePlane3D() {
    var m = new gs.Model();
    var pt_ellipse = m.getGeom().addPoint([0, 0, 0]);
    var pt_plane = m.getGeom().addPoint([0, 0, 0]);
    var ellipse = m.getGeom().addEllipse(pt_ellipse, [2, 0, 0], [0, 0, 1], [0, 360]);
    var plane = m.getGeom().addPlane(pt_plane, [1, 0, 0], [0, 1, 0]);
    var intersects = test._isectEllipsePlane3D(ellipse, plane);
    if (intersects !== null) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = intersects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var point = _step2.value;

                point.getPosition();
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
    }
    // const ell: gs.IEllipse = m.getGeom().addEllipse(pt_ellipse,[1,1,1],[2,3,4]);
    // ell.
    return true;
}
function test_isectCircleEllipse2D() {
    // _isectCircleEllipse2D(circle: gs.ICircle, ellipse: gs.IEllipse): gs.IPoint[]
    return true;
}
function test_isectEllipseEllipse2D() {
    // _isectEllipseEllipse2D(ellipse1: gs.IEllipse, ellipse2: gs.IEllipse): gs.IPoint[]
    return true;
}
function test_distBetweenPoints() {
    // distBetweenPoints(point_1: gs.IPoint[], point_2: gs.IPoint[], minimum: boolean=true )
    return true;
}
function test_identifier() {
    // identifier(coeff: number[]): number[]
    return true;
}
function test_General_Form() {
    // General_Form(conic1: number[], origin1: number[], origin2: number[], alpha: number): number[]
    return true;
}
function test_Split() {
    // Split(conic1: number[], conic2: number[], origin1: number[], origin2: number[], alpha: number): number[][]
    return true;
}
function test_Function() {
    // Function_F(x: number): number
    return true;
}
function test_parabola_lenght() {
    // parabola_lenght(conic: number[] , x1: number, x2: number): number
    return true;
}
function test_ellipse_length() {
    // ellipse_length(conic: number[], theta_1: number, theta_2: number): number
    return true;
}
function test_hyperbola_length() {
    // hyperbola_length(conic: number[], theta_1: number, theta_2: number): number
    return true;
}
function test_plineLength() {
    // plineLength(m: gs.IModel, pline: gs.IPolyline, segment_index: number, sub_domain: [number,number] ): number
    return true;
}
//# sourceMappingURL=_math_conic_tests.js.map