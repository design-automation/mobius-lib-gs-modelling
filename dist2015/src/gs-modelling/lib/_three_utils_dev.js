"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.multVectorMatrix = multVectorMatrix;
exports.xformMatrixPointXYZs = xformMatrixPointXYZs;
exports.xformMatrix = xformMatrix;
exports.matrixInverse = matrixInverse;
exports.orthoVectors = orthoVectors;
exports.vectorNegate = vectorNegate;
exports.vectorFromVertex = vectorFromVertex;
exports.vectorFromPoint = vectorFromPoint;
exports.vectorsFromVertices = vectorsFromVertices;
exports.vectorsFromPoints = vectorsFromPoints;
exports.subVectors = subVectors;
exports.addVectors = addVectors;
exports.crossVectors = crossVectors;
exports.dotVectors = dotVectors;
exports.vectorFromPointsAtoB = vectorFromPointsAtoB;
exports.vectorFromVerticesAtoB = vectorFromVerticesAtoB;
exports.subXYZs = subXYZs;
exports.addXYZs = addXYZs;
exports.crossXYZs = crossXYZs;
exports.dotXYZs = dotXYZs;
exports.normalizeXYZ = normalizeXYZ;
exports.lengthXYZ = lengthXYZ;
exports.subPoints = subPoints;
exports.addPoints = addPoints;
exports.subVertices = subVertices;
exports.addVertices = addVertices;
exports.makeVertices2D = makeVertices2D;
exports.planesAreCoplanar = planesAreCoplanar;
exports.pointIsOnPlane = pointIsOnPlane;
exports.vectorsAreCodir = vectorsAreCodir;

var _three = require("three");

var three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Utility functions for threejs.
 */
var EPS = 1e-6;
// Matrices ======================================================================================================
function multVectorMatrix(v, m) {
    var v2 = v.clone();
    v2.applyMatrix4(m);
    return v2;
}
function xformMatrixPointXYZs(o, vecs) {
    return xformMatrix(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(o.getPosition()))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[0]))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vecs[1]))))());
    // return xformMatrix(new three.Vector3(...o.getPosition()),
    //     new three.Vector3(...vecs[0]), new three.Vector3(...vecs[1]), new three.Vector3(...vecs[2]));
}
// export function xformMatrix(o: three.Vector3, x: three.Vector3, y: three.Vector3, z: three.Vector3): three.Matrix4 {
function xformMatrix(o, x, y) {
    var m1 = new three.Matrix4();
    var o_neg = o.clone().negate();
    m1.setPosition(o_neg);
    var m2 = new three.Matrix4();
    m2.makeBasis(x.normalize(), y.normalize(), crossVectors(x, y, true));
    //m2.makeBasis(x, y, z);
    m2.getInverse(m2);
    var m3 = new three.Matrix4();
    m3.multiplyMatrices(m2, m1);
    return m3;
}
// get the inverse of a matrix
function matrixInverse(m) {
    var m_inv = new three.Matrix4();
    return m_inv.getInverse(m);
}
//  Vectors =======================================================================================================
function orthoVectors(vector1, vector2) {
    return crossVectors(vector1, vector2).cross(vector1);
}
function vectorNegate(vector) {
    return vector.clone().negate();
}
function vectorFromVertex(vertex) {
    return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(vertex.getPoint().getPosition()))))();
}
function vectorFromPoint(point) {
    return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(point.getPosition()))))();
}
function vectorsFromVertices(vertices) {
    return vertices.map(function (v) {
        return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(v.getPoint().getPosition()))))();
    });
}
function vectorsFromPoints(points) {
    return points.map(function (p) {
        return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(p.getPosition()))))();
    });
}
function subVectors(v1, v2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var v3 = new three.Vector3();
    v3.subVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
function addVectors(v1, v2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var v3 = new three.Vector3();
    v3.addVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
function crossVectors(v1, v2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var v3 = new three.Vector3();
    v3.crossVectors(v1, v2);
    if (norm) {
        v3.normalize();
    }
    return v3;
}
function dotVectors(v1, v2) {
    return v1.dot(v2);
}
function vectorFromPointsAtoB(a, b) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var v = subVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(b.getPosition()))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(a.getPosition()))))());
    if (norm) {
        v.normalize();
    }
    return v;
}
function vectorFromVerticesAtoB(a, b) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var v = subVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(b.getPoint().getPosition()))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(a.getPoint().getPosition()))))());
    if (norm) {
        v.normalize();
    }
    return v;
}
//  XYZ ===========================================================================================================
function subXYZs(xyz1, xyz2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return subVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz1))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz2))))(), norm).toArray();
}
function addXYZs(xyz1, xyz2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return addVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz1))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz2))))(), norm).toArray();
}
function crossXYZs(xyz1, xyz2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return crossVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz1))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz2))))(), norm).toArray();
}
function dotXYZs(xyz1, xyz2) {
    return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz1))))().dot(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz2))))());
}
function normalizeXYZ(xyz) {
    return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz))))().normalize().toArray();
}
function lengthXYZ(xyz) {
    return new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz))))().length();
}
//  Points ========================================================================================================
function subPoints(p1, p2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return subVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(p1.getPosition()))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(p2.getPosition()))))(), norm).toArray();
}
function addPoints(p1, p2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return addVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(p1.getPosition()))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(p2.getPosition()))))(), norm).toArray();
}
//  Vertices ======================================================================================================
function subVertices(v1, v2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return subVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(v1.getPoint().getPosition()))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(v2.getPoint().getPosition()))))(), norm).toArray();
}
function addVertices(v1, v2) {
    var norm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return addVectors(new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(v1.getPoint().getPosition()))))(), new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(v2.getPoint().getPosition()))))(), norm).toArray();
}
//  3D to 2D ======================================================================================================
/**
 * Transform a set of vertices in 3d space onto the xy plane. This function assumes that the vertices
 * are co-planar. Returns a set of three Vectors that represent points on the xy plane.
 */
function makeVertices2D(vertices) {
    var points = vectorsFromVertices(vertices);
    var o = new three.Vector3();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v = _step.value;

            o.add(v);
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

    o.divideScalar(points.length);
    var vx = void 0;
    var vz = void 0;
    var got_vx = false;
    for (var i = 0; i < vertices.length; i++) {
        if (!got_vx) {
            vx = subVectors(points[i], o).normalize();
            if (vx.lengthSq() !== 0) {
                got_vx = true;
            }
        } else {
            vz = crossVectors(vx, subVectors(points[i], o).normalize()).normalize();
            if (vz.lengthSq() !== 0) {
                break;
            }
        }
        if (i === vertices.length - 1) {
            throw new Error("Trinagulation found bad face.");
        }
    }
    var vy = crossVectors(vz, vx);
    var m = xformMatrix(o, vx, vy);
    // const m: three.Matrix4 = xformMatrix(o, vx, vy, vz);
    var points_2d = points.map(function (v) {
        return multVectorMatrix(v, m);
    });
    // console.log(o, vx, vy, vz);
    // console.log(points_2d);
    return points_2d;
}
//  Query ======================================================================================================
/**
 * Check a point is on a plane.
 * The plane is represented by an origin and a normal.
 */
function planesAreCoplanar(origin1, normal1, origin2, normal2) {
    // Check if point is on plane
    var origin1_v = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(origin1.getPosition()))))();
    var normal1_v = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(normal1))))().normalize();
    var origin2_v = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(origin2.getPosition()))))();
    var normal2_v = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(normal2))))().normalize();
    if (Math.abs(dotVectors(subVectors(origin1_v, origin2_v), normal2_v)) > EPS) {
        return false;
    }
    // check is vectors are same
    if (Math.abs(1 - normal1_v.dot(normal2_v)) > EPS) {
        return false;
    }
    return true;
}
/**
 * Check a point is on a plane.
 * The plane is represented by an origin and a normal.
 */
function pointIsOnPlane(origin, normal, point) {
    var origin_v = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(origin.getPosition()))))();
    var normal_v = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(normal))))().normalize();
    var point_v = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(point.getPosition()))))();
    if (dotVectors(subVectors(point_v, origin_v), normal_v) === 0) {
        return true;
    }
    return false;
}
/**
 * Check if vectors are same dir.
 */
function vectorsAreCodir(xyz1, xyz2) {
    // Check if point is on plane
    var v1 = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz1))))().normalize();
    var v2 = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz2))))().normalize();
    if (Math.abs(1 - v1.dot(v2)) > EPS) {
        return false;
    }
    return true;
}
//# sourceMappingURL=_three_utils_dev.js.map