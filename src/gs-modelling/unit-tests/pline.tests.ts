import {} from "jasmine";
import * as pline_tests from "../lib/pline_test";

describe("Tests for Pline Module", () => {
    it("test_pline_fromPoints", () => {
        expect( pline_tests.test_pline_fromPoints() ).toBe(true);
    });
    it("test_pline_lineFromPoints", () => {
        expect( pline_tests.test_pline_lineFromPoints() ).toBe(true);
    });
    it("test_pline_evalParam", () => {
        expect( pline_tests.test_pline_evalParam() ).toBe(true);
    });
    it("test_pline_extrude", () => {
        expect( pline_tests.test_pline_extrude() ).toBe(true);
    });
});
