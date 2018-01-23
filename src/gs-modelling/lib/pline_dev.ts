import * as gs from "gs-json";
import * as three from "three";
import * as xform from "./_math_xform_dev";
import * as three_utils from "./_three_utils_dev";

/**
 * Copies polylines from one model to another
 * @param model_1 Model to copy from
 * @param model_2 Model to copy to
 * @returns List of polylines copied into specified model if successful
 */
export function CopyFromModel(model_1: gs.IModel, model_2: gs.IModel ): gs.IPolyline[] {
    throw new Error("Method not implemented");
}

/**
 * Adds a polyline from the model based on a conic curve
 *
 * Creates equally spaced points along a conic curve and joins them to create a polyline<br/>
 * If specified conic curve is closed, returns a closed polyline
 * @param curve Conic curve to construct polyline from
 * @param segments Number of segments in polyline
 * @returns Polyline object if successful
 */
export function FromEllipse(curve: gs.ICircle|gs.IEllipse, segments: number): gs.IPolyline {
    // TODO
    throw new Error("Method not implemented");
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveClosestPoint
//  http://verbnurbs.com/docs/geom/NurbsSurface/#closestparam
/**
 * Returns a param along a polyline based on a point on the polyline
 *
 * Point should lie on polyline (within a tolerane of 0.1)<br/>
 * Returns null if point does not lie on polyline
 * @param pline Polyline to evaluate
 * @param point Point to evaluate
 * @returns Param on polyline if successful, null if unsuccessful or on error
 */
export function evalPoint(pline: gs.IPolyline, point: gs.IPoint): gs.IPoint {
    // TODO
    throw new Error("Method not implemented");
}

/**
 * Returns length of a polyline object
 * @param model Model
 * @param polyline Polyline object
 * @param segment_index Polyline segment index
 * @param sub_domain List of two numbers identifying the subdomain of the curve to calculate.
 * Ascending order. If omitted, entire polyline length is used. (optional, omit?)
 * @returns Length of polyline as number if successful, null if unsuccessful or on error
 */
export function length(model: gs.IModel, pline: gs.IPolyline, segment_index: number,
                        sub_domain: [number,number] ) {
    throw new Error("Method not implemented");
}

// - Possibly Assignment 1 (WEEK 2-3) -
/**
 * Offsets planar polyline along its plane by a specified distance
 * @param plines Polyline to offset
 * @param distance Distance to offset
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns New offset polyline
 */
export function offset(plines: gs.IPolyline[], distance: number, copy: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}

// - Possibly Assignment 1 (WEEK 2-3) -
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-DivideCurve
//  http://verbnurbs.com/docs/geom/NurbsCurve/#dividebyequalarclength
/**
 * Rebuilds and divides a polyline into specified number of segments
 * @param pline Polyline object
 * @param segments Number of segments
 * @returns New points of polyline
 */
export function rebuild(pline: gs.IPolyline, segments: number): gs.IPoint[] {
    throw new Error("Method not implemented");
}

/**
 * Revolves a polyline about a specified axis ray (or line?) to create a polymesh
 * @param pline Polyline to revolve
 * @param axis Axis ray to revolve about
 * @param angle_s Start angle of revolution in degrees
 * @param angle_e End angle of revolution in degrees
 * @returns Polymesh created from revolution
 */
export function revolve(pline: gs.IPolyline, axis: gs.IRay, angle_s: number, angle_e: number): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Weld a list of polylines together
 * @param plines List of polyline to weld
 * @param is_closed Creates a closed polyline object if true
 * @returns New polyline created from weld
 */
export function weld(plines: gs.IPolyline[], is_closed: boolean): gs.IPolyline {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  PRIVATE ======================================================================================================
//  ===============================================================================================================

/**
 * Private function that moves the end point away from the start point by distance.
 * If create_point is true, then a new point get created, otherwise the existing point gets moved.
 */
export function _pointsExtend(start: gs.IPoint, end: gs.IPoint, distance: number, create: boolean = true): gs.IPoint {
    const start_vec: three.Vector3 = new three.Vector3(...start.getPosition());
    const end_vec: three.Vector3 = new three.Vector3(...end.getPosition());
    const dir_vec: three.Vector3 = three_utils.subVectors(end_vec, start_vec);
    dir_vec.setLength(distance);
    const new_xyz: gs.XYZ = three_utils.addVectors(end_vec, dir_vec).toArray() as gs.XYZ;
    if (create) {
        const geom: gs.IGeom = start.getGeom();
        return geom.addPoint(new_xyz);
    } else {
        end.setPosition(new_xyz);
        return end;
    }
}

/**
 * Private function that evaluates the position between a sequence of points.
 * A new point is always created.
 */
export function _pointsEvaluate(points: gs.IPoint[], t_param: number): gs.IPoint {
    const geom: gs.IGeom = points[0].getGeom();
    if (t_param === 0) {return geom.addPoint(points[0].getPosition());}
    if (t_param === 1) {return geom.addPoint(points[points.length - 1].getPosition());}
    if (t_param < 0 || t_param > 1) {throw new Error("t parameter is out of range");}
    const vec_points: three.Vector3[] = points.map((point) => new three.Vector3(...point.getPosition()));
    const num_segs = points.length - 1;
    const dists_to_segends: number[] = [];
    let total_length: number = 0;
    for  (let i = 0; i < num_segs; i++) {
        const seg_vec: three.Vector3 = three_utils.subVectors(vec_points[i+1], vec_points[i]);
        total_length += seg_vec.length();
        dists_to_segends.push(total_length);
    }
    const t_mapped = t_param * total_length;
    for  (let i = 0; i < vec_points.length - 1; i++) {
        if (t_mapped >= dists_to_segends[i] && t_mapped < dists_to_segends[i + 1]) {
            const start_seg: three.Vector3 = vec_points[i];
            const end_seg: three.Vector3 = vec_points[i + 1];
            const seg_vec: three.Vector3 = three_utils.subVectors(start_seg, end_seg);
            const start_dist: number = dists_to_segends[i - 1];
            seg_vec.setLength(t_mapped - start_dist);
            const xyz: gs.XYZ = three_utils.addVectors(start_seg, seg_vec).toArray() as gs.XYZ;
            return geom.addPoint(xyz);
        }
    }
}
