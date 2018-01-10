/**
 * Models contain geometry that can be viewed on the 3D viewer if output as geometry.
 */

/**
 *
 */

import * as gs from "gs-json";
import {downloadContent} from "./model_dev";

//  ===============================================================================================================
//  Model Constructors ===========================================================================================
//  ===============================================================================================================

// - WEEK 2 -
/**
 * Creates a new Model that is empty.
 * @returns New model empty if successful, null if unsuccessful or on error
 */
export function New(gs_json_data?: gs.IModelData): gs.IModel {
    return new gs.Model();
}

/**
 * Creates a new Model and populates the model with data.
 * @param filedata The file data in gs-json format.
 * @returns New model if successful, null if unsuccessful or on error.
 */
export function Load(filedata: string): gs.IModel {
    return new gs.Model(JSON.parse(filedata));
}

//  ===============================================================================================================
//  Model Functions ============================================================================================
//  ===============================================================================================================

/**
 * Save a model to file.
 * @param file_path The path to where the file should be saved.
 * @returns New model if successful, null if unsuccessful or on error
 */
export function save(model: gs.IModel , filename: string): boolean {
    const file: File = new File([model.toJSON()], filename);
    downloadContent({
        type: "text/plain;charset=utf-8",
        filename: filename,
        content: model.toJSON(),
    });
    return true;
}
