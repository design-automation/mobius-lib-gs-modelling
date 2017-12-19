import {} from "jasmine";
import * as tests from "../modules/object_tests";

//an eample of a simple test
describe("Object tests", () => {
    it("test_MoveObject", () => {
        expect( tests.test_MoveObject() ).toBe(true);
    });
});
