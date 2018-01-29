import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_point_FromXYZ(): boolean {
    const m: gs.IModel = gsm.model.New();
    const point: gs.IPoint = gsm.point.FromXYZ(m, [1,2,3]) as gs.IPoint;
    if (point === undefined) {return false;}
    return true;
}

export function test_point_FromXYZs(): boolean {
    const m: gs.IModel = gsm.model.New();
    const point: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    if (point === undefined) {return false;}
    return true;
}

export function test_point_Get(): boolean {
    const m: gs.IModel = gsm.model.New();
    const point: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    if (gsm.point.Get(m, 2).getPosition()[0] !== -1) {return false;}
    return true;
}

export function test_point_Gets(): boolean {
    const m: gs.IModel = gsm.model.New();
    const points: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    const result: gs.IPoint[] = gsm.point.Gets(m, [1,2,3]);
    if (result.length !== 3) {return false;}
    if (result[0].getPosition()[0] !== 2) {return false;}
    return true;
}
