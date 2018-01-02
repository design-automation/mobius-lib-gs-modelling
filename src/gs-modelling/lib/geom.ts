import * as gs from "gs-json";

//  ===============================================================================================================
//  Geom Functions ================================================================================================
//  ===============================================================================================================

//- WEEK 2 -
/**
 * Deletes geometry or a list of geometry.
 * @param geom Geometry or list of geometry to delete
 * @returns Number of items deleted if successful, null if unsuccessful or on error
 */
export function del(geom: gs.IGeom[]): Number {
    /* Old Implementation for one obj
    if(obj === undefined) {return false;}
    if(obj.getID() === undefined) {return false;}
    m.getGeom().delObj(obj.getID(), keep_points);
    return true;
    */

    /* Old Implementation for multiple obj
    if (objs === undefined) {return null;}
    for(const obj of objs) {
     if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
     DeleteObject(m, obj, keep_points);
     }
    return true;
    */
    throw new Error("Method not implemented");
}

/**
 * Gets attributes of specified geometry
 * @param geom Geometry
 * @returns List of attributes of specified geometry if successful, null if unsuccessful or on error
 */
export function del(geom: gs.IGeom): gs.IAttrib[] {
    throw new Error("Method not implemented");
}

/**
 * Gets groups that contain specified geometry
 * @param geom Geometry
 * @returns List of groups that contain specified geometry if successful, null if unsuccessful or on error
 */
export function del(geom: gs.IGeom): gs.IGroup[] {
    throw new Error("Method not implemented");
}

/**
 * Mirrors geometry or a list of geometry about a plane.
 * @param geom Geometry or list of geometry to mirror
 * @param plane Plane to mirror object
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Mirrored geometry if successful, null if unsuccessful or on error
 */
export function mirror(geom: gs.IGeom, plane: gs.IPlane, copy: boolean): gs.IGeom {
    /* Old Implementation for one obj
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
    */

    /* Old Implementation for multiple objs
    if (objs === undefined) {return null;}
    for(const obj of objs) {
     if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
     MirrorObject(m, obj, plane);
     }
    return objs;
    */
    throw new Error("Method not implemented");
}

//- WEEK 2 -
/**
 * Moves geometry or a list of geometry.
 * @param geom Geometry or list of geometry to move
 * @param translation Translation vector
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Geometry in new location if successful, null if unsuccessful or on error
 */
export function move(geom: gs.IGeom, translation: number[], copy: boolean): gs.IGeom {
    /* Old implementation for one obj
    if (obj === undefined) {return null;}
    const points_IDs: Set<number> = obj.getPointsSet();
    for (const point_ID of points_IDs) {
    const xyz: number[] = m.getGeom().getPoint(point_ID).getPosition();
    m.getGeom().getPoint(point_ID).setPosition([xyz[0] + translation[0],
                                                xyz[1] + translation[1],
                                                xyz[2] + translation[2]]);
    }
    return obj;
    */

    /* Old implementation for multiple objs
    if (objs === undefined) {return null;}
    for(const obj of objs) {
        MoveObject(m, obj, translation);
    }
    return objs;
    */
    throw new Error("Method not implemented");
}

/**
 * Removes geomtery from all groups that contain it
 * @param geom Geometry
 * @returns True if successful, null if unsuccessful or on error
 */
export function removeFromAllGroups(geom: gs.IGeom): boolean {
    throw new Error("Method not implemented");
}

/**
 * Rotates geometry or a list of geometry on a plane.
 * @param geom Geometry or list of geometry to rotate
 * @param rotation Rotation angle in degrees
 * @param plane Plane to rotate objects
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Rotated geometry if successful, null if unsuccessful or on error
 */
export function rotate(geom: gs.IGeom, rotation: number, plane: gs.IPlane, copy: boolean): gs.IGeom {
    /* Old Implementation for one obj
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
    */

    /* Old Implementation for multiple objs
    if (objs === undefined) {return null;}
    for(const obj of objs) {
    if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
    RotateObject(m, obj, rotation, plane);
    }
    return objs;
    */
    throw new Error("Method not implemented");
}

/**
 * Scales geometry or a list of geometry based on an origin and a scale factor
 * @param geom Geometry or list of geometry to scale
 * @param origin Origin of scale function
 * @param scale Scale factor
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Scaled geometry if successful, null if unsuccessful or on error
 */
export function scale(geom: gs.IGeom, origin: number[], scale: number, copy: boolean): gs.IGeom {
    /* Old Implementation for one obj
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
    */

    /* Old Implementation for multiple objs
    if (objs === undefined) {return null;}
    for(const obj of objs) {
        if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
        ScaleObject(m, obj, origin, scale);
    }
    return objs;
    */
    throw new Error("Method not implemented");
}

/**
 * Moves, scales, or rotates geometry or a list of geometry given a rotation angle,
 * an origin point, scaling factor and translation vector
 * @param geom Geometry or list of geometry to move
 * @param rotation Rotation angle in degrees
 * @param origin Origin point of function
 * @param scale Scale factor
 * @param translation Translation vector
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Geometry in new location if successful, null if unsuccessful or on error
 */
export function transform(geom: gs.IGeom, rotation: number, origin: number[], scale: number,
                          translation: number[], copy: boolean): gs.IGeom {
    /* Old Implementation for one obj
    RotateObject(m, obj, rotation, plane);
    ScaleObject(m, obj, origin, scale);
    MoveObject(m, obj, translation);
    return obj;
    */

    /* Old Implementation for multiple objs
    if (objs === undefined) {return null;}
    for(const obj of objs) {
     if (obj === undefined) {throw new Error("An object in the list of objects is undefined");}
     TransformObject(m, obj, scale, origin, translation, rotation, plane);
     }
    return objs;
    */
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Transformation Functions From Object No Longer in API =========================================================
//  ===============================================================================================================

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
