import * as gs from "gs-json";

//  ===============================================================================================================
//  Model Constructors ============================================================================================
//  ===============================================================================================================

//- WEEK 2 -
/**
 * Creates a new Model.
 * @param geom Geometry to add to new model
 * @returns New model if successful, null if unsuccessful or on error
 */
export function create(geom: gs.IModelData): gs.IModel {
    //return new gs.Model(data);
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Model Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Discards unused points from model.
 * @param model Model to discard points from
 * @returns Number of points discarded if successful, null if unsuccessful or on error
 */
export function discardUnusedPoints(model: gs.IModel): number {
    throw new Error("Method not implemented");
}

/**
 * Discards unused geometry from model.
 * @param model Model to discard geometry from
 * @returns True if successful, null if unsuccessful or on error
 */
export function purge(model: gs.IModel): boolean {
    throw new Error("Method not implemented");
}

//- WEEK 2 -
/**
 * Saves model as a JSON file.
 * @param model Model to save
 * @returns JSON file if successful, null if unsuccessful or on error
 */
export function toJSON(model: gs.IModel): JSON {
    throw new Error("Method not implemented");
}
