import * as gs from "gs-json";
import * as gsm from "./gs-modelling";

export function test_model_New(): boolean {
    const m: gs.IModel = gsm.model.New();
    if (m === undefined) {return false;}
    return true;
}

export function test_model_Load(): boolean {
    const m: gs.IModel = gsm.model.New();
    if (m === undefined) {return false;}
    m.getGeom().addPoints([[1,2,3],[2,3,4],[3,4,5]]);
    const data: string = m.toJSON();
    const m2: gs.IModel = gsm.model.Load(data);
    if (m2 === undefined) {return false;}
    if (m2.getGeom().numPoints() !== 3) {return false;}
    return true;
}

export function test_model_Save(): boolean {
    const m: gs.IModel = gsm.model.New();
    if (m === undefined) {return false;}
    m.getGeom().addPoints([[1,2,3],[2,3,4],[3,4,5]]);
    gsm.model.Save(m, "file.json");
    return true;
}

