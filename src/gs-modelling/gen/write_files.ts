import * as fs from "fs";

/**
 * Write a file.
 */
export function writeToJSONFile(data: any, filename: string): boolean {
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
