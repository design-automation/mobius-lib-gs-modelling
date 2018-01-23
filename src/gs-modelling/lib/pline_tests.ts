import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_pline_fromPoints(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = g.addPoint([0,0,0]);
    const p2: gs.IPoint = g.addPoint([10,0,0]);
    const p3: gs.IPoint = g.addPoint([0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    if (pline === undefined) {return false;}
    return true;
}

export function test_pline_lineFromPoints(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = g.addPoint([0,0,0]);
    const p2: gs.IPoint = g.addPoint([10,0,0]);
    const pline: gs.IPolyline = gsm.pline.LineFromPoints(p1, p2);
    if (pline === undefined) {return false;}
    return true;
}

export function test_pline_evalParam(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = g.addPoint([0,0,0]);
    const p2: gs.IPoint = g.addPoint([10,0,0]);
    const p3: gs.IPoint = g.addPoint([0,10,0]);
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

export function test_pline_explode(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = g.addPoint([0,0,0]);
    const p2: gs.IPoint = g.addPoint([10,0,0]);
    const p3: gs.IPoint = g.addPoint([0,10,10]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    const plines: gs.IPolyline[] = gsm.pline.explode(pline, false);
    if (plines.length !== 2) {return false;}
    const pline2: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], true);
    const plines2: gs.IPolyline[] = gsm.pline.explode(pline2, false);
    if (plines2.length !== 3) {return false;}
    return true;
}

export function test_pline_extend(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = g.addPoint([0,0,0]);
    const p2: gs.IPoint = g.addPoint([10,0,0]);
    const p3: gs.IPoint = g.addPoint([0,10,10]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    gsm.pline.extend(pline, 0, 5, true, true); // create points and copy
    gsm.pline.extend(pline, 1, 7, false, false); // dont create points, dont copy
    return true;
}

export function test_pline_extrude(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = g.addPoint([0,0,0]);
    const p2: gs.IPoint = g.addPoint([10,0,0]);
    const p3: gs.IPoint = g.addPoint([0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    const mesh: gs.IPolymesh = gsm.pline.extrude(pline, [1,2,3], false, true);
    const mesh2: gs.IPolymesh = gsm.pline.extrude(pline, [5,0,0], false, false);
    return true;
}
