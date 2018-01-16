import * as gs from "gs-json";
import * as test from "./_math_conic_dev";
import * as kld from "kld-intersections";

export function test_isectCircleCircle2D() {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const O1: gs.IPoint = g.addPoint([0,0,0]);
    const O2: gs.IPoint = g.addPoint([1,0,0]);
    const radius1: number = 1;
    const radius2: number = 1;
    // const m2: gs.IModel = new gs.Model();
    // const g2: gs.IGeom = m2.getGeom();
    // const circle1: gs.ICircle = g.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    // const circle2: gs.ICircle = g2.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    // // Same model test = OK
    const circle1: gs.ICircle = g.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    const circle2: gs.ICircle = g.addCircle(O2, [radius2,0,0], [0,radius2,0], [0,360]);
    const results: gs.IPoint[] = test._isectCircleCircle2D(circle1,circle2);
    for (const k of results) {
        console.log("Set 1 " + k.getPosition());
    }

    const O3: gs.IPoint = g.addPoint([0,0,0]);
    const O4: gs.IPoint = g.addPoint([1,1,0]);
    const radius3: number = 1;
    const radius4: number = 1;
    const circle3: gs.ICircle = g.addCircle(O3, [radius3,0,0], [0,radius3,0], [0,360]);
    const circle4: gs.ICircle = g.addCircle(O4, [radius4,0,0], [0,radius4,0], [0,360]);
    const results2: gs.IPoint[] = test._isectCircleCircle2D(circle3,circle4);
    for (const k of results2) {
        console.log("Set 2 " + k.getPosition());
    }

    // if(!gs.Arr.equal(test._isectCircleCircle2D(circle1,circle2)[0].getPosition(),[1,0,0])) {return false;}
    return true;
}
export function test_isectCircleEllipse2D() {
// _isectCircleEllipse2D(circle: gs.ICircle, ellipse: gs.IEllipse): gs.IPoint[]
    return true;
}
export function test_isectEllipseEllipse2D() {
// _isectEllipseEllipse2D(ellipse1: gs.IEllipse, ellipse2: gs.IEllipse): gs.IPoint[]
    return true ;
}
export function test_distBetweenPoints() {
    // distBetweenPoints(point_1: gs.IPoint[], point_2: gs.IPoint[], minimum: boolean=true )
    return true ;
}
export function test_identifier() {
// identifier(coeff: number[]): number[]
    return true;
}
export function test_General_Form() {
// General_Form(conic1: number[], origin1: number[], origin2: number[], alpha: number): number[]
    return true;
}
export function test_Split() {
// Split(conic1: number[], conic2: number[], origin1: number[], origin2: number[], alpha: number): number[][]
    return true;
}
export function test_Function() {
// Function_F(x: number): number
    return true;
}
export function test_parabola_lenght() {
// parabola_lenght(conic: number[] , x1: number, x2: number): number
    return true;
}
export function test_ellipse_length() {
// ellipse_length(conic: number[], theta_1: number, theta_2: number): number
    return true;
}
export function test_hyperbola_length() {
// hyperbola_length(conic: number[], theta_1: number, theta_2: number): number
    return true;
}
export function test_plineLength() {
// plineLength(m: gs.IModel, pline: gs.IPolyline, segment_index: number, sub_domain: [number,number] ): number
    return true;
}
