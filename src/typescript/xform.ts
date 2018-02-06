/**
 * Functions for transforming points and objects.
 */

/**
 *
 */

import * as gs from "gs-json";
import * as three from "three";
import * as error from "./_error_msgs_dev";

//  ===============================================================================================================
//  Transformation Functions =================================================================================
//  ===============================================================================================================

/**
 * Moves points and/or objects.
 *
 * @param entities A single point or object, or a list of points and/or objects.
 * @param vector Translation vector.
 * @param copy If true, entities are copied before being moved.
 * @returns True if all geometry was successfully moved.
 */
export function move(entities: gs.IEnt | gs.IEnt[], vector: gs.XYZ, copy: boolean = false): gs.IEnt | gs.IEnt[] {
    const is_array: boolean = !Array.isArray(entities);
    if (!Array.isArray(entities)) {entities = [entities];}
    const model: gs.IModel = error.checkEntList(entities, 1);
    error.checkXYZ(vector);
    const matrix: three.Matrix4 = new three.Matrix4();
    matrix.setPosition(new three.Vector3(...vector));
    for (let i = 0; i < entities.length; i++) {
        if (copy) { entities[i] = entities[i].copy();}
        entities[i].xform(matrix);
    }
    if (is_array) {return entities;}
    return entities[0];
}
