/**
 * Polymeshes are a type of object.
 *
 * Polymeshes are formed from flat polygons joined to form a continuous surface.
 */

import * as gs from "gs-json";

//  ===============================================================================================================
//  Pmesh Get =====================================================================================================
//  ===============================================================================================================

/**
 * Gets a polymesh from the model based on an index number
 * @param model Model to get polymesh from
 * @param id Index number of polymesh
 * @returns Polymesh object if successful
 */
export function Get(model: gs.IModel, id: number): gs.IPolymesh {
    const obj: gs.IObj = model.getGeom().getObj(id);
    if (obj === undefined) {return null; }
    if (obj.getObjType() !== gs.EObjType.polymesh) {
        throw new Error("Object is not a polymesh. Object type is: " + obj.getObjType());
    }
    return obj as gs.IPolymesh;
}

//  ===============================================================================================================
//  Pmesh Constructors ============================================================================================
//  ===============================================================================================================

/**
 * Creates a polymesh from face corner points.
 *
 * List of points, assumed to be in order.
 * @param points List of lists of face corner points.
 * @returns New polymesh with a single face if successful, null if unsuccessful or on error
 */
function FromPoints(points: gs.IPoint[][]): gs.IPolymesh {
    if (points.length === 0 || points[0].length === 0)  {throw new Error("Not enough points specified.");}
    const model: gs.IModel = points[0][0].getModel();
    for (const face_points of points) {
        if (face_points.length < 3) {throw new Error("Each face must have at least three points.");}
        for (const point of face_points) {
            if  (point.getModel() !== model) {
                throw new Error("All points must be in the same model.");
            }
            if (!point.exists()) {
                throw new Error("Point has been deleted.");
            }
        }
    }
    return model.getGeom().addPolymesh(points);
}

/**
 * Creates ...
 *
 * @param pline A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */

function FromPline(pline: gs.IPolyline): gs.IPolymesh {
    const model: gs.IModel = pline.getModel();
    return model.getGeom().addPolymesh([pline.getPointsArr()]);
}

//  ===============================================================================================================
//  Pmesh Functions ===============================================================================================
//  ===============================================================================================================

/**
 * Offsets a polymesh along its normal by a specified distance
 *
 * Each face is moved by specified distance in the direction of its normal and rejoined (extended or
 * trimmed to fit) to create a new surface
 * @param pmesh Polymesh object
 * @param distance Distance to offset polymesh
 * @returns New offset polymesh if successful
 */
export function offset(pmesh: gs.IPolymesh, distance: number): gs.IPolymesh {
    throw new Error("Not implemented");
}

/**
 * Weld a list of polymeshes together
 *
 * Joins polymeshes together and returns a single polymesh<br/>
 * Returns null if polymeshes do not intersect or touch
 * @param pmeshes List of polymeshes to weld
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
export function weld(pmeshes: gs.IPolymesh[]): gs.IPolymesh {
    throw new Error("Method not implemented");
}

/**
 * Thicken ...
 *
 * @param pmesh A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */
function thicken(pmesh: gs.IPolymesh, dist1: number, dist2: number): gs.IPolymesh {
    const model: gs.IModel = pmesh.getModel();
    const pmesh1: gs.IPolymesh = offset(pmesh, dist1);
    const pmesh2: gs.IPolymesh = offset(pmesh, dist1);
    const wires1: gs.IWire[] = pmesh1.getWires();
    const wires2: gs.IWire[] = pmesh2.getWires();
    if (wires1.length !== wires2.length) {throw new Error("Error occured while thickening mesh.");}
    const sides: gs.IPolymesh[] = [];
    for (let i = 0; i < wires1.length; i++) {
        const points1 = wires1[i].getVertices().map((v) => v.getPoint());
        const points2 = wires2[i].getVertices().map((v) => v.getPoint());
        if (points1.length !== points2.length) {throw new Error("Error occured while thickening mesh.");}
        const mesh_points: gs.IPoint[][] = [];
        for (let j = 0; j < points1.length; j++) {
            //TODO add points to mesh
        }
        const side_mesh: gs.IPolymesh = model.getGeom().addPolymesh(mesh_points);
        sides.push(side_mesh);
    }
    return weld([pmesh1, pmesh2, ...sides]);
}
