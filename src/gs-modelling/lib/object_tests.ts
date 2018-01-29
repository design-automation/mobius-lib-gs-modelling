import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_obj_Get(): boolean {
    const m: gs.IModel = gsm.model.New();
    const points: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    const x = gsm.pline.FromPoints(points, false);
    const obj: gs.IObj = gsm.object.Get(m, 0);
    if(obj === undefined) {return false;}
    return true;
}

export function test_obj_Gets(): boolean {
    const m: gs.IModel = gsm.model.New();
    const points: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    gsm.pline.FromPoints(points, false);
    gsm.circle.FromOriginXY(points[3], 12, [20,30]);
    const objs: gs.IObj[] = gsm.object.Gets(m, [0, 1]);
    if(objs[0] === undefined) {return false;}
    if(objs[1] === undefined) {return false;}
    return true;
}
