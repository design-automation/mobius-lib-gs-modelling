/**
 * Import geojson files.
 */

import * as gs from "gs-json";
import * as gj from "geojson";
import * as filesys from "../../libs/filesys/filesys";


/**
 * Execute using NPM, models get saved in the /src/assets/ folder.
 * 1) "npm run geojson"
 */

export function geojson(filename: string): gs.IModel {
    const model: gs.IModel = new gs.Model();
    const data: string = filesys.readToJSONFile(filename);
    console.log(data);
    return model;
}

if(require.main === module)  {
    console.log("Convert files: geojson...");
    geojson("D:/Temp/geojson/example.geojson");
}
