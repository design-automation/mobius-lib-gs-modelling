import {} from "jasmine";
import * as tests from "../lib/circle_tests";

describe("Tests for Pline Module", () => {
    it("test_circle_FromOriginVectors", () => {
        expect( tests.test_circle_FromOriginVectors() ).toBe(true);
    });
    it("test_circle_From3Points", () => {
        expect( tests.test_circle_From3Points() ).toBe(true);
    });
    it("test_circle_ArcFrom3Points", () => {
        expect( tests.test_circle_ArcFrom3Points() ).toBe(true);
    });
});
