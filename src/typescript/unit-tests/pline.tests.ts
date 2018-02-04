import {} from "jasmine";
import * as pline_tests from "../pline_tests";

describe("Tests for Pline Module", () => {
    it("test_pline_fromPoints", () => {
        expect( pline_tests.test_pline_fromPoints() ).toBe(true);
    });
    it("test_pline_From2Points", () => {
        expect( pline_tests.test_pline_From2Points() ).toBe(true);
    });
    it("test_pline_evalParam", () => {
        expect( pline_tests.test_pline_evalParam() ).toBe(true);
    });
    it("test_pline_join", () => {
        expect( pline_tests.test_pline_join() ).toBe(true);
    });

    it("test_pline_extract", () => {
        expect( pline_tests.test_pline_extract() ).toBe(true);
    });
    it("test_pline_explode", () => {
        expect( pline_tests.test_pline_explode() ).toBe(true);
    });
    it("test_pline_extend", () => {
        expect( pline_tests.test_pline_extend() ).toBe(true);
    });
    it("test_pline_extrude", () => {
        expect( pline_tests.test_pline_extrude() ).toBe(true);
    });
    it("test_pline_FromCircle", () => {
        expect( pline_tests.test_pline_FromCircle() ).toBe(true);
    });
    it("test_pline_loft", () => {
        expect( pline_tests.test_pline_loft() ).toBe(true);
    });
});
