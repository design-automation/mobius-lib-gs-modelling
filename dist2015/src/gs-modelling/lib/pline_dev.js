"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CopyFromModel = CopyFromModel;
exports.FromEllipse = FromEllipse;
exports.evalPoint = evalPoint;
exports.length = length;
exports.offset = offset;
exports.rebuild = rebuild;
exports.revolve = revolve;
exports.weld = weld;
exports._pointsExtend = _pointsExtend;
exports._pointsEvaluate = _pointsEvaluate;

var _three = require("three");

var three = _interopRequireWildcard(_three);

var _three_utils_dev = require("./_three_utils_dev");

var three_utils = _interopRequireWildcard(_three_utils_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Copies polylines from one model to another
 * @param model_1 Model to copy from
 * @param model_2 Model to copy to
 * @returns List of polylines copied into specified model if successful
 */
function CopyFromModel(model_1, model_2) {
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
function FromEllipse(curve, segments) {
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
function evalPoint(pline, point) {
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
function length(model, pline, segment_index, sub_domain) {
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
function offset(plines, distance, copy) {
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
function rebuild(pline, segments) {
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
function revolve(pline, axis, angle_s, angle_e) {
    throw new Error("Method not implemented");
}
/**
 * Weld a list of polylines together
 * @param plines List of polyline to weld
 * @param is_closed Creates a closed polyline object if true
 * @returns New polyline created from weld
 */
function weld(plines, is_closed) {
    throw new Error("Method not implemented");
}
//  ===============================================================================================================
//  PRIVATE ======================================================================================================
//  ===============================================================================================================
/**
 * Private function that moves the end point away from the start point by distance.
 * If create_point is true, then a new point get created, otherwise the existing point gets moved.
 */
function _pointsExtend(start, end, distance) {
    var create = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var start_vec = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(start.getPosition()))))();
    var end_vec = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(end.getPosition()))))();
    var dir_vec = three_utils.subVectors(end_vec, start_vec);
    dir_vec.setLength(distance);
    var new_xyz = three_utils.addVectors(end_vec, dir_vec).toArray();
    if (create) {
        var geom = start.getGeom();
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
function _pointsEvaluate(points, t_param) {
    var geom = points[0].getGeom();
    if (t_param === 0) {
        return geom.addPoint(points[0].getPosition());
    }
    if (t_param === 1) {
        return geom.addPoint(points[points.length - 1].getPosition());
    }
    if (t_param < 0 || t_param > 1) {
        throw new Error("t parameter is out of range");
    }
    var vec_points = points.map(function (point) {
        return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(point.getPosition()))))();
    });
    var num_segs = points.length - 1;
    var dists_to_segends = [];
    var total_length = 0;
    for (var i = 0; i < num_segs; i++) {
        var seg_vec = three_utils.subVectors(vec_points[i + 1], vec_points[i]);
        total_length += seg_vec.length();
        dists_to_segends.push(total_length);
    }
    var t_mapped = t_param * total_length;
    for (var _i = 0; _i < vec_points.length - 1; _i++) {
        if (t_mapped >= dists_to_segends[_i] && t_mapped < dists_to_segends[_i + 1]) {
            var start_seg = vec_points[_i];
            var end_seg = vec_points[_i + 1];
            var _seg_vec = three_utils.subVectors(start_seg, end_seg);
            var start_dist = dists_to_segends[_i - 1];
            _seg_vec.setLength(t_mapped - start_dist);
            var xyz = three_utils.addVectors(start_seg, _seg_vec).toArray();
            return geom.addPoint(xyz);
        }
    }
}
//# sourceMappingURL=pline_dev.js.map