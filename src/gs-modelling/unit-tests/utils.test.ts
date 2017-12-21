import {} from "jasmine";
import * as tests from "../lib/utils_tests";

// an eample of a simple test
describe("Utils tests", () => {
    it("test_MoveObject", () => {
        expect( tests.test_transfromXYZ() ).toBe(true);
    });
});
