import * as gs from "gs-json";

//  ===============================================================================================================
//  Geom Functions ================================================================================================
//  ===============================================================================================================

//- WEEK 2 -
/**
 * Deletes geometry or a list of geometry.
 * @param geom Geometry or list of geometry to delete
 * @returns Number of items deleted if successful, none if unsuccessful or on error
 */
export function del(geom: gs.IGeom, translation: number[]): Number {
    throw new Error("Method not implemented");
}

/**
 * Mirrors geometry or a list of geometry about a plane.
 * @param geom Geometry or list of geometry to mirror
 * @param plane Plane to mirror object
 * @returns Mirrored geometry if successful, none if unsuccessful or on error
 */
export function mirror(geom: gs.IGeom, plane: gs.IPlane): gs.IGeom {
    throw new Error("Method not implemented");
}

//- WEEK 2 -
/**
 * Moves geometry or a list of geometry.
 * @param geom Geometry or list of geometry to move
 * @param translation Translation vector
 * @returns Geometry in new location if successful, none if unsuccessful or on error
 */
export function move(geom: gs.IGeom, translation: number[]): gs.IGeom {
    throw new Error("Method not implemented");
}

/**
 * Rotates geometry or a list of geometry on a plane.
 * @param geom Geometry or list of geometry to rotate
 * @param rotation Rotation angle in degrees
 * @param plane Plane to rotate objects
 * @returns Rotated geometry if successful, none if unsuccessful or on error
 */
export function rotate(geom: gs.IGeom, rotation: number, plane: gs.IPlane): gs.IGeom {
    throw new Error("Method not implemented");
}

/**
 * Scales geometry or a list of geometry based on an origin and a scale factor
 * @param geom Geometry or list of geometry to move
 * @param origin Origin of scale function
 * @param scale Scale factor
 * @returns Scaled geometry if successful, none if unsuccessful or on error
 */
export function scale(geom: gs.IGeom, origin: number[], scale: number): gs.IGeom {
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
 * @returns Geometry in new location if successful, none if unsuccessful or on error
 */
export function transform(geom: gs.IGeom, rotation: number, origin: number[], scale: number,
						  translation: number[]): gs.IGeom {
    throw new Error("Method not implemented");
}
