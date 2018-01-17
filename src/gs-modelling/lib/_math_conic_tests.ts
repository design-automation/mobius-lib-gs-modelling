import * as gs from "gs-json";
import * as test from "./_math_conic_dev";
import * as kld from "kld-intersections";

export function test_isectCircleCircle2D() {
    // Test 1
    ////// Test with 2 Circles on 2 different models ///////////
    // const m2: gs.IModel = new gs.Model();
    // const g2: gs.IGeom = m2.getGeom();
    // const circle1: gs.ICircle = g.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    // const circle2: gs.ICircle = g2.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    ////// Test = Validated /////////

    // Test 2
    ////// Test with moving Origin Points in the [0,x,y] plan ////
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const radius1: number = 1;
    const radius2: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O1: gs.IPoint = g.addPoint([0 + ax,0 + ay,0 + az]);
    // const O2: gs.IPoint = g.addPoint([1 + ax,0 + ay,0 + az]);
    const O1: gs.IPoint = g.addPoint([0,0,0]);
    const O2: gs.IPoint = g.addPoint([1,0,0]);
    const circle1: gs.ICircle = g.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    const circle2: gs.ICircle = g.addCircle(O2, [radius2,0,0], [0,radius2,0], [0,360]);
    const results12: gs.IPoint[] = test._isectCircleCircle2D(circle1,circle2);
    // if(!gs.Arr.equal(results12[0].getPosition(), [0.5,-0.8660254037844386,0])) {return false;}
    // if(!gs.Arr.equal(results12[1].getPosition(), [0.5,0.8660254037844386,0])) {return false;}
    // if(!gs.Arr.equal(results12[2].getPosition(), [-0.5,-0.8660254037844386,0])) {return false;}
    // if(!gs.Arr.equal(results12[3].getPosition(), [-0.5,0.8660254037844386,0])) {return false;}
    // }
    // }
    // }
    ////////// Test = Validated ////////////

    console.log("Pt1_r1 " + results12[0].getPosition());
    console.log("Pt2_r1 " + results12[1].getPosition());
    // console.log("Pt1_r2 " + results12[2].getPosition());
    // console.log("Pt2_r2 " + results12[3].getPosition());


    // Test 3
    ////// Test with moving Origin Points in the [0,x,z] plan ////
    const radius3: number = 1;
    const radius4: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O3: gs.IPoint = g.addPoint([0 +ax,0 +ay,0 +az]);
    // const O4: gs.IPoint = g.addPoint([1 +ax,0 +ay,0 +az]);
    const O3: gs.IPoint = g.addPoint([0 ,0 ,0 ]);
    const O4: gs.IPoint = g.addPoint([1 ,0 ,0 ]);
    const circle3: gs.ICircle = g.addCircle(O3, [radius3,0,0], [0,0,radius3], [0,360]);
    const circle4: gs.ICircle = g.addCircle(O4, [radius4,0,0], [0,0,radius4], [0,360]);
    const results34: gs.IPoint[] = test._isectCircleCircle2D(circle3,circle4);
    // if(!gs.Arr.equal(results34[0].getPosition(), [0.5,0,-0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results34[1].getPosition(), [0.5,0,0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results34[2].getPosition(), [-0.5,0,-0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results34[3].getPosition(), [-0.5,0,0.8660254037844386])) {return false;}
    // }
    // }
    // }

    console.log("Pt3_r1 " + results34[0].getPosition());
    console.log("Pt4_r1 " + results34[1].getPosition());
    // console.log("Pt3_r2 " + results34[2].getPosition());
    // console.log("Pt4_r2 " + results34[3].getPosition());

    ////////// Test = Validated ////////////

    // Test 4
    // Test for Circles in the [0,x,(z+y).normalized] plan
    const radius5: number = 1;
    const radius6: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O5: gs.IPoint = g.addPoint([0 +ax,0 +ay,0 +az]);
    // const O6: gs.IPoint = g.addPoint([1 +ax,0 +ay,0 +az]);

    const O5: gs.IPoint = g.addPoint([0 ,0 ,0 ]);
    const O6: gs.IPoint = g.addPoint([1 ,0 ,0 ]);
    const circle5: gs.ICircle = g.addCircle(O5, [radius5,0,0], [0,radius5*Math.sqrt(2)/2,radius5*Math.sqrt(2)/2], [0,360]);
    const circle6: gs.ICircle = g.addCircle(O6, [radius6,0,0], [0,radius6*Math.sqrt(2)/2,radius6*Math.sqrt(2)/2], [0,360]);
    const results56: gs.IPoint[] = test._isectCircleCircle2D(circle5,circle6);

    console.log("Pt5_r1 " + results56[0].getPosition());
    console.log("Pt6_r1 " + results56[1].getPosition());
    // console.log("Pt5_r2 " + results56[2].getPosition());
    // console.log("Pt6_r2 " + results56[3].getPosition());

    // if(!gs.Arr.equal(results56[0].getPosition(), [0.5,0,-0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results56[1].getPosition(), [0.5,0,0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results56[2].getPosition(), [-0.5,0,-0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results56[3].getPosition(), [-0.5,0,0.8660254037844386])) {return false;}

    // }
    // }
    // }

    // Test 5
    // Test for Circles in the [-y,x,0] plan
    const radius7: number = 1;
    const radius8: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O5: gs.IPoint = g.addPoint([0 +ax,0 +ay,0 +az]);
    // const O6: gs.IPoint = g.addPoint([1 +ax,0 +ay,0 +az]);

    const O7: gs.IPoint = g.addPoint([0 ,0 ,0 ]);
    const O8: gs.IPoint = g.addPoint([-1 ,0 ,0 ]);
    const circle7: gs.ICircle = g.addCircle(O7, [0,-radius7,0], [radius7,0,0], [0,360]);
    const circle8: gs.ICircle = g.addCircle(O8, [0,-radius8,0], [radius8,0,0], [0,360]);
    const results78: gs.IPoint[] = test._isectCircleCircle2D(circle7,circle8);

    console.log("Pt7_r1 " + results78[0].getPosition());
    console.log("Pt8_r1 " + results78[1].getPosition());
    // console.log("Pt7_r2 " + results78[2].getPosition());
    // console.log("Pt8_r2 " + results78[3].getPosition());

    // if(!gs.Arr.equal(results56[0].getPosition(), [0.5,0,-0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results56[1].getPosition(), [0.5,0,0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results56[2].getPosition(), [-0.5,0,-0.8660254037844386])) {return false;}
    // if(!gs.Arr.equal(results56[3].getPosition(), [-0.5,0,0.8660254037844386])) {return false;}

    // }
    // }
    // }









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
