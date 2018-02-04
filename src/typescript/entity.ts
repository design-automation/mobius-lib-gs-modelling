/**
 * Functions for manipulating entities. Entities are points and objects.
 */

import * as gs from "gs-json";
import * as three from "three";

//  ===============================================================================================================
//  Geom Constructors =============================================================================================
//  ===============================================================================================================

/**
 * Create a copy of an entity.
 *
 * @param entity Geometry
 * @returns Copy
 */
export function Copy(entity: gs.IEnt): gs.IEnt {
    // check args
    if (!entity.exists()) {throw new Error("entity has been deleted.");}
    // copy and return
    return entity.copy();
}

//  ===============================================================================================================
//  Geom Functions ================================================================================================
//  ===============================================================================================================

/**
 * Deletes geometry or a list of geometry from the model
 *
 * Affects geometry that contains or is based off specified geometry
 * @param entity Geometry or list of geometry to delete
 * @returns Number of items deleted if successful
 */
export function del(entities: gs.IEnt | gs.IEnt[]): number {
    if (Array.isArray(entities)) {
        let counter = 0;
        for (const entity of entities) {
            if (!entity.exists()) {
                const geom: gs.IGeom = entity.getGeom();
                if (entity instanceof gs.Point) {
                    geom.delPoint(entity as gs.IPoint);
                    counter++;
                } else if (entity instanceof gs.Obj) {
                    geom.delObj(entity as gs.IObj, true);
                    counter++;
                }
            }
        }
        return counter;
    } else { // a single entity
        if (!entities.exists()) {return 0;}
        const geom: gs.IGeom = entities.getGeom();
        if (entities instanceof gs.Point) {
            geom.delPoint(entities as gs.IPoint);
            return 1;
        } else if (entities instanceof gs.Obj) {
            geom.delObj(entities as gs.IObj, true);
            return 1;
        }
    }
}

