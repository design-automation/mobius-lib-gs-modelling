import {writeToJSONFile} from "./write_files";
import * as gs from "gs-json";
import * as gsm from "./../lib/_export_dev";
import * as weeks from "./models_weeks";
import * as circles from "./models_circles";
import * as plines from "./models_plines";
import * as pmeshes from "./models_pmeshes";

/**
 * Execute using NPM, models get saved in the /src/assets/ folder.
 * 1) "npm run build_three_models" OR
 * 2) "npm run build_models" (which builds both three and gs)
 */

if(require.main === module)  {
    console.log("Three files: weeks...");
    writeToJSONFile(gs.genThreeOptModel(weeks.genModelWeek3()), "week3.json");
}

if(require.main === module)  {
    console.log("Three files: circles...");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest1()), "circles_test1.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest1b()), "circles_test1b.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest2()), "circles_test2.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest3()), "circles_test3.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest4()), "circles_circles_test4.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest5()), "circles_test5.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest6()), "circles_test6.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest7()), "circles_test7.json");
    writeToJSONFile(gs.genThreeOptModel(circles.genModelTest8()), "circles_test8.json");
}

if(require.main === module)  {
    console.log("Three files: plines...");
    writeToJSONFile(gs.genThreeOptModel(plines.genModelTest1()), "plines_test1.json");
    writeToJSONFile(gs.genThreeOptModel(plines.genModelTest2()), "plines_test2.json");
    writeToJSONFile(gs.genThreeOptModel(plines.genModelTest3()), "plines_test3.json");
    writeToJSONFile(gs.genThreeOptModel(plines.genModelTest4()), "plines_test4.json");
    writeToJSONFile(gs.genThreeOptModel(plines.genModelTest5()), "plines_test5.json");
    writeToJSONFile(gs.genThreeOptModel(plines.genModelTest6()), "plines_test6.json");
    writeToJSONFile(gs.genThreeOptModel(plines.genModelTest7()), "plines_test7.json");
}

if(require.main === module)  {
    console.log("Three files: pmeshes...");
    writeToJSONFile(gs.genThreeOptModel(pmeshes.genModelTest1()), "pmeshes_test1.json");
    writeToJSONFile(gs.genThreeOptModel(pmeshes.genModelTest2()), "pmeshes_test2.json");
}
