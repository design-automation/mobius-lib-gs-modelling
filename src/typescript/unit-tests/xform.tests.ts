import {} from "jasmine";
import * as test from "../xform_tests";

describe("Tests for xform", () => {
    it("test_xform_move", () => {
        expect( test.test_xform_move() ).toBe(true);
    });
});
