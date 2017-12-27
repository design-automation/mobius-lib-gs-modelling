import * as gs from "gs-json";

//  ===============================================================================================================
//  Ray Constructors ==============================================================================================
//  ===============================================================================================================

/**
 * Creates a ray from an origin point and one point describing its direction
 * @param m Model
 * @param origin 3D point to use as origin of plane
 * @param point Point that lies on direction of ray
 * @returns New ray if successful, none if unsuccessful or on error
 */
export function fromOriginPoint(m: gs.IModel, origin: gs.IPoint, point: gs.IPoint ): gs.IRay {
    throw new Error("Method not implemented");
}

/**
 * Creates a ray from an origin point and one direction vector describing its direction
 * @param m Model
 * @param origin 3D point to use as origin of plane
 * @param vector Direction vector describing direction of ray
 * @returns New ray if successful, none if unsuccessful or on error
 */
export function fromOriginVector(m: gs.IModel, origin: gs.IPoint, vector: [number, number, number]): gs.IRay {
    throw new Error("Method not implemented");
}
