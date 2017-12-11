import {} from 'jasmine';
import * as polymeshes_tests from "../modules/polymeshes_tests";

//an eample of a simple test
describe('Simple test for polymeshes', () => {
    it('create polygon', () => {
        expect( polymeshes_tests.test_make_polygon() ).toBe(true);
    });
});