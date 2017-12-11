import * as gs from "../../libs/gs-json/utils/gs-json";
import * as arr from "../../libs/gs-json/utils/arr";
//follows http://developer.rhino3d.com/api/RhinoScriptSyntax/

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObject
export function MoveObject(m: gs.IModel, obj: gs.IObj, translation: number[]):gs.IObj {
    if (obj === undefined) {return null;}
    const points: gs.IPoint[][][] = obj.getPoints();
    const points_flat: gs.IPoint[] = arr.Arr.flatten(points); // TODO flatten=true
    for (const point of points_flat) {
        let xyz: number[] = point.getPosition();
        point.setPosition([xyz[0] + translation[0],
                           xyz[1] + translation[1],
                           xyz[2] + translation[2]]);
    }
    return obj;
}

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObjects

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObject
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObjects

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObject
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObjects

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObject
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObjects

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObject
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObjects

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObject
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObjects

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObject
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObjects

//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectInGroup
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ObjectGroups

// =================================================================================================
//To be added at a later time
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectSolid
//http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectValid
