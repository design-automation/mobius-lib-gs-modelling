import * as gs from "gs-json";
import * as gsm from "../_export_dev";
import * as threex from "../libs/threex/threex";

function randXYZ(scale: number): gs.XYZ {
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
    for (let i = 0; i < 2; i++) {
        gsm.object.move(pl, randXYZ(10), true);
    }
    return m;
}
