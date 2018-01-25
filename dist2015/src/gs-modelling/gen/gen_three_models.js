"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.genModelWriteToJSONFile = genModelWriteToJSONFile;
exports.genGsModelsWriteFiles = genGsModelsWriteFiles;

var _gen_gs_models = require("./gen_gs_models");

var gen = _interopRequireWildcard(_gen_gs_models);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Write a file.
 */
function genModelWriteToJSONFile(model, filename) {
    fs.writeFile("../assets/" + filename, JSON.stringify(model, null, 4), function (err) {
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
function genGsModelsWriteFiles() {
    gen.genModelTest1();
    //genModelWriteToJSONFile(gs.genThreeOptModel(gen.genModelTest1()), "model_test1.json");
}
/**
 * If this module is being run directly, then files will be written to disk.
 * This will require the TS code to be transpiled to 2015 JS code, first with TSC and then with babel.
 * There is a script that automates this in package.json.
 * Just type "npm run build_models" in the shell.
 */
if (require.main === module) {
    genGsModelsWriteFiles();
}
//# sourceMappingURL=gen_three_models.js.map