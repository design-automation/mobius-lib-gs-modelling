import * as gs from "gs-json";
/**
 * Creates a new Model.
 */
export function create(data?: gs.IModelData): gs.IModel {
    return new gs.Model(data);
}
