import {} from "jasmine";
import * as _tests from "../libs/conics/circle_tests";

describe("Tests for Math Conic Dev", () => {
    it("test_isectCircleCircle2D", () => {
        expect(_tests.test_isectCircleCircle2D()).toBe(true);
    });
    it("test_isectCirclePlane3D", () => {
        expect(_tests.test_isectCirclePlane3D()).toBe(true);
    });
});
