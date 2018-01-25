"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MoveObject = MoveObject;
exports.MoveObjects = MoveObjects;
exports.ScaleObject = ScaleObject;
exports.ScaleObjects = ScaleObjects;
exports.RotateObject = RotateObject;
exports.RotateObjects = RotateObjects;
exports.MirrorObject = MirrorObject;
exports.MirrorObjects = MirrorObjects;
exports.TransformObject = TransformObject;
exports.TransformObjects = TransformObjects;
exports.DeleteObject = DeleteObject;
exports.DeleteObjects = DeleteObjects;
exports.CopyObject = CopyObject;
exports.CopyObjects = CopyObjects;
exports.IsObjectInGroup = IsObjectInGroup;
exports.ObjectGroups = ObjectGroups;
exports.DistanceToPlane = DistanceToPlane;

var _three = require("three");

var three = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //import * as utils from "./utils";


/**
 * Moves a single object
 * @ parameters Object and Translation Vector
 * @ Return Translated Object if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObject
function MoveObject(m, obj, translation) {
    if (obj === undefined) {
        return null;
    }
    var points_IDs = obj.getPointsSet().map(function (v) {
        return v.getID();
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = points_IDs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var point_ID = _step.value;

            var xyz = m.getGeom().getPoint(point_ID).getPosition();
            m.getGeom().getPoint(point_ID).setPosition([xyz[0] + translation[0], xyz[1] + translation[1], xyz[2] + translation[2]]);
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

    return obj;
}
/**
 * Moves a set of objects
 * @ parameters Objects and Translation Vector
 * @ Return Translated Objects if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObjects
function MoveObjects(m, objs, translation) {
    if (objs === undefined) {
        return null;
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = objs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var obj = _step2.value;

            MoveObject(m, obj, translation);
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

    return objs;
}
/**
 * Scaling an object corresponds to modifying its underlying points according
 * to an origin and a scale factor. The function is designed such as any origin point of
 * the 3D space can be selected, even if the origin coincides with an object point.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObject
function ScaleObject(m, obj, origin, scale) {
    if (obj === undefined) {
        return null;
    }
    var points_IDs = obj.getPointsSet().map(function (v) {
        return v.getID();
    });
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = points_IDs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var point_ID = _step3.value;

            var xyz = m.getGeom().getPoint(point_ID).getPosition();
            var unit_vector = [];
            if (!(Math.sqrt(Math.pow(xyz[0] - origin[0], 2) + Math.pow(xyz[1] - origin[1], 2) + Math.pow(xyz[2] - origin[2], 2)) === 0)) {
                unit_vector[0] = (xyz[0] - origin[0]) / Math.sqrt(Math.pow(xyz[0] - origin[0], 2) + Math.pow(xyz[1] - origin[1], 2) + Math.pow(xyz[2] - origin[2], 2));
                unit_vector[1] = (xyz[1] - origin[1]) / Math.sqrt(Math.pow(xyz[0] - origin[0], 2) + Math.pow(xyz[1] - origin[1], 2) + Math.pow(xyz[2] - origin[2], 2));
                unit_vector[2] = (xyz[2] - origin[2]) / Math.sqrt(Math.pow(xyz[0] - origin[0], 2) + Math.pow(xyz[1] - origin[1], 2) + Math.pow(xyz[2] - origin[2], 2));
                m.getGeom().getPoint(point_ID).setPosition([xyz[0] + scale * unit_vector[0], xyz[1] + scale * unit_vector[1], xyz[2] + scale * unit_vector[2]]);
            }
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

    return obj;
}
/**
 * Scaling objects corresponds to modifying its underlying points according
 * to an origin and a scale factor. The function is designed such as any origin point of
 * the 3D space can be selected, even if the origin coincides with a point which belongs to the
 * cloud of points
 * induced by objects.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObjects
function ScaleObjects(m, objs, origin, scale) {
    if (objs === undefined) {
        return null;
    }
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = objs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var obj = _step4.value;

            if (obj === undefined) {
                throw new Error("An object in the list of objects is undefined");
            }
            ScaleObject(m, obj, origin, scale);
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

    return objs;
}
/**
 * Direct rotation of an object in degrees according to a specified plane.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObject
function RotateObject(m, obj, rotation, plane) {
    if (obj === undefined) {
        return null;
    }
    rotation = rotation * 360 / (2 * Math.PI);
    var x_axis = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(plane.getVectors()[0]))))().normalize();
    var y_axis = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(plane.getVectors()[1]))))().normalize();
    var z_axis = x_axis.cross(y_axis).normalize();
    var e1 = new three.Vector3(1, 0, 0);
    var e2 = new three.Vector3(0, 1, 0);
    var e3 = new three.Vector3(0, 0, 1);
    var matrix_1_to_2 = new three.Matrix3();
    matrix_1_to_2.set(e1.dot(x_axis), e1.dot(y_axis), e1.dot(z_axis), e2.dot(x_axis), e2.dot(y_axis), e2.dot(z_axis), e3.dot(x_axis), e3.dot(y_axis), e3.dot(z_axis));
    var matrix_2_to_1 = matrix_1_to_2.getInverse(matrix_1_to_2, true);
    var matrix_rotation = new three.Matrix3();
    matrix_rotation.set(Math.cos(rotation), -Math.sin(rotation), 0, Math.sin(rotation), Math.cos(rotation), 0, 0, 0, 1);
    var points_IDs = obj.getPointsSet().map(function (v) {
        return v.getID();
    });
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = points_IDs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var point_ID = _step5.value;

            var xyz = m.getGeom().getPoint(point_ID).getPosition();
            var matrix_vec = new three.Matrix3();
            matrix_vec.set(xyz[0], 0, 0, xyz[1], 0, 0, xyz[2], 0, 0);
            matrix_vec = matrix_2_to_1.multiply(matrix_rotation.multiply(matrix_1_to_2.multiply(matrix_vec)));
            m.getGeom().getPoint(point_ID).setPosition([matrix_vec.toArray()[0], matrix_vec.toArray()[1], matrix_vec.toArray()[2]]); // column-major format;
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

    return obj;
}
/**
 * Direct rotation of collection of object in degrees according to a specified plane.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObjects
function RotateObjects(m, objs, rotation, plane) {
    if (objs === undefined) {
        return null;
    }
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = objs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var obj = _step6.value;

            if (obj === undefined) {
                throw new Error("An object in the list of objects is undefined");
            }
            RotateObject(m, obj, rotation, plane);
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

    return objs;
}
/**
 * Mirrors a single object
 * @param Object, Plane
 * @return Mirrored object if successful
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObject
function MirrorObject(m, obj, plane) {
    if (obj === undefined) {
        return null;
    }
    // Case 1: Linear Transforming, meaning that [0,0,0] belongs to the Mirror
    // A general case with two extra transforming needs to be taken into account as well
    // in the case for which the transformation is Affine.
    var x_axis = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(plane.getVectors()[0]))))().normalize();
    var y_axis = new (Function.prototype.bind.apply(three.Vector3, [null].concat(_toConsumableArray(plane.getVectors()[1]))))().normalize();
    var z_axis = x_axis.cross(y_axis).normalize();
    var e1 = new three.Vector3(1, 0, 0);
    var e2 = new three.Vector3(0, 1, 0);
    var e3 = new three.Vector3(0, 0, 1);
    var matrix_1_to_2 = new three.Matrix3();
    matrix_1_to_2.set(e1.dot(x_axis), e1.dot(y_axis), e1.dot(z_axis), e2.dot(x_axis), e2.dot(y_axis), e2.dot(z_axis), e3.dot(x_axis), e3.dot(y_axis), e3.dot(z_axis));
    var matrix_2_to_1 = matrix_1_to_2.getInverse(matrix_1_to_2, true);
    var matrix_symetry = new three.Matrix3();
    matrix_symetry.set(1, 0, 0, 0, -1, 0, 0, 0, -1);
    var points_IDs = obj.getPointsSet().map(function (v) {
        return v.getID();
    });
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = points_IDs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var point_ID = _step7.value;

            var xyz = m.getGeom().getPoint(point_ID).getPosition();
            var matrix_vec = new three.Matrix3();
            matrix_vec.set(xyz[0], 0, 0, xyz[1], 0, 0, xyz[2], 0, 0);
            matrix_vec = matrix_symetry.multiply(matrix_vec);
            m.getGeom().getPoint(point_ID).setPosition([matrix_vec.toArray()[0], matrix_vec.toArray()[1], matrix_vec.toArray()[2]]); // column-major format;
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

    return obj;
}
/**
 * Mirrors a set of objects
 * @param Objects, Start Point of the the Mirror Plane, End Point of the Mirror Plane
 * @return Mirrored object if successful
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObjects
function MirrorObjects(m, objs, plane) {
    if (objs === undefined) {
        return null;
    }
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = objs[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var obj = _step8.value;

            if (obj === undefined) {
                throw new Error("An object in the list of objects is undefined");
            }
            MirrorObject(m, obj, plane);
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

    return objs;
}
/**
 *
 * Moves, scales, or rotates an object given a rotation angle, an origin point, scaling factor and translation vector
 * Rotation angle in Degrees around this axis (Z by default).
 * axis = 0 : Z axis
 * axis = 1 : X axis
 * axis = 2 : Y axis
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObject
function TransformObject(m, obj, scale, origin, translation, rotation, plane) {
    RotateObject(m, obj, rotation, plane);
    ScaleObject(m, obj, origin, scale);
    MoveObject(m, obj, translation);
    return obj;
}
/**
 * Moves, scales, or rotates a set of objects given a rotation angle, an origin point,
 * scaling factor and translation vector
 * Rotation angle in Degrees around this axis (Z by default).
 * axis = 0 : Z axis
 * axis = 1 : X axis
 * axis = 2 : Y axis
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObjects
function TransformObjects(m, objs, scale, origin, translation, rotation, plane) {
    if (objs === undefined) {
        return null;
    }
    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        for (var _iterator9 = objs[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var obj = _step9.value;

            if (obj === undefined) {
                throw new Error("An object in the list of objects is undefined");
            }
            TransformObject(m, obj, scale, origin, translation, rotation, plane);
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

    return objs;
}
/**
 * This function is a deletion function aimed at deleting a selected object from
 * a model's geometry. Two options are featured, namely keeping the points of the
 * selected object or unkeeping.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObject
function DeleteObject(m, obj, keep_points) {
    if (obj === undefined) {
        return false;
    }
    if (obj.getID() === undefined) {
        return false;
    }
    m.getGeom().delObj(obj, keep_points);
    return true;
}
/**
 * This function is a deletion function aimed at deleting a set of selected objects from
 * a model's geometry. Two options are featured, namely keeping the points of the
 * selected object or unkeeping.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObjects
function DeleteObjects(m, objs, keep_points) {
    if (objs === undefined) {
        return null;
    }
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
        for (var _iterator10 = objs[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var obj = _step10.value;

            if (obj === undefined) {
                throw new Error("An object in the list of objects is undefined");
            }
            DeleteObject(m, obj, keep_points);
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

    return true;
}
/**
 * Copies object from one location to another, or in-place
 * @ parameters Object to copy and optional translation vector
 * @ return Object ID if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObject
function CopyObject(m, obj, translation) {
    // To implement
    if (obj.getID() === undefined) {
        throw new Error("Undefined object");
    }
    return obj.getID();
}
/**
 * Copies a set of objects from one location to another, or in-place
 * @ parameters Object to copy and optional translation vector
 * @ return Object IDs if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObjects
function CopyObjects(m, objs, translation) {
    // To implement
    if (objs === undefined) {
        return [];
    }
    var ids = [];
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
        for (var _iterator11 = objs[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var obj = _step11.value;

            if (obj.getID() === undefined) {
                throw new Error("Undefined object");
            }
            ids.push(obj.getID());
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

    return ids;
}
/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectInGroup
 * This function returns True if an object is recorded in a specified group.
 */
function IsObjectInGroup(m, obj, group) {
    if (obj === undefined) {
        return false;
    }
    if (obj.getID() === undefined) {
        throw new Error("Undefined object");
    }
    return group.hasObj(obj);
}
/**
 * This function returns True if an object is present in a set of specified group.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ObjectGroups
function ObjectGroups(m, obj, groups) {
    if (obj === undefined) {
        return false;
    }
    if (obj.getID() === undefined) {
        throw new Error("Undefined object");
    }
    var objGps = true;
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
        for (var _iterator12 = groups[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var group = _step12.value;

            if (!(objGps === true)) {
                return false;
            }
            objGps === group.hasObj(obj); // TODO ???
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

    return true;
}
/**
 * Returns the distance from a 3D point to a plane
 * @param A plane and a 3 dimension point
 * @return The distance if successful, otherwise None
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane
function DistanceToPlane(m, xyz, plane) {
    var distance = undefined;
    // To Be Implemented
    return distance;
}
// =================================================================================================
// To be added at a later time
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectSolid
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectValid
//# sourceMappingURL=object_old_dev.js.map