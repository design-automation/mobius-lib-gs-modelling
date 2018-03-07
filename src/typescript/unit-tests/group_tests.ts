import * as gs from "gs-json";
import * as gsm from "../_export_dev";
import {} from "jasmine";

describe("Tests for Group Module", () => {
    it("test_group_getChildren", () => {
        expect( test_group_getChildren() ).toBe(true);
    });
});

export function test_group_getChildren(): boolean {
    const m: gs.IModel = gsm.model.New();
    const points1: gs.IPoint[] = gsm.point.FromXYZs(m, [[1,2,3],[2,2,2],[-1,-2,-33],[1.1,2.2,3.3]]);
    const points2: gs.IPoint[] = gsm.point.FromXYZs(m, [[4,5,6],[2,7,5]]);
    const points3: gs.IPoint[] = gsm.point.FromXYZs(m, [[8,8,8],[6,6,6],[4,4,4]]);

    gsm.group.Create(m, "main");

    gsm.group.Create(m, "grp1");
    gsm.group.setParent(m, "grp1", "main");
    gsm.point.addToGroup(points1, "grp1");

    gsm.group.Create(m, "grp2");
    gsm.group.setParent(m, "grp2", "main");
    gsm.point.addToGroup(points2, "grp2");

    gsm.group.Create(m, "grp3");
    gsm.group.setParent(m, "grp3", "main");
    gsm.point.addToGroup(points3, "grp3");

    const children: string[] = gsm.group.getChildren(m, "main");
    if(children.length !== 3) {return false;}
    if(children[0] !== "grp1") {return false;}
    if(children[1] !== "grp2") {return false;}
    if(children[2] !== "grp3") {return false;}
    return true;
}


