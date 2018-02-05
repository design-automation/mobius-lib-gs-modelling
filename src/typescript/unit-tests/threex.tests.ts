import {} from "jasmine";
import * as _tests from "../libs/threex/threex_tests";

describe("Tests for Three Utils Dev", () => {
    it("test_multVectorMatrix", () => {
        expect(_tests.test_multVectorMatrix()).toBe(true);
    });
    it("test_xformMatrixPointXYZs", () => {
        expect(_tests.test_xformMatrixPointXYZs()).toBe(true);
    });
    it("test_xformMatrix", () => {
        expect(_tests.test_xformMatrix()).toBe(true);
    });
    it("test_subVectors", () => {
        expect(_tests.test_subVectors()).toBe(true);
    });
    it("test_planesAreCoplanar", () => {
        expect(_tests.test_planesAreCoplanar()).toBe(true);
    });
    it("test_pointIsOnPlane", () => {
        expect( _tests.test_pointIsOnPlane() ).toBe(true);
    });
    it("test_vectorsAreCodir", () => {
        expect( _tests.test_vectorsAreCodir()).toBe(true);
    });
});
