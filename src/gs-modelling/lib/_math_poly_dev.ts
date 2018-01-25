import * as gs from "gs-json";
import * as three from "three";
import * as threex from "./_three_utils_dev";

const EPS: number = 1e-6;

/**
 * Get a normal from a face vertex
 */
export function getVertexNormal(vertex: gs.IVertex): three.Vector3 {
    let next: gs.IVertex = vertex.next();
    let prev: gs.IVertex = vertex.previous();
    let vector_next: three.Vector3 = threex.vectorFromVerticesAtoB(vertex, next);
    let vector_prev: three.Vector3 = threex.vectorFromVerticesAtoB(vertex, prev);
    let normal: three.Vector3 = threex.crossVectors(vector_next, vector_prev);
    //console.log("normal", normal.lengthSq());
    if (normal.lengthSq() > EPS) {return normal;} //TODO normal length looks big
    // this will be executed for degenerate cases, e.g. colinear points

    for (let i = 0; i < vertex.getWireOrFace().numVertices() - 2; i++) {
        if (vector_prev.lengthSq() < EPS) {
            prev = prev.previous();
            vector_prev = threex.vectorFromVerticesAtoB(vertex, prev);
        }
        next = next.next();
        vector_next = threex.vectorFromVerticesAtoB(vertex, next);
        normal = threex.crossVectors(vector_next, vector_prev);
        if (normal.lengthSq() > EPS) {return normal;}
    }
    throw new Error("Failed to get normal from face.");
}

// /**
//  * Get center as avg of points
//  */
// export function getFaceCentroid(points: three.Vector3[]): three.Vector3 {
//     const centroid: three.Vector3 = new three.Vector3();
//     for (const v of points) {
//         centroid.add(v);
//     }
//     centroid.divideScalar(points.length);
//     return centroid;
// }

// /**
//  * Get three orthogonal vectors for the face, x and y parallel to the face, z perpendicular
//  * Note that the face may not be planar
//  */
// export function getFaceXYZVectors(points: three.Vector3[]): three.Vector3[] {
//     let vx: three.Vector3;
//     let vz: three.Vector3;
//     let got_vx = false;
//     for (let i=1;i<points.length;i++) {
//         if (!got_vx) {
//             vx =  threex.subVectors(points[i], points[0]);
//             if (vx.lengthSq() > EPS) {
//                 vx.normalize();
//                 got_vx = true;
//             }
//         } else {
//             vz = threex.crossVectors(vx, threex.subVectors(points[i],points[0]));
//             if (vz.lengthSq() > EPS) {
//                 vz.normalize();
//                 break;
//             }
//         }
//         if (i === points.length - 1) {throw new Error("Trinagulation found bad face.");}
//     }
//     const vy: three.Vector3 =  threex.crossVectors(vz, vx);
//     return [vx, vy, vz];
// }

// /**
//  * Get normals for each face vertex.
//  * Note that the face may not be planar.
//  * For vertices that are colinear, the face normal is assigned.
//  */
// export function getFaceVertexNormals(points: three.Vector3[]): three.Vector3[] {
//     const normals: three.Vector3[] = [];
//     let counter = 0;
//     const face_normal: three.Vector3 = new three.Vector3();
//     for (let i=0;i<points.length - 2;i++) {
//         const a: three.Vector3 = threex.subVectors(points[i], points[i+1]);
//         const b: three.Vector3 = threex.subVectors(points[i+2], points[i+1]);
//         if (a.lengthSq() > EPS && b.lengthSq() > EPS) {
//             const normal = threex.crossVectors(a, b);
//             if (normal.lengthSq() > EPS) {
//                 normal.normalize();
//                 normals[i] = normal; //sparse array
//                 face_normal.add(normal);
//                 counter++;
//             }
//         }
//     }
//     // fill in missing gaps in sparse array  due to colinear points
//     face_normal.divideScalar(counter).normalize();
//     for (let i=0;i<points.length - 2;i++) {
//         if (normals[i] === undefined) {
//             normals[i] = face_normal;
//         }
//     }
//     return normals;
// }

// /**
//  *
//  */
// export function stretchVectorForOffset(vec: three.Vector3, dist: number, normal: three.Vector3): three.Vector3 {
//     const angle: number = vec.angleTo(normal);
//     return vec.setLength(dist / Math.cos(angle));
// }

// /**
//  * Get face matrix
//  */
// export function getFaceMatrix(points: three.Vector3[]): three.Matrix4 {
//     const face_vecs: three.Vector3[] = getFaceXYZVectors(points);
//     return threex.xformMatrix(points[0], face_vecs[0], face_vecs[1]);
// }

// /**
//  * Check if face is planar
//  */
// export function isFacePlanar(points: three.Vector3[]): boolean {
//     const m: three.Matrix4 = getFaceMatrix(points);
//     for (const point of points) {
//         if (threex.multVectorMatrix(point,m).z > EPS) {
//             return false;
//         }
//     }
//     return true;
// }

// /**
//  * Xform face with matrix
//  */
// export function xformDFace(points: three.Vector3[], matrix: three.Matrix4): three.Vector3[] {
//     const points_2d: three.Vector3[] = points.map((v) => threex.multVectorMatrix(v,matrix));
//     return points_2d;
// }


