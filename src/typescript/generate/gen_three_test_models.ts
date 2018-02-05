import {writeThreeToJSONFile} from "../libs/filesys/filesys";
import * as gs from "gs-json";
import * as gsm from "../_export_dev";
import * as weeks from "./models_weeks";
import * as circles from "./models_circles";
import * as plines from "./models_plines";
import * as pmeshes from "./models_pmeshes";

/**
 * Execute using NPM, models get saved in the /src/assets/ folder.
 * 1) "npm run build_three_models" OR
 * 2) "npm run build_models" (which builds both three and gs)
 */

const path: string = "../gs-modelling/src/assets/three/";

if(require.main === module)  {
    // console.log("Three files: weeks...");
    // writeThreeToJSONFile(gs.genThreeOptModel(weeks.genModelWeek3()), path + "week3.json");
}

if(require.main === module)  {
    // console.log("Three files: circles...");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest1()), path + "circles_test1.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest1a()), path + "circles_test1a.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest1b()), path + "circles_test1b.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest2()), path + "circles_test2.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest3()), path + "circles_test3.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest4()), path + "circles_circles_test4.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest5()), path + "circles_test5.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest6()), path + "circles_test6.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest7()), path + "circles_test7.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(circles.genModelTest8()), path + "circles_test8.json");
}

if(require.main === module)  {
    // console.log("Three files: plines...");
    // writeThreeToJSONFile(gs.genThreeOptModel(plines.genModelTest1()), path + "plines_test1.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(plines.genModelTest2()), path + "plines_test2.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(plines.genModelTest3()), path + "plines_test3.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(plines.genModelTest4()), path + "plines_test4.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(plines.genModelTest5()), path + "plines_test5.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(plines.genModelTest6()), path + "plines_test6.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(plines.genModelTest7()), path + "plines_test7.json");
}

if(require.main === module)  {
    // console.log("Three files: pmeshes...");
    // writeThreeToJSONFile(gs.genThreeOptModel(pmeshes.genModelTest1()), path + "pmeshes_test1.json");
    // writeThreeToJSONFile(gs.genThreeOptModel(pmeshes.genModelTest2()), path + "pmeshes_test2.json");
}
