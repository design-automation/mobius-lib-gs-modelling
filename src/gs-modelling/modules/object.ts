import * as gs from "gs-json";
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
 * Scaling an object corresponds to modifying its underlying points according
 * to an origin and a scale factor. The function is designed such as any origin point of
 * the 3D space can be selected, even if the origin coincides with an object point.
 */
export function ScaleObject(m: gs.IModel, obj: gs.IObj, origin: number[], scale: number): gs.IObj {
    if (obj === undefined) {return null;}
    const points: gs.IPoint[] = obj.getPointsArr();
    for (const point of points) {
        const xyz: number[] = point.getPosition();
        const unit_vector: number[] = [];
        if( !(Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) === 0) ){
        unit_vector[0] = (xyz[0] - origin[0]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        unit_vector[1] = (xyz[1] - origin[1]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        unit_vector[2] = (xyz[2] - origin[2]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        point.setPosition([xyz[0] + scale * unit_vector[0],
                           xyz[1] + scale * unit_vector[1],
                           xyz[2] + scale * unit_vector[2]]);
        }
    }
    return obj;
}
/**
 * http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ScaleObjects
 * Scaling objects corresponds to modifying its underlying points according
 * to an origin and a scale factor. The function is designed such as any origin point of
 * the 3D space can be selected, even if the origin coincides with a point which belongs to the cloud of points
 * induced by objects.
 */
export function ScaleObjects(m: gs.IModel, objs: gs.IObj[], origin: number[], scale: number): gs.IObj[] {
	if (objs === undefined) {return null;}
	for(const obj of objs){
    if (obj === undefined) {return null;}
    const points: gs.IPoint[] = obj.getPointsArr();
    for (const point of points) {
        const xyz: number[] = point.getPosition();
        const unit_vector: number[] = [];
        if( !(Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) === 0) ){
        unit_vector[0] = (xyz[0] - origin[0]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        unit_vector[1] = (xyz[1] - origin[1]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        unit_vector[2] = (xyz[2] - origin[2]) / Math.sqrt( Math.pow(xyz[0] - origin[0],2) + Math.pow(xyz[1] - origin[1],2) + Math.pow(xyz[2] - origin[2],2) ) ;
        point.setPosition([xyz[0] + scale * unit_vector[0],
                           xyz[1] + scale * unit_vector[1],
                           xyz[2] + scale * unit_vector[2]]);
    }
	}
	return objs;
}
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
/**
* http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObject
* This function is called Mirror Object and corresponds to 
*
*/
export function MirrorObject(m: gs.IModel, obj: gs.IObj): gs.IObj {
  return obj;
}
/**
* http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-MirrorObjects
* This function is called Mirror Object and corresponds to 
*
*/
export function MirrorObjects(m: gs.IModel, objs: gs.IObj[]): gs.IObj[] {
  return objs;
}

// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObject
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-TransformObjects

/**
* http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObject
* This function is a deletion function aimed at deleting a selected object from
* a model's geometry. Two options are featured, namely keeping the points of the
* selected object or unkeeping.
*/
export function DeleteObject(m: gs.IModel, obj: gs.IObj, keep_points: boolean): boolean{
  if(obj === undefined){return false;}
  if(obj.getID() === undefined){return false;}
  m.getGeom().delObj(obj.getID(), keep_points);
  return true;
}
/**
* http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-DeleteObjects
* This function is a deletion function aimed at deleting a set of selected objects from
* a model's geometry. Two options are featured, namely keeping the points of the
* selected object or unkeeping.
*/
export function DeleteObjects(m: gs.IModel, objs: gs.IObj[], keep_points: boolean): boolean{
  if(objs === undefined){return false;} 
      for(const obj of objs){
          if(obj.getID() === undefined){return false;}
          m.getGeom().delObj(obj.getID(), keep_points);
                              }
  return true;
}
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObject
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-CopyObjects

/**
* http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectInGroup
*
*/
export function IsObjectInGroup(m: gs.IModel, obj: gs.IObj, group: gs.IGroup): boolean {
  if(obj === undefined){return false;}
  if(obj.getID() === undefined){throw new Error("Undefined object");}
  return group.hasObj(obj.getID()) ;
}
/**
* http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-ObjectGroups
* If an object is present in all groups, the function returns True.
*/
export function ObjectGroups(m: gs.IModel, obj: gs.IObj, groups: gs.IGroup[]): boolean {
  if(obj === undefined){return false;}
  if(obj.getID() === undefined){throw new Error("Undefined object");}
  const objGps: boolean = true ;
  for(const group of groups){
  if(!(objGps === true)){return false}
  objGps === group.hasObj(obj.getID());
                            }
  return true;
}






// =================================================================================================
// To be added at a later time
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectSolid
// http://developer.rhino3d.com/api/RhinoScriptSyntax/#object-IsObjectValid
