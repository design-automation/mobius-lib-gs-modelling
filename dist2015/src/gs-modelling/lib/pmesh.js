"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Polymeshes are a type of object.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Polymeshes are formed from flat polygons joined to form a continuous surface.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.Get = Get;
exports.Copy = Copy;
exports.FromPoints = FromPoints;
exports.FromPline = FromPline;
exports.offset = offset;
exports.join = join;
exports.flipFaces = flipFaces;
exports.thicken = thicken;
exports.extrude = extrude;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _three = require("three");

var three = _interopRequireWildcard(_three);

var _math_poly_dev = require("./_math_poly_dev");

var math_poly = _interopRequireWildcard(_math_poly_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Pmesh Get =====================================================================================================
//  ===============================================================================================================
/**
 * Gets a polymesh from the model based on an index number
 * @param model Model to get polymesh from
 * @param id Index number of polymesh
 * @returns Polymesh object if successful
 */
function Get(model, id) {
    // check args
    var obj = model.getGeom().getObj(id);
    if (obj === undefined) {
        return null;
    }
    if (obj.getObjType() !== 200 /* polymesh */) {
            throw new Error("Object is not a polymesh. Object type is: " + obj.getObjType());
        }
    // return the polymesh
    return obj;
}
/**
 * Create a copy of a polymesh.
 *
 * @param polymesh The polymesh to copy.
 * @returns A new polymesh.
 */
function Copy(polymesh, copy_attribs) {
    // check args
    if (!polymesh.exists()) {
        throw new Error("polymesh has been deleted.");
    }
    // copy and return
    return polymesh.copy(copy_attribs);
}
//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Creates a polymesh from face corner points.
 *
 * List of points, assumed to be in order.
 * @param points List of lists of face corner points.
 * @returns New polymesh with a single face if successful, null if unsuccessful or on error
 */
function FromPoints(points) {
    // check args
    if (points.length === 0 || points[0].length === 0) {
        throw new Error("Not enough points specified.");
    }
    var model = points[0][0].getModel();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var face_points = _step.value;

            if (face_points.length < 3) {
                throw new Error("Each face must have at least three points.");
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = face_points[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var point = _step2.value;

                    if (point.getModel() !== model) {
                        throw new Error("All points must be in the same model.");
                    }
                    if (!point.exists()) {
                        throw new Error("Point has been deleted.");
                    }
                }
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
        }
        // create the pmesh and return
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

    return model.getGeom().addPolymesh(points);
}
/**
 * Creates ...
 *
 * @param pline A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */
function FromPline(pline) {
    // check args
    if (!pline.exists()) {
        throw new Error("polymesh has been deleted.");
    }
    var model = pline.getModel();
    // create the pmesh and return
    return model.getGeom().addPolymesh([pline.getPointsArr()]);
}
//  ===============================================================================================================
//  Pmesh Functions ===============================================================================================
//  ===============================================================================================================
/**
 * Offsets a polymesh along its normal by a specified distance
 *
 * Each face is moved by specified distance in the direction of its normal and rejoined (extended or
 * trimmed to fit) to create a new surface
 * @param pmesh Polymesh object
 * @param distance Distance to offset polymesh
 * @returns New offset polymesh if successful
 */
function offset(pmesh, distance) {
    // check args
    if (!pmesh.exists()) {
        throw new Error("polymesh has been deleted.");
    }
    var model = pmesh.getModel();
    var geom = model.getGeom();
    // create a map of point -> vertices in this pmesh
    var vertices = gs.Arr.flatten(pmesh.getVertices(gs.EGeomType.faces));
    var vertices_map = new Map();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = vertices[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var vertex = _step3.value;

            var id = vertex.getPoint().getID();
            if (!vertices_map.has(id)) {
                vertices_map.set(id, []);
            }
            vertices_map.get(id).push(vertex);
        }
        // move each point
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

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = vertices_map.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = _slicedToArray(_step4.value, 2),
                point_id = _step4$value[0],
                _vertices = _step4$value[1];

            var normal = void 0;
            if (_vertices.length === 1) {
                normal = math_poly.getVertexNormal(_vertices[0]);
                normal.setLength(distance);
            } else {
                // get the normal mean
                var vertex_normals = [];
                normal = new three.Vector3();
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = _vertices[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _vertex = _step5.value;

                        var vertex_normal = math_poly.getVertexNormal(_vertex);
                        vertex_normals.push(vertex_normal);
                        normal.add(vertex_normal);
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

                var angle = normal.angleTo(vertex_normals[0]);
                var len = distance / Math.cos(angle);
                normal.setLength(len);
            }
            // set the point position
            var point = geom.getPoint(point_id);
            var old_pos = point.getPosition();
            var new_pos = [old_pos[0] + normal.x, old_pos[1] + normal.y, old_pos[2] + normal.z];
            point.setPosition(new_pos);
        }
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
}
/**
 * Join a set of polymeshes to form a single polymesh.
 *
 * Returns null if polymeshes do not intersect or touch
 * @param pmeshes List of polymeshes to weld
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
function join(pmeshes) {
    // check args
    var model = pmeshes[0].getModel();
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = pmeshes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var pmesh = _step6.value;

            if (!pmesh.exists()) {
                throw new Error("polymesh has been deleted.");
            }
            if (pmesh.getModel() !== model) {
                throw new Error("Polymeshes have to be in same model.");
            }
        }
        // collect the faces together in a points arrtest Circle Planeay
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

    var mesh_points = [];
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = pmeshes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var _pmesh = _step7.value;
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = _pmesh.getFaces()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var face = _step8.value;

                    var points = face.getVertices().map(function (v) {
                        return v.getPoint();
                    });
                    mesh_points.push(points);
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }
        }
        // create a new pmesh
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

    var new_pmesh = model.getGeom().addPolymesh(mesh_points);
    // delete old meshes, and keep points
    model.getGeom().delObjs(pmeshes, true);
    // return the new mesh
    // TODO check for disjoint polymeshes
    return [new_pmesh];
}
/**
 * Flips all faces
 * @param pmesh Polymeshes to flipFaces
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
function flipFaces(pmesh) {
    // check args
    if (!pmesh.exists()) {
        throw new Error("polymesh has been deleted.");
    }
    throw new Error("Not implemented exception");
}
/**
 * Thicken ...
 *
 * @param pmesh A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */
function thicken(pmesh, dist1, dist2) {
    // check args
    if (!pmesh.exists()) {
        throw new Error("polymesh has been deleted.");
    }
    var model = pmesh.getModel();
    var pmesh2 = pmesh.copy(); //Copies the points as well
    //flipFaces(pmesh*-1); // TODO
    offset(pmesh, dist1);
    offset(pmesh2, dist2 * -1); //TODO
    var wires1 = pmesh.getWires();
    var wires2 = pmesh2.getWires();
    if (wires1.length !== wires2.length) {
        throw new Error("Error occured while thickening mesh.");
    }
    var sides = [];
    for (var i = 0; i < wires1.length; i++) {
        var points1 = wires1[i].getVertices().map(function (v) {
            return v.getPoint();
        });
        var points2 = wires2[i].getVertices().map(function (v) {
            return v.getPoint();
        });
        if (points1.length !== points2.length) {
            throw new Error("Error occured while thickening mesh.");
        }
        points1.push(points1[0]);
        points2.push(points2[0]);
        var mesh_points = [];
        for (var j = 0; j < points1.length - 1; j++) {
            mesh_points.push([points1[j], points1[j + 1], points2[j + 1], points2[j]]);
        }
        var side_mesh = model.getGeom().addPolymesh(mesh_points);
        sides.push(side_mesh);
    }
    return join([pmesh, pmesh2].concat(sides))[0];
}
/**
 * Extrude by vector...
 *
 * @param pmesh A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */
function extrude(pmesh, vector) {
    // check args
    if (!pmesh.exists()) {
        throw new Error("polymesh has been deleted.");
    }
    throw new Error("not implemented");
}
//# sourceMappingURL=pmesh.js.map