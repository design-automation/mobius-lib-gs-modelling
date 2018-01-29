import {} from "jasmine";
import * as tests from "../lib/point_tests";

describe("Tests for Point Module", () => {
    it("test_point_FromXYZ", () => {
        expect( tests.test_point_FromXYZ() ).toBe(true);
    });
    it("test_point_FromXYZs", () => {
        expect( tests.test_point_FromXYZs() ).toBe(true);
    });
    it("test_point_Get", () => {
        expect( tests.test_point_Get() ).toBe(true);
    });
    it("test_point_Gets", () => {
        expect( tests.test_point_Gets() ).toBe(true);
    });
});
