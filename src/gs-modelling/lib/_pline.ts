import * as gs from "gs-json";
import * as three from "three";
import * as utils from "./utils";

//  ===============================================================================================================
//  TO BE IMPLEMENTED ============================================================================================
//  ===============================================================================================================

// - WEEK 2 -
/**
 * Adds a polyline from the model based on a conic curve
 *
 * Creates equally spaced points along a conic curve and joins them to create a polyline<br/>
 * If specified conic curve is closed, returns a closed polyline
 * @param curve Conic curve to construct polyline from
 * @param segments Number of segments in polyline
 * @returns Polyline object if successful
 */
export function _fromConic(curve: gs.IConicCurve[], segments: number): gs.IPolyline {
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
export function _evalPoint(pline: gs.IPolyline, point: gs.IPoint): gs.IPoint {
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
export function _length(model: gs.IModel, pline: gs.IPolyline, segment_index: number,
                        sub_domain: [number,number] ) {
    throw new Error("Method not implemented");
}

/**
 * Offsets planar polyline along its plane by a specified distance
 * @param plines Polyline to offset
 * @param distance Distance to offset
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns New offset polyline
 */
export function _offset(plines: gs.IPolyline[], distance: number, copy: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-DivideCurve
//  http://verbnurbs.com/docs/geom/NurbsCurve/#dividebyequalarclength
/**
 * Rebuilds and divides a polyline into specified number of segments
 * @param pline Polyline object
 * @param segments Number of segments
 * @returns New points of polyline
 */
export function _rebuild(pline: gs.IPolyline, segments: number): gs.IPoint[] {
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
export function _revolve(pline: gs.IPolyline, axis: gs.IRay, angle_s: number, angle_e: number): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Sets the polyline to be open or cosed
 * @param pline Polyline object
 * @param is_closed The value to set
 */
export function _setIsClosed(pline: gs.IPolyline, is_closed: boolean): void {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Weld a list of polylines together
 * @param plines List of polyline to weld
 * @param is_closed Creates a closed polyline object if true
 * @returns New polyline created from weld
 */
export function _weld(plines: gs.IPolyline[], is_closed: boolean): gs.IPolyline {
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
    const dir_vec: three.Vector3 = end_vec.sub(start_vec);
    dir_vec.setLength(distance);
    const new_xyz: number[] = end_vec.add(dir_vec).toArray();
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
        total_length += vec_points[i+1].sub(vec_points[i]).length();
        dists_to_segends.push(total_length);
    }
    const t_mapped = t_param * total_length;
    for  (let i = 0; i < num_segs; i++) {
        if (t_mapped === dists_to_segends[i]) { // choose end point of this segment
            return geom.addPoint(points[i+1].getPosition());
        }
        if (t_mapped > dists_to_segends[i]) { // gone too far, go back one
            const seg_start_point: three.Vector3 = vec_points[i - 1];
            const seg_end_point: three.Vector3 = vec_points[i];
            const seg_vec: three.Vector3 = seg_start_point.sub(seg_end_point);
            let start_dist: number;
            if (i === 1) {start_dist = 0;} else {start_dist = dists_to_segends[i - 2];}
            seg_vec.setLength(t_mapped - start_dist);
            const xyz: number[] = seg_start_point.add(seg_vec).toArray();
            return geom.addPoint(xyz);
        }
        if (i === num_segs - 1) { // last seg, so must be this one
            const start_seg: three.Vector3 = vec_points[i];
            const end_seg: three.Vector3 = vec_points[i + 1];
            const seg_vec: three.Vector3 = start_seg.sub(end_seg);
            const start_dist: number = dists_to_segends[i - 1];
            seg_vec.setLength(t_mapped - start_dist);
            const xyz: number[] = start_seg.add(seg_vec).toArray();
            return geom.addPoint(xyz);
        }
    }
}

//  ===============================================================================================================
//  Old Functions No Longer in API ================================================================================
//  ===============================================================================================================

//  http://verbnurbs.com/docs/geom/Circle/
/**
 * Returns an circular closed polyline.
 *
 * @param model Model to add to.
 * @param plane Plane on which the elliptical polyline will lie.
 * @param radius Circle radius.
 * @param segments Number of segments in ellipes.
 * @returns The circular closed polyline object.
 */
export function addCircle(model: gs.IModel, plane: gs.IPlane, rad: number, segs: number): gs.IPolyline {
    const angle: number = (Math.PI * 2) / segs;
    let xyz_list: number[][] = [];
    for (let i = 0; i < segs; i++) {
        xyz_list.push([rad * Math.cos(angle), rad * Math.sin(angle), 0]);
    }
    xyz_list = utils.transfromXYZfromGlobal(xyz_list, plane.getOrigin(), plane.getVectors());
    return model.getGeom().addPolyline(model.getGeom().addPoints(xyz_list), true);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddEllipse
/**
 * Returns an eliptical closed polyline.
 * @param model Model to add to.
 * @param plane Plane on which the elliptical polyline will lie.
 * @param radiusX Radius in X-axis direction.
 * @param radiusY Radius in Y-axis direction.
 * @param segments Number of segments in ellipes.
 * @returns The elliptical polyline object.
 */
export function addEllipse(model: gs.IModel, plane: gs.IPlane, rad_x: number, rad_y: number,
                           segs: number): gs.IPolyline {
    const angle: number = (Math.PI * 2) / segs;
    let xyz_list: number[][] = [];
    for (let i = 0; i < segs; i++) {
        xyz_list.push([rad_x * Math.cos(angle), rad_y * Math.sin(angle), 0]);
    }
    xyz_list = utils.transfromXYZfromGlobal(xyz_list, plane.getOrigin(), plane.getVectors());
    return model.getGeom().addPolyline(model.getGeom().addPoints(xyz_list), true);
}
