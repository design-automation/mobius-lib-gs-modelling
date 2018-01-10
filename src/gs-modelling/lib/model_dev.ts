import * as gs from "gs-json";

/**
 * Discards unused points from model.
 * @param model Model to discard points from
 * @returns Number of points discarded if successful, null if unsuccessful or on error
 */
export function discardUnusedPoints(model: gs.IModel): number {
    throw new Error("Method not implemented");
}

/**
 * Discards unused geometry from model.
 * @param model Model to discard geometry from
 * @returns True if successful, null if unsuccessful or on error
 */
export function purge(model: gs.IModel): boolean {
    throw new Error("Method not implemented");
}

// - WEEK 2 -
/**
 * Saves model as a JSON file.
 * @param model Model to save
 * @returns JSON file if successful, null if unsuccessful or on error
 */
export function toJSON(model: gs.IModel): JSON {
    throw new Error("Method not implemented");
}

/**
 * Helper for saving files.
 */
export function downloadContent(options) {
    if (window.navigator.msSaveBlob) {
        const blob = new Blob([options.content],
               {type: options.type });
        window.navigator.msSaveBlob(blob, options.filename);
    } else {
        const link = document.createElement("a");
        const content = options.content;
        const uriScheme = ['data:', options.type, ","].join("");
        link.href = uriScheme + content;
        link.download = options.filename;
        //FF requires the link in actual DOM
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
