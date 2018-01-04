import * as gs from "gs-json";
import {_pointsExtend, _pointsEvaluate} from "./_pline";
import * as utils from "./utils";
import * as three from "three";

//  ===============================================================================================================
//  Pline Constructors ============================================================================================
//  ===============================================================================================================

// - WEEK 2 -
/**
 * Gets a polyline from the model based on an index number
 * @param model Model to get polyline from
 * @param index Index number of polyline
 * @returns Polyline object if successful
 */
export function getFromModel(model: gs.IModel, id: number): gs.IPolyline {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj.getObjType() !== gs.EObjType.polyline) {
        throw new Error("Object is not a polyline. Object type is: " + obj.getObjType());
    }
    return obj as gs.IPolyline;
}

// - WEEK 2 -
/**
 * Adds a polyline from the model based on a conic curve
 * @param curve Conic curve to construct polyline from
 * @param segments Number of segments in polyline
 * @returns Polyline object if successful
 */
export function fromConic(curve: gs.IConicCurve[], segments: number): gs.IPolyline {

    throw new Error("Method not implemented");
}

//- WEEK 2 -
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a polyline to the model by joining a list of points
 * @param points A list of points (in order)
 * @param is_closed Creates a closed polyline object by joining the last point to the first point if true
 * @returns New polyline object if successful
 */
export function fromPoints(points: gs.IPoint[], is_closed: boolean): gs.IPolyline {
    if (points.length < 2) {
        throw new Error("A minimum of two points are required.");
    }
    const model: gs.IModel = points[0].getModel();
    for (const point of points) {
        if  (point.getModel() !== model) {
            throw new Error("All points must be in the same model.");
        }
    }
    return model.getGeom().addPolyline(points, is_closed);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a line to the model from two points
 * @param start Start point of line
 * @param end End point of line
 * @returns New polyline object, consisting of a single segment.
 */
export function lineFromPoints(start: gs.IPoint, end: gs.IPoint): gs.IPolyline {
    return this.fromPoints([start, end], false);
}

//  ===============================================================================================================
//  Pline Functions ===============================================================================================
//  ===============================================================================================================

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
//  http://verbnurbs.com/docs/geom/ICurve/#point
/**
 * Returns a point on a polyline based on a parameter along the polyline
 * @param pline Polyline to evaluate
 * @param t Parameter to evaluate
 * @param segment_index The segment of the polyline to evaluate.
 * @returns 3D point if successful, null if unsuccessful or on error
 */
export function evalParam(pline: gs.IPolyline, t: number, segment_index: number = -1): gs.IPoint {
    let points: gs.IPoint[] = pline.getPointsArr();
    if (pline.isClosed()) {points.push(points[0]); }
    if (segment_index !== -1) {
        if (segment_index > points.length - 1) {throw new Error("segments_index is out of range."); }
        points = points.splice(segment_index, 2);
    }
    return _pointsEvaluate(points, t);
}

//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-CurveClosestPoint
//  http://verbnurbs.com/docs/geom/NurbsSurface/#closestparam
/**
 * Returns a param along a polyline based on a point on the polyline
 * @param pline Polyline to evaluate
 * @param point Point to evaluate
 * @returns Param on polyline if successful, null if unsuccessful or on error
 */
export function evalPoint(pline: gs.IPolyline, point: gs.IPoint): gs.IPoint {
    throw new Error("Method not implemented");
}

/**
 * Explodes a polyline into individual segments
 * @param pline Polyline to explode
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns List of new polylines created from explode
 */
export function explode(pline: gs.IPolyline, copy: boolean): gs.IPolyline[] {
    throw new Error("Method not implemented");
}

//- WEEK 5 -
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
/**
 * Extends a non-closed polyline by specified distance
 * @param pline Polyline object
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns New polyline object if successful, null if unsuccessful or on error
 */
export function extend(pline: gs.IPolyline, extrusion_side: number, length: number,
                       create_points: boolean, copy: boolean): gs.IPoint[] {
    const points: gs.IPoint[] = pline.getPointsArr();
    const extended_points: gs.IPoint[] = [];
    switch (extrusion_side) {
        case 0: case 2:
            extended_points.push(_pointsExtend(points[1], points[0], length));
            break;
        case 1: case 2:
            const num_points: number = points.length;
            extended_points.push(_pointsExtend(points[num_points - 2], points[num_points - 1], length));
            break;
    }
    return extended_points;
}

/**
 * Extracts a list of segments from a polyline
 * @param pline Polyline to extract segments from
 * @param segment_index Index numbers of polyline segments to extract
 * @param copy Performs transformation on duplicate copy of input polyline
 * @returns List of new polylines created from extract
 */
export function extract(pline: gs.IPolyline, segment_index: number[], copy: boolean): gs.IPolyline[] {
    throw new Error("Method not implemented");
}

/**
 * Extrudes a polyline according to a specified vector to create a polymesh
 * @param pline Polyline to extrude
 * @param vector Vector describing direction and distance of extrusion
 * @param cap Closes polymesh by creating a flat surface on each end of the extrusion if true
 * @returns Polymesh created from extrusion
 */
export function extrude(pline: gs.IPolyline, vector: number[], cap: boolean): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Checks if the polyline is closed
 * @param pline Polyline object
 * @return True if the polyline is closed
 */
export function isCLosed(pline: gs.IPolyline): boolean {
    return pline.isClosed();
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

//- WEEK 4 -
/**
 * Lofts a list of polylines with the same number of segments to create a polymesh
 * @param plines List of polylines to loft (in order)
 * @param is_closed Closes polymesh by lofting back to first polyline if true
 * @returns Polymesh created from loft
 */
export function loft(plines: gs.IPolyline[], is_closed: boolean=false): gs.IPolymesh {
    throw new Error("Method not implemented");
}

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
 * Sets the polyline to be open or cosed
 * @param pline Polyline object
 * @param is_closed The value to set
 */
export function setIsClosed(pline: gs.IPolyline, is_closed: boolean): void {
    throw new Error("Method not implemented");
}

/**
 * Sweeps a polyline along a specified polyline (or conic curve?) to create a polymesh
 * @param pline Polyline to sweep
 * @param rail Rail polyline to sweep along
 * @returns Polymesh created from sweep
 */
export function sweep(pline: gs.IPolyline, rail: gs.IPolyline): gs.IPolymesh {
    throw new Error("Method not implemented");
}

//- WEEK 2 -
/**
 * Weld a list of polylines together
 * @param plines List of polyline to weld
 * @param is_closed Creates a closed polyline object if true
 * @returns New polyline created from weld
 */
export function weld(plines: gs.IPolyline[], is_closed: boolean): gs.IPolyline {
    throw new Error("Method not implemented");
}
