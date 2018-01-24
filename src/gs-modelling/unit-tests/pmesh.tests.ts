import {} from "jasmine";
import * as tests from "../lib/pmesh_tests";

describe("Tests for PMesh Module", () => {
    it("test_pmesh_fromPoints", () => {
        expect( tests.test_pmesh_fromPoints() ).toBe(true);
    });
    it("test_pmesh_fromPline", () => {
        expect( tests.test_pmesh_fromPline() ).toBe(true);
    });
    it("test_pmesh_offset", () => {
        expect( tests.test_pmesh_offset() ).toBe(true);
    });
    it("test_pmesh_thicken", () => {
        expect( tests.test_pmesh_thicken() ).toBe(true);
    });
});
