import {} from "jasmine";
import * as test from "../lib/_string_tests";

describe("Tests for String Module", () => {
    it("test_endsWith", () => {
        expect( test.test_endsWith() ).toBe(true);
    });
    it("test_startsWith", () => {
        expect( test.test_startsWith() ).toBe(true);
    });
    it("test_includes", () => {
        expect( test.test_includes() ).toBe(true);
    });
    it("test_len", () => {
        expect( test.test_len() ).toBe(true);
    });
    it("test_replace", () => {
        expect( test.test_replace() ).toBe(true);
    });
    it("test_search", () => {
        expect( test.test_search() ).toBe(true);
    });
    it("test_split", () => {
        expect( test.test_split() ).toBe(true);
    });
    it("test_substring", () => {
        expect( test.test_substring() ).toBe(true);
    });
});
