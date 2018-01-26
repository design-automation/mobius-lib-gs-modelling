import * as gs from "gs-json";
import * as gsm from "./../lib/_export_dev";

/**
 * Generates a model with 4 points. Two of the points have the same position.
 */
export function genModelTest1(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const points: gs.IPoint[] = gsm.point.FromXYZs(m, [
            [0,0,0],
            [10,0,0],
            [10,10,0],
        ]);
    const pmesh: gs.IPolymesh = gsm.pmesh.FromPoints([points]);
    gsm.pmesh.thicken(pmesh, 1, 2);
    return m;
}
