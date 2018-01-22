import {} from "jasmine";
import * as test from "../lib/_math_tests";

describe("Tests for List Module", () => {
    it("test_PI", () => {
        expect( test.test_PI() ).toBe(true);
    });
    it("test_POS_INF", () => {
        expect( test.test_POS_INF() ).toBe(true);
    });
    it("test_NEG_INF", () => {
        expect( test.test_NEG_INF() ).toBe(true);
    });
    it("test_cos", () => {
        expect( test.test_cos() ).toBe(true);
    });
    it("test_sin", () => {
        expect( test.test_sin() ).toBe(true);
    });
    it("test_tan", () => {
        expect( test.test_tan() ).toBe(true);
    });
    it("test_pow", () => {
        expect( test.test_pow() ).toBe(true);
    });
    it("test_ceiling", () => {
        expect( test.test_ceiling() ).toBe(true);
    });
    it("test_abs", () => {
        expect( test.test_abs() ).toBe(true);
    });
    it("test_max", () => {
        expect( test.test_max() ).toBe(true);
    });
    it("test_min", () => {
        expect( test.test_min() ).toBe(true);
    });
    it("test_rand", () => {
        expect( test.test_rand() ).toBe(true);
    });
    it("test_randInt", () => {
        expect( test.test_randInt() ).toBe(true);
    });
    it("test_randFloat", () => {
        expect( test.test_randFloat() ).toBe(true);
    });
});
