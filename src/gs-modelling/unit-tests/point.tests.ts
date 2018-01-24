import {} from "jasmine";
import * as tests from "../lib/point_tests";

describe("Tests for Point Module", () => {
    it("test_point_FromXYZ", () => {
        expect( tests.test_point_FromXYZ() ).toBe(true);
    });
});
