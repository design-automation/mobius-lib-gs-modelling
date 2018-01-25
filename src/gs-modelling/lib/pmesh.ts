/**
 * Polymeshes are a type of object.
 *
 * Polymeshes are formed from flat polygons joined to form a continuous surface.
 */

import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";
import * as math_poly from "./_math_poly_dev";

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
export function FromPoints(points: gs.IPoint[][]): gs.IPolymesh {
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

export function FromPline(pline: gs.IPolyline): gs.IPolymesh {
    if (!pline.exists()) {throw new Error("Polyline has been deleted.");}
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
export function offset(pmesh: gs.IPolymesh, distance: number): void {
    if (!pmesh.exists()) {throw new Error("Polyline has been deleted.");}
    const model: gs.IModel = pmesh.getModel();
    const geom: gs.IGeom = model.getGeom();
    // create a map of point -> vertices in this pmesh
    const vertices: gs.IVertex[] = gs.Arr.flatten(pmesh.getVertices(gs.EGeomType.faces));
    const vertices_map: Map<number, gs.IVertex[]> = new Map();
    for (const vertex of vertices) {
        const id: number = vertex.getPoint().getID();
        if (!vertices_map.has(id)) {vertices_map.set(id, []);}
        vertices_map.get(id).push(vertex);
    }
    // move each point
    for (const [point_id, vertices] of vertices_map.entries()) {
        let normal: three.Vector3;
        if (vertices.length ===1) {
            normal = math_poly.getVertexNormal(vertices[0]);
            normal.setLength(distance);
        } else {
            // get the normal mean
            const vertex_normals: three.Vector3[] = [];
            normal = new three.Vector3();
            for (const vertex of vertices) {
                const vertex_normal: three.Vector3 = math_poly.getVertexNormal(vertex);
                vertex_normals.push(vertex_normal);
                normal.add(vertex_normal);
            }
            const angle = normal.angleTo(vertex_normals[0]);
            const len: number = distance / Math.cos(angle);
            normal.setLength(len);
        }
        // set the point position
        const point: gs.IPoint = geom.getPoint(point_id);
        const old_pos: gs.XYZ = point.getPosition();
        const new_pos: gs.XYZ = [old_pos[0] + normal.x, old_pos[1] + normal.y, old_pos[2] + normal.z];
        point.setPosition(new_pos);
    }
}

/**
 * Join a set of polymeshes to form a single polymesh.
 *
 * Returns null if polymeshes do not intersect or touch
 * @param pmeshes List of polymeshes to weld
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
export function join(pmeshes: gs.IPolymesh[]): gs.IPolymesh[] {
    // get the model
    const model: gs.IModel = pmeshes[0].getModel();
    for (const pmesh of pmeshes) {
        if (!pmesh.exists()) {throw new Error("Polyline has been deleted.");}
        if (pmesh.getModel() !== model) {throw new Error("Polymeshes have to be in same model.");}
    }
    // collect the faces together in a points arrtest Circle Planeay
    const mesh_points: gs.IPoint[][] = [];
    for (const pmesh of pmeshes) {
        for (const face of pmesh.getFaces()) {
            const points: gs.IPoint[] = face.getVertices().map((v) => v.getPoint());
            mesh_points.push(points);
        }
    }
    // create a new pmesh
    const new_pmesh: gs.IPolymesh = model.getGeom().addPolymesh(mesh_points);
    // delete old meshes, and keep points
    model.getGeom().delObjs(pmeshes, true);
    // return the new mesh
    // TODO check for disjoint polymeshes
    return [new_pmesh];
}

/**
 * Flips all faces
 * @param pmesh Polymeshes to flipFaces
 * @returns New polymesh created from weld if successful, null if unsuccessful or on error
 */
export function flipFaces(pmesh: gs.IPolymesh): gs.IPolymesh {
    throw new Error("Not implemented exception");
}

/**
 * Thicken ...
 *
 * @param pmesh A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */
export function thicken(pmesh: gs.IPolymesh, dist1: number, dist2: number): gs.IPolymesh {
    if (!pmesh.exists()) {throw new Error("Polyline has been deleted.");}
    const model: gs.IModel = pmesh.getModel();
    const pmesh2: gs.IPolymesh = pmesh.copy() as gs.Polymesh; //Copies the points as well
    //flipFaces(pmesh*-1); // TODO
    offset(pmesh, dist1);
    offset(pmesh2, dist2 * -1); //TODO
    const wires1: gs.IWire[] = pmesh.getWires();
    const wires2: gs.IWire[] = pmesh2.getWires();
    if (wires1.length !== wires2.length) {throw new Error("Error occured while thickening mesh.");}
    const sides: gs.IPolymesh[] = [];
    for (let i = 0; i < wires1.length; i++) {
        const points1 = wires1[i].getVertices().map((v) => v.getPoint());
        const points2 = wires2[i].getVertices().map((v) => v.getPoint());
        if (points1.length !== points2.length) {throw new Error("Error occured while thickening mesh.");}
        points1.push(points1[0]);
        points2.push(points2[0]);
        const mesh_points: gs.IPoint[][] = [];
        for (let j = 0; j < points1.length - 1; j++) {
            mesh_points.push([points1[j], points1[j+1], points2[j+1], points2[j]])
        }
        const side_mesh: gs.IPolymesh = model.getGeom().addPolymesh(mesh_points);
        sides.push(side_mesh);
    }
    return join([pmesh, pmesh2, ...sides])[0];
}

/**
 * Extrude by vector...
 *
 * @param pmesh A polyline to create a polymesh with a single polygon face.
 * @returns A polymesh if successful, null if unsuccessful or on error.
 */
export function extrude(pmesh: gs.IPolymesh, vector: gs.XYZ): gs.IPolymesh {
    throw new Error("not implemented");
}
