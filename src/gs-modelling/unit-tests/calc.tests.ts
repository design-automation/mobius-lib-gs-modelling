import {} from "jasmine";
import * as tests from "../lib/calc_tests";

describe("Tests for calc Module", () => {
    it("test_calc_distBetweenPoints", () => {
        expect( tests.test_calc_distBetweenPoints() ).toBe(true);
    });
});
