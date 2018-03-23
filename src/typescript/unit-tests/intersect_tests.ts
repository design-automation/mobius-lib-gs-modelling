import * as gs from "gs-json";
import * as gsm from "../_export_dev";
import {} from "jasmine";

describe("Tests for Intersect Module", () => {
    it("test_intersect_Get", () => {
        expect( test_intersect_polylinePlane3D() ).toBe(true);
    });
    it("test_intersect_polylinePolyline2D", () => {
        expect( test_intersect_polylinePolyline2D() ).toBe(true);
    });
});

export function test_intersect_polylinePlane3D(): boolean {
    const m: gs.IModel = gsm.model.New();
    const points: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    const pline: gs.IPolyline = gsm.pline.FromPoints(points, false);
    const origin: gs.IPoint = gsm.point.FromXYZ(m, [0.5,0.5,0.5]);
    const plane: gs.IPlane = gsm.plane.FromOriginVectors(origin, [1,0,0], [0,1,0]);
    const isect_points: gs.IPoint[] = gsm.intersect.polylinePlane3D(pline, plane);
    if(isect_points.length !== 2) {return false;}
    return true;
}

export function test_intersect_polylinePolyline2D(): boolean {
    const m: gs.IModel = gsm.model.New();
    const points: gs.IPoint[] = gsm.point.FromXYZs(m, [[0,0,0],[2,2,0],[-1,-2,0],[1.1,2.2,0]]);
    const pline1: gs.IPolyline = gsm.pline.FromPoints(points, false);
    const pline2: gs.IPolyline = gsm.object.move(pline1, [1,0,0], true) as gs.IPolyline;
    const isect_points: gs.IPoint[] = gsm.intersect.polylinePolyline2D(pline1, pline2);
    //console.log(isect_points.length);
    if(isect_points.length !== 6) {return false;}
    return true;
}
