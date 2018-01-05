import * as gs from "gs-json";

//  ===============================================================================================================
//  List Constructors =============================================================================================
//  ===============================================================================================================

/**
 * Duplicates a list
 *
 * @param list List to duplicate
 * @returns New duplicated list
 */
export function Copy(list: any[]): any[] {
    return list.slice();
}

/**
 * Creates a new list of integers between two integers
 *
 * Bottom bound number is inclusive and top bound number is exclusive<br/>
 * @param min Bottom bound integer
 * @param max Top bound integer
 * @returns New list
 */
export function FromRange(min: number, max: number): number[] {
    return gs.Arr.makeSeq(max - min).map((v) => v + min);
}

//  ===============================================================================================================
//  List Functions ================================================================================================
//  ===============================================================================================================

/**
 * Returns the number of items in an list
 * @param list List
 * @returns Length of specified list
 */
export function length(list): any[] {
    return list.length;
}

/**
 * Adds an item to the end of a list
 *
 * If item is a list, the entire list will be appended as one item<br/>
 * Alters original input list
 * @param list List to add to
 * @param item Item to add
 * @returns List with added item
 */
export function append(list, item): any[] {
    return list.push(item);
}

/**
 * Adds an item to the front of a list
 *
 * If item is a list, the entire list will be appended as one item<br/>
 * Alters original input list
 * @param list List to add to
 * @param item Item to add
 * @returns List with added item
 */
export function appendFront(list, item): any[] {
    return list.shift(item);
}

/**
 * Adds items (from a list) to the end of an list
 *
 * Items are appended to list individually as seperate items<br/>
 * Does not alter original input list
 * @param list List to add to
 * @param items List of items to add
 * @returns List with added items
 */
export function extend(list, item): any[] {
    return list.concat(item);
}

/**
 * Adds items (from a list) to the front of an list
 *
 * Items are appended to list individually as seperate items<br/>
 * Does not alter original input list
 * @param list List to add to
 * @param items List of items to add
 * @returns List with added items
 */
export function extendFront(list, items): any[] {
    return items.concat(list);
}

/**
 * Removes the item with the specified index number from a list
 *
 * Alters input list
 * @param list List to remove item from
 * @param index Index number of item to remove
 * @returns List with item removed
 */
export function removeIndex(list, index: number): any[] {
    return list.splice(index,1);
}

/**
 * Removes items that match specified value from a list
 *
 * Alters input list<br/>
 * Items must match both the value and type of specified value<br/>
 * Returns original list if no items in list match specified value
 * @param list List to remove item from
 * @param value Value to search for
 * @param remove_all Removes all instances of specified value if true, removes only the first instance if
 *        false
 * @returns List with item removed
 */
export function removeValue(list, value, remove_all: boolean): any[] {
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] === value) {
            list.splice(i,1);
            if (remove_all === false) {break}
        }
    }
    return list
}

/**
 * Reverses the order of items in an list
 *
 * Alters input list
 * @param list List to reverse
 * @returns New reversed list
 */
export function reverse(list): any[] {
    return list.reverse();
}

/**
 * Sorts a list of strings alphabetically
 *
 * Alters input list<br/>
 * If items are not strings, they are treated as strings<br/>
 * Items are sorted according to string Unicode code points (character by character, numbers before upper case
 * alphabets, upper case alphabets before lower case alphabets)
 * @param list List to sort
 * @returns New sorted list
 */
export function sortAplha(list): any[] {
    return list.sort();
}

/**
 * Sorts a list of numbers in ascending order
 *
 * Alters input list<br/>
 * List must contain numbers
 * @param list List to add to
 * @returns New sorted list
 */
export function sortNum(list): any[] {
    return list.sort(function(a, b){return a - b});
}
