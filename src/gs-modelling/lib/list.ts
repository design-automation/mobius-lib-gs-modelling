//  ===============================================================================================================
//  List Constructors =============================================================================================
//  ===============================================================================================================

/**
 * Duplicates a list
 *
 * @param list List to duplicate
 * @returns New duplicated list
 */
export function Copy(items): number {
    throw new Error("Method not implemented");
}

/**
 * Creates a new list of integers between two integers
 *
 * Bottom bound number is inclusive and top bound number is exclusive<br/>
 * @param min Bottom bound integer
 * @param max Top bound integer
 * @returns New list
 */
export function FromRange(min: number, max: number): number {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  List Functions ================================================================================================
//  ===============================================================================================================

/**
 * Returns the number of items in an list
 * @param list List
 * @returns Length of specified list
 */
export function length(list): number {
    throw new Error("Method not implemented");
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
export function append(list, item): number {
    throw new Error("Method not implemented");
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
export function appendFront(list, item): number {
    throw new Error("Method not implemented");
}

/**
 * Adds items (from a list) to the end of an list
 *
 * Items are appended to list individually as seperate items<br/>
 * Alters original input list
 * @param list List to add to
 * @param items List of items to add
 * @returns List with added items
 */
export function extend(list, item): number {
    throw new Error("Method not implemented");
}

/**
 * Adds items (from a list) to the front of an list
 *
 * Items are appended to list individually as seperate items<br/>
 * Alters original input list
 * @param list List to add to
 * @param items List of items to add
 * @returns List with added items
 */
export function extendFront(list, item): number {
    throw new Error("Method not implemented");
}

/**
 * Flattens an n-dimensional list into a one-dimensional list
 *
 * Alters input list<br/>
 * List returned will be in order
 * @param list List to add to
 * @returns Flattened list
 */
export function flatten(list): number {
    throw new Error("Method not implemented");
}

/**
 * Removes the first item that matches specified value from a list
 *
 * Alters input list<br/>
 * Returns null if no item in list matches specified value
 * @param list List
 * @param value Value to search for
 * @returns List with item removed
 */
export function remove(list, value): number {
    throw new Error("Method not implemented");
}

/**
 * Removes the item with the specified index number from a list
 *
 * Alters input list<br/>
 * @param list List
 * @param index Index number of item to remove
 * @returns List with item removed
 */
export function removeIndex(list, index: number): number {
    throw new Error("Method not implemented");
}

/**
 * Reverses the order of items in an list
 * @param list List
 * @returns New reversed list
 */
export function reverse(list): number {
    throw new Error("Method not implemented");
}

/**
 * Sorts items either alphabetically or in ascending order
 *
 * If items are strings, sort alphabetically<br/>
 * If items are numbers, sort in ascending order<br/>
 * @param list List to add to
 * @returns New sorted list
 */
export function sort(list): number {
    throw new Error("Method not implemented");
}
