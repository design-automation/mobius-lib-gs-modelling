import * as polymeshes from "./polymeshes";

export function test_make_polygon():boolean {
	let result = polymeshes.Polymesh.makePolygon([[1,2,3],[4,5,6],[7,8,9]]);
	return true;
}