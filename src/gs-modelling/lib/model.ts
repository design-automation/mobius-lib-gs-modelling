/**
 * Models contain geometry that can be viewed on the 3D viewer if output as geometry.
 */

import * as gs from "gs-json";
import {downloadContent} from "./model_dev";

//  ===============================================================================================================
//  Model Constructors ===========================================================================================
//  ===============================================================================================================

/**
 * Creates a new Model that is empty.
 * @returns New model empty if successful, null if unsuccessful or on error
 */
export function New(): gs.IModel {
    return new gs.Model();
}

/**
 * Creates a new Model and populates the model with data.
 * @param model_data The model data in json format.
 * @returns New model if successful, null if unsuccessful or on error.
 */
export function FromData(model_data: string): gs.IModel {
    return new gs.Model(JSON.parse(model_data));
}

/**
 * Creates a new Model and populates the model with data that is read from a file.
 * @param filepath The filepath to the file that contains model data in json format.
 * @returns New model if successful, null if unsuccessful or on error.
 */
export function FromFile(filepath: string): gs.IModel {
    throw new Error("Not implemented.");
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
