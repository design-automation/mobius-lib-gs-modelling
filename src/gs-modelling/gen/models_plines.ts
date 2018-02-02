import * as gs from "gs-json";
import * as gsm from "./../lib/_export_dev";
import * as threex from "../lib/_three_utils_dev";

export function randXYZ(scale: number): gs.XYZ {
    return [
        (Math.random() - 0.5) * scale,
        (Math.random() - 0.5) * scale,
        (Math.random() - 0.5) * scale];
}

export function genModelTest1(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [1,2,3]);
    const c: gs.ICircle = gsm.circle.FromOriginZX(p1, 8, [30,300]);
    const pl: gs.IPolyline = gsm.pline.FromCircle(c, 10);
    return m;
}

export function genModelTest2(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [1,2,3]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [6,5,4]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [3,3,3]);
    const c: gs.ICircle = gsm.circle.FromOriginXY(p1, 8, [300,45]);
    const pl: gs.IPolyline = gsm.pline.FromCircle(c, 10);
    const pm: gs.IPolymesh = gsm.pline.extrude(pl, [4,5,6], false);
    return m;
}

export function genModelTest3(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [12,5,12]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [3,3,3]);
    const pl: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], true);
    for (let i = 0; i < 10; i++) {
        const p10: gs.IPoint = gsm.pline.evalParam(pl, i/9);
        const xyz: gs.XYZ = gsm.point.getXYZ(p10);
        const p20: gs.IPoint = gsm.point.FromXYZ(m, [xyz[0], xyz[1], xyz[2]+1]);
        const pl2: gs.IPolyline = gsm.pline.From2Points(p10, p20);
    }
    return m;
}

export function genModelTest4(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [12,5,12]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [3,3,3]);
    const pl1: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    const pl2: gs.IPolyline = gsm.pline.FromPoints([p3, p1], false);
    const joined_plines: gs.IPolyline[] = gsm.pline.join([pl1, pl2]);
    const pm: gs.IPolymesh = gsm.pmesh.FromPline(joined_plines[0]);
    return m;
}

export function genModelTest5(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [1,2,3]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [6,5,4]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [3,3,3]);
    const c: gs.ICircle = gsm.circle.FromOriginXY(p1, 8, [300,45]);
    const pl: gs.IPolyline = gsm.pline.FromCircle(c, 100);
    gsm.pline.extrude(pl, randXYZ(1), false);
    // const exploded: gs.IPolyline[] = gsm.pline.explode(pl);
    // for (const pline of exploded) {
    //     gsm.pline.extrude(pline, randXYZ(2), false);
    // }
    return m;
}

export function genModelTest6(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [1,2,3]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [6,5,4]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [3,3,3]);
    const pl: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    for (let i = 0; i < 10; i++) {
        //gsm.pline.extend(pl, 2, 2.2);
    }
    return m;
}

export function genModelTest7(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [0,20,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,30,0]);
    const p4: gs.IPoint = gsm.point.FromXYZ(m, [0,40,0]);
    const c1: gs.ICircle = gsm.circle.FromOriginZX(p1, 12, [300,45]);
    const c2: gs.ICircle = gsm.circle.FromOriginZX(p2, 2,  [200,45]);
    const c3: gs.ICircle = gsm.circle.FromOriginZX(p3, 14, [250,45]);
    const c4: gs.ICircle = gsm.circle.FromOriginZX(p4, 8,  [270,45]);
    const pl1: gs.IPolyline = gsm.pline.FromCircle(c1, 10);
    const pl2: gs.IPolyline = gsm.pline.FromCircle(c2, 10);
    const pl3: gs.IPolyline = gsm.pline.FromCircle(c3, 10);
    const pl4: gs.IPolyline = gsm.pline.FromCircle(c4, 10);
    gsm.pline.loft([pl1, pl2, pl3, pl4], false);
    return m;
}
