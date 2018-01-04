import * as gs from "gs-json";

//  ===============================================================================================================
//  Model Constructors ============================================================================================
//  ===============================================================================================================

// - WEEK 2 -
/**
 * Creates a new Model.
 * @param gs_json_data GS-JSON data to be added to the model. If undefined, an empty model is created.
 * @returns New model if successful, null if unsuccessful or on error
 */
export function Create(gs_json_data?: gs.IModelData): gs.IModel {
    if (gs_json_data !== undefined) {
        return new gs.Model();
    }
    return new gs.Model();
}

//  ===============================================================================================================
//  Model Functions ===============================================================================================
//  ===============================================================================================================

