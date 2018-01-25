import * as gs from "gs-json";
import * as sl from "./split";

export function test_circleCircle2D(): boolean {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt1: gs.IPoint = g.addPoint([-0.5,0,0]);
    const pt2: gs.IPoint = g.addPoint([ 0.5,0,0]);
    const radius: number = 1;
    const circle1: gs.ICircle = g.addCircle(pt1, [1,0,0],[0,0,1], [0,360]);
    const circle2: gs.ICircle = g.addCircle(pt2, [1,0,0],[0,0,1], [0,360]);
    const arcs: gs.ICircle[] = sl.circleCircle2D(circle1,circle2);
    let k: number = 1;
    for (const arc of arcs) {
        console.log("circle " + k);
        console.log("    Radius " + arc.getRadius());
        console.log("    Angles [" + arc.getAngles()[0] + "  to  " + arc.getAngles()[1] + "]");
        console.log("    Vectors_x    [" + arc.getVectors()[0][0] + "  ,  "+ arc.getVectors()[0][1] + "  ,  "+ arc.getVectors()[0][2] + "]");
        console.log("    Vectors_y    [" + arc.getVectors()[1] + "]");
        k++;
    }
    return true;
}
