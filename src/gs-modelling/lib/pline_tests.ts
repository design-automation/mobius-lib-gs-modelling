import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_pline_fromPoints(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    if (pline === undefined) {return false;}
    return true;
}

export function test_pline_From2Points(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const pline: gs.IPolyline = gsm.pline.From2Points(p1, p2);
    if (pline === undefined) {return false;}
    return true;
}

export function test_pline_evalParam(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    const pt4: gs.IPoint = gsm.pline.evalParam(pline, 0.5);
    if (pt4 === undefined) {return false;}
    const pt5: gs.IPoint = gsm.pline.evalParam(pline, 0.7);
    if (pt5 === undefined) {return false;}
    const pt6: gs.IPoint = gsm.pline.evalParam(pline, 0);
    if (pt6 === undefined) {return false;}
    const pt7: gs.IPoint = gsm.pline.evalParam(pline, 1);
    if (pt7 === undefined) {return false;}
    return true;
}

export function test_pline_join(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const p4: gs.IPoint = gsm.point.FromXYZ(m, [1,5,9]);
    const p5: gs.IPoint = gsm.point.FromXYZ(m, [12,5,33]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], true);
    const plines: gs.IPolyline[] = gsm.pline.extract(pline, [0,1,2]);
    const more: gs.IPolyline = gsm.pline.FromPoints([p2, p5, p4], true);
    const more2: gs.IPolyline = gsm.pline.FromPoints([p2, p3, p5, p1], true);
    const more3: gs.IPolyline = gsm.pline.FromPoints([p3, p1], true);
    const new_plines: gs.IPolyline[] = gsm.pline.join([...plines, more, more2, more3]);

    return true;
}

export function test_pline_extract(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], true);
    const plines: gs.IPolyline[] = gsm.pline.extract(pline, [0,1,2]);
    if (plines.length !== 3) {return false;}
    return true;
}

export function test_pline_explode(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    const plines: gs.IPolyline[] = gsm.pline.explode(pline, false);
    if (plines.length !== 2) {return false;}
    const pline2: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], true);
    const plines2: gs.IPolyline[] = gsm.pline.explode(pline2, false);
    if (plines2.length !== 3) {return false;}
    return true;
}

export function test_pline_extend(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    gsm.pline.extend(pline, 0, 5, true); // create points and copy
    gsm.pline.extend(pline, 1, 7, false); // dont create points, dont copy
    return true;
}

export function test_pline_extrude(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    const mesh: gs.IPolymesh = gsm.pline.extrude(pline, [1,2,3], false);
    const mesh2: gs.IPolymesh = gsm.pline.extrude(pline, [5,0,0], false);
    return true;
}
