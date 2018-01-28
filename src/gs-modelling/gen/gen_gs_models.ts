import * as fs from "fs";
import * as gs from "gs-json";
import * as gsm from "./../lib/_export_dev";
import * as gen from "./gen_models";

/**
 * Write a file.
 */
function writeToJSONFile(data: any, filename: string): boolean {
    fs.writeFile("../gs-modelling/src/gs-modelling/assets/" + filename, JSON.stringify(data, null, 4), (err) => {
        if (err) {
            console.log("Error writing file: " + filename);
            console.error(err);
            return false;
        }
        console.log("File has been created: " + filename);
    });
    return true;
}

/**
 * Execute using NPM, models get saved in the /src/assets/ folder.
 * 1) "npm run build_gs_models" OR
 * 2) "npm run build_models" (which builds both three and gs)
 */
if(require.main === module)  {
    console.log("Starting to write gs files...");
    writeToJSONFile(gen.genModelTest1(), "test1.gs");
    writeToJSONFile(gen.genModelTest2(), "test2.gs");
}
