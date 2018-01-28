import {} from "jasmine";
import * as tests from "../lib/plane_tests";

describe("Tests for Plane Module", () => {
    it("test_plane_FromOriginVectors", () => {
        expect(tests.test_plane_FromOriginVectors()).toBe(true);
    });
    it("test_plane_FromOriginPoints", () => {
        expect(tests.test_plane_FromOriginPoints()).toBe(true);
    });
    it("test_plane_FromOriginWCS", () => {
        expect(tests.test_plane_FromOriginXY()).toBe(true);
    });
});
