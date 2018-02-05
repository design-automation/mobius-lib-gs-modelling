import {writeGsToJSONFile} from "../libs/filesys/filesys";
import * as gs from "gs-json";
import * as gsm from "../_export_dev";
import * as weeks from "./models_weeks";
import * as circles from "./models_circles";
import * as plines from "./models_plines";
import * as pmeshes from "./models_pmeshes";

/**
 * Execute using NPM, models get saved in the /src/assets/ folder.
 * 1) "npm run build_gs_models" OR
 * 2) "npm run build_models" (which builds both three and gs)
 */

const path: string = "../gs-modelling/src/assets/gs-json/";

if(require.main === module)  {
    // console.log("Three files: circles...");
    // writeGsToJSONFile(circles.genModelTest1(), path + "circles_test1.gs");
    // writeGsToJSONFile(circles.genModelTest1b(), path + "circles_test1b.gs");
    // writeGsToJSONFile(circles.genModelTest2(), path + "circles_test2.gs");
    // writeGsToJSONFile(circles.genModelTest3(), path + "circles_test3.gs");
    // writeGsToJSONFile(circles.genModelTest4(), path + "circles_circles_test4.gs");
    // writeGsToJSONFile(circles.genModelTest5(), path + "circles_test5.gs");
    // writeGsToJSONFile(circles.genModelTest6(), path + "circles_test6.gs");
    // writeGsToJSONFile(circles.genModelTest7(), path + "circles_test7.gs");
    // writeGsToJSONFile(circles.genModelTest8(), path + "circles_test8.gs");
}

if(require.main === module)  {
    // console.log("Three files: plines...");
    // writeGsToJSONFile(plines.genModelTest1(), path + "plines_test1.gs");
    // writeGsToJSONFile(plines.genModelTest2(), path + "plines_test2.gs");
    // writeGsToJSONFile(plines.genModelTest3(), path + "plines_test3.gs");
    // writeGsToJSONFile(plines.genModelTest4(), path + "plines_test4.gs");
    // writeGsToJSONFile(plines.genModelTest5(), path + "plines_test5.gs");
    // writeGsToJSONFile(plines.genModelTest6(), path + "plines_test6.gs");
    // writeGsToJSONFile(plines.genModelTest7(), path + "plines_test7.gs");
}

if(require.main === module)  {
    // console.log("Three files: pmeshes...");
    // writeGsToJSONFile(pmeshes.genModelTest1(), path + "pmeshes_test1.gs");
    // writeGsToJSONFile(pmeshes.genModelTest2(), path + "pmeshes_test2.gs");
}
