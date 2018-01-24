import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_point_FromXYZ(): boolean {
    const m: gs.IModel = new gs.Model();
    const point: gs.IPoint = gsm.point.FromXYZ(m, [1,2,3]) as gs.IPoint;
    if (point === undefined) {return false;}
    return true;
}

export function test_point_FromXYZs(): boolean {
    const m: gs.IModel = new gs.Model();
    const point: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    if (point === undefined) {return false;}
    return true;
}
