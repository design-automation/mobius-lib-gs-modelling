import {} from "jasmine";
import * as test from "../lib/trigo_tests";

describe("Tests for Trigonometric Solving", () => {
    it("test_Trigo", () => {
        expect( test.solve_trigo() ).toBe(true);
    });
});
