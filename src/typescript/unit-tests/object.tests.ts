import {} from "jasmine";
import * as tests from "../object_tests";

describe("Tests for Obj Module", () => {
    it("test_obj_Get", () => {
        expect( tests.test_obj_Get() ).toBe(true);
    });
    it("test_obj_Gets", () => {
        expect( tests.test_obj_Gets() ).toBe(true);
    });
    it("test_obj_groups", () => {
        expect( tests.test_obj_groups() ).toBe(true);
    });
    it("test_obj_move", () => {
        expect( tests.test_obj_move() ).toBe(true);
    });
});
