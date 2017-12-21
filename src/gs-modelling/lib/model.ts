// import * as gs from "gs-json";
import * as gs from "../../../dist/src/libs/gs-json/utils/gs-json";
/**
 * Creates a new Model.
 */
export function create(data?: gs.IModelData): gs.IModel {
    return new gs.Model(data);
}
