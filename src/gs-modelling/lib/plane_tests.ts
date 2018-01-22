import * as gs from "gs-json";
import * as cs from "./plane_dev";

export function _FromOriginPoints(): boolean {
    const m: gs.IModel = new gs.Model();
    const m2: gs.IModel = new gs.Model();
    const pt1: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    const pt2: gs.IPoint = m.getGeom().addPoint([0,1,0]);
    const pt3: gs.IPoint = m.getGeom().addPoint([1,1,0]);
    const pt4: gs.IPoint = m.getGeom().addPoint([0,2,0]);
    const pt5: gs.IPoint = m2.getGeom().addPoint([1,1,0]);
    const plan1: gs.IPlane = cs._FromOriginPoints(pt1,pt2,pt3);
    // const plan2: gs.IPlane = cs._FromOriginPoints(pt1,pt2,pt4);
    // Valid
    // const plan3: gs.IPlane = cs._FromOriginPoints(pt1,pt2,pt5);
    // Valid
    return true;
}
export function _FromOriginWCS(): boolean {
    return true;
}
