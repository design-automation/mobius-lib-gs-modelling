import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_pmesh_fromPoints(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pmesh: gs.IPolymesh = gsm.pmesh.FromPoints([[p1, p2, p3]]);
    if (pmesh === undefined) {return false;}
    return true;
}

export function test_pmesh_fromPline(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pline: gs.IPolyline = gsm.pline.FromPoints([p1, p2, p3], false);
    const pmesh: gs.IPolymesh = gsm.pmesh.FromPline(pline);
    if (pmesh === undefined) {return false;}
    return true;
}

export function test_pmesh_offset(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pmesh: gs.IPolymesh = gsm.pmesh.FromPoints([[p1, p2, p3]]);
    gsm.pmesh.offset(pmesh, 0.2);
    if (pmesh === undefined) {return false;}
    if (pmesh.numFaces() !== 1) {return false;}
    return true;
}

export function test_pmesh_thicken(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,10,0]);
    const pmesh: gs.IPolymesh = gsm.pmesh.FromPoints([[p1, p2, p3]]);
    const pmesh_thick: gs.IPolymesh = gsm.pmesh.thicken(pmesh, 0.2, 0.4);
    if (pmesh_thick === undefined) {return false;}
    if (pmesh_thick.numFaces() !== 5) {return false;}
    return true;
}
