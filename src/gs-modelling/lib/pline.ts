import * as gs from "gs-json";
//import * as gs from "../../../dist/src/libs/gs-json/utils/gs-json";
import * as utils from "./utils";
import * as three from "three";

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a polyline to the model
 * @param model Model to add to.
 * @param points A list of points.
 * @returns Polyline object
 */
export function add(model: gs.IModel, points: gs.IPoint[], is_closed: boolean): gs.IPolyline {
    return model.getGeom().addPolyline(points, is_closed);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a line to the model
 * @param model Model to add to.
 * @param start Start point of line
 * @param end End point of line
 * @returns Polyline object, consisting of a single segment.
 */
export function addLine(model: gs.IModel, start: gs.IPoint, end: gs.IPoint): gs.IPolyline {
    return model.getGeom().addPolyline([start, end], false);
}

//  http://verbnurbs.com/docs/geom/Circle/
/**
 * Returns an circular closed polyline.
 * @param model Model to add to.
 * @param plane Plane on which the elliptical polyline will lie.
 * @param radius Circle radius.
 * @param segments Number of segments in ellipes.
 * @returns The circular closed polyline object.
 */
export function addCircle(model: gs.IModel, plane: gs.IPlane, rad: number, segs: number):
                          gs.IPolyline {
    const angle: number = (Math.PI * 2) / segs;
    let xyz_list: number[][] = [];
    for (let i = 0; i < segs; i++) {
        xyz_list.push([rad * Math.cos(angle), rad * Math.sin(angle), 0]);
    }
    xyz_list = utils.transfromXYZfromGlobal(xyz_list, plane.getOrigin(), plane.getVectors());
    return model.getGeom().addPolyline(m.getGeom().addPoints(xyz_list), true);
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
    return model.getGeom().addPolyline(m.getGeom().addPoints(xyz_list), true);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
/**
 * Extends a non-closed polyline by specified distance
 * @param pline Polyline object
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @returns New polyline object if successful, none if unsuccessful or on error
 */
export function extend(pline: gs.IPolyline, extrusion_side: number, length: number,
                       create_points: boolean = true): gs.IPoint[] {
    const points: gs.IPoint[] = pline.getPointsArr();
    const extended_points: gs.IPoint[] = [];
    switch (extrusion_side) {
        case 0: case 2:
            extended_points.push(pointsExtend(points[1], points[0], length));
            break;
        case 1: case 2:
            const num_points: number = points.length;
            extended_points.push(pointsExtend(points[num_points - 2], points[num_points - 1], length));
            break;
    }
    return extended_points;
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
//  http://verbnurbs.com/docs/geom/ICurve/#point
/**
 * Evaluate a point on a polyline
 * @param pline Polyline object
 * @param t Parameter to evaluate
 * @param segment_index The segment of the polyline to evaluate.
 * @returns 3D point if successful, none if unsuccessful or on error
 */
export function evaluate(pline: gs.IPolyline, t: number, segment_index: number = -1): gs.IPoint {
    let points: gs.IPoint[] = pline.getPointsArr();
    if (pline.isClosed()) {points.push(points[points.length - 1]); }
    if (segment_index !== -1) {
        if (segment_index > points.length - 1) {throw new Error("segments_index is out of range."); }
        points = points.splice(segment_index, 2);
    }
    return pointsEvaluate(points, t);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveClosestPoint
//  http://verbnurbs.com/docs/geom/NurbsSurface/#closestparam
/**
 * Finds closest point on polyline to test point
 * @param pline Polyline object
 * @param point Test point
 * @returns Param on polyline if successful, none if unsuccessful or on error
 */
export function closestPoint(pline: gs.IPolyline, point: gs.IPoint): gs.IPoint {
    throw new Error("Method not implemented");
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-DivideCurve
//  http://verbnurbs.com/docs/geom/NurbsCurve/#dividebyequalarclength
/**
 * Divide polyline into specified number of segments.
 * @param pline Polyline object
 * @param segs Number of segments
 */
export function divide(pline: gs.IPolyline, segs: number): void {
    throw new Error("Method not implemented");
}

/**
 * Checks if the polyline is closed.
 * @param pline Polyline object
 * @return True if the polline is closed.
 */
export function isCLosed(pline: gs.IPolyline): boolean {
    return pline.isClosed();
}

/**
 * Sets the polline to be open or cosed.
 * @param pline Polyline object
 * @param is_closed The value to set.
 */
export function setIsClosed(pline: gs.IPolyline, is_closed: boolean): void {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Private Functions =============================================================================================
//  ===============================================================================================================

/**
 * Private function that moves the end point away from the start point by distance.
 * If create_point is true, then a new point get created, otherwise the existing point gets moved.
 */
function pointsExtend(start: gs.IPoint, end: gs.IPoint, distance: number, create: boolean = true): gs.IPoint {
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
function pointsEvaluate(points: gs.IPoint[], t_param: number): gs.IPoint {
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
