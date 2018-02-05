import * as gs from "gs-json";
import * as test from "./conics";
import * as kld from "kld-intersections";
import * as three from "three";

export function test_isectCircleCircle2D() {
    // // Test 1
    // ////// Test with 2 Circles on 2 different models ///////////
    // // const m2: gs.IModel = new gs.Model();
    // // const g2: gs.IGeom = m2.getGeom();
    // // const circle1: gs.ICircle = g.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    // // const circle2: gs.ICircle = g2.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    // ////// Test1 = Validated /////////

    // // Test 2
    // ////// Test with moving Origin Points in the [0,x,y] plan ////
    // const m: gs.IModel = new gs.Model();
    // const g: gs.IGeom = m.getGeom();
    // const radius1: number = 1;
    // const radius2: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O1: gs.IPoint = g.addPoint([0 + ax,0 + ay,0 + az]);
    // const O2: gs.IPoint = g.addPoint([1 + ax,0 + ay,0 + az]);
    // const circle1: gs.ICircle = g.addCircle(O1, [radius1,0,0], [0,radius1,0], [0,360]);
    // const circle2: gs.ICircle = g.addCircle(O2, [radius2,0,0], [0,radius2,0], [0,360]);
    // const results12: gs.IPoint[] = test._isectCircleCircle2D(circle1,circle2);
    // if(!gs.Arr.equal(results12[0].getPosition(), [0.5 +ax,0.8660254037844386 +ay,0 +az])) {return false;}
    // if(!gs.Arr.equal(results12[1].getPosition(), [0.5 +ax,-0.8660254037844386 +ay,0 +az])) {return false;}
    // }
    // }
    // }
    // ////////// Test2 = Validated ////////////

    // // Test 3
    // ////// Test with moving Origin Points in the [0,x,z] plan ////
    // const radius3: number = 1;
    // const radius4: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O3: gs.IPoint = g.addPoint([0 +ax,0 +ay,0 +az]);
    // const O4: gs.IPoint = g.addPoint([1 +ax,0 +ay,0 +az]);
    // const circle3: gs.ICircle = g.addCircle(O3, [radius3,0,0], [0,0,radius3], [0,360]);
    // const circle4: gs.ICircle = g.addCircle(O4, [radius4,0,0], [0,0,radius4], [0,360]);
    // const results34: gs.IPoint[] = test._isectCircleCircle2D(circle3,circle4);
    // if(!gs.Arr.equal(results34[0].getPosition(), [0.5 +ax,0 +ay, 0.8660254037844386 +az])) {return false;}
    // if(!gs.Arr.equal(results34[1].getPosition(), [0.5 +ax,0 +ay,-0.8660254037844386 +az])) {return false;}
    // }
    // }
    // }
    // ////////// Test3 = Validated ////////////

    // // Test 4
    // // Test for Moving Circles in the [0,x,(z+y).normalized] plan [(x,y,z) rotated along X axis by +45 degrees]
    // const radius5: number = 1;
    // const radius6: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let slope=0;slope<10;slope++) {
    // const O5: gs.IPoint = g.addPoint([0 +ax ,0 +slope*Math.sqrt(2)/2,0 +slope*Math.sqrt(2)/2]);
    // const O6: gs.IPoint = g.addPoint([1 +ax,0 +slope*Math.sqrt(2)/2,0 +slope*Math.sqrt(2)/2]);
    // const circle5: gs.ICircle = g.addCircle(O5,
    //  [radius5,0,0], [0,radius5*Math.sqrt(2)/2,radius5*Math.sqrt(2)/2], [0,360]);
    // const circle6: gs.ICircle = g.addCircle(O6,
    //  [radius6,0,0], [0,radius6*Math.sqrt(2)/2,radius6*Math.sqrt(2)/2], [0,360]);
    // const results56: gs.IPoint[] = test._isectCircleCircle2D(circle5,circle6);
    // if(!gs.Arr.equal(results56[0].getPosition(),
    //  [0.5 +ax,0.6123724356957945 +slope*Math.sqrt(2)/2,0.6123724356957945 +slope*Math.sqrt(2)/2])) {return false;}
    // if(!gs.Arr.equal(results56[1].getPosition(),
    //  [0.5 +ax,-0.6123724356957945 +slope*Math.sqrt(2)/2,-0.6123724356957945 +slope*Math.sqrt(2)/2])) {return false;}
    // }
    // }
    // ////////// Test4 = Validated ////////////

    // // Test 5
    // // Test for Circles in the [-y,x,0] plan plan [(x,y,z) rotated along Z axis by -90 degrees]
    // const radius7: number = 1;
    // const radius8: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O7: gs.IPoint = g.addPoint([0 +ax,0 +ay,0 +az]);
    // const O8: gs.IPoint = g.addPoint([0 +ax,-1 +ay,0 +az]);
    // const circle7: gs.ICircle = g.addCircle(O7, [0,-radius7,0], [radius7,0,0], [0,360]);
    // const circle8: gs.ICircle = g.addCircle(O8, [0,-radius8,0], [radius8,0,0], [0,360]);
    // const results78: gs.IPoint[] = test._isectCircleCircle2D(circle7,circle8);
    // if(!gs.Arr.equal(results78[0].getPosition(), [0.8660254037844386 +ax,-0.5 +ay,0 +az])) {return false;}
    // if(!gs.Arr.equal(results78[1].getPosition(), [-0.8660254037844386 +ax,-0.5 +ay,0 +az])) {return false;}
    // }
    // }
    // }
    // ////////// Test5 = Validated ////////////

    // // Test 6
    // // Test for Circles in the [(x+z).normalize,y,(z-x).normalize] plan [(x,y,z) rotated along Y axis by +45 degrees]
    // const radius9: number = 1;
    // const radius10: number = 1;
    // for(let ay=0;ay<10;ay++) {
    // for(let slope=0;slope<10;slope++) {
    // const O9: gs.IPoint = g.addPoint([0 +slope*Math.sqrt(2)/2,0 + ay,0 +slope*Math.sqrt(2)/2]);
    // const O10: gs.IPoint = g.addPoint([0 +slope*Math.sqrt(2)/2,1 + ay,0 +slope*Math.sqrt(2)/2]);
    // const circle9: gs.ICircle = g.addCircle(O9,
    //  [radius9*Math.sqrt(2)/2,0,radius9*Math.sqrt(2)/2], [0,radius9,0], [0,360]);
    // const circle10: gs.ICircle = g.addCircle(O10,
    //  [radius10*Math.sqrt(2)/2,0,radius10*Math.sqrt(2)/2], [0,radius10,0], [0,360]);
    // const results910: gs.IPoint[] = test._isectCircleCircle2D(circle9,circle10);
    // if(!gs.Arr.equal(results910[0].getPosition(),
    //     [-0.6123724356957945 +slope*Math.sqrt(2)/2,0.5 + ay,-0.6123724356957945 +slope*Math.sqrt(2)/2])) {return false;}
    // if(!gs.Arr.equal(results910[1].getPosition(),
    //     [0.6123724356957945 +slope*Math.sqrt(2)/2,0.5 + ay,0.6123724356957945 +slope*Math.sqrt(2)/2])) {return false;}
    // }
    // }

    // // Test 7
    // ////// Test with moving Origin Points in the [0,y,z] plan ////
    // const radius11: number = 1;
    // const radius12: number = 1;
    // for(let ax=0;ax<10;ax++) {
    // for(let ay=0;ay<10;ay++) {
    // for(let az=0;az<10;az++) {
    // const O11: gs.IPoint = g.addPoint([0 +ax,0 +ay,0 +az]);
    // const O12: gs.IPoint = g.addPoint([0 +ax,0 +ay,1 +az]);
    // const circle11: gs.ICircle = g.addCircle(O11, [0,radius11,0], [0,0,radius11], [0,360]);
    // const circle12: gs.ICircle = g.addCircle(O12, [0,radius12,0], [0,0,radius12], [0,360]);
    // const results1112: gs.IPoint[] = test._isectCircleCircle2D(circle11,circle12);
    // if(!gs.Arr.equal(results1112[0].getPosition(), [0 +ax,-0.8660254037844386 +ay,0.5 +az])) {return false;}
    // if(!gs.Arr.equal(results1112[1].getPosition(), [0 +ax,0.8660254037844386 +ay,0.5 +az])) {return false;}
    // }
    // }
    // }

    // Test 8
    ////// Test in the [0,x,y] plan ////
    // const radius13: number = 1;
    // const radius14: number = 1;
    // const O13: gs.IPoint = g.addPoint([-0.5,0,0]);
    // const O14: gs.IPoint = g.addPoint([0.5,0,0]);
    // const circle13: gs.ICircle = g.addCircle(O13, [radius13,0,0], [0,radius13,0], [0,180]);
    // const circle14: gs.ICircle = g.addCircle(O14, [radius13,0,0], [0,radius13,0], [0,180]);
    // const results1314: gs.IPoint[] = test._isectCircleCircle2D(circle13,circle14);
    // console.log("results 1314");
    // for (const point of results1314) {
    //     console.log(point.getPosition());
    // }
    // console.log("results 1314");
    return true;
}
export function test_isectCirclePlane3D() {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const plane_point: gs.IPoint = g.addPoint([3,0,0]);
    const plane: gs.IPlane = g.addPlane(plane_point, [0,1,0], [0,0,1]);
    const circle_point: gs.IPoint = g.addPoint([10.2,2.8,-12.7]);
    const circle: gs.ICircle = g.addCircle(circle_point, [8.376648782031275,-12.411067032321805,0.2706372332304663], [9.437161624911786,6.578546831064237,9.588471007782674], [0,267.88189588962683]);
    // const results: gs.IPoint[] = test._isectCirclePlane3D(circle, plane);
    const radius: number = circle.getRadius();
    const Vect_X: three.Vector3 = new three.Vector3(8.376648782031275,-12.411067032321805,0.2706372332304663).normalize();
    // for (const point of results) {
    //     console.log(" [ " + point.getPosition() + " ] ");
    // }
    // console.log(" ///results");

// outputs

    // const circle_point: gs.IPoint = g.addPoint([10.204971386445056,2.866308022408197,-12.681581352450209]);
    // const circle: gs.ICircle = g.addCircle(circle_point, [8.376648782031275,-12.411067032321805,0.2706372332304663], [9.437161624911786,6.578546831064237,9.588471007782674], [0,267.88189588962683]);




    // // test 1
    // const m: gs.IModel = new gs.Model();
    // const pt_circle: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    // const pt_plane: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    // const circle: gs.ICircle = m.getGeom().addCircle(pt_circle,[1,0,0],[0,0,1],[0,360]);
    // const plane: gs.IPlane = m.getGeom().addPlane(pt_plane,[1,0,0],[0,1,0]);
    // const intersects: gs.IPoint[] = test._isectCirclePlane3D(circle,plane);
    // if (intersects !== null) {
    //     for (const point of intersects) {
    //         point.getPosition();
    //     }
    // }
    // // test 2
    // const pt_circle2: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    // const pt_plane2: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    // const circle2: gs.ICircle = m.getGeom().addCircle(pt_circle2,[0,1,0],[0,0,1],[0,360]);
    // const plane2: gs.IPlane = m.getGeom().addPlane(pt_plane2,[1,0,0],[0,1,0]);
    // const intersects2: gs.IPoint[] = test._isectCirclePlane3D(circle2,plane2);
    // // if (intersects !== null) {
    // //     for (const point of intersects2) {
    // //         console.log(point.getPosition());
    // //     }
    // // }
    // // test 3
    // const pt_circle3: gs.IPoint = m.getGeom().addPoint([0,0,3]);
    // const pt_plane3: gs.IPoint = m.getGeom().addPoint([0,0.5,0]);
    // const circle3: gs.ICircle = m.getGeom().addCircle(pt_circle3,[1,0,0],[0,1,0],[0,360]);
    // const plane3: gs.IPlane = m.getGeom().addPlane(pt_plane3,[1,0,0],[0,0,1]);
    // const intersects3: gs.IPoint[] = test._isectCirclePlane3D(circle3,plane3);
    // // if (intersects !== null) {
    // //     for (const point of intersects3) {
    // //         console.log(point.getPosition());
    // //     }
    // // }
    // // test 3
    // // const m1: gs.IModel = new gs.Model();
    // // const pt_circle1: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    // // const pt_plane1: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    // // const circle1: gs.ICircle = m.getGeom().addCircle(pt_circle,[1,0,0],[0,1,0],[0,360]);
    // // const plane1: gs.IPlane = m.getGeom().addPlane(pt_plane,[1,0,0],[0,1,0]);
    // // const intersects1: gs.IPoint[] = test._isectCirclePlane3D(circle,plane);
    // // if (intersects !== null) {
    // //     for (const point of intersects) {
    // //         console.log(point.getPosition());
    // //     }
    // // }
    return true;
}
export function test_isectEllipsePlane3D() {
    const m: gs.IModel = new gs.Model();
    const pt_ellipse: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    const pt_plane: gs.IPoint = m.getGeom().addPoint([0,0,0]);
    const ellipse: gs.IEllipse = m.getGeom().addEllipse(pt_ellipse,[2,0,0],[0,0,1],[0,360]);
    const plane: gs.IPlane = m.getGeom().addPlane(pt_plane,[1,0,0],[0,1,0]);
    const intersects: gs.IPoint[] = test._isectEllipsePlane3D(ellipse,plane);
    if (intersects !== null) {
        for (const point of intersects) {
            point.getPosition();
        }
    }

// const ell: gs.IEllipse = m.getGeom().addEllipse(pt_ellipse,[1,1,1],[2,3,4]);
// ell.

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
