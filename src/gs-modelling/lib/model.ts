/**
 * Models are datastructures that contain geometric entities with attributes,
 * possibly organised into groups.
 */

/**
 * Models can contain two types of geometric entities: points and objects.
 * The objects are further sudivided into different types, e.g. polylines, polymeshes, circle, etc.
 */

import * as gs from "gs-json";
import * as util from "./model_dev";

//  ===============================================================================================================
//  Model Constructors ===========================================================================================
//  ===============================================================================================================

/**
 * Creates a new empty model.
 *
 * @returns New model empty if successful, null if unsuccessful or on error
 */
export function New(): gs.IModel {
    return new gs.Model();
}

//  ===============================================================================================================
//  Model Functions ============================================================================================
//  ===============================================================================================================
