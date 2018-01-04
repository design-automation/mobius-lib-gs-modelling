import * as gs from "gs-json";

/**
 * Creates a model containing a torus with two holes.
 * @returns The model.
 */
export function getFromModel(): gs.IModel {
    return gs.genModelTorus();
}
