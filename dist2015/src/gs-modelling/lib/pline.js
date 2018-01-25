"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.Copy = Copy;
exports.FromPoints = FromPoints;
exports.FromCircle = FromCircle;
exports.From2Points = From2Points;
exports.isClosed = isClosed;
exports.setIsClosed = setIsClosed;
exports.numEdges = numEdges;
exports.numVertices = numVertices;
exports.evalParam = evalParam;
exports.join = join;
exports.explode = explode;
exports.extract = extract;
exports.extend = extend;
exports.extrude = extrude;
exports.loft = loft;
exports.sweepParallel = sweepParallel;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _pline_dev = require("./pline_dev");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Pline Get and Copy ============================================================================================
//  ===============================================================================================================
/**
 * Gets a polyline from the model based on an index number
 * @param model Model to get polyline from
 * @param id Index number of polyline
 * @returns Polyline object if successful
 */
/**
 * Polylines are a type of geometric object.
 *
 * Polylines are formed from straight line segments joined to form a continuous line.
 * They can be open or closed. A closed polyline has not fill.
 */
function Get(model, id) {
    // check args
    var obj = model.getGeom().getObj(id);
    if (obj === undefined) {
        return null;
    }
    if (obj.getObjType() !== 100 /* polyline */) {
            throw new Error("Object is not a polyline. Object type is: " + obj.getObjType());
        }
    // return the polyline
    return obj;
}
/**
 * Create a copy of a polyline.
 *
 * @param polyline The polyline to copy.
 * @returns A new polyline.
 */
function Copy(polyline, copy_attribs) {
    // check args
    if (!polyline.exists()) {
        throw new Error("polyline has been deleted.");
    }
    // copy and return
    return polyline.copy(copy_attribs);
}
//  ===============================================================================================================
//  Pline Constructors ============================================================================================
//  ===============================================================================================================
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a polyline to the model by joining a list of points
 *
 * Creates a straight line segment between every two points and joins them to create a polyline
 * @param points A list of points (in order)
 * @param is_closed Creates a closed polyline object by joining the last point to the first point if true
 * @returns New polyline object if successful
 */
function FromPoints(points, is_closed) {
    if (points.length < 2) {
        throw new Error("A minimum of two points are required.");
    }
    var model = points[0].getModel();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var point = _step.value;

            if (point.getModel() !== model) {
                throw new Error("All points must be in the same model.");
            }
            if (!point.exists()) {
                throw new Error("Point has been deleted.");
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return model.getGeom().addPolyline(points, is_closed);
}
/**
 * Adds a polyline from the model based on a conic curve.
 *
 * Creates equally spaced points along a circle or arc and joins them to create a polyline<br/>
 * If it is a circle, then a a closed polyline is returned.
 * @param circle Circle or circular arc to construct polyline from.
 * @param segments Number of segments in polyline.
 * @returns Polyline object if successful.
 */
function FromCircle(circle, segments) {
    if (!circle.exists()) {
        throw new Error("Circle has been deleted.");
    }
    var m = circle.getModel();
    var points = circle.equiPoints(segments + 1);
    return m.getGeom().addPolyline(points, circle.isClosed());
}
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-AddLine
//  http://verbnurbs.com/docs/geom/Line/
/**
 * Adds a straight line to the model from two points
 *
 * Returns null if both points have the same position
 * @param start Start point of line
 * @param end End point of line
 * @returns New polyline object, consisting of a single segment if successful, null if unsuccesful or on error
 */
function From2Points(start, end) {
    return this.FromPoints([start, end], false);
}
//  ===============================================================================================================
//  Pline Functions ===============================================================================================
//  ===============================================================================================================
/**
 * Checks if the polyline is closed
 * @param pline Polyline object
 * @return True if the polyline is closed
 */
function isClosed(pline) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    return pline.isClosed();
}
/**
 * Sets the polyline to be open or cosed
 * @param pline Polyline object
 * @param is_closed The value to set
 */
function setIsClosed(pline, is_closed) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    pline.setIsClosed(is_closed);
}
/**
 * Returns numner of edges in the polyline
 * @param pline Polyline object.
 * @return The number of edges.
 */
function numEdges(pline) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    return pline.numEdges();
}
/**
 * Returns numner of vertices in the polyline
 * @param pline Polyline object.
 * @return The number of vertices.
 */
function numVertices(pline) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    return pline.numVertices();
}
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-EvaluateCurve
//  http://verbnurbs.com/docs/geom/ICurve/#point
/**
 * Returns a point on a polyline based on a parameter along the polyline
 * @param pline Polyline to evaluate
 * @param t Parameter to evaluate (0 is the start of the polyline, 1 is the end of the polyline)
 * @param segment_index The segment of the polyline to evaluate.
 * @returns Point if successful
 */
function evalParam(pline, t) {
    var segment_index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    var points = pline.getPointsArr();
    if (pline.isClosed()) {
        points.push(points[0]);
    }
    if (segment_index !== -1) {
        if (segment_index > points.length - 1) {
            throw new Error("segments_index is out of range.");
        }
        points = points.splice(segment_index, 2);
    }
    return (0, _pline_dev._pointsEvaluate)(points, t);
}
/**
 * Join a set of polylines. Only polylies that are connected end to end will be joined,
 *
 * Joins polymeshes together and returns a single polymesh<br/>
 * Returns null if polymeshes do not intersect or touch
 * @param pmeshes List of polymeshes to weld
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
function join(plines) {
    // get the model
    var model = plines[0].getModel();
    var geom = model.getGeom();
    // check
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = plines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var pline = _step2.value;

            if (!pline.exists()) {
                throw new Error("Polyline has been deleted.");
            }
            if (pline.getModel() !== model) {
                throw new Error("Polylines have to be in same model.");
            }
        }
        // create an array of array of points
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var point_ids_arrays = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = plines[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _pline = _step3.value;

            var points = _pline.getPointsArr();
            var start_end = [points[0].getID(), points[points.length - 1].getID()];
            if (start_end[1] < start_end[0]) {
                points.reverse();
            }
            point_ids_arrays.push(points.map(function (p) {
                return p.getID();
            }));
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    point_ids_arrays.sort();
    // create disjoint set
    var disjoint_sets = [];
    disjoint_sets.push([point_ids_arrays[0]]);
    point_ids_arrays.splice(0, 1);
    var max = 0;
    while (point_ids_arrays.length > 0 && max < 100) {
        max++;
        var tried_all = false;
        var last_disjoint_set = disjoint_sets[disjoint_sets.length - 1];
        var last_point_ids = last_disjoint_set[last_disjoint_set.length - 1];
        var current_start = last_disjoint_set[0][0];
        var current_end = last_point_ids[last_point_ids.length - 1];
        tried_all = true;
        for (var i = 0; i < point_ids_arrays.length; i++) {
            var point_ids = point_ids_arrays[i];
            var point_ids_start = point_ids[0];
            var point_ids_end = point_ids[point_ids.length - 1];
            if (current_end === point_ids_start) {
                tried_all = false;
                last_disjoint_set.push(point_ids);
                current_end = last_point_ids[last_point_ids.length - 1];
                point_ids_arrays.splice(i, 1);
                break;
            } else if (current_start === point_ids_end) {
                tried_all = false;
                last_disjoint_set.unshift(point_ids);
                current_start = last_disjoint_set[0][0];
                point_ids_arrays.splice(i, 1);
                break;
            } else if (current_end === point_ids_end) {
                tried_all = false;
                last_disjoint_set.push(point_ids.reverse());
                current_end = last_point_ids[last_point_ids.length - 1];
                point_ids_arrays.splice(i, 1);
                break;
            } else if (current_start === point_ids_start) {
                tried_all = false;
                last_disjoint_set.unshift(point_ids.reverse());
                current_start = last_disjoint_set[0][0];
                point_ids_arrays.splice(i, 1);
                break;
            }
        }
        if (tried_all || current_start === current_end) {
            disjoint_sets.push([point_ids_arrays[0]]);
            point_ids_arrays.splice(0, 1);
        }
    }
    // create polylines
    var new_plines = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = disjoint_sets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var disjoint_set = _step4.value;

            var _points = [];
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = disjoint_set[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _point_ids = _step5.value;

                    for (var _i = 0; _i < _point_ids.length - 1; _i++) {
                        _points.push(geom.getPoint(_point_ids[_i]));
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            var start = disjoint_set[0][0];
            var last_array = disjoint_set[disjoint_set.length - 1];
            var end = last_array[last_array.length - 1];
            if (start === end) {
                new_plines.push(geom.addPolyline(_points, true));
            } else {
                _points.push(geom.getPoint(end));
                new_plines.push(geom.addPolyline(_points, false));
            }
        }
        // delete the old polylines
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    geom.delObjs(plines, true);
    // return the new plines
    return new_plines;
}
/**
 * Explodes a polyline into individual segments
 *
 * Each straight line segment in the polyline is returned as a separate polyline object
 * @param pline Polyline to explode
 * @param copy Performs transformation on duplicate copy of input polyline if true
 * @returns List of new polylines created from explode
 */
function explode(pline, copy) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    return this.extract(pline, gs.Arr.makeSeq(pline.numEdges()), copy);
}
/**
 * Extracts a list of segments from a polyline
 *
 * Specified straight line segments are removed from the polyline and returned as individual polyline objects<br/>
 * The remainder of the polyline is rejoined as much as possible and returned as one polyline if still intact,
 * or multiple polylines if they have been broken up<br/>
 * List returned is in order (from t=0 to t=1 of orginal input pline)
 * @param pline Polyline to extract segments from
 * @param segment_index Index numbers of polyline segments to extract
 * @param return_remainder Returns polylines created from the remainder of the polyline if true, returns only
 *                         specified segments if false
 * @returns List of new polylines created from extract
 */
function extract(pline, segment_index) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    // do the extraction
    var m = pline.getModel();
    var plines = [];
    var points = pline.getPointsArr();
    if (pline.isClosed()) {
        points.push(points[0]);
    }
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = segment_index[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var i = _step6.value;

            if (i < points.length - 1) {
                plines.push(m.getGeom().addPolyline([points[i], points[i + 1]], false));
            }
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    return plines;
}
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#curve-ExtendCurveLength
/**
 * Extends a non-closed polyline by specified distance
 *
 * Extention is straight and continues in the same direction as the extended segment<br/>
 * Returns null if distance is negative
 * @param pline Polyline object
 * @param extrusion_side 0 = start, 1 = end, 2 = both
 * @param length Distance to extend
 * @returns Polyline object if successful, null if unsuccessful or on error
 */
function extend(pline, extrusion_side, length, create_points) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    // extend? which side?
    switch (extrusion_side) {
        case 0:
        case 2:
            var edges1 = pline.getEdges()[0][0];
            var first_edge = edges1[0];
            var points1 = first_edge.getVertices().map(function (v) {
                return v.getPoint();
            });
            var extended1 = (0, _pline_dev._pointsExtend)(points1[1], points1[0], length, create_points);
            if (create_points) {
                pline.insertVertex(first_edge, extended1);
            }
        case 1:
        case 2:
            var edges2 = pline.getEdges()[0][0];
            var last_edge = edges2[edges2.length - 1];
            var points2 = last_edge.getVertices().map(function (v) {
                return v.getPoint();
            });
            var extended2 = (0, _pline_dev._pointsExtend)(points2[0], points2[1], length, create_points);
            if (create_points) {
                pline.insertVertex(last_edge, extended2);
            }
    }
    return pline;
}
/**
 * Extrudes a polyline according to a specified vector to create a polymesh
 *
 * Pline is moved by the specified vector and straight line segments are created between the vertices of
 * the input pline and moved pline. The resulting straight line segments and the straight line segments of the
 * input and moved plines are used to define the edges of four-sided polygons. The polygons are joined to
 * create a polymesh<br/>
 *
 * If cap is true, input pline and moved pline are used as edges to create two polygons. The polygones are
 * joined to the polymesh from above.
 * @param pline Polyline to extrude
 * @param vector Vector describing direction and distance of extrusion
 * @param cap Closes polymesh by creating a polygon on each end of the extrusion if true
 * @returns Polymesh created from extrusion
 */
function extrude(pline, vector, cap) {
    if (!pline.exists()) {
        throw new Error("Pline has been deleted.");
    }
    var m = pline.getModel();
    var points = pline.getPointsArr();
    var new_points = [];
    var mesh_points = [];
    for (var i = 0; i < points.length; i++) {
        var i2 = i % 2;
        if (i2 === 0) {
            mesh_points.push([]);
        }
        var face = mesh_points[mesh_points.length - 1];
        var pos = points[i].getPosition();
        face[i2] = points[i];
        // create the new point by adding the vector
        var new_point = m.getGeom().addPoint([pos[0] + vector[0], pos[1] + vector[1], pos[2] + vector[2]]);
        new_points.push(new_point);
        face[3 - i2] = new_point;
    }
    if (cap) {
        mesh_points.push(points.reverse());
        mesh_points.push(new_points);
    }
    var pmesh = m.getGeom().addPolymesh(mesh_points);
    return pmesh;
}
/**
 * Lofts a list of polylines with the same number of segments to create a polymesh
 *
 * Straight line segments are created between the vertices of every two input plines. The resulting
 * straight line segments and the straight line segments of the plines are used to define the edges of
 * four-sided polygons. The polygons created from all the plines are joined to create a polymesh<br/>
 *
 * Returns null if polylines do not have the same number of segments
 * @param plines List of polylines to loft (in order)
 * @param is_closed Closes polymesh by lofting back to first polyline if true
 * @returns Polymesh created from loft if successful, null if unsuccessful or on error
 */
function loft(plines) {
    var is_closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = plines[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var pline = _step7.value;

            if (!pline.exists()) {
                throw new Error("Pline has been deleted.");
            }
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    var m = plines[0].getModel();
    if (is_closed) {
        plines.push(plines[0]);
    }
    if (plines.length < 2) {
        throw new Error("Too few polylines to loft.");
    }
    var num_points = plines[0].getWires()[0].numVertices();
    var num_plines = plines.length;
    var plines_closed = plines[0].isClosed();
    for (var i = 1; i < num_plines; i++) {
        if (plines[i].getWires()[0].numVertices() !== num_points) {
            throw new Error("Plines do not have equal numbers of points.");
        }
        if (plines[i].isClosed() !== plines_closed) {
            throw new Error("Plines must all be either open or closed.");
        }
    }
    var mesh_points = [];
    for (var _i2 = 0; _i2 < num_plines - 1; _i2++) {
        var points0 = plines[_i2].getPointsArr();
        var points1 = plines[_i2 + 1].getPointsArr();
        if (plines_closed) {
            points0.push(points0[0]);
            points1.push(points1[0]);
        }
        for (var j = 0; j < num_points - 1; j++) {
            var j2 = j % 2;
            if (j2 === 0) {
                mesh_points.push([]);
            }
            var face = mesh_points[mesh_points.length - 1];
            face[j2] = points0[j];
            face[3 - j2] = points1[j];
        }
    }
    var pmesh = m.getGeom().addPolymesh(mesh_points);
    return pmesh;
}
/**
 * Sweeps a cross_section polyline along a rail polyline to create a polymesh.
 * The cross sesctions remain parallel.
 *
 * @param cross_section Polyline to sweep
 * @param rail Rail polyline to sweep along
 * @returns Polymesh created from sweep
 */
function sweepParallel(cross_section, rail) {
    if (!cross_section.exists()) {
        throw new Error("Cross section has been deleted.");
    }
    if (!rail.exists()) {
        throw new Error("Rail has been deleted.");
    }
    if (cross_section.getModel() !== rail.getModel()) {
        throw new Error("Cross section and rail must be in the same model.");
    }
    var m = cross_section.getModel();
    if (rail.getModel() !== m) {
        throw new Error("The cross_section and the rail must be in the same model.");
    }
    var cross_points = cross_section.getPointsArr();
    if (cross_section.isClosed) {
        cross_points.push(cross_points[0]);
    }
    var rail_points = rail.getPointsArr();
    if (rail.isClosed) {
        rail_points.push(rail_points[0]);
    }
    var mesh_points = [];
    var pline_start_pos = cross_points[0].getPosition();
    for (var i = 0; i < cross_points.length - 1; i++) {
        var pline_pos1 = cross_points[i].getPosition();
        var pline_pos2 = cross_points[i + 1].getPosition();
        var vec1 = [pline_pos1[0] - pline_start_pos[0], pline_pos1[1] - pline_start_pos[1], pline_pos1[2] - pline_start_pos[2]];
        var vec2 = [pline_pos2[0] - pline_start_pos[0], pline_pos2[1] - pline_start_pos[1], pline_pos2[2] - pline_start_pos[2]];
        for (var j = 0; j < rail_points.length - 1; j++) {
            var rail_pos1 = rail_points[j].getPosition();
            var rail_pos2 = rail_points[j + 1].getPosition();
            var j2 = j % 2;
            var vec = void 0;
            if (j2 === 0) {
                mesh_points.push([]);
                vec = vec1;
            } else {
                vec = vec2;
            }
            var face = mesh_points[mesh_points.length - 1];
            var pos1 = [rail_pos1[0] + vec[0], rail_pos1[1] + vec[1], rail_pos1[2] + vec[2]];
            var pos2 = [rail_pos2[0] + vec[0], rail_pos2[1] + vec[1], rail_pos2[2] + vec[2]];
            face[j2] = m.getGeom().addPoint(pos1);
            face[3 - j2] = m.getGeom().addPoint(pos2);
        }
    }
    var pmesh = m.getGeom().addPolymesh(mesh_points);
    return pmesh;
}
//# sourceMappingURL=pline.js.map