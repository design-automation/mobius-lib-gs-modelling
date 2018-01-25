"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.Copy = Copy;
exports.FromModel = FromModel;
exports.FromXYZ = FromXYZ;
exports.FromXYZs = FromXYZs;
exports.FromPointsMean = FromPointsMean;
exports.getXYZ = getXYZ;
/**
 * Points define a point in a model, as x, y and z coordinates.
 */
//  ===============================================================================================================
//  Point Get Copy ================================================================================================
//  ===============================================================================================================
/**
 * Gets a point from a model.
 * @param model Model to get point from.
 * @param index Index of point to get.
 * @returns Specified point if successful, null if unsuccessful or on error.
 */
function Get(model, id) {
    var point = model.getGeom().getPoint(id);
    if (point === undefined) {
        return null;
    }
    return point;
}
/**
 * Copy a point wihin a model.
 *
 * @param point Point to copy.
 * @returns New point.
 */
function Copy(point) {
    if (!point.exists()) {
        throw new Error("Point has been deleted.");
    }
    var model = point.getModel();
    return model.getGeom().addPoint(point.getPosition());
}
//  ===============================================================================================================
//  Point Constructors ============================================================================================
//  ===============================================================================================================
/**
 * Copy a point from one model to another model
 *
 * If the specified model is the same as the model the point is located in, the specified point is
 * duplicated
 * @param model Model to add the point to
 * @param point Point to copy in other model
 * @returns Added point in specified model
 */
function FromModel(model, point) {
    if (!point.exists()) {
        throw new Error("Point has been deleted.");
    }
    return model.getGeom().addPoint(point.getPosition());
}
/**
 * Adds a point to the model
 *
 * X, Y and Z coordinates are assumed to follow the world coordinate system<br/>
 * Points are returned in order of input
 * @param model Model to add points to.
 * @param xyz List of XYZ coordinates.
 * @returns New point if successful, null if unsuccessful or on error
 */
function FromXYZ(model, xyz) {
    return model.getGeom().addPoint(xyz);
}
/**
 * Adds a set of points to the model
 *
 * X, Y and Z coordinates are assumed to follow the world coordinate system<br/>
 * Points are returned in order of input
 * @param model Model to add points to.
 * @param xyz A list of lists of XYZ coordinates.
 * @returns New list of points if successful, null if unsuccessful or on error
 */
function FromXYZs(model, xyzs) {
    var points = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = xyzs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var xyz = _step.value;

            points.push(model.getGeom().addPoint(xyz));
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

    return points;
}
/**
 * Adds a point that is the center of a list of points
 *
 * Calculates the mean of the X, Y and Z coordinates of the list of points and returns a point using the
 * results<br/>
 * Point returned is the three dimensional centroid of the specified list of points<br/>
 * If points inputed are co-planar, this returns their area centroid<br/>
 * If two points are inputed, this returns their mid-point
 * @param points List of points
 * @returns New point if successful, null if unsuccessful or on error
 */
function FromPointsMean(points) {
    var m = points[0].getModel();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = points[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var point = _step2.value;

            if (point.getModel() !== m) {
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

    var xyz = [0, 0, 0];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = points[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _point = _step3.value;

            var pos = _point.getPosition();
            xyz[0] += pos[0];
            xyz[1] += pos[1];
            xyz[2] += pos[2];
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

    return m.getGeom().addPoint([xyz[0] / points.length, xyz[1] / points.length, xyz[2] / points.length]);
}
//  ===============================================================================================================
//  Point Functions ============================================================================================
//  ===============================================================================================================
/**
 * Obtains x, y and z coordinates of 3D point
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#geometry-PointCoordinates
 * @param point Point
 * @returns List of x, y and z coordinates of point if successful, null if unsuccessful or on error
 */
function getXYZ(point) {
    if (!point.exists()) {
        throw new Error("Point has been deleted.");
    }
    return point.getPosition();
}
//# sourceMappingURL=point.js.map