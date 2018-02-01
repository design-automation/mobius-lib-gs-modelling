import * as fs from "fs";
import * as gs from "gs-json";
import * as gsm from "./../lib/_export_dev";
import * as circles from "./models_circles";
import * as plines from "./models_plines";
import {writeToJSONFile} from "./write_files";

/**
 * Execute using NPM, models get saved in the /src/assets/ folder.
 * 1) "npm run build_gs_models" OR
 * 2) "npm run build_models" (which builds both three and gs)
 */

if(require.main === module)  {
    console.log("Starting to write gs files...");
    //writeToJSONFile(gen.genModelTest1(), "test1.gs");
    //writeToJSONFile(gen.genModelTest2(), "test2.gs");
}
