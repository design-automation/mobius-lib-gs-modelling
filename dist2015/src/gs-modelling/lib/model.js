"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.New = New;
exports.FromData = FromData;
exports.FromFile = FromFile;
exports.save = save;
exports.toJSON = toJSON;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

var _model_dev = require("./model_dev");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Model Constructors ===========================================================================================
//  ===============================================================================================================
/**
 * Creates a new Model that is empty.
 * @returns New model empty if successful, null if unsuccessful or on error
 */
/**
 * Models contain geometry that can be viewed on the 3D viewer if output as geometry.
 */
function New() {
  return new gs.Model();
}
/**
 * Creates a new Model and populates the model with data.
 * @param model_data The model data in json format.
 * @returns New model if successful, null if unsuccessful or on error.
 */
function FromData(model_data) {
  return new gs.Model(JSON.parse(model_data));
}
/**
 * Creates a new Model and populates the model with data that is read from a file.
 * @param filepath The filepath to the file that contains model data in json format.
 * @returns New model if successful, null if unsuccessful or on error.
 */
function FromFile(filepath) {
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
function save(model, filename) {
  var file = new File([model.toJSON()], filename);
  (0, _model_dev.downloadContent)({
    type: "text/plain;charset=utf-8",
    filename: filename,
    content: model.toJSON()
  });
  return true;
}
/**
 * Save model as JSON
 * @param model The model to convert.
 * @returns New model if successful, null if unsuccessful or on error
 */
function toJSON(model) {
  return model.toJSON();
}
//# sourceMappingURL=model.js.map