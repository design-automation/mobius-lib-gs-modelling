import {} from "jasmine";
import * as _tests from "../lib/_math_conic_tests";

describe("Tests for Math Conic Dev", () => {
    it("test_isectCircleCircle2D", () => {
        expect(_tests.test_isectCircleCircle2D()).toBe(true);
    });
    it("test_isectCirclePlane3D", () => {
        expect(_tests.test_isectCirclePlane3D()).toBe(true);
    });
    it("test_isectEllipsePlane3D", () => {
        expect(_tests.test_isectEllipsePlane3D()).toBe(true);
    });
    it("test_isectEllipseEllipse2D", () => {
        expect(_tests.test_isectEllipseEllipse2D()).toBe(true);
    });
    it("test_distBetweenPoints", () => {
        expect(_tests.test_distBetweenPoints()).toBe(true);
    });
    it("test_identifier", () => {
        expect(_tests.test_identifier()).toBe(true);
    });
    it("test_General_Form", () => {
        expect(_tests.test_General_Form()).toBe(true);
    });
    it("test_Split", () => {
        expect(_tests.test_Split()).toBe(true);
    });
    it("test_Function", () => {
        expect(_tests.test_Function()).toBe(true);
    });
    it("test_parabola_lenght", () => {
        expect(_tests.test_parabola_lenght()).toBe(true);
    });
    it("test_ellipse_length", () => {
        expect(_tests.test_ellipse_length()).toBe(true);
    });
    it("test_hyperbola_length", () => {
        expect(_tests.test_hyperbola_length()).toBe(true);
    });
    it("test_plineLength", () => {
        expect(_tests.test_plineLength()).toBe(true);
    });
});
