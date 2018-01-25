import * as gs from "gs-json";
import * as gen from "./gen_gs_models";
import * as fs from "fs";

/**
 * Write a file.
 */
export function genModelWriteToJSONFile(model: gs.IThreeScene, filename: string): boolean {
    fs.writeFile("../assets/" + filename, JSON.stringify(model, null, 4), (err) => {
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
 * Write all models to disk as json files.
 */
export function genGsModelsWriteFiles(): void {
    gen.genModelTest1();
    //genModelWriteToJSONFile(gs.genThreeOptModel(gen.genModelTest1()), "model_test1.json");
}

/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.json.
 * Just type "npm run build_models" in the shell.
 */
if(require.main === module)  {
    genGsModelsWriteFiles();
}
