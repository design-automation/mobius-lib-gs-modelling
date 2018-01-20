import {} from "jasmine";
import * as test from "../lib/_list_tests";

describe("Tests for List Module", () => {
    it("test_Copy", () => {
        expect( test.test_Copy() ).toBe(true);
    });
    it("test_FromRange", () => {
        expect( test.test_FromRange() ).toBe(true);
    });
    it("test_len", () => {
        expect( test.test_len() ).toBe(true);
    });
    it("test_append", () => {
        expect( test.test_append() ).toBe(true);
    });
    it("test_appendFront", () => {
        expect( test.test_appendFront() ).toBe(true);
    });
    it("test_extend", () => {
        expect( test.test_extend() ).toBe(true);
    });
    it("test_extendFront", () => {
        expect( test.test_extendFront() ).toBe(true);
    });
    it("test_flatten", () => {
        expect( test.test_flatten() ).toBe(true);
    });
    it("test_removeIndex", () => {
        expect( test.test_removeIndex() ).toBe(true);
    });
    it("test_removeValue", () => {
        expect( test.test_removeValue() ).toBe(true);
    });
    it("test_reverse", () => {
        expect( test.test_reverse() ).toBe(true);
    });
    it("test_sortAlpha", () => {
        expect( test.test_sortAlpha() ).toBe(true);
    });
    it("test_sortNum", () => {
        expect( test.test_sortNum() ).toBe(true);
    });
    it("test_slice", () => {
        expect( test.test_slice() ).toBe(true);
    });
    it("test_splice", () => {
        expect( test.test_splice() ).toBe(true);
    });
});
