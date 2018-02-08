import * as gs from "gs-json";
import * as threex from "./libs/threex/threex";
import * as three from "three";
import * as math_conic from "./libs/conics/conics";

//  ==========================================================================================================
//  Util method
//  ==========================================================================================================
export function _argsCheckAngles(angles: [number, number]): [number, number] {
    if (angles === undefined || angles === null) {return undefined;}
    return [(angles[0] + 720) % 360 ,(angles[1] + 720) % 360];
}

// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// --------------- functions to show ellipse in viewer, prior merging of conics to master in gs-json -------------
export function _render_XYZ(ellipse: gs.IEllipse): gs.IPoint[] {
    const points: gs.IPoint[] = [];
    return points;
}
export function ellipseLength(curve: gs.IEllipse): number {
    const vector_x: number[] = curve.getAxes()[0];
    const vector_y: number[] = curve.getAxes()[1];
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2]) >= threshold) {
        throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");
    }
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    // Radians, although input angles are expected in Degrees
    if( Math.abs(a-b) < threshold) { return a*Math.abs(angle_2 - angle_1);}
    // Range [x1,x2] for length calculation would provide 2 circle arcs,
    // Whereas Angle_1 / Angle_2 provide a unique circle arc.
    let eccentricity: number = null ;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    const K: number = 1000;
    let theta: number = null;
    const d_th: number  = (angle_2 - angle_1)/K ;
    let distance: number = 0;
    for(let k = 0; k < K ; k++ ) {
        theta = angle_1 + k*(angle_2 - angle_1)/K ;
        distance = distance + d_th *
            Math.sqrt(1 - eccentricity * Math.sin(theta) * eccentricity * Math.sin(theta));
        // distance along the curve assessed and updated at each timestep;
    }
    distance = Math.max(a,b) * distance ;
    return distance;
}

/**
 * Calculate the xyz position at parameter t. The t parameter range is from 0 to 1.
 */
export function ellipseEvaluate(curve: gs.IEllipse, t: number): gs.XYZ {
    // ConicCurve assumed to be an ellipse or circle;
    const vector_x: gs.XYZ = curve.getAxes()[0];
    const vector_y: gs.XYZ = curve.getAxes()[1];
    // Initial vector_x and vector_y require to be (almost) orthogonal
    const threshold: number = 1e-6;
    if(Math.abs(vector_x[0]*vector_y[0] + vector_x[1]*vector_y[1] + vector_x[2]*vector_y[2])
        >= threshold) { throw new Error("Orthogonal vectors are required for that Ellipse / Conic length calculation");}
    const a: number = Math.sqrt(vector_x[0]*vector_x[0] + vector_x[1]*vector_x[1] + vector_x[2]*vector_x[2]);
    const b: number = Math.sqrt(vector_y[0]*vector_y[0] + vector_y[1]*vector_y[1] + vector_y[2]*vector_y[2]);
    const u: number[] = [a,0];
    const v: number[] = [0,b];
    const z_uv: number[] = [0,0,u[0]*v[1] - u[1]*v[0]]; // cross product
    const angle_1: number = curve.getAngles()[0]*(2*Math.PI)/360;
    const angle_2: number = curve.getAngles()[1]*(2*Math.PI)/360;
    const l: number = ellipseLength(curve);
    let epsilon: number = 1 ;
    let theta: number = null ;
    const K: number = 1000 ;  // Does this not depend on the length of the ellipse?
    let x: number = null;
    let y: number = null;
    let r: number = null;
    let theta_t: number = null;
    const param: number = b*b/a;
    const m: gs.Model = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const pt: gs.IPoint = g.addPoint([0,0,0]);
    let curve_theta: gs.IEllipse = null ;
    for(let k = 0; k < K; k++) { // This loops 1000 x 1000 times !
        while( epsilon >= 0) {
            theta = (angle_1 + k * (angle_2 - angle_1)/K);
            curve_theta = g.addEllipse(curve.getOrigin(),curve.getAxes()[0],
                curve.getAxes()[1],[curve.getAngles()[0],theta]);  // Why is this adding ellipses to the model?
            epsilon = t*l - ellipseLength(curve_theta);
            if(epsilon < 0) {theta_t = theta;}
        }
    }
    let eccentricity: number = null;
    if(a>b) { eccentricity = Math.sqrt( 1 - (b/a)*(b/a) ) ;}
    if(b>a) { eccentricity = Math.sqrt( 1 - (a/b)*(a/b) ) ;}
    r = param / (1 + eccentricity*Math.cos(theta_t));
    x = r * Math.cos(theta_t); // expressed in the plan inferred by (u,v)
    y = r * Math.sin(theta_t); // expressed in the plan inferred by (u,v)
    const U1: three.Vector3 = new three.Vector3(
        curve.getAxes()[0][0], curve.getAxes()[0][1], curve.getAxes()[0][2]);
    const V1: three.Vector3 = new three.Vector3(
        curve.getAxes()[1][0], curve.getAxes()[1][1], curve.getAxes()[1][2]);
    U1.normalize();
    V1.normalize();
    const O1O2: three.Vector3 = new three.Vector3(
        curve.getOrigin()[0], curve.getOrigin()[1], curve.getOrigin()[2]);
    const O2P: three.Vector3 = threex.addVectors(U1.multiplyScalar(x),V1.multiplyScalar(y));
    const O1P: three.Vector3 = threex.addVectors(O1O2,O2P);
    return [O1P.x,O1P.y,O1P.z];
}
export function ellipseGetRenderXYZs(curve: gs.IEllipse, resolution: number): gs.XYZ[] {
    const O: number[] = curve.getOrigin().getPosition();
    const renderingXYZs: gs.XYZ[] = [];
    const renderXYZs: gs.XYZ[] = [];
    let r: number = null;
    let theta: number = 0;
    let d_theta: number = 0;
    const U1: three.Vector3 = new three.Vector3(...curve.getAxes()[0]).normalize();
    const V1: three.Vector3 = new three.Vector3(...curve.getAxes()[1]).normalize();
    const a: number = new three.Vector3(...curve.getAxes()[0]).length();
    const b: number = new three.Vector3(...curve.getAxes()[1]).length();
    const L: number = Math.PI * Math.sqrt(2*(a*a + b*b) - (a-b)*(a-b)/2);
    const l: number = L * resolution;
    const param: number = b*b/a;
    const c: number = Math.sqrt(Math.abs(a*a - b*b));
    if(a>=b) {
        const e: number = Math.sqrt(1 - b*b/(a*a));
        let N: number = 0;
        let eps: number = 1;
        while (eps>0) {
            theta = theta + d_theta ;
            eps = Math.PI*2 - theta;
            N++;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
        }
        N--;
        theta = 0;
        d_theta = 0;
        for (let k = 0; k<N;k++) {
            theta = theta + d_theta ;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
            renderingXYZs.push([(r*Math.cos(theta)) + c,r * Math.sin(theta),0]);
        }
    }
    if(b>a) {
        const e: number = Math.sqrt(1 - a*a/(b*b));
        let N: number = 0;
        let eps: number = 1;
        while (eps>0) {
            theta = theta + d_theta ;
            eps = Math.PI*2 - theta;
            N++;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
        }
        N--;
        theta = 0;
        d_theta = 0;
        for (let k = 0; k<N;k++) {
            theta = theta + d_theta;
            r = param / (1 + e*Math.cos(theta));
            d_theta = l/r;
            renderingXYZs.push([r*Math.cos(theta),(r*Math.sin(theta))+c,0]);
        }
    }
    const results: three.Vector3[] = [];
    for (const point of renderingXYZs) {results.push(new three.Vector3(point[0],point[1],point[2]));}
    const O1: three.Vector3 = new three.Vector3(0,0,0);
    const e1: three.Vector3 = new three.Vector3(1,0,0);
    const e2: three.Vector3 = new three.Vector3(0,1,0);
    const e3: three.Vector3 = new three.Vector3(0,0,1);
    const C1: three.Vector3 = new three.Vector3(
    curve.getOrigin().getPosition()[0],curve.getOrigin().getPosition()[1],curve.getOrigin().getPosition()[2]);
    const W1: three.Vector3 = threex.crossVectors(U1,V1,true);
    const C1O1: three.Vector3 = threex.subVectors(O1,C1,false);
    const vec_O_1: three.Vector3 = new three.Vector3(
    C1O1.dot(U1),C1O1.dot(V1),C1O1.dot(W1));
    const x1: three.Vector3 = new three.Vector3(e1.dot(U1),e1.dot(V1),e1.dot(W1));
    const y1: three.Vector3 = new three.Vector3(e2.dot(U1),e2.dot(V1),e2.dot(W1));
    let z1: three.Vector3 = new three.Vector3();
    z1 = z1.crossVectors(x1,y1);
    const m1: three.Matrix4 = new three.Matrix4();
    const o_neg: three.Vector3 = vec_O_1.clone().negate();
    m1.setPosition(o_neg);
    let m2: three.Matrix4 = new three.Matrix4();
    m2 = m2.makeBasis(x1.normalize(), y1.normalize(), z1.normalize());
    m2 = m2.getInverse(m2);
    const m3: three.Matrix4 = new three.Matrix4();
    const rotation1: three.Matrix4 = m3.multiplyMatrices(m2, m1);
    const results_c1: three.Vector3[] = [];
    for (const point of results) {results_c1.push(threex.multVectorMatrix(point,rotation1));}
    for(const point of results_c1) {renderXYZs.push([point.x,point.y,point.z]);}
    // throw new Error("Method not implemented");
    return renderXYZs;
}

// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------


//  ===============================================================================================================
//  Ellipse Constructors ==========================================================================================
//  ===============================================================================================================

/**
 * Create a circle that passes three points.
 * If is_arc is false, a circle is created.
 * Otherwise, an arc is created.
 *
 * @param point1 Point object, on the circle.
 * @param point2 Point object, on the circle.
 * @param point3 Point object, on the circle.
 * @param is_arc If true, an arc is generated that starts at point1 and end at point3, passing through point 2.
 * @returns New circle object.
 */
export function From3Points(point1: gs.IPoint, point2: gs.IPoint, point3: gs.IPoint, is_closed: boolean ): gs.ICircle {
    if (!point1.exists()) {throw new Error("Error: point1 has been deleted.");}
    if (!point2.exists()) {throw new Error("Error: point2 has been deleted.");}
    if (!point3.exists()) {throw new Error("Error: point3 has been deleted.");}
    // check
    const model: gs.IModel = point1.getModel();
    if (point2.getModel() !== model) {throw new Error("Error: Points must all be in same model.");}
    if (point3.getModel() !== model) {throw new Error("Error: Points must all be in same model.");}
    // do the maths
    const result = math_conic._circleFrom3Points(
        point1.getPosition(), point2.getPosition(), point3.getPosition(), is_closed);
    const origin: gs.IPoint = model.getGeom().addPoint(result.origin);
    const vec_x: gs.XYZ = result.vec_x;
    const vec: gs.XYZ = result.vec_y;
    // make the circle or arc
    if (is_closed) {
        return origin.getGeom().addCircle(origin, vec_x, vec);
    } else {
        return origin.getGeom().addCircle(origin, vec_x, vec, [0, result.angle]);
    }
}

/**
 * Adds an arc to the model based on three points
 *
 * All points are taken to be points along the arc
 * @param pt1 Start point of arc
 * @param pt2 Second point on arc
 * @param pt3 End point of arc
 * @returns New arc if successful
 */
export function ArcFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.ICircle {
    const m1: gs.IModel = pt1.getModel();
    const m2: gs.IModel = pt2.getModel();
    const m3: gs.IModel = pt3.getModel();
    if (m1 !== m2) {throw new Error("Points must be in the same model.");}
    if (m1 !== m3) {throw new Error("Points must be in the same model.");}
    const g1: gs.IGeom = m1.getGeom();
    if(threex.vectorsAreCodir(threex.subPoints(pt1,pt2),
        threex.subPoints(pt1,pt3))) {throw new Error("Points must be not aligned");}
    const AB: three.Vector3 = threex.vectorFromPointsAtoB(pt1,pt2);
    const AC: three.Vector3 = threex.vectorFromPointsAtoB(pt1,pt3);
    const BC: three.Vector3 = threex.vectorFromPointsAtoB(pt2,pt3);
    const radius: number = BC.length() / (2*threex.crossVectors(AB.normalize(),AC.normalize(),false).length());
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const circle_1: gs.ICircle = g.addCircle(pt1, [radius,0,0], [0,radius,0]);
    const circle_2: gs.ICircle = g.addCircle(pt2, [radius,0,0], [0,radius,0]);
    const circle_3: gs.ICircle = g.addCircle(pt3, [radius,0,0], [0,radius,0]);
    const c1: gs.IPoint[] = math_conic._isectCircleCircle2D(circle_1,circle_2);
    const c2: gs.IPoint[] = math_conic._isectCircleCircle2D(circle_1,circle_3);

    let center: gs.IPoint = null;
    if(gs.Arr.equal(c1[0].getPosition(),c2[0].getPosition())) {
    center = g.addPoint(c1[0].getPosition());
    // center = g1.addPoint(c1[0].getPosition());
    }
    if(gs.Arr.equal(c1[0].getPosition(),c2[1].getPosition())) {
    center = g.addPoint(c1[0].getPosition());
    // center = g1.addPoint(c1[0].getPosition());
    }
    if(gs.Arr.equal(c1[1].getPosition(),c2[0].getPosition())) {
    center = g.addPoint(c1[1].getPosition());
    // center = g1.addPoint(c1[1].getPosition());
    }
    if(gs.Arr.equal(c1[1].getPosition(),c2[1].getPosition())) {
    center = g.addPoint(c1[1].getPosition());
    // center = g1.addPoint(c1[1].getPosition());
    }
    if(center === null) {throw new Error ("Review thresholds");}

    const center_pt1: three.Vector3 = threex.vectorFromPointsAtoB(center, pt1);
    const center_pt2: three.Vector3 = threex.vectorFromPointsAtoB(center, pt2);
    const center_pt3: three.Vector3 = threex.vectorFromPointsAtoB(center, pt3);

    const angle: number = Math.max(
        Math.min(center_pt1.angleTo(center_pt2),center_pt2.angleTo(center_pt1)),
        Math.min(center_pt1.angleTo(center_pt3),center_pt3.angleTo(center_pt1)),
        Math.min(center_pt2.angleTo(center_pt3),center_pt3.angleTo(center_pt2)));

    let start_point: gs.IPoint = null;
    if(angle === center_pt1.angleTo(center_pt2)) {
     start_point = g.addPoint(pt1.getPosition());}
    if(angle === center_pt2.angleTo(center_pt1)) {
     start_point = g.addPoint(pt2.getPosition());}
    if(angle === center_pt1.angleTo(center_pt3)) {
     start_point = g.addPoint(pt1.getPosition());}
    if(angle === center_pt3.angleTo(center_pt1)) {
     start_point = g.addPoint(pt3.getPosition());}
    if(angle === center_pt2.angleTo(center_pt3)) {
     start_point = g.addPoint(pt2.getPosition());}
    if(angle === center_pt3.angleTo(center_pt2)) {
     start_point = g.addPoint(pt3.getPosition());}
    const u: three.Vector3 = threex.vectorFromPointsAtoB(center,start_point);
    let normal: three.Vector3 = null;
    normal = threex.crossVectors(u,center_pt1);
    if( normal.length() === 0 ) {normal = threex.crossVectors(u,center_pt2);}
    if( normal.length() === 0 ) {normal = threex.crossVectors(u,center_pt3);}
    const v: three.Vector3 = threex.crossVectors(normal.normalize(),u);

    return g1.addCircle(g1.addPoint(center.getPosition()),
         [u[0],u[1],u[2]],
         [v[0],v[1],v[2]],
         [0,angle]);
}

/**
 * Adds a closed circle to the model based on three points
 *
 * All points are taken to be points along the circumference of the circle
 * @param pt1 First point on circle
 * @param pt2 Second point on circle
 * @param pt3 Third point on circle
 * @returns New circle if successful
 */
export function CircleFrom3Points(pt1: gs.IPoint, pt2: gs.IPoint, pt3: gs.IPoint ): gs.ICircle {
    const m1: gs.IModel = pt1.getModel();
    const m2: gs.IModel = pt2.getModel();
    const m3: gs.IModel = pt3.getModel();
    if (m1 !== m2) {
        throw new Error("Points must be in the same model.");}
    if (m1 !== m3) {
        throw new Error("Points must be in the same model.");}
    if(threex.vectorsAreCodir(threex.subPoints(pt1,pt2),
        threex.subPoints(pt1,pt3))) {throw new Error("Points must be not aligned");}
    const AB: three.Vector3 = threex.vectorFromPointsAtoB(pt1,pt2);
    const AC: three.Vector3 = threex.vectorFromPointsAtoB(pt1,pt3);
    const BC: three.Vector3 = threex.vectorFromPointsAtoB(pt2,pt3);
    const radius: number = BC.length() / (2*threex.crossVectors(AB.normalize(),AC.normalize(),false).length());
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const circle_1: gs.ICircle = g.addCircle(pt1, [radius,0,0], [0,radius,0],[0,360]);
    const circle_2: gs.ICircle = g.addCircle(pt2, [radius,0,0], [0,radius,0],[0,360]);
    const circle_3: gs.ICircle = g.addCircle(pt3, [radius,0,0], [0,radius,0],[0,360]);
    const c1: gs.IPoint[] = math_conic._isectCircleCircle2D(circle_1,circle_2);
    const c2: gs.IPoint[] = math_conic._isectCircleCircle2D(circle_1,circle_3);
    const g1: gs.IGeom = m1.getGeom();
    if(gs.Arr.equal(c1[0].getPosition(),c2[0].getPosition())) {
         return g1.addCircle(g1.addPoint(c1[0].getPosition()),[radius,0,0],[0,radius,0],[0,360]);
    }
    if(gs.Arr.equal(c1[0].getPosition(),c2[1].getPosition())) {
         return g1.addCircle(g1.addPoint(c1[0].getPosition()),[radius,0,0],[0,radius,0],[0,360]);
    }
    if(gs.Arr.equal(c1[1].getPosition(),c2[0].getPosition())) {
         return g1.addCircle(g1.addPoint(c1[1].getPosition()),[radius,0,0],[0,radius,0],[0,360]);
    }
    if(gs.Arr.equal(c1[1].getPosition(),c2[1].getPosition())) {
         return g1.addCircle(g1.addPoint(c1[1].getPosition()),[radius,0,0],[0,radius,0],[0,360]);
    }
    throw new Error ("Review thresholds");
}

//  ===============================================================================================================
//  Conic Functions ===============================================================================================
//  ===============================================================================================================

// - WEEK 6 -
/**
 * Returns a point on a conic curve based on a parameter between 0 and 1
 *
 * @param curve Conic curve to evaluate
 * @param t Parameter along curve to evaluate (0 is the start of the curve and 1 is the end)
 * @returns Point on curve
 */
export function evalParam(curve: gs.ICircle|gs.IEllipse, t: number): gs.IPoint {
    throw new Error("Method not implemented");
}

// - WEEK 6 -
/**
 * Returns a parameter along a conic curve based on a point on the curve
 *
 * Returns null if point specified does not lie on the curve (within a tolerance of 0.1)
 * @param curve Conic curve to evaluate
 * @param point Point to evaluate
 * @returns Parameter on curve if successful, null if unsuccessful or on error
 */
export function evalPoint(curve: gs.ICircle|gs.IEllipse, point: gs.IPoint): number {
    throw new Error("Method not implemented");
}

/**
 * Extends an arc
 *
 * Changes the starting and ending angles for a conic curve such that the curve is lengthened<br/>
 * Conic curve should be either a circular arc or an elliptical arc<br/>
 * Extension will follow the original curvature of the circle or ellipse the arc was constructed from<br>
 * If extension causes length of curve to exceed the circumference of the underlying circle or ellipse,
 * returns a closed circle or ellipse.<br/>
 * Returns null if distance is negative
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @param copy Performs transformation on a duplicate copy of the input curve if true
 * @returns Extended conic curve, null if unsuccessful or on error
 */
export function extendArc(curve: gs.ICircle, direction: number, distance: number, copy: boolean):
                gs.ICircle {
    throw new Error("Method not implemented");
}

/**
 * Extends an elliptical arc
 *
 * Changes the starting and ending angles for a conic curve such that the curve is lengthened<br/>
 * Conic curve should be either a circular arc or an elliptical arc<br/>
 * Extension will follow the original curvature of the circle or ellipse the arc was constructed from<br>
 * If extension causes length of curve to exceed the circumference of the underlying circle or ellipse,
 * returns a closed circle or ellipse.<br/>
 * Returns null if distance is negative
 * @param curve Conic curve to extend
 * @param direction Direction to extend curve in (0-Start, 1-End, 2-Both)
 * @param distance Distance to extend curve
 * @param copy Performs transformation on a duplicate copy of the input curve if true
 * @returns Extended conic curve, null if unsuccessful or on error
 */
export function extendEllArc(curve: gs.IEllipse, direction: number, distance: number, copy: boolean):
                gs.IEllipse {
    throw new Error("Method not implemented");
}


