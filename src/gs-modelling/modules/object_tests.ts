import * as gs from "../../libs/gs-json/utils/gs-json";
import * as test from "./object";

export function test_MoveObject() {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const p1: gs.IPoint = g.addPoint([0,0,0]); // TODO addPoints()
    const p2: gs.IPoint = g.addPoint([1,1,1]);
    const p3: gs.IPoint = g.addPoint([2,2,2]);
    const p4: gs.IPoint = g.addPoint([3,3,3]);
    const poly: gs.IPolyline = g.addPolyline([p1, p2, p3, p4], false);
    test.MoveObject(m, poly, [10,0,0]);
    if (poly.getPoints()[0][0][0][0] !== 10) {return false;} // TOFO flatten=true
    return true;
}
