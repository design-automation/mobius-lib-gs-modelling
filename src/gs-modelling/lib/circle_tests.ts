import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_circle_FromOriginVectors(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const circle: gs.ICircle = gsm.circle.FromOriginVectors(p1, [0,1,0], [0,0,1]);
    if (circle === undefined) {return false;}
    return true;
}

export function test_circle_From3Points(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [4,10,7]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [2,1,-3]);
    const circle: gs.ICircle = gsm.circle.From3Points(p1, p2, p3);
    if (circle === undefined) {return false;}
    return true;
}

export function test_circle_ArcFrom3Points(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0]);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,0]);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [10,10,0]);
    const arc: gs.ICircle = gsm.circle.ArcFrom3Points(p1, p2, p3);
    if (arc === undefined) {return false;}
    console.log(arc.length(), arc);
    return true;
}
