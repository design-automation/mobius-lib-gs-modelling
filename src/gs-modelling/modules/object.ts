import * as gs from "../../libs/gs-json/utils/gs-json";
import * as arr from "../../libs/gs-json/utils/arr";

/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObject
 */
export function MoveObject(m: gs.IModel, obj: gs.IObj, translation: number[]): gs.IObj {
    if (obj === undefined) {return null;}
    const points: gs.IPoint[] = obj.getPointsArr();
    for (const point of points) {
        const xyz: number[] = point.getPosition();
        point.setPosition([xyz[0] + translation[0],
                           xyz[1] + translation[1],
                           xyz[2] + translation[2]]);
    }
    return obj;
}
/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MoveObjects
 */
export function MoveObjects(m: gs.IModel, objs: gs.IObj[], translation: number[]): gs.IObj[] {
	if (objs === undefined) {return null;}
	for(const obj of objs){
	if (obj === undefined) {return null;}
	const points: gs.IPoint[] = obj.getPointsArr();
	for (const point of points) {
	const xyz: number[] = point.getPosition();
	point.setPosition([xyz[0] + translation[0],
	xyz[1] + translation[1],
	xyz[2] + translation[2]]);
	}
	}
	return objs;
}
/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObject
 */
export function ScaleObject(m: gs.IModel, obj: gs.IObj, scale: number[]): gs.IObj {
    if (obj === undefined) {return null;}
    const points: gs.IPoint[] = obj.getPointsArr();
    for (const point of points) {
        const xyz: number[] = point.getPosition();
        point.setPosition([xyz[0] * scale[0],
                           xyz[1] * scale[1],
                           xyz[2] * scale[2]]);
    }
    return obj;
}
/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObjects
 */
export function ScaleObjects(m: gs.IModel, objs: gs.IObj[], scale: number[]): gs.IObj[] {
	if (objs === undefined) {return null;}
	for(const obj of objs){
    if (obj === undefined) {return null;}
    const points: gs.IPoint[] = obj.getPointsArr();
    for (const point of points) {
        const xyz: number[] = point.getPosition();
        point.setPosition([xyz[0] * scale[0],
                           xyz[1] * scale[1],
                           xyz[2] * scale[2]]);
    }
	}
	return objs;
}
/**
* http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObject
* Rotation angle in Degrees around this axis (Z by default).
* axis = 0 : Z axis
* axis = 1 : X axis
* axis = 2 : Y axis
*/
export function RotateObject(m: gs.IModel, obj: gs.IObj, rotation: number, axis?: number): gs.IObj{
	rotation = rotation * 360 / (2 * Math.PI) ;
    if (obj === undefined) {return null;}
    const points: gs.IPoint[] = obj.getPointsArr();
    for (const point of points) {
        const xyz: number[] = point.getPosition();        
        switch(axis){
                      case 0: point.setPosition([xyz[0] * Math.cos(rotation) - xyz[1] * Math.sin(rotation),
                                                 xyz[0] * Math.sin(rotation) + xyz[1] * Math.cos(rotation),
                                                                                                           xyz[2]]);
                      case 1: point.setPosition([xyz[0] ,
                                                                 xyz[1] * Math.cos(rotation) - xyz[2] * Math.sin(rotation),
                                                                 xyz[1] * Math.sin(rotation) + xyz[2] * Math.cos(rotation) ]);
                      case 2: point.setPosition([xyz[0] * Math.cos(rotation)                 + xyz[2] * Math.sin(rotation),
                                                                               xyz[1],
                                                 - xyz[0] * Math.sin(rotation)               + xyz[2] * Math.cos(rotation) ]);                                        
                      default: point.setPosition([xyz[0] * Math.cos(rotation) - xyz[1] * Math.sin(rotation),
                                                   xyz[0] * Math.sin(rotation) + xyz[1] * Math.cos(rotation),
                                                                                                               xyz[2]]);
                    }
    }
	return obj;
}
/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-RotateObjects
* Rotation angle in Degrees around this axis (Z by default).
* axis = 0 : Z axis
* axis = 1 : X axis
* axis = 2 : Y axis
 */
export function RotateObjects(m: gs.IModel, objs: gs.IObj[], rotation: number,  axis?: number): gs.IObj[]{
	rotation = rotation * 360 / (2 * Math.PI) ;
	if (objs === undefined) {return null;}
	for(const obj of objs){
	if (obj === undefined) {return null;}
    const points: gs.IPoint[] = obj.getPointsArr();
    for (const point of points) {
        const xyz: number[] = point.getPosition();
     switch(axis){
                      case 0: point.setPosition([xyz[0] * Math.cos(rotation) - xyz[1] * Math.sin(rotation),
                                                 xyz[0] * Math.sin(rotation) + xyz[1] * Math.cos(rotation),
                                                                                                           xyz[2]]);
                      case 1: point.setPosition([xyz[0] ,
                                                                 xyz[1] * Math.cos(rotation) - xyz[2] * Math.sin(rotation),
                                                                 xyz[1] * Math.sin(rotation) + xyz[2] * Math.cos(rotation) ]);
                      case 2: point.setPosition([xyz[0] * Math.cos(rotation)                 + xyz[2] * Math.sin(rotation),
                                                                               xyz[1],
                                                 - xyz[0] * Math.sin(rotation)               + xyz[2] * Math.cos(rotation) ]);                                        
                      default: point.setPosition([xyz[0] * Math.cos(rotation) - xyz[1] * Math.sin(rotation),
                                                   xyz[0] * Math.sin(rotation) + xyz[1] * Math.cos(rotation),
                                                                                                               xyz[2]]);
                    }   
    }
	}
	return objs;
}

// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObject
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObjects

// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObject
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObjects

// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObject
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObjects

// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObject
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObjects

// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectInGroup
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ObjectGroups

// =================================================================================================
// To be added at a later time
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectSolid
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectValid
