import * as gs from "gs-json";
import * as gsm from "./_export_dev";

export function test_xform_move(): boolean {
    const m: gs.IModel = gsm.model.New();
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [2, 2, 2]);
    const circle: gs.ICircle = gsm.circle.FromOrigin2Vectors(p1, [0, 1, 0], [0, 0, 1], null);
    gsm.xform.move(circle, [1,2,3]);
    if (circle.getOrigin().getPosition()[1] !== 4) { return false; }
    return true;
}
