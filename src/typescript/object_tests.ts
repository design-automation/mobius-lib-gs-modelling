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

export function test_obj_groups(): boolean {
    const m: gs.IModel = gsm.model.New();
    const ok: boolean = gsm.group.Create(m, "test");
    const points: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    const pline: gs.IPolyline = gsm.pline.FromPoints(points, false);
    const circle: gs.ICircle = gsm.circle.FromOriginXY(points[1], 5, null);
    gsm.object.addToGroup([pline, circle], "test");
    const objs: gs.IObj[] = gsm.object.GetFromGroup(m, "test");
    if (objs.length !== 2) {return false;}
    gsm.object.removeFromGroup(circle, "test");
    const objs2: gs.IObj[] = gsm.object.GetFromGroup(m, "test");
    if (objs2.length !== 1) {return false;}
    return true;
}

export function test_obj_move(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [1,1,1]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [2,2,2]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [3,3,3]);
    const circle: gs.ICircle = gsm.circle.FromOrigin2Vectors(p1, [0, 1, 0], [0, 0, 1], null);
    gsm.object.move(circle, [1,2,3]);
    if (circle.getOrigin().getPosition()[1] !== 3) { return false; }
    return true;
}
