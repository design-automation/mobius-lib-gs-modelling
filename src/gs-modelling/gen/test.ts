import * as fs from "fs";

/**
 * Write a file.
 */
export function writeFile(data: any, filename: string): boolean {
    fs.writeFile("./" + filename, data, (err) => {
        if (err) {
            console.log("Error writing file: " + filename);
            console.error(err);
            return false;
        }
        console.log("File has been created: " + filename);
    });
    return true;
}

if(require.main === module)  {
    console.log("hello");
    writeFile("hello2", "test1.txt");
}
