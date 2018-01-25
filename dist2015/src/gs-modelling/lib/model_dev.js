"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.discardUnusedPoints = discardUnusedPoints;
exports.purge = purge;
exports.toJSON = toJSON;
exports.downloadContent = downloadContent;
/**
 * Discards unused points from model.
 * @param model Model to discard points from
 * @returns Number of points discarded if successful, null if unsuccessful or on error
 */
function discardUnusedPoints(model) {
    throw new Error("Method not implemented");
}
/**
 * Discards unused geometry from model.
 * @param model Model to discard geometry from
 * @returns True if successful, null if unsuccessful or on error
 */
function purge(model) {
    throw new Error("Method not implemented");
}
// - WEEK 2 -
/**
 * Saves model as a JSON file.
 * @param model Model to save
 * @returns JSON file if successful, null if unsuccessful or on error
 */
function toJSON(model) {
    throw new Error("Method not implemented");
}
/**
 * Helper for saving files.
 */
function downloadContent(options) {
    if (window.navigator.msSaveBlob) {
        var blob = new Blob([options.content], { type: options.type });
        window.navigator.msSaveBlob(blob, options.filename);
    } else {
        var link = document.createElement("a");
        var content = options.content;
        var uriScheme = ['data:', options.type, ","].join("");
        link.href = uriScheme + content;
        link.download = options.filename;
        //FF requires the link in actual DOM
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
//# sourceMappingURL=model_dev.js.map