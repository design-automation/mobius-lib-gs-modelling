import * as gs from "gs-json";
import * as utils from "./utils";
import * as three from "three";
/**
 * Moves a single object
 * @ parameters Object and Translation Vector
 * @ Return Translated Object if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObject
export function MoveObject(m: gs.IModel, obj: gs.IObj, translation: number[]): gs.IObj {
    if (obj === undefined) {return null;}
    const points_IDs: Set<number> = obj.getPointsSet();
    for (const point_ID of points_IDs) {
    const xyz: number[] = m.getGeom().getPoint(point_ID).getPosition();
    m.getGeom().getPoint(point_ID).setPosition([xyz[0] + translation[0],
                                                xyz[1] + translation[1],
                                                xyz[2] + translation[2]]);
    }
    return obj;
}
/**
 * Moves a set of objects
 * @ parameters Objects and Translation Vector
 * @ Return Translated Objects if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObjects
export function MoveObjects(m: gs.IModel, objs: gs.IObj[], translation: number[]): gs.IObj[] {
    if (objs === undefined) {return null;}
    for(const obj of objs) {
        MoveObject(m, obj, translation);
    }
    return objs;
}
/**
 * Scaling an object corresponds to modifying its underlying points according
 * to an origin and a scale factor. The function is designed such as any origin point of
 * the 3D space can be selected, even if the origin coincides with an object point.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObject
export function ScaleObject(m: gs.IModel, obj: gs.IObj, origin: number[], scale: number): gs.IObj {
    if (obj === undefined) {return null;}
    const points_IDs: Set<number> = obj.getPointsSet();
    for (const point_ID of points_IDs) {
        const xyz: number[] = m.getGeom().getPoint(point_ID).getPosition();
        const unit_vector: number[] = [];
        if( !(
            Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) +
            Math.pow(xyz[2] - origin[2],2) ) === 0) ) {
        unit_vector[0] = (xyz[0] - origin[0]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) +
            Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        unit_vector[1] = (xyz[1] - origin[1]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) +
            Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        unit_vector[2] = (xyz[2] - origin[2]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) +
            Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        m.getGeom().getPoint(point_ID).setPosition([xyz[0] + scale * unit_vector[0],
                                             xyz[1] + scale * unit_vector[1],
                                             xyz[2] + scale * unit_vector[2]]);
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
export function ScaleObjects(m: gs.IModel, objs: gs.IObj[], origin: number[], scale: number): gs.IObj[] {
    if (objs === undefined) {return null;}
    for(const obj of objs) {
        if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
        ScaleObject(m, obj, origin, scale);
    }
    return objs;
    }
/**
 * Direct rotation of an object in degrees according to a specified plane.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObject
export function RotateObject(m: gs.IModel, obj: gs.IObj, rotation: number, plane: gs.IPlane): gs.IObj {
   if (obj === undefined) {return null;}
   rotation = rotation * 360 / (2 * Math.PI);
   const x_axis: three.Vector3 =  new three.Vector3(...plane.getVectors()[0]).normalize();
   const y_axis: three.Vector3 =  new three.Vector3(...plane.getVectors()[1]).normalize();
   const z_axis: three.Vector3 =  (x_axis.cross(y_axis)).normalize();
   const e1: three.Vector3 =  new three.Vector3(1,0,0);
   const e2: three.Vector3 =  new three.Vector3(0,1,0);
   const e3: three.Vector3 =  new three.Vector3(0,0,1);
   const matrix_1_to_2: three.Matrix3 = new three.Matrix3();
   matrix_1_to_2.set(e1.dot(x_axis),e1.dot(y_axis),e1.dot(z_axis),
              e2.dot(x_axis),e2.dot(y_axis),e2.dot(z_axis),
              e3.dot(x_axis),e3.dot(y_axis),e3.dot(z_axis));
   const matrix_2_to_1: three.Matrix3 = matrix_1_to_2.getInverse(matrix_1_to_2, true);
   const matrix_rotation: three.Matrix3 = new three.Matrix3();
   matrix_rotation.set(Math.cos(rotation), -Math.sin(rotation),0,
                      Math.sin(rotation),Math.cos(rotation),0,
                      0,0,1);

   const points_IDs: Set<number> = obj.getPointsSet();
   for (const point_ID of points_IDs) {
        const xyz: number[] = m.getGeom().getPoint(point_ID).getPosition();
        let matrix_vec: three.Matrix3 = new three.Matrix3();
        matrix_vec.set(xyz[0],0,0,
                       xyz[1],0,0,
                       xyz[2],0,0);
        matrix_vec = matrix_2_to_1.multiply(matrix_rotation.multiply(matrix_1_to_2.multiply(matrix_vec)));
        m.getGeom().getPoint(point_ID).setPosition([matrix_vec.toArray()[0],
                            matrix_vec.toArray()[1], matrix_vec.toArray()[2]]); // column-major format;
        }
   return obj;
}
/**
 * Direct rotation of collection of object in degrees according to a specified plane.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObjects
export function RotateObjects(m: gs.IModel, objs: gs.IObj[], rotation: number, plane: gs.IPlane): gs.IObj[] {
   if (objs === undefined) {return null;}
   for(const obj of objs) {
    if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
    RotateObject(m, obj, rotation, plane);
    }
   return objs;
}

/**
 * Mirrors a single object
 * @param Object, Plane
 * @return Mirrored object if successful
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObject
export function MirrorObject(m: gs.IModel, obj: gs.IObj, plane: gs.IPlane): gs.IObj {
   if (obj === undefined) {return null;}
   // Case 1: Linear Transforming, meaning that [0,0,0] belongs to the Mirror
   // A general case with two extra transforming needs to be taken into account as well
   // in the case for which the transformation is Affine.
   const x_axis: three.Vector3 =  new three.Vector3(...plane.getVectors()[0]).normalize();
   const y_axis: three.Vector3 =  new three.Vector3(...plane.getVectors()[1]).normalize();
   const z_axis: three.Vector3 =  (x_axis.cross(y_axis)).normalize();
   const e1: three.Vector3 =  new three.Vector3(1,0,0);
   const e2: three.Vector3 =  new three.Vector3(0,1,0);
   const e3: three.Vector3 =  new three.Vector3(0,0,1);
   const matrix_1_to_2: three.Matrix3 = new three.Matrix3();
   matrix_1_to_2.set(e1.dot(x_axis),e1.dot(y_axis),e1.dot(z_axis),
              e2.dot(x_axis),e2.dot(y_axis),e2.dot(z_axis),
              e3.dot(x_axis),e3.dot(y_axis),e3.dot(z_axis));
   const matrix_2_to_1: three.Matrix3 = matrix_1_to_2.getInverse(matrix_1_to_2, true);
   const matrix_symetry: three.Matrix3 = new three.Matrix3();
   matrix_symetry.set(1, 0, 0,
                      0,-1, 0,
                      0, 0,-1);
   const points_IDs: Set<number> = obj.getPointsSet();
   for (const point_ID of points_IDs) {
        const xyz: number[] = m.getGeom().getPoint(point_ID).getPosition();
        let matrix_vec: three.Matrix3 = new three.Matrix3();
        matrix_vec.set(xyz[0],0,0,
                       xyz[1],0,0,
                       xyz[2],0,0);
        matrix_vec = matrix_symetry.multiply(matrix_vec);
        m.getGeom().getPoint(point_ID).setPosition([matrix_vec.toArray()[0],
                            matrix_vec.toArray()[1], matrix_vec.toArray()[2]]); // column-major format;
        }
   return obj;
}
/**
 * Mirrors a set of objects
 * @param Objects, Start Point of the the Mirror Plane, End Point of the Mirror Plane
 * @return Mirrored object if successful
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObjects
export function MirrorObjects(m: gs.IModel, objs: gs.IObj[], plane: gs.IPlane): gs.IObj[] {
   if (objs === undefined) {return null;}
   for(const obj of objs) {
    if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
    MirrorObject(m, obj, plane);
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
export function TransformObject(m: gs.IModel, obj: gs.IObj, scale: number, origin: number[],
                                translation: number[], rotation: number, plane: gs.IPlane): gs.IObj {
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
export function TransformObjects(m: gs.IModel, objs: gs.IObj[], scale: number, origin: number[],
                                 translation: number[], rotation: number, plane: gs.IPlane): gs.IObj[] {
   if (objs === undefined) {return null;}
   for(const obj of objs) {
    if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
    TransformObject(m, obj, scale, origin, translation, rotation, plane);
    }
   return objs;
}

/**
 * This function is a deletion function aimed at deleting a selected object from
 * a model's geometry. Two options are featured, namely keeping the points of the
 * selected object or unkeeping.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObject
export function DeleteObject(m: gs.IModel, obj: gs.IObj, keep_points: boolean): boolean {
    if(obj === undefined) {return false;}
    if(obj.getID() === undefined) {return false;}
    m.getGeom().delObj(obj.getID(), keep_points);
    return true;
}

/**
 * This function is a deletion function aimed at deleting a set of selected objects from
 * a model's geometry. Two options are featured, namely keeping the points of the
 * selected object or unkeeping.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObjects
export function DeleteObjects(m: gs.IModel, objs: gs.IObj[], keep_points: boolean): boolean {
   if (objs === undefined) {return null;}
   for(const obj of objs) {
    if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
    DeleteObject(m, obj, keep_points);
    }
   return true;
}

/**
 * Copies object from one location to another, or in-place
 * @ parameters Object to copy and optional translation vector
 * @ return Object ID if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObject
export function CopyObject(m: gs.IModel, obj: gs.IObj, translation?: number[]): number {
// To implement
    if(obj.getID() === undefined) {throw new Error("Undefined object");}
    return obj.getID();
}

/**
 * Copies a set of objects from one location to another, or in-place
 * @ parameters Object to copy and optional translation vector
 * @ return Object IDs if successfull
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObjects
export function CopyObjects(m: gs.IModel, objs: gs.IObj[], translation?: number[]): number[] {
    // To implement
    if(objs === undefined) {return [];}
    const ids: number[] = [];
    for(const obj of objs) {
        if(obj.getID() === undefined) {throw new Error("Undefined object");}
        ids.push(obj.getID());
    }
    return ids;
}

/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectInGroup
 * This function returns True if an object is recorded in a specified group.
 */
export function IsObjectInGroup(m: gs.IModel, obj: gs.IObj, group: gs.IGroup): boolean {
    if(obj === undefined) {return false;}
    if(obj.getID() === undefined) {throw new Error("Undefined object");}
    return group.hasObj(obj.getID());
}
/**
 * This function returns True if an object is present in a set of specified group.
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ObjectGroups
export function ObjectGroups(m: gs.IModel, obj: gs.IObj, groups: gs.IGroup[]): boolean {
    if(obj === undefined) {return false;}
    if(obj.getID() === undefined) {throw new Error("Undefined object");}
    const objGps: boolean = true ;
    for(const group of groups) {
    if(!(objGps === true)) {return false;}
        objGps === group.hasObj(obj.getID()); // TODO ???
    }
    return true;
}
/**
 * Returns the distance from a 3D point to a plane
 * @param A plane and a 3 dimension point
 * @return The distance if successful, otherwise None
 */
//  http://developer.rhino3d.com/api/RhinoScriptSyntax/#plane
export function DistanceToPlane(m: gs.IModel, xyz: number[], plane: gs.IPlane): number {
    const distance: number = undefined;
    // To Be Implemented
    return distance;
}

// =================================================================================================
// To be added at a later time
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectSolid
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectValid
