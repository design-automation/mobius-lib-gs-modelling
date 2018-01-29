import {} from "jasmine";
import * as tests from "../lib/object_tests";

describe("Tests for Obj Module", () => {
    it("test_obj_Get", () => {
        expect( tests.test_obj_Get() ).toBe(true);
    });
    it("test_obj_Gets", () => {
        expect( tests.test_obj_Gets() ).toBe(true);
    });
});
