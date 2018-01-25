import {} from "jasmine";
import * as test from "../lib/split_tests";

describe("Tests for Split", () => {
    it("test_circleCircle2D", () => {
        expect( test.test_circleCircle2D() ).toBe(true);
    });
});
