import {} from "jasmine";
import * as tests from "../gen/gen_models_tests";
describe("Tests for Gen Models", () => {
    it("genModelTest1b", () => {
        expect( tests.genModelTest1b() ).toBe(true);
    });
});
