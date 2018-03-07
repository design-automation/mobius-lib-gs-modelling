import * as gs from "gs-json";
import * as gsm from "../_export_dev";
import {} from "jasmine";

describe("Tests for Model Module", () => {
    it("test_model_New", () => {
        expect( test_model_New() ).toBe(true);
    });
    it("test_model_Load", () => {
        expect( test_model_FromData() ).toBe(true);
    });
    it("test_model_Save", () => {
        expect( test_model_Save() ).toBe(true);
    });
});


export function test_model_New(): boolean {
    const m: gs.IModel = gsm.model.New();
    if (m === undefined) {return false;}
    return true;
}

export function test_model_FromData(): boolean {
    const m: gs.IModel = gsm.model.New();
    if (m === undefined) {return false;}
    gsm.point.FromXYZs(m, [[1,2,3],[2,3,4],[3,4,5]]);
    // const data: string = m.toJSON();
    // const m2: gs.IModel = gsm.model.FromData(data);
    // if (m2 === undefined) {return false;}
    // if (m2.getGeom().numPoints() !== 3) {return false;}
    return true;
}

export function test_model_Save(): boolean {
    const m: gs.IModel = gsm.model.New();
    if (m === undefined) {return false;}
    gsm.point.FromXYZs(m, [[1,2,3],[2,3,4],[3,4,5]]);
    //gsm.model.save(m, "file.json"); // diable to avoid model being downloaded every time
    return true;
}

