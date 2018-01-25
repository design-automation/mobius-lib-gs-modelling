"use strict";

var _math_conic_tests = require("../lib/_math_conic_tests");

var _tests = _interopRequireWildcard(_math_conic_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Math Conic Dev", function () {
    it("test_isectCircleCircle2D", function () {
        expect(_tests.test_isectCircleCircle2D()).toBe(true);
    });
    it("test_isectCirclePlane3D", function () {
        expect(_tests.test_isectCirclePlane3D()).toBe(true);
    });
    it("test_isectEllipsePlane3D", function () {
        expect(_tests.test_isectEllipsePlane3D()).toBe(true);
    });
    it("test_isectEllipseEllipse2D", function () {
        expect(_tests.test_isectEllipseEllipse2D()).toBe(true);
    });
    it("test_distBetweenPoints", function () {
        expect(_tests.test_distBetweenPoints()).toBe(true);
    });
    it("test_identifier", function () {
        expect(_tests.test_identifier()).toBe(true);
    });
    it("test_General_Form", function () {
        expect(_tests.test_General_Form()).toBe(true);
    });
    it("test_Split", function () {
        expect(_tests.test_Split()).toBe(true);
    });
    it("test_Function", function () {
        expect(_tests.test_Function()).toBe(true);
    });
    it("test_parabola_lenght", function () {
        expect(_tests.test_parabola_lenght()).toBe(true);
    });
    it("test_ellipse_length", function () {
        expect(_tests.test_ellipse_length()).toBe(true);
    });
    it("test_hyperbola_length", function () {
        expect(_tests.test_hyperbola_length()).toBe(true);
    });
    it("test_plineLength", function () {
        expect(_tests.test_plineLength()).toBe(true);
    });
});
//# sourceMappingURL=_math_conic.tests.js.map