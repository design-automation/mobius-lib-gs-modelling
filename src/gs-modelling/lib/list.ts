/**
 * Lists are a tool to manage a collection of data.<br/>
 *
 * Any information can be stored in a list (including other lists) and they are refered to as items.<br/>
 * Items in a list are ordered and will be returned in the same order or accessed by the same index unless
 * changes are made to alter it.<br/>
 *
 * To create an empty list, use the assignment button and define the value as <code>[]</code><br/>
 * To access an item from a list, use <code>list_name[index_num]</code>. This can also be entered directly
 * into functions.
 */

/**
 *
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  List Constructors =============================================================================================
//  ===============================================================================================================

/**
 * Duplicates a list
 *
 * @param list List to duplicate
 * @returns New duplicated list
 *
 * <h3>Example:</h3>
 * <code>
 * list = [1,2,3]<br/>
 * copy = List.Copy(list)</code><br/><br/>
 * Expected value of copy is [1,2,3]
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
 *
 * <h3>Example: </h3>
 * <code>
 * list = List.FromRange(0,5)</code><br/><br/>
 * Expected value of list is [0,1,2,3,4]
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
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3]<br/>
 * len = List.len(list)</code><br/><br/>
 * Expected value of len is 3
 */
export function len(list: any[]): number {
    return list.length;
}

/**
 * Adds an item to the end of a list
 *
 * If item is a list, the entire list will be appended as one item<br/>
 * @param list List to add to
 * @param item Item to add
 * @returns List with added item
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3]<br/>
 * append = List.append(list,4)</code><br/><br/>
 * Expected value of list is [1,2,3,4]
 */
export function append(list: any[], item: any): any[] {
    const list2 = list.slice();
    list2.push(item);
    return list2;
}

/**
 * Adds an item to the front of a list
 *
 * If item is a list, the entire list will be appended as one item<br/>
 * @param list List to add to
 * @param item Item to add
 * @returns List with added item
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3]<br/>
 * append = List.appendFront(list,4)</code><br/><br/>
 * Expected value of list is [4,1,2,3]
 */
export function appendFront(list: any[], item: any): any[] {
    const list2 = list.slice();
    list2.unshift(item);
    return list2;
}

/**
 * Adds items (from a list) to the end of an list
 *
 * Items are added to list individually as seperate items<br/>
 * @param list List to add to
 * @param items List of items to add
 * @returns List with added items
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3]<br/>
 * list2 = [9,0]<br/>
 * extend = List.extend(list,list2)</code><br/><br/>
 * Expected value of extend is [1,2,3,9,0]
 */
export function extend(list: any[], items: any[]): any[] {
    return list.concat(items);
}

/**
 * Adds items (from a list) to the front of an list
 *
 * Items are added to list individually as seperate items<br/>
 * @param list List to add to
 * @param items List of items to add
 * @returns List with added items
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3]<br/>
 * list2 = [9,0]<br/>
 * extend = List.extend(list,list2)</code><br/><br/>
 * Expected value of extend is [9,0,1,2,3]
 */
export function extendFront(list: any[], items: any[]): any[] {
    return items.concat(list);
}

/**
 * Flattens an n-dimensional list into a one-dimensional list
 *
 * List returned will be in order
 * @param list List to flatten
 * @returns Flattened list
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3,[4,5]]<br/>
 * flatten = List.flatten(list)</code><br/><br/>
 * Expected value of list is [1,2,3,4,5]
 */
export function flatten(list: any[]): any[] {
    return gs.Arr.flatten(list);
}

/**
 * Removes the item with the specified index number from a list
 * @param list List to remove item from
 * @param index Index number of item to remove
 * @returns List with item removed
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3]<br/>
 * remove = List.removeIndex(list,0)</code><br/><br/>
 * Expected value of list is [2,3]
 */
export function removeIndex(list: any[], index: number): any[] {
    const list2 = list.slice();
    list2.splice(index,1);
    return list2;
}

/**
 * Removes items that match specified value from a list
 *
 * Items must match both the value and type of specified value<br/>
 * Returns original list if no items in list match specified value
 * @param list List to remove item from
 * @param value Value to search for
 * @param remove_all Removes all instances of specified value if true, removes only the first instance if
 *        false
 * @returns List with item removed
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,2,3]<br/>
 * remove = List.removeValue(list,2,true)</code><br/><br/>
 * Expected value of list is [1,3]
 */
export function removeValue(list: any[], value: any, remove_all: boolean): any[] {
    const list2 = list.slice();
    for (let i = list2.length - 1; i >= 0; i--) {
        if (list2[i] === value) {
            list2.splice(i,1);
            if (remove_all === false) {break;}
        }
    }
    return list2;
}

/**
 * Reverses the order of items in an list
 * @param list List to reverse
 * @returns New reversed list
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3]<br/>
 * reverse = List.reverse(list)</code><br/><br/>
 * Expected value of list is [3,2,1]
 */
export function reverse(list: any[]): any[] {
    const list2 = list.slice();
    list2.reverse();
    return list;
}

/**
 * Sorts a list of strings alphabetically
 *
 * If items are not strings, they are treated as strings<br/>
 * Items are sorted according to string Unicode code points (character by character, numbers before upper case
 * alphabets, upper case alphabets before lower case alphabets)
 * @param list List to sort
 * @returns New sorted list
 *
 * <h3>Example: </h3>
 * <code>
 * list = ["1","2","10","Orange","apple"]<br/>
 * sort = List.sortAlpha(list)</code><br/><br/>
 * Expected value of list is ["1","10","2","Orange","apple"]
 */
export function sortAlpha(list: any[]): any[] {
    const list2 = list.slice();
    list2.sort();
    return list2;
}

/**
 * Sorts a list of numbers in ascending order
 *
 * List must contain numbers
 * @param list List to add to
 * @returns New sorted list
 *
 * <h3>Example: </h3>
 * <code>
 * list = [56,6,48]<br/>
 * sort = List.sortNum(list)</code><br/><br/>
 * Expected value of list is [6,48,56]
 */
export function sortNum(list: any[]): any[] {
    const list2 = list.slice();
    list2.sort(function(a, b) {return a - b;} );
    return list2;
}

/**
 * Removes items with index numbers that fall within a range from a list and return them
 *
 * Bottom bound number of range is inclusive, top bound number is exclusive
 * @param list List slice
 * @param min Bottom bound number of range
 * @param max Top bound number of range
 * @returns List of removed items
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3,4,5]<br/>
 * slice = List.slice(list,1,3)</code><br/><br/>
 * Expected value of list is [1,4,5]<br/>
 * Expected value of slice is [2,3]
 */
export function slice(list: any[], min: number, max: number): any[] {
    const list2 = list.slice();
    return list2.slice(min,max);
}

/**
 * Adds and/or removes items to/from a list at a specific point and returns removed items
 *
 * Alters input list<br/>
 * If no items to add are specified, only removes items<br/>
 * If howmany specified as 0, only adds items
 * @param list List to splice
 * @param index Index number of position to add/remove (items added/removed after specified index)
 * @param howmany Number of items to remove
 * @param items Items to add
 * @returns List of removed items
 *
 * <h3>Example: </h3>
 * <code>
 * list = [1,2,3,4,5]<br/>
 * splice = List.slice(list,1,2,[9,0])</code><br/><br/>
 * Expected value of list is [1,2,9,0,5]<br/>
 * Expected value of splice is [3,4]
 */
export function splice(list: any[], index: number, howmany: number, items: any[]): any[] {
    const list2 = list.slice();
    return list2.splice(index, howmany, ...items);
}
