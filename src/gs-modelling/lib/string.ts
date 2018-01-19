/**
 * Strings are a type of data that contains text in the form of alphanumeric characters and symbols.<br/>
 *
 * They are enclosed in quotation marks.<br/>
 * Regular expressions can also be used to search for character matches in strings.
 */

/**
 *
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  String functions ==============================================================================================
//  ===============================================================================================================

/**
 * Checks if a string ends with the characters of a specified string
 * @param str_1 String to check
 * @param str_2 String of characters to check for
 * @returns True if str_1 ends with str_2, false if str_1 does not end with str_2
 *
 * <h3>Example:</h3>
 * <code>string = "Orange"<br/>
 * ends = String.endsWith(string,"e")<br/></code>
 * <br/>Expected value of ends is true
 */
export function endsWith(str_1: string, str_2: string): boolean {
    return str_1.endsWith(str_2);
}

/**
 * Checks if a string contains a specified string of characters
 * @param str_1 String to check
 * @param str_2 String to search for
 * @returns True if str_1 contains str_2, false if str_1 does not contain str_2
 *
 * <h3>Example:</h3>
 * <code>string = "Orange"<br/>
 * incl = String.includes(string,"an")<br/></code>
 * <br/>Expected value of incl is true
 */
export function includes(str_1: string, str_2: string): boolean {
    return str_1.includes(str_2);
}

/**
 * Returns the number of characters in a string
 * @param str String to find length of
 * @returns Length of string
 *
 * <h3>Example:</h3>
 * <code>string = "Orange"<br/>
 * length = String.len(string)<br/></code>
 * <br/>Expected value of length is 6
 */
export function len(str: string): number {
    return str.length;
}

/**
 * Searches for a specified string of characters in a string and replaces them with another specified string
 * of characters
 *
 * To perfrom a case-insensitive search, use <code>/string/i</code> instead of <code>"string"</code> in search
 * @param str_1 String
 * @param str_2 String to search for
 * @param str_3 String to replace search value with
 * @returns New string with replaced characters
 *
 * <h3>Example:</h3>
 * <code>string = "Orange"<br/>
 * newString = String.Replace(string,"O","Ar")<br/></code>
 * <br/>Expected value of newString is "Arrange"
 */
export function replace(str_1: string, str_2: string, str_3: string): string {
    return str_1.replace(str_2,str_3);
}

/**
 * Returns the position index of where a specified string of characters can be found within a string
 *
 * If specified string of characters cannot be found, returns -1
 * @param str_1 String to check
 * @param str_2 String of characters to check for
 * @returns Number that represents position of str_1 in str_2
 *
 * <h3>Example:</h3>
 * <code>string = "Orange"<br/>
 * search = String.search(string,"e")<br/></code>
 * <br/>Expected value of search is 5
 */
export function search(str_1: string, str_2: string): number {
    return str_1.search(str_2);
}

/**
 * Splits a string into a list of substrings using a specified string of characters as a separator
 * @param str String
 * @param separator String of characters used to split string
 * @returns List of substrings
 *
 * <h3>Example:</h3>
 * <code>string = "Orange"<br/>
 * split = String.split(string,"a")<br/></code>
 * <br/>Expected value of split is ["Or","nge"]
 */
export function split(str: string, separator: string): string[] {
    return str.split(separator);
}

/**
 * Extracts characters in a string between 2 specified indices and returns it as a new string
 *
 * Start index is inclusive and end index is exclusive
 * @param str String
 * @param start Index to start extracting characters
 * @param end Index to stop extracting characters
 * @returns New string with extracted characters
 *
 * <h3>Example:</h3>
 * <code>string = "Orange"<br/>
 * substring = String.substring(string,1,4)<br/></code>
 * <br/>Expected value of ends is "ran"
 */
export function substring(str: string, start: number, end: number): string {
    return str.substring(start,end);
}
