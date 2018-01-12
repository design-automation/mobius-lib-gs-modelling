import * as gs from "gs-json";
import * as test from "./_three_utils_dev";

//  Query ======================================================================================================
export function test_planesAreCoplanar() {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const O1: gs.IPoint = g.addPoint([0,0,0]);
    const O2: gs.IPoint = g.addPoint([1,0,1]);
    if(!test.planesAreCoplanar(O1,[0,0,1],O1,[0,0,1])) {return false;}
    if(test.planesAreCoplanar(O1,[0,0,1],O2,[0,0,1])) {return false;}
    if(!test.planesAreCoplanar(O1,[0,0,1],O1,[0,1,1])) {return false;}
    return true;
}

export function test_pointIsOnPlane() {
    const m: gs.IModel = new gs.Model();
    const g: gs.IGeom = m.getGeom();
    const O: gs.IPoint = g.addPoint([0,0,0]);
    const normal1: gs.XYZ = [0,0,1];
    const normal2: gs.XYZ = [0,1,0];
    const pt1: gs.IPoint = g.addPoint([1,1,0]);
    if(!test.pointIsOnPlane(O, normal1, pt1)) {return false;}
    if(test.pointIsOnPlane(O, normal2, pt1)) {return false;}
    return true;
}
export function test_vectorsAreCodir() {
    const xyz1: gs.XYZ = [1,0,0];
    const xyz2: gs.XYZ = [4,0,0];
    const xyz3: gs.XYZ = [0,1,0];
    const xyz4: gs.XYZ = [0.0000009,0,0];
    const xyz5: gs.XYZ = [0,0,0];
    if(!test.vectorsAreCodir(xyz1,xyz1)) {return false;}
    if(!test.vectorsAreCodir(xyz1,xyz2)) {return false;}
    if(test.vectorsAreCodir(xyz1,xyz3)) {return false;}
    if(!test.vectorsAreCodir(xyz1,xyz4)) {return false;}
    if(!test.vectorsAreCodir(xyz1,xyz5)) {return false;}
    return true;
}
