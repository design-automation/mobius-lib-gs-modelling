import {} from "jasmine";
import * as _tests from "../lib/plane_tests";

describe("Tests for Plane Development", () => {
    it("test_multVectorMatrix", () => {
        expect(_tests._FromOriginPoints()).toBe(true);
    });
    it("test_multVectorMatrix", () => {
        expect(_tests._FromOriginWCS()).toBe(true);
    });
});
