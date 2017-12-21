import * as gs from "gs-json";
//import * as gs from "../../../dist/src/libs/gs-json/utils/gs-json";
import * as test from "./utils";

export function test_transfromXYZ() {
    const xyz_list: number[][] = [[]];
    const from_origin: number[] = [];
    const from_vectors: number[][] = [[]];
    const to_origin: number[] = [];
    const to_vectors: number[][] = [[]];
    test.transfromXYZ(xyz_list, from_origin, from_vectors, to_origin, to_vectors);
    return true;
}
