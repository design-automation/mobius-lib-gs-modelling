"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._circleFrom3Points = _circleFrom3Points;
exports._isectCircleCircle2D = _isectCircleCircle2D;
exports._isectCirclePlane3D = _isectCirclePlane3D;
exports._isectEllipsePlane3D = _isectEllipsePlane3D;
exports._isectCircleLine2D = _isectCircleLine2D;
exports._isectCircleEllipse2D = _isectCircleEllipse2D;
exports._isectEllipseEllipse2D = _isectEllipseEllipse2D;
exports.distBetweenPoints = distBetweenPoints;
exports.identifier = identifier;
exports.General_Form = General_Form;
exports.Split = Split;
exports.Function_F = Function_F;
exports.parabola_lenght = parabola_lenght;
exports.ellipse_length = ellipse_length;
exports.hyperbola_length = hyperbola_length;
exports.plineLength = plineLength;

var _polyRoots = require("poly-roots");

var roots = _interopRequireWildcard(_polyRoots);

var _solveQuadraticEquation = require("solve-quadratic-equation");

var quadratic = _interopRequireWildcard(_solveQuadraticEquation);

var _three = require("three");

var three = _interopRequireWildcard(_three);

var _three_utils_dev = require("./_three_utils_dev");

var threex = _interopRequireWildcard(_three_utils_dev);

var _kldIntersections = require("kld-intersections");

var kld = _interopRequireWildcard(_kldIntersections);

var _trigo_dev = require("./trigo_dev");

var trigo = _interopRequireWildcard(_trigo_dev);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Find the center of a circle that passes through three XYZ positions in 3D space.
 * @returns An array of intersection points
 */
function _circleFrom3Points(xyz1, xyz2, xyz3, is_arc) {
    // create vectors
    var p1 = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz1))))();
    var p2 = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz2))))();
    var p3 = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(xyz3))))();
    var world_x = new three.Vector3(1, 0, 0);
    var world_y = new three.Vector3(0, 1, 0);
    var world_z = new three.Vector3(0, 0, 1);
    // calc vectors for xform matrix
    var x_axis = threex.subVectors(p2, p1); //.normalize();
    var tmp_vec = threex.subVectors(p3, p2);
    var z_axis = threex.crossVectors(x_axis, tmp_vec); //.normalize();
    var y_axis = threex.crossVectors(z_axis, x_axis); //.normalize();
    // create the xform matrices to map 3d -> 2d
    var m = threex.xformMatrix(p1, x_axis, y_axis);
    var m_inv = threex.matrixInverse(m);
    // calc the circle origin
    var p2_2d = threex.multVectorMatrix(p2, m);
    var p3_2d = threex.multVectorMatrix(p3, m);
    var tmp_vec_2d = threex.subVectors(p3_2d, p2_2d);
    var tmp_angle = (Math.PI - world_x.angleTo(tmp_vec_2d)) / 2;
    var origin_2d_x = p2_2d.x / 2;
    var origin_2d_y = Math.tan(tmp_angle) * origin_2d_x;
    var origin_2d = new three.Vector3(origin_2d_x, origin_2d_y, 0);
    var circle_origin = threex.multVectorMatrix(origin_2d, m_inv);
    // calc the circle vectors
    var circle_x_axis_2d = threex.vectorNegate(origin_2d);
    var circle_x_axis = threex.multVectorMatrix(circle_x_axis_2d, m_inv);
    var circle_y_axis_2d = threex.crossVectors(circle_x_axis_2d, world_z);
    var circle_y_axis = threex.multVectorMatrix(circle_y_axis_2d, m_inv);
    // calc the circle radius
    var radius = origin_2d.length();
    // is not arc? then return data for circle
    if (!is_arc) {
        return {
            origin: circle_origin.toArray(),
            vec_x: circle_x_axis.toArray(),
            vec_y: circle_y_axis.toArray(),
            angle: null
        };
    }
    // calc the circle angles
    var angle_vec_2d = threex.subVectors(p3_2d, origin_2d);
    var angle = circle_x_axis_2d.angleTo(angle_vec_2d);
    var circle_z_axis_2d = threex.crossVectors(circle_x_axis_2d, angle_vec_2d);
    if (circle_z_axis_2d.z > 0) {
        angle = angle * -1;
    }
    // return the data for arc
    return {
        origin: circle_origin.toArray(),
        vec_x: circle_x_axis.toArray(),
        vec_y: circle_y_axis.toArray(),
        angle: angle
    };
}
/**
 * Circle-circle intersection
 * @param circle1
 * @param circle2
 * @returns An array of intersection points
 */
function _isectCircleCircle2D(circle1, circle2) {
    var m1 = circle1.getModel();
    var m2 = circle2.getModel();
    if (m1 !== m2) {
        throw new Error("Entities must be in the same model.");
    }
    var g1 = m1.getGeom();
    var threshold = 1e-6;
    var r = circle1.getRadius() + circle2.getRadius();
    var O1O2 = threex.vectorFromPointsAtoB(circle1.getOrigin(), circle2.getOrigin(), false);
    if (O1O2.length() > r) {
        return null;
    }
    var v1 = [circle1.getVectors()[0], circle1.getVectors()[1], circle1.getVectors()[2]];
    var v2 = [circle2.getVectors()[0], circle2.getVectors()[1], circle1.getVectors()[2]];
    if (!threex.planesAreCoplanar(circle1.getOrigin(), threex.crossXYZs([v1[0][0], v1[0][1], v1[0][2]], [v1[1][0], v1[1][1], v1[1][2]], false), circle2.getOrigin(), threex.crossXYZs([v2[0][0], v2[0][1], v2[0][2]], [v2[1][0], v2[1][1], v2[1][2]], false))) {
        throw new Error("Entities must be coplanar.");
    }
    // Direct Orthonormal Basis of reference
    var O1 = new three.Vector3(0, 0, 0);
    var e1 = new three.Vector3(1, 0, 0);
    var e2 = new three.Vector3(0, 1, 0);
    var e3 = new three.Vector3(0, 0, 1);
    // Circle 1 Direct Orthonormal Basis
    var C1 = new three.Vector3(circle1.getOrigin().getPosition()[0], circle1.getOrigin().getPosition()[1], circle1.getOrigin().getPosition()[2]);
    var U1 = new three.Vector3(v1[0][0], v1[0][1], v1[0][2]).normalize();
    var V1 = new three.Vector3(v1[1][0], v1[1][1], v1[1][2]).normalize();
    var W1 = threex.crossVectors(U1, V1, true);
    var C2 = new three.Vector3(circle2.getOrigin().getPosition()[0], circle2.getOrigin().getPosition()[1], circle2.getOrigin().getPosition()[2]);
    // Rotation Matrix expressed in the reference direct orthonormal basis
    // Circle 1
    var C1O1 = threex.subVectors(O1, C1, false);
    var vec_O_1 = new three.Vector3(threex.dotVectors(C1O1, U1), threex.dotVectors(C1O1, V1), threex.dotVectors(C1O1, W1));
    var x1 = new three.Vector3(threex.dotVectors(e1, U1), threex.dotVectors(e1, V1), threex.dotVectors(e1, W1));
    var y1 = new three.Vector3(threex.dotVectors(e2, U1), threex.dotVectors(e2, V1), threex.dotVectors(e2, W1));
    var rotation1 = threex.xformMatrix(vec_O_1, x1, y1);
    // Initial Rotation Matrix expressed in the reference direct orthonormal basis
    // Circle 1
    var O1C1 = threex.subVectors(C1, O1, false);
    var init_vec_O_1 = new three.Vector3(threex.dotVectors(O1C1, e1), threex.dotVectors(O1C1, e2), threex.dotVectors(O1C1, e3));
    var init_x1 = new three.Vector3(threex.dotVectors(U1, e1), threex.dotVectors(U1, e2), threex.dotVectors(U1, e3));
    var init_y1 = new three.Vector3(threex.dotVectors(V1, e1), threex.dotVectors(V1, e2), threex.dotVectors(V1, e3));
    var init_rotation1 = threex.xformMatrix(init_vec_O_1, init_x1, init_y1);
    var a = threex.multVectorMatrix(C1, init_rotation1);
    var b = threex.multVectorMatrix(C2, init_rotation1);
    var circle_1 = {
        center: new kld.Point2D(a.x, a.y),
        radius: circle1.getRadius()
    };
    var circle_2 = {
        center: new kld.Point2D(b.x, b.y),
        radius: circle2.getRadius()
    };
    var result = kld.Intersection.intersectCircleCircle(circle_1.center, circle_1.radius, circle_2.center, circle_2.radius);
    // Retransforming into original coordinates system
    var results = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = result.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var point = _step.value;

            results.push(new three.Vector3(point.x, point.y, 0));
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

    var results_c1 = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _point = _step2.value;

            results_c1.push(threex.multVectorMatrix(_point, rotation1));
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

    var points = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = results_c1[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _point2 = _step3.value;

            points.push(g1.addPoint([_point2.x, _point2.y, _point2.z]));
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

    return points;
}
/**
 * Circle-Plane intersection
 * @param circle
 * @param plane
 * @returns Adds intersecting points to the geometry if successfull, null if empty or coplanar
 */
function _isectCirclePlane3D(circle, plane) {
    var m1 = circle.getModel();
    var m2 = plane.getModel();
    if (m1 !== m2) {
        throw new Error("Identical models are required for the circle and the plane");
    }
    var O = plane.getOrigin().getPosition();
    var C0 = circle.getOrigin().getPosition();
    var n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    var U1 = new three.Vector3(circle.getVectors()[0][0], circle.getVectors()[0][1], circle.getVectors()[0][2]);
    var V1 = new three.Vector3(circle.getVectors()[1][0], circle.getVectors()[1][1], circle.getVectors()[1][2]);
    var W1 = new three.Vector3();
    W1 = W1.crossVectors(U1, V1);
    var coplanar = W1.length();
    if (coplanar === 0) {
        return null;
    }
    var A = n1[0] * (C0[0] - O[0]) + n1[1] * (C0[1] - O[1]) + n1[2] * (C0[2] - O[2]);
    var B = n1[0] * U1.x + n1[1] * U1.y + n1[2] * U1.z;
    var C = n1[0] * V1.x + n1[1] * V1.y + n1[2] * V1.z;
    var _t = trigo._solve_trigo(A, B, C);
    if (_t === null) {
        return null;
    }
    var result = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = _t[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var t = _step4.value;

            result.push(m1.getGeom().addPoint([C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x, C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y, C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z]));
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

    if (result.length === 0) {
        return null;
    }
    return result;
}
/**
 * Ellipse-Plane intersection
 * @param ellipse
 * @param plane
 * @returns Adds intersecting points to the geometry if successfull, null if empty or coplanar
 */
function _isectEllipsePlane3D(ellipse, plane) {
    var m1 = ellipse.getModel();
    var m2 = plane.getModel();
    if (m1 !== m2) {
        throw new Error("Identical models are required for the circle and the plane");
    }
    var O = plane.getOrigin().getPosition();
    var C0 = ellipse.getOrigin().getPosition();
    var n1 = [plane.getCartesians()[0], plane.getCartesians()[1], plane.getCartesians()[2]];
    var U1 = new three.Vector3(ellipse.getVectors()[0][0], ellipse.getVectors()[0][1], ellipse.getVectors()[0][2]);
    var V1 = new three.Vector3(ellipse.getVectors()[1][0], ellipse.getVectors()[1][1], ellipse.getVectors()[1][2]);
    var W1 = new three.Vector3();
    W1 = W1.crossVectors(U1, V1);
    var coplanar = W1.length();
    if (coplanar === 0) {
        return null;
    }
    var a = U1.length();
    var b = V1.length();
    if (b > a) {
        throw new Error("Method not implemented");
    }
    var e = Math.sqrt(1 - b / a * (b / a));
    var p = b * b / a;
    var CF = [C0[0] + Math.sqrt(a * a - b * b) * U1.x, C0[1] + Math.sqrt(a * a - b * b) * U1.y, C0[2] + Math.sqrt(a * a - b * b) * U1.z];
    var A_ = n1[0] * (CF[0] - O[0]) + n1[1] * (CF[1] - O[1]) + n1[2] * (CF[2] - O[2]);
    var B_ = (n1[0] * U1.x + n1[1] * U1.y + n1[2] * U1.z) * p;
    var C_ = (n1[0] * V1.x + n1[1] * V1.y + n1[2] * V1.z) * p;
    var A = A_;
    var B = B_ + A_ * e;
    var C = C_;
    var _t = trigo._solve_trigo(A, B, C);
    if (_t === null) {
        return null;
    }
    var result = [];
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = _t[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var t = _step5.value;

            result.push(m1.getGeom().addPoint([C0[0] + Math.cos(t) * U1.x + Math.sin(t) * V1.x, C0[1] + Math.cos(t) * U1.y + Math.sin(t) * V1.y, C0[2] + Math.cos(t) * U1.z + Math.sin(t) * V1.z]));
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

    if (result.length === 0) {
        return null;
    }
    return result;
}
/**
 * Circle-Line intersection
 * @param circle
 * @param Line, represented by 2 Points
 * @returns An array of intersection points
 */
function _isectCircleLine2D() {
    // const result: kld.Intersection = kld.Intersection.intersectCircleLine(new kld.Point2D(0,0), 1,
    // new kld.Point2D(-1,-1), new kld.Point2D(1,1));
    // for (const point of result.points) {
    // console.log([point.x,point.y]);
    // }
    throw new Error("Method not implemented.");
}
/**
 * Circle-ellipse intersection
 * @param circle
 * @param ellipse
 * @returns An array of intersection points
 */
function _isectCircleEllipse2D(circle, ellipse) {
    throw new Error("Method not implemented.");
}
/**
 * Circle-ellipse intersection
 * @param ellipse1
 * @param ellipse2
 * @returns An array of intersection points
 */
function _isectEllipseEllipse2D(ellipse1, ellipse2) {
    throw new Error("Method not implemented.");
}
/**
 * Calculates distance between two points or two clusters of points
 * @param points_1 Point 1 or first cluster of points
 * @param points_2 Point 2 or second cluster of points
 * @param min Returns minimum distance between two clusters of points if true, maximum distance if false
 * @returns Dist0ance between points if successful, none if unsuccessful or on error
 */
function distBetweenPoints(point_1, point_2) {
    var minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var min = 0;
    var max = 0;
    var distance = 0;
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = point_1[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var p1 = _step6.value;
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = point_2[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var p2 = _step7.value;

                    distance = Math.sqrt((p1.getPosition()[0] - p2.getPosition()[0]) * (p1.getPosition()[0] - p2.getPosition()[0]) + (p1.getPosition()[1] - p2.getPosition()[1]) * (p1.getPosition()[1] - p2.getPosition()[1]) + (p1.getPosition()[2] - p2.getPosition()[2]) * (p1.getPosition()[2] - p2.getPosition()[2]));
                    if (distance > max) {
                        max = distance;
                    }
                    if (distance < min) {
                        min = distance;
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

    if (minimum === true) {
        return min;
    }
    return max;
}
function identifier(coeff) {
    if (!(coeff.length === 5)) {
        throw new Error("5 coefficients expected");
    }
    if (coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0 && coeff[4] === 0) {
        coeff = [];
    }
    if (coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0 && coeff[3] === 0) {
        coeff.splice(0, 4);
    }
    if (coeff[0] === 0 && coeff[1] === 0 && coeff[2] === 0) {
        coeff.splice(0, 3);
    }
    if (coeff[0] === 0 && coeff[1] === 0) {
        coeff.splice(0, 2);
    }
    if (coeff[0] === 0) {
        coeff.splice(0, 1);
    }
    switch (coeff.length) {
        case 5:
            {
                var root = [];
                //            const threshold1: number = 1e-10; // to couple with an additional test
                // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][0]) < threshold1)
                // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][0]);}
                // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][1]) < threshold1)
                // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][1]);}
                // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][2]) < threshold1)
                // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][2]);}
                // if ( Math.abs(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[1][3]) < threshold1)
                // {root.push(roots([coeff[0],coeff[1],coeff[2],coeff[3],coeff[4]])[0][3]);}
                root.push(roots([coeff[0], coeff[1], coeff[2], coeff[3], coeff[4]])[0][0]);
                root.push(roots([coeff[0], coeff[1], coeff[2], coeff[3], coeff[4]])[0][1]);
                root.push(roots([coeff[0], coeff[1], coeff[2], coeff[3], coeff[4]])[0][2]);
                root.push(roots([coeff[0], coeff[1], coeff[2], coeff[3], coeff[4]])[0][3]);
                return root;
            }
        case 4:
            {
                var _root = [];
                if (coeff[3] === 0) {
                    _root = quadratic(coeff[0], coeff[1], coeff[2]);
                    _root.push(0);
                    return _root;
                }
                // Third degree polynomial has at least 1 real root
                // root: number[] = [];
                var threshold = 1e-10;
                if (Math.abs(roots([coeff[0], coeff[1], coeff[2], coeff[3]])[1][0]) < threshold) {
                    _root.push(roots([coeff[0], coeff[1], coeff[2], coeff[3]])[0][0]);
                }
                if (Math.abs(roots([coeff[0], coeff[1], coeff[2], coeff[3]])[1][1]) < threshold) {
                    _root.push(roots([coeff[0], coeff[1], coeff[2], coeff[3]])[0][1]);
                }
                if (Math.abs(roots([coeff[0], coeff[1], coeff[2], coeff[3]])[1][2]) < threshold) {
                    _root.push(roots([coeff[0], coeff[1], coeff[2], coeff[3]])[0][2]);
                }
                if (_root.length === 0) {
                    throw new Error("Smaller threshold required in solver");
                }
                return _root;
            }
        case 3:
            {
                // return quadratic(coeff[0],coeff[1],coeff[2]);
                var a = coeff[0];
                var b = coeff[1];
                var c = coeff[2];
                var delta = b * b - 4 * a * c;
                // console.log("delta is " + delta);
                if (delta === 0) {
                    return [-b / (2 * a)];
                }
                if (delta < 0) {
                    return [];
                }
                if (delta > 0) {
                    return [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)];
                }
            }
        case 2:
            {
                if (coeff[0] === 0) {
                    return [];
                }
                return [-coeff[1] / coeff[0]];
            }
        case 1:
            {
                return [];
            }
        case 0:
            {
                return [];
            }
        default:
            {
                throw new Error(" ");
            }
    }
}
///////////////////////////////
// 4 types of conics, individually expressed as [a,b,p,e]
// e = +1 : ellipse/circle & {a,b}
// e = -1 : hyperbola & {a,b}
// e = 0 : parabola & p
///////////////////////////////
function General_Form(conic1, origin1, origin2, alpha) {
    // change of coordinates of orthonormal basis (angle + translation) with an appearing x.y term due to the Alpha
    // General form of C1 expressed in R2
    // change of coordinates of orthonormal basis (angle + translation) with an appearing x.y term due to the Alpha
    // General form of C1 expressed in R2
    // We use the reducted form of the C1 expression in R1 that we
    // transform by translating (x0,y0) (in R1'),
    // then rotating (by alpha degrees, alpha is the Direct Angle from R2 to R1')
    // The general form is then C1 in R2.
    // Alpha is espressed in degrees, we convert it into radians
    var alpha_rd = alpha * (2 * Math.PI) / 360;
    var a = conic1[0];
    var b = conic1[1];
    var p = conic1[2];
    var e = conic1[3];
    var x0 = origin1[0] - origin2[0];
    var y0 = origin1[1] - origin2[1];
    var A = null;
    var B = null;
    var C = null;
    var D = null;
    var E = null;
    var F = null;
    switch (e) {
        case 1:
            A = Math.cos(alpha_rd) / a * (Math.cos(alpha_rd) / a) + e * (Math.sin(alpha_rd) / b) * (Math.sin(alpha_rd) / b);
            B = Math.sin(2 * alpha_rd) * (1 / (a * a) - e / (b * b));
            C = Math.sin(alpha_rd) / a * (Math.sin(alpha_rd) / a) + e * (Math.cos(alpha_rd) / b) * (Math.cos(alpha_rd) / b);
            D = -2 * x0 * Math.cos(alpha_rd) / (a * a) + e * 2 * y0 * Math.sin(alpha_rd) / (b * b);
            E = -2 * x0 * Math.sin(alpha_rd) / (a * a) - e * 2 * y0 * Math.cos(alpha_rd) / (b * b);
            F = x0 * x0 / (a * a) + e * y0 * y0 / (b * b) - 1;
            return [A, B, C, D, E, F];
        case -1:
            A = Math.cos(alpha_rd) / a * (Math.cos(alpha_rd) / a) + e * (Math.sin(alpha_rd) / b) * (Math.sin(alpha_rd) / b);
            B = Math.sin(2 * alpha_rd) * (1 / (a * a) - e / (b * b));
            C = Math.sin(alpha_rd) / a * (Math.sin(alpha_rd) / a) + e * (Math.cos(alpha_rd) / b) * (Math.cos(alpha_rd) / b);
            D = -2 * x0 * Math.cos(alpha_rd) / (a * a) + e * 2 * y0 * Math.sin(alpha_rd) / (b * b);
            E = -2 * x0 * Math.sin(alpha_rd) / (a * a) - e * 2 * y0 * Math.cos(alpha_rd) / (b * b);
            F = x0 * x0 / (a * a) + e * y0 * y0 / (b * b) - 1;
            return [A, B, C, D, E, F];
        case 0:
            A = 1;
            B = 0;
            C = 0;
            D = -2 * x0;
            E = -2 * p;
            F = 2 * p * y0 + Math.pow(x0, 2);
            return [A, B, C, D, E, F];
        default:
            throw new Error("e must be +1, -1 or 0");
    }
}
function Split(conic1, conic2, origin1, origin2, alpha) {
    // Results expressed in R2
    var a = conic2[0];
    var b = conic2[1];
    var p = conic2[2];
    var e = conic2[3];
    var A = General_Form(conic1, origin1, origin2, alpha)[0];
    var B = General_Form(conic1, origin1, origin2, alpha)[1];
    var C = General_Form(conic1, origin1, origin2, alpha)[2];
    var D = General_Form(conic1, origin1, origin2, alpha)[3];
    var E = General_Form(conic1, origin1, origin2, alpha)[4];
    var F = General_Form(conic1, origin1, origin2, alpha)[5];
    var L1 = null;
    var L2 = null;
    var L3 = null;
    var L4 = null;
    var L5 = null;
    var R1 = null;
    var R2 = null;
    var R3 = null;
    var R4 = null;
    var R5 = null;
    var x1 = null;
    var x2 = null;
    var x3 = null;
    var x4 = null;
    var x5 = null;
    var x11 = null;
    var x12 = null;
    var x13 = null;
    var x14 = null;
    var x15 = null;
    var x21 = null;
    var x22 = null;
    var x23 = null;
    var x24 = null;
    var x25 = null;
    var identify_x = null;
    var identify_y = null;
    var sol = [];
    var threshold_x_y = 1e-4;
    var precision = 1000;
    switch (e) {
        case 1:
            x1 = Math.pow(A, 2) + Math.pow(C, 2) * Math.pow(b / a, 4) - 2 * A * C * e * Math.pow(b / a, 2) + e * Math.pow(B * b / a, 2);
            x2 = 2 * A * D - 2 * C * D * e * Math.pow(b / a, 2) + 2 * e * E * B * Math.pow(b / a, 2);
            x3 = Math.pow(D, 2) + 2 * A * C * e + 2 * A * F - 2 * Math.pow(C * b * b / a, 2) - 2 * C * F * e * Math.pow(b / a, 2) - e * Math.pow(b * B, 2) + e * Math.pow(E * b / a, 2);
            x4 = 2 * C * D * e * Math.pow(b, 2) + 2 * D * F - 2 * e * E * B * Math.pow(b, 2);
            x5 = Math.pow(C, 2) * Math.pow(b, 4) + Math.pow(F, 2) + 2 * e * C * F * Math.pow(b, 2) - e * Math.pow(b * E, 2);
            identify_x = identifier([x1, x2, x3, x4, x5]);
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = identify_x[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var x = _step8.value;

                    // is on C1 ?
                    // console.log(identify_x)
                    x11 = 0;
                    x12 = 0;
                    x13 = C;
                    x14 = B * x + E;
                    x15 = A * x * x + D * x + F;
                    identify_y = identifier([x11, x12, x13, x14, x15]);
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;

                    try {
                        for (var _iterator9 = identify_y[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var y = _step9.value;

                            // is on C2 ?
                            if (Math.abs(x / a * (x / a) + e * (y / b) * (y / b) * e - 1) < threshold_x_y) {
                                sol.push([Math.round(x * precision) / precision, Math.round(y * precision) / precision]);
                            }
                        }
                    } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                _iterator9.return();
                            }
                        } finally {
                            if (_didIteratorError9) {
                                throw _iteratorError9;
                            }
                        }
                    }
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

            return sol;
        case -1:
            x1 = Math.pow(A, 2) + Math.pow(C, 2) * Math.pow(b / a, 4) - 2 * A * C * e * Math.pow(b / a, 2) + e * Math.pow(B * b / a, 2);
            x2 = 2 * A * D - 2 * C * D * e * Math.pow(b / a, 2) + 2 * e * E * B * Math.pow(b / a, 2);
            x3 = Math.pow(D, 2) + 2 * A * C * e + 2 * A * F - 2 * Math.pow(C * b * b / a, 2) - 2 * C * F * e * Math.pow(b / a, 2) - e * Math.pow(b * B, 2) + e * Math.pow(E * b / a, 2);
            x4 = 2 * C * D * e * Math.pow(b, 2) + 2 * D * F - 2 * e * E * B * Math.pow(b, 2);
            x5 = Math.pow(C, 2) * Math.pow(b, 4) + Math.pow(F, 2) + 2 * e * C * F * Math.pow(b, 2) - e * Math.pow(b * E, 2);
            identify_x = identifier([x1, x2, x3, x4, x5]);
            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                for (var _iterator10 = identify_x[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    var _x2 = _step10.value;

                    // is on C1 ?
                    // console.log(identify_x)
                    x11 = 0;
                    x12 = 0;
                    x13 = C;
                    x14 = B * _x2 + E;
                    x15 = A * _x2 * _x2 + D * _x2 + F;
                    identify_y = identifier([x11, x12, x13, x14, x15]);
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;

                    try {
                        for (var _iterator11 = identify_y[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var _y = _step11.value;

                            // is on C2 ?
                            if (Math.abs(_x2 / a * (_x2 / a) + e * (_y / b) * (_y / b) * e - 1) < threshold_x_y) {
                                sol.push([Math.round(_x2 * precision) / precision, Math.round(_y * precision) / precision]);
                            }
                        }
                    } catch (err) {
                        _didIteratorError11 = true;
                        _iteratorError11 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                _iterator11.return();
                            }
                        } finally {
                            if (_didIteratorError11) {
                                throw _iteratorError11;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }

            return sol;
        case 0:
            x1 = C / (4 * p * p);
            x2 = B / (2 * p);
            x3 = A + E / (2 * p);
            x4 = D;
            x5 = F;
            identify_x = identifier([x1, x2, x3, x4, x5]);
            var _iteratorNormalCompletion12 = true;
            var _didIteratorError12 = false;
            var _iteratorError12 = undefined;

            try {
                for (var _iterator12 = identify_x[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                    var _x3 = _step12.value;

                    // is on C1 ?
                    x11 = 0;
                    x12 = 0;
                    x13 = C;
                    x14 = B * _x3 + E;
                    x15 = A * _x3 * _x3 + D * _x3 + F;
                    identify_y = identifier([x11, x12, x13, x14, x15]);
                    var _iteratorNormalCompletion13 = true;
                    var _didIteratorError13 = false;
                    var _iteratorError13 = undefined;

                    try {
                        for (var _iterator13 = identify_y[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                            var _y2 = _step13.value;

                            // is on C2 ?
                            if (Math.abs(2 * p * _y2 - _x3 * _x3) < threshold_x_y) {
                                sol.push([Math.round(_x3 * precision) / precision, Math.round(_y2 * precision) / precision]);
                            }
                            // sol.push([Math.round(x * precision) / precision, y]) }
                        }
                    } catch (err) {
                        _didIteratorError13 = true;
                        _iteratorError13 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                _iterator13.return();
                            }
                        } finally {
                            if (_didIteratorError13) {
                                throw _iteratorError13;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError12 = true;
                _iteratorError12 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                        _iterator12.return();
                    }
                } finally {
                    if (_didIteratorError12) {
                        throw _iteratorError12;
                    }
                }
            }

            return sol;
    }
}
// let conic1:number[] = [7,0.5,0,1];
// let origin1:number[] = [5,0];
// let conic2:number[] = [1,1,0,1];
// let origin2:number[] = [0,0];
// let alpha:number = 45;
// // Unit test = OK
// // no sol if a<4
// // 1 sol if a = 4
// // 2 sols if 4<a<6
// // 3 sols if a = 6
// // 4 sols if a>6
// console.log("Split Conics");
// //console.log(General_Form(conic1,origin1,origin2,alpha));
// console.log(Split(conic1,conic2,origin1,origin2,alpha));
// Next steps:
// (1) r, theta instead of x0,y0
// (2) plug-in
// (3) check "solve-quadratic-equation" & "poly-roots" (2nd order polynomial & Jenkins Traub)
// (4) further robustness checking
// Looks to work well
//////
function Function_F(x) {
    var y = null;
    var t1 = Math.sqrt(1 + x * x);
    y = 1 / 2 * (x * t1 + Math.log(x + t1));
    return y;
}
function parabola_lenght(conic, x1, x2) {
    var a = conic[0];
    var b = conic[1];
    var p = conic[2];
    var e = conic[3];
    var distance = null;
    if (!(e === 0)) {
        throw new Error("Parabola required");
    }
    distance = p * (Function_F(x2 / p) - Function_F(x1 / p));
    return Math.abs(distance);
}
// console.log("parabola length is " + parabola_length([1,1,0.5,0],0,1))
// 1.47, looks ok
// Next step: Unit test + plug
function ellipse_length(conic, theta_1, theta_2) {
    // convention = Direct sense for angles ;
    // Input angles in degrees ;
    // Double check angles ;
    var K = 1000;
    var curve = 0;
    var theta = null;
    var a = Math.max(conic[0], conic[1]);
    var b = Math.min(conic[0], conic[1]);
    var e = Math.sqrt(1 - b / a * (b / a));
    theta_1 = theta_1 * (2 * Math.PI) / 360;
    theta_2 = theta_2 * (2 * Math.PI) / 360;
    var d_th = (theta_2 - theta_1) / K;
    for (var k = 0; k < K; k++) {
        theta = theta_1 + k * (theta_2 - theta_1) / K;
        curve = curve + d_th * Math.sqrt(1 - e * Math.sin(theta) * e * Math.sin(theta));
    }
    curve = a * curve;
    return curve;
}
// console.log(ellipse_length([1,3,0,1],0,360))
function hyperbola_length(conic, theta_1, theta_2) {
    // convention = Direct sense for angles ;
    // Input angles in degrees ;
    var K = 100;
    var curve = 0;
    var theta = null;
    var a = conic[0];
    var b = conic[1];
    var e = Math.sqrt(1 + b / a * (b / a));
    var theta_min = Math.min(theta_1, theta_2);
    var theta_max = Math.max(theta_1, theta_2);
    theta_1 = theta_min * (2 * Math.PI) / 360;
    theta_2 = theta_max * (2 * Math.PI) / 360;
    var d_th = (theta_2 - theta_1) / K;
    if (b / a - Math.tan(Math.abs(theta_1)) <= 0) {
        throw new Error("Theta_1 not on curve");
    }
    if (b / a - Math.tan(Math.abs(theta_2)) <= 0) {
        throw new Error("Theta_2 not on curve");
    }
    for (var k = 0; k < K; k++) {
        theta = theta_1 + k * (theta_2 - theta_1) / K;
        curve = curve + d_th * b / Math.sqrt(e * Math.cos(theta) * (e * Math.cos(theta)) - 1);
        // console.log(theta);
    }
    return curve;
}
// Unit test to perform
// console.log(hyperbola_length([1,100,0,-1],0,45));
// console.log(Math.tan(45 * 2 * Math.PI / 360));
/////////////////////////////////// old functions no longer in API list///////////////////////////////////////////////
/**
 * Returns length of a polyline object
 * @param m Model
 * @param polyline Polyline object.
 * @param segment_index Polyline segment index.
 * @param sub_domain List of two numbers identifying the subdomain of the curve to calculate.
 * Ascending order. If omitted, entire polyline length is used. (optional, omit?)
 * @returns Length of polyline as number if successful, none if unsuccessful or on error
 */
function plineLength(m, pline, segment_index, sub_domain) {
    throw new Error("Method not implemented");
}
//# sourceMappingURL=_math_conic_dev.js.map