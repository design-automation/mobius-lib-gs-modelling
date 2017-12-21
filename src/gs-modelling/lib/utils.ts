import * as gs from "gs-json";
import * as mathjs from "mathjs";
import * as three from "three";

// For internal use only

export function transfromXYZ(xyz_list: number[][],
                             from_origin: number[], from_vectors: number[][],
                             to_origin: number[],   to_vectors: number[][]): number[][] {

    throw new Error("Method not implemented");

    //matrix multiplication

}

export function transfromXYZfromGlobal(xyz_list: number[][],
                                       to_origin: number[], to_vectors: number[][]): number[][] {
    return transfromXYZ(xyz_list, [0,0,0], [[1,0,0], [0,1,0], [0,0,1]], to_origin, to_vectors);
}


