import * as gs from "gs-json";

//  ===============================================================================================================
//  Attrib Constructors ===========================================================================================
//  ===============================================================================================================

/**
 * Adds an attribute to a model
 * @param model Model to add to
 * @param geom_type Type of geometry to add to
 * @param name Name of new attribute
 * @returns New attribute
 */
export function Create(model: gs.IModel, geom_type: number /*enum TO-DO*/, name: string ): gs.IAttrib {
    throw new Error("Method not implemented");
}

/**
 * Gets attributes that apply for a specified geometry type from a model
 * @param model Model to get attribute from
 * @param name The attribute name
 * @param geom_type Type of geometry to get attribute from
 * @returns List of attributes
 */
export function GetFromModel(model: gs.IModel, name: string, geom_type: number /*enum TO-DO*/ ): gs.IAttrib[] {
    throw new Error("Method not implemented");
}

//  ===============================================================================================================
//  Attrib Functions ==============================================================================================
//  ===============================================================================================================

/**
 * Deletes an attribute
 * @param attrib Attribute to delete
 * @returns True if successful
 */
export function del(attrib: gs.IAttrib): boolean {
    throw new Error("Method not implemented");
}

/**
 * Gets the name of an attribute
 * @param attrib Attribute to get name of
 * @returns Name of specified attribute
 */
export function getName(attrib: gs.IAttrib): string {
    throw new Error("Method not implemented");
}

/**
 * Sets the name of an attribute
 * @param attrib Attribute to set name
 * @param name New name of attribute
 * @returns Old name of specified attribute
 */
export function setName(attrib: gs.IAttrib, name: string ): string {
    throw new Error("Method not implemented");
}

/**
 * Gets the value of an attribute for a specified geometry
 * @param attrib Attribute
 * @param geom Geometry
 * @returns Value of attribute
 */
export function getGeomValue(attrib: gs.IAttrib, geom: gs.IPoint | gs.IObj | gs.ITopo): any {
    throw new Error("Method not implemented");
}

/**
 * Sets the value of an attribute for a specified geometry
 * @param attrib Attribute
 * @param geom Geometry
 * @param value New value of attribute
 * @returns Old value of specified attribute
 */
export function setGeomValue(attrib: gs.IAttrib, geom: gs.IPoint | gs.IObj | gs.ITopo, value: any ): any {
    throw new Error("Method not implemented");
}

