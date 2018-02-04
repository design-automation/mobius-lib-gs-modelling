import {} from "jasmine";
import * as test from "../libs/conics/trigo_tests";

describe("Tests for Trigonometric Solving", () => {
    it("test_Trigo", () => {
        expect( test.solve_trigo() ).toBe(true);
    });
});
