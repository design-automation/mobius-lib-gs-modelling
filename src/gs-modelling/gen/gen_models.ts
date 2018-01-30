import * as gs from "gs-json";
import * as gsm from "./../lib/_export_dev";
import * as cir from "./../lib/circle_dev";

export function randXYZ(): gs.XYZ {
    return [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30];
}

/**
 *
 */
export function genModelTest1(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const plane: gs.IPlane = gsm.plane.FromOriginYZ(gsm.point.FromXYZ(m, [3,0,0]));
    for (let i = 0; i < 10; i++) {
        const points: gs.IPoint[] = gsm.point.FromXYZs(m, [
            randXYZ(),
            randXYZ(),
            randXYZ(),
        ]);
        const arc = cir.From3Points(points[0], points[1], points[2], false);
        const pline: gs.IPolyline = gsm.pline.FromPoints(points, false);
        gsm.isect.circlePlane3D(arc, plane);
    }
    return m;
}

/**
 *
 */
export function genModelTest1b(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const plane: gs.IPlane = gsm.plane.FromOriginYZ(gsm.point.FromXYZ(m, [3,0,0]));
    console.log("hello world");
    for (let i = 0; i < 1; i++) {
        const origin: gs.IPoint = gsm.point.FromXYZ(m, randXYZ());
        const arc = gsm.circle.FromOrigin2Vectors(origin, randXYZ(), randXYZ(), [0, Math.random() * 360]);
        gsm.isect.circlePlane3D(arc, plane);
        // check calculations
        console.log("inputs");
        console.log("Circle    ");
        console.log("Origin    = " + arc.getOrigin().getPosition());
        console.log("Angles    = " + arc.getAngles());
        console.log(" Vec_X   = " + arc.getAxes()[0]);
        console.log(" Vec_Y   = " + arc.getAxes()[1]);
        console.log("Arc = ");
        console.log(arc.getAxes());
        console.log("outputs");
        for (const point of gsm.isect.circlePlane3D(arc, plane)) {
            console.log(point.getPosition());
        }
    }
    return m;
}

/**
 * Generates a model with 4 points. Two of the points have the same position.
 */
export function genModelTest2(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    // for (let i = 0; i < 5; i++) {
    //     const points: gs.IPoint[] = gsm.point.FromXYZs(m, [
    //         randPt(),
    //         randPt(),
    //         randPt(),
    //     ]);
    //     const arc = gsm.circle.FromOrigin2Points(points[1], points[0], points[2], true);
    //     const pline: gs.IPolyline = gsm.pline.FromPoints(points, false);
    // }

    const p0: gs.IPoint = gsm.point.FromXYZ(m, [0,0,-10] as gs.XYZ);
    const arc0 = gsm.circle.FromOrigin2Vectors(p0, [10,0,0], [0,10,0], null);

    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0] as gs.XYZ);
    const arc1 = gsm.circle.FromOrigin2Vectors(p1, [10,0,0], [0,10,0], [0,315]);

    const pa: gs.IPoint = gsm.point.FromXYZ(m, [0,0,10] as gs.XYZ);
    const pb: gs.IPoint = gsm.point.FromXYZ(m, [10,0,10] as gs.XYZ);
    const pc: gs.IPoint = gsm.point.FromXYZ(m, [10,10,10] as gs.XYZ);
    const arc2 = gsm.circle.FromOrigin2Points(pa, pb, pc, [0,315]);

    const p10: gs.IPoint = gsm.point.FromXYZ(m, [0,0,20] as gs.XYZ);
    const arc3 = gsm.circle.FromOriginXY(p10, 10, [0,315]);
    //const pline: gs.IPolyline = gsm.pline.FromPoints([p2, p1, p3], false);

    const p100: gs.IPoint = gsm.point.FromXYZ(m, [10,0,30] as gs.XYZ);
    const p200: gs.IPoint = gsm.point.FromXYZ(m, [-10,0,30] as gs.XYZ);
    const p300: gs.IPoint = gsm.point.FromXYZ(m, [0,-10,30] as gs.XYZ);
    //const arc4 = gsm.circle.From3Points(p100, p200, p300, false);

    const plane: gs.IPlane = gsm.plane.FromOriginYZ(gsm.point.FromXYZ(m, [3,0,0]));
    gsm.isect.circlePlane3D(arc0, plane);
    gsm.isect.circlePlane3D(arc1, plane);
    gsm.isect.circlePlane3D(arc2, plane);
    gsm.isect.circlePlane3D(arc3, plane);
    //gsm.isect.circlePlane3D(arc4, plane);

    return m;
}

/**
 *
 */
export function genModelTest3(): gs.IModel {
    const m: gs.IModel = gsm.model.New();

    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0] as gs.XYZ);
    const cir1 = gsm.circle.FromOriginXY(p1, 10, null);

    const p2: gs.IPoint = gsm.point.FromXYZ(m, [5,0,0] as gs.XYZ);
    const cir2 = gsm.circle.FromOriginXY(p2, 10, null);

    const points2: gs.IPoint[] = gsm.isect.circleCircle2D(cir1, cir2);
    m.getGeom().addPolyline(points2, false);

    const p3: gs.IPoint = gsm.point.FromXYZ(m, [7,0,0] as gs.XYZ);
    const cir3 = gsm.circle.FromOriginXY(p3, 10, [0,180]);
    const points3: gs.IPoint[] = gsm.isect.circleCircle2D(cir1, cir3);
    //console.log(points3);
    m.getGeom().addPolyline([p3, points3[0]], false);

    return m;
}

/**
 *
 */
export function genModelTest4(): gs.IModel {
    const m: gs.IModel = gsm.model.New();

    const p1: gs.IPoint = gsm.point.FromXYZ(m, [6,2,0] as gs.XYZ);
    const cir1 = gsm.circle.FromOriginXY(p1, 5, [10,300]);

    for (let i = 0; i < 10; i++) {
        const p2: gs.IPoint = gsm.point.FromXYZ(m, [i,0,0] as gs.XYZ);
        const plane: gs.IPlane = gsm.plane.FromOriginYZ(p2);
        gsm.isect.circlePlane3D(cir1, plane);
    }
    return m;
}

/**
 *
 */
export function genModelTest5(): gs.IModel {
    const m: gs.IModel = gsm.model.New();

    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0] as gs.XYZ);
    const cir1 = gsm.circle.FromOriginXY(p1, 10, null);

    const p2: gs.IPoint = gsm.point.FromXYZ(m, [5,0,0] as gs.XYZ);
    const cir2 = gsm.circle.FromOriginXY(p2, 10, null);

    // isect
    const points2: gs.IPoint[] = gsm.isect.circleCircle2D(cir1, cir2);
    //m.getGeom().addPolyline(points2, false);

    //split
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [7,0,0] as gs.XYZ);
    const cir3 = gsm.circle.FromOriginXY(p3, 10, [0,180]);
    const arcs: gs.ICircle[] = gsm.split.circleCircle2D(cir1, cir3);

    //m.getGeom().delObjs([arcs[1]], true); //ERRROR

    return m;
}

export function genModelTest6(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const g: gs.IGeom = m.getGeom();
    // points and arc
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0] as gs.XYZ);

    const arc0: gs.ICircle = gsm.circle.FromOrigin2Vectors(p1,
        [6.25,0,-15],
        [0.923076923076923, 0, 0.38461538461538486],
        [0, 134.7602701039191 ]);

    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,15] as gs.XYZ);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,0,30] as gs.XYZ);
    //const arc1: gs.ICircle = gsm.circle.From3Points(p1, p2, p3, false);
    //console.log("ARC1", arc1.getAxes(), arc1.getAngles());

    const arc2 = gsm.circle.FromOriginYZ(p1, 20, [0,80]);
    //console.log("ARC2", arc2.getAxes(), arc2.getAngles());
    //
    for (let i = 0; i < 10; i++) {
        const o: gs.IPoint = gsm.point.FromXYZ(m, [0,0,1 + (i*2)] as gs.XYZ);
        const plane: gs.IPlane = gsm.plane.FromOriginXY(o);
        const i0: gs.IPoint[] = gsm.isect.circlePlane3D(arc0, plane);
        //const i1: gs.IPoint[] = gsm.isect.circlePlane3D(arc1, plane);
        const i2: gs.IPoint[] = gsm.isect.circlePlane3D(arc2, plane);
    }
    return m;
}

export function genModelTest7(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const g: gs.IGeom = m.getGeom();
    // points and arc
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0] as gs.XYZ);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,15] as gs.XYZ);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,0,30] as gs.XYZ);
    //const arc1: gs.ICircle = gsm.circle.From3Points(p1, p2, p3, false);
    for (let i = 0; i < 10; i++) {
        const o: gs.IPoint = gsm.point.FromXYZ(m, [0,0,1 + (i*2)] as gs.XYZ);
        const plane: gs.IPlane = gsm.plane.FromOriginXY(o);
        //const i1: gs.IPoint[] = gsm.isect.circlePlane3D(arc1, plane);
    }
    return m;
}

export function genModelTest8(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const g: gs.IGeom = m.getGeom();
    // points and arc
    const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,0,0] as gs.XYZ);
    const p2: gs.IPoint = gsm.point.FromXYZ(m, [10,0,15] as gs.XYZ);
    const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,0,30] as gs.XYZ);
    gsm.point.del([p1, p2, p3]);
    return m;
}

export function genModelWeek3(): gs.IModel {
    const m: gs.IModel = gsm.model.New();
    const g: gs.IGeom = m.getGeom();
    // function arc3p(a: number, b: number, c:number): gs.ICircle {
    //     const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,a,0] as gs.XYZ);
    //     const p2: gs.IPoint = gsm.point.FromXYZ(m, [0,b,15] as gs.XYZ);
    //     const p3: gs.IPoint = gsm.point.FromXYZ(m, [0,c,30] as gs.XYZ);
    //     return gsm.circle.From3Points(p1, p2, p3, false);
    // }
    function arcyz(a: number, rad: number, flip: boolean): gs.ICircle {
        const p1: gs.IPoint = gsm.point.FromXYZ(m, [0,a,0] as gs.XYZ);
        if (flip) {
            return gsm.circle.FromOriginYZ(p1, rad, [0, 80]);
        } else {
            return gsm.circle.FromOriginYZ(p1, rad, [100, 180]);
        }
    }
    // const arc1: gs.ICircle = arc(0,2,10);
    // const arc2: gs.ICircle = arc(5,6,16);
    // const arc3: gs.ICircle = arc(24,22,17);
    // const arc4: gs.ICircle = arc(35,30,22);
    const arc1: gs.ICircle = arcyz(20,30,false);
    const arc2: gs.ICircle = arcyz(10,30,false);
    const arc3: gs.ICircle = arcyz(-10,30,true);
    const arc4: gs.ICircle = arcyz(-20,30,true);

    for (let i = 0; i < 10; i++) {
        const o: gs.IPoint = gsm.point.FromXYZ(m, [0,0,1 + (i*2)] as gs.XYZ);
        const plane: gs.IPlane = gsm.plane.FromOriginXY(o);
        const i1: gs.IPoint = gsm.isect.circlePlane3D(arc1, plane)[0];
        const i2: gs.IPoint = gsm.isect.circlePlane3D(arc2, plane)[0];
        const i3: gs.IPoint = gsm.isect.circlePlane3D(arc3, plane)[0];
        const i4: gs.IPoint = gsm.isect.circlePlane3D(arc4, plane)[0];
        const c1: gs.IPoint = gsm.point.FromPointsMean([i1, i3]);
        const c2: gs.IPoint = gsm.point.FromPointsMean([i2, i4]);
        const r1: number = gsm.calc.distBetweenPoints(i1, c1);
        const r2: number = gsm.calc.distBetweenPoints(i2, c2);
        const cir1: gs.ICircle = gsm.circle.FromOriginXY(c1, r1, null);
        const cir2: gs.ICircle = gsm.circle.FromOriginXY(c2, r2, null);
        const arcs: gs.ICircle[] = gsm.split.circleCircle2D(cir1, cir2);
        gsm.object.del([arcs[1], arcs[3], plane], false);
        gsm.point.del([i1, i2, i3, i4]);
    }
    gsm.object.del([arc1, arc2, arc3, arc4], false);
    return m;
}

