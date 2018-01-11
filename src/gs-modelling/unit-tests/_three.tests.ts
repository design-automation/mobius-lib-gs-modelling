import {} from "jasmine";
import * as _tests from "../lib/_three_utils_tests";

describe("Tests for Three Utils Dev", () => {
    it("test_pointIsOnPlane", () => {
        expect( _tests.test_pointIsOnPlane() ).toBe(true);
    });
});
