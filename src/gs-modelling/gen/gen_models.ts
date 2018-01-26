import * as gs from "gs-json";
import * as gsm from "./../lib/_export_dev";

export function randPt(): gs.XYZ {
    return [Math.random() * 30, Math.random() * 30, Math.random() * 30];
}

/**
 * Generates a model with 4 points. Two of the points have the same position.
 */
export function genModelTest1(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    for (let i = 0; i < 10; i++) {
        const points: gs.IPoint[] = gsm.point.FromXYZs(m, [
            randPt(),
            randPt(),
            randPt(),
        ]);
        //const cir1 = gsm.circle.ArcFromOrigin(points[0], 10, [0,300]);
        const arc = gsm.circle.ArcFrom3Points(points[0], points[1], points[2]);
        const pline: gs.IPolyline = gsm.pline.FromPoints(points, false);
    }
    //const pmesh: gs.IPolymesh = gsm.pmesh.FromPoints([points]);
    //gsm.pmesh.thicken(pmesh, 1, 2);
    return m;
}
