import {} from "jasmine";
import * as pline_tests from "../model_tests";

describe("Tests for Model Module", () => {
    it("test_model_New", () => {
        expect( pline_tests.test_model_New() ).toBe(true);
    });
    it("test_model_Load", () => {
        expect( pline_tests.test_model_FromData() ).toBe(true);
    });
    it("test_model_Save", () => {
        expect( pline_tests.test_model_Save() ).toBe(true);
    });
});
