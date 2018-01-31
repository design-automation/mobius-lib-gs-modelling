/**
 * Objects are a type of entity. They consist of conics, polylines, polymeshes, planes and rays.
 *
 * Objects are formed by a combination of topologies. More information can be found on the page for topo.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Error messages for end users ====================================================================================================
//  ===============================================================================================================


//

export function objNotExist():void {
    throw new Error("Error: Object does not exist. It was probably deleted.");
}

export function pointNotExist():void {
    throw new Error("Error: Point does not exist. It was probably deleted.");
}

export function objInOtherModel():void {
    throw new Error("Error: Object is in a different model.");
}

export function pointInOtherModel():void {
    throw new Error("Error: Point is in a different model.");
}

export function objListEmpty():void {
    throw new Error("Error: The list of objects was empty.");
}

export function pointListEmpty():void {
    throw new Error("Error: The list of points was empty.");
}

export function mustBeObjList():void {
    throw new Error("Error: A list of objects must be given.");
}

export function mustBePointList():void {
    throw new Error("Error: A list of points must be given.");
}

// IDs

export function invalidID():void {
    throw new Error("Error: The ID is invalid. It must be an integer number.");
}

export function mustBeIDList():void {
    throw new Error("Error: A list of IDs must be given.");
}


// GROUPS

export function groupNotExist():void {
    throw new Error("Error: Group does not exist.");
}
