import * as gs from "gs-json";

//  ===============================================================================================================
//  Geom Functions ================================================================================================
//  ===============================================================================================================

/**
 * Copies geometry from one model to another
 * @param entity Geometry or list of geometry to copy
 * @param model Model to copy to
 * @returns New copied geometry
 */
export function copyToModel(entity: gs.IPoint | gs.IObj | gs.IPoint[] | gs.IObj[], model: gs.IModel):
                             gs.IPoint | gs.IObj | gs.IPoint[] | gs.IObj[] {
    throw new Error("Method not implemented");
}

/**
 * Makes a clone of geometry in this model
 * @param entity Geometry or list of geometry to copy
 * @returns New copied geometry
 */
export function copy(entity: gs.IPoint | gs.IObj | gs.IPoint[] | gs.IObj[]):
                       gs.IPoint | gs.IObj | gs.IPoint[] | gs.IObj[] {
    throw new Error("Method not implemented");
}

/**
 * Deletes geometry or a list of geometry from the model
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to delete
 * @returns Number of items deleted if successful
 */
export function del(entity: gs.IPoint | gs.IObj | gs.IPoint[] | gs.IObj[]): number {
    throw new Error("Method not implemented");
}

/**
 * Mirrors geometry or a list of geometry about a plane.
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to mirror
 * @param plane Plane to mirror object
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Mirrored geometry if successful
 */
export function mirror(entity: gs.IPoint | gs.IObj, plane: gs.IPlane, copy: boolean): gs.IPoint | gs.IObj {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Moves geometry or a list of geometry.
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to move
 * @param translation Translation vector
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Geometry in new location if successful
 */
export function move(entity: gs.IPoint | gs.IObj, translation: number[], copy: boolean): gs.IPoint | gs.IObj {
    throw new Error("Method not implemented");
}

/**
 * Rotates geometry or a list of geometry on a plane.
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to rotate
 * @param rotation Rotation angle in degrees
 * @param plane Plane to rotate objects
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Rotated geometry if successful, null if unsuccessful or on error
 */
export function rotate(entity: gs.IPoint | gs.IObj, rotation: number, plane: gs.IPlane, copy: boolean): gs.IPoint | gs.IObj {
    throw new Error("Method not implemented");
}

/**
 * Scales geometry or a list of geometry based on an origin and a scale factor
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to scale
 * @param origin Origin of scale function
 * @param scale Scale factor
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Scaled geometry if successful, null if unsuccessful or on error
 */
export function scale(entity: gs.IPoint | gs.IObj, origin: number[], scale: number, copy: boolean): gs.IPoint | gs.IObj {
    throw new Error("Method not implemented");
}

/**
 * Moves, scales, or rotates geometry or a list of geometry given a rotation angle,
 * an origin point, scaling factor and translation vector
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to move
 * @param rotation Rotation angle in degrees
 * @param origin Origin point of function
 * @param scale Scale factor
 * @param translation Translation vector
 * @param copy Performs transformation on duplicate copy of input geometry if true
 * @returns Geometry in new location if successful, null if unsuccessful or on error
 */
export function transform(entity: gs.IPoint | gs.IObj, rotation: number, origin: number[], scale: number,
                           translation: number[], copy: boolean): gs.IPoint | gs.IObj {
    throw new Error("Method not implemented");
}

/**
 * Gets attributes of specified geometry
 *
 * Returns null if specified geometry does not have any attributes
 * @param entity Geometry
 * @returns List of attributes of specified geometry if successful, null if unsuccessful or on error
 */
export function getAttrib(entity: gs.IPoint | gs.IObj): gs.IAttrib[] {
    throw new Error("Method not implemented");
}

/**
 * Gets groups that contain specified geometry
 *
 * Returns null if specified geometry is not found in any groups
 * @param entity Geometry
 * @returns List of groups that contain specified geometry if successful, null if unsuccessful or on error
 */
export function getGroups(entity: gs.IPoint | gs.IObj): gs.IGroup[] {
    throw new Error("Method not implemented");
}

/**
 * Removes geometry from all groups that contain it
 * @param entity Geometry
 * @returns True if successful
 */
export function removeFromAllGroups(entity: gs.IPoint | gs.IObj): boolean {
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
