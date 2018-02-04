import * as gs from "gs-json";
import * as sl from "./split";

export function test_circleCircle2D(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt1: gs.IPoint = g.addPoint([-0.3,0,0]);
    const pt2: gs.IPoint = g.addPoint([ 0.3,0,0]);
    const radius: number = 1;
    const circle1: gs.ICircle = g.addCircle(pt1, [1,0,0],[0,0,1], [0,360]);
    const circle2: gs.ICircle = g.addCircle(pt2, [1,0,0],[0,0,1], [0,360]);
    const arcs: gs.ICircle[] = sl.circleCircle2D(circle1,circle2);
    //console.log(arcs);
    let k: number = 1;
    for (const arc of arcs) {
        // console.log("circle " + k);
        // console.log("    Radius " + arc.getRadius());
        // console.log("    Angles [" + arc.getAngles()[0] + "  to  " + arc.getAngles()[1] + "]");
        // console.log("    Vectors_x    ["
        // + arc.getVectors()[0][0] + "  ,  "+ arc.getVectors()[0][1] + "  ,  "+ arc.getVectors()[0][2] + "]");
        // console.log("    Vectors_y    [" + arc.getVectors()[1] + "]");
        k++;
    }
    const m1: gs.IModel = new gs.Model();
    const g1: gs.IGeom = m1.getGeom();
    const p1: gs.IPoint = g1.addPoint([-5,0,0]);
    const p2: gs.IPoint = g1.addPoint([5,0,0]);
    const c1: gs.ICircle = g1.addCircle(p1, [10,0,0],[0,10,0],[0,360]);
    const c2: gs.ICircle = g1.addCircle(p2, [10,0,0],[0,10,0],[0,360]);
    const circles: gs.ICircle[] = sl.circleCircle2D(c1,c2);
    k=0;
    for (const circle of circles) {
        // console.log("circle " + k);
        // console.log("    Radius " + circle.getRadius());
        // console.log("    Angles [" + circle.getAngles()[0] + "  to  " + circle.getAngles()[1] + "]");
        // console.log("    Vectors_x    ["
            // + circle.getVectors()[0][0]
            // + "  ,  "+ circle.getVectors()[0][1] + "  ,  "+ circle.getVectors()[0][2] + "]");
        // console.log("    Vectors_y    [" + circle.getVectors()[1] + "]");
        k++;
    }

    return true;
}
