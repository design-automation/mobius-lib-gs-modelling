import * as mathjs from "mathjs";

export function transfromXYZ(xyz_list: number[][],
                             from_origin: number[], from_xaxis: number[], from_yaxis: number[],
                             to_origin: number[],   to_xaxis: number[],   to_yaxis: number[],
                             ): number[][] {

    throw new Error("Method not implemented");

    //matrix multiplication

}

export function transfromXYZfromGlobal(xyz_list: number[][], to_origin: number[],
                                       to_xaxis: number[],   to_yaxis: number[]): number[][] {
    return transfromXYZ(xyz_list, [0,0,0], [1,0,0], [0,1,0], to_origin, to_xaxis, to_yaxis);
}
