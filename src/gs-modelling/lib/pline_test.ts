import * as gs from "gs-json";
import * as gsm from "./gs-modelling";

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
