/**
 * Import geojson files.
 */

import * as gs from "gs-json";
import * as gj from "geojson";

export function geojson(): gs.IModel {
    const model: gs.IModel = new gs.Model();
    return model;
}


