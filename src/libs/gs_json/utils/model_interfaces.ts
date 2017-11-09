//model_interfaces
// ========================= ENUMS =========================
export enum EAttributeType {
    points,   // = "points",
    vertices, // = "vertices",
    edges,    // = "edges",
    wires,    // = "wires",
    faces,    // = "faces",
    shells,   // = "shells"
}
export enum EDataType {
    type_string,        // = "string",
    type_number,        // = "number",
    type_boolean,       // = "boolean",
    type_string_array,  // = "string[]",
    type_number_array,  // = "number[]",
    type_boolean_array, // = "boolean[]"
}
export enum EEntityType {
    polyline = 100,
    polymesh = 200
}
export enum ECollectionType {  //not too sure about this enum
    root,
    leaf
}
// ========================= INTERFACES for gsJSON data =========================
export interface IgsMetadata {
    filetype: "mobius";
    version: number;
    crs: any;
    location: string;
}
export interface IgsAttributeData {
    name: string;
    attribute_type: "points" | "vertices" | "edges" | "wires" | "faces" | "shells"; //enum not working
    data_type: "string"|"number"|"boolean"|"string[]"|"number[]"|"boolean[]"; //enum not working
    values: any[];
    map: (number|number[]|number[][])[];
}
export interface IgsCollectionData {
    name: string;
    entities?: any[];
    collections?: string[];
    properties?: { key: string, value: any };
}
export interface IgsSkinData {
    images: string[];
    textures: string[];
    materials: any[];
}
export interface IgsData {
    metadata: IgsMetadata;
    geometry?: any[];
    attributes?: IgsAttributeData[];
    collections?: IgsCollectionData[];
    skins?: IgsSkinData[];
}
// ========================= INTERFACES for classes =========================
// interface for main model
export interface IgsModel {
    //Creation
    createPoint(xyz:number[]):IPoint;
    createPolyline(wire_points:IPoint[]):IEntity;
    createPolymesh(wire_points:IPoint[], face_points:IFace[]):IEntity;
    //Points
    getPointIDs(num_vertices?:number):number[];
    getPoint(point_id:number):IPoint;
    addPoint(point:IPoint):boolean;
    deletePoint(point_id:number):boolean;
    deletePoints(point_ids:number[]):boolean;
    //Entities
    getEntitieIDs(entity_type?:EEntityType):number[];
    getEntity(entity_id:number):IEntity;
    addEntity(entity: IEntity):boolean;
    deleteEntity(entity_id:number):boolean;
    deleteEntities(entity_ids:number[]):boolean;
    //Components
    getVertices(entity_type?:EEntityType):IVertex[];
    getEdges(entity_type?:EEntityType):IEdge[];
    getWires(entity_type?:EEntityType):IWire[];
    getFaces(entity_type?:EEntityType):IFace[];
    getShells(entity_type?:EEntityType):IShell[];
    //Attributes
    getAttributes(attribute_type?:EAttributeType):IAttribute[];
    getAttribute(name:string):IAttribute;
    addAttribute(name:string, attribute_type:EAttributeType, data_type:EDataType):IAttribute;
    deleteAttribute(attribute:IAttribute):boolean;
    //Collections
    getCollections(collection_type?:ECollectionType):ICollection[];
    getCollection(name:string):ICollection;
    addCollection(name:string):ICollection;
    deleteCollection(collection:ICollection):boolean;
    //Clean up nulls and unused points
    purgePoints():number;
    purgeNulls():number;
    //Runs some check
    validateModel():boolean;
}
//interfaces for topological components
export interface IComponent {
    getEntity():IEntity;
    getID():number;
    getPath():IComponentPath;
    getAttributes():IAttribute[];
    setAttributeValue(attribute:IAttribute | string, value:any):any;//TODO, name or attribute
    getAttributeValue(attribute:IAttribute | string):any;//TODO, name or attribute
    getCollections():ICollection[];
}
export interface IVertex extends IComponent {
    getPoint(): IPoint;
    next():IVertex;
    previous():IVertex;
}
export interface IEdge extends IComponent {
    getVertices(): IVertex[];
    next():IEdge;
    previous():IEdge;
}
export interface IWire extends IComponent {
    getVertices():IVertex[];
    getEdges(): IEdge[];
}
export interface IFace extends IComponent {
    getVertices():IVertex[];
    getEdges(): IEdge[];
}
export interface IShell extends IComponent {
    getWires(): IWire[];
    getFaces(): IFace[];
}
//interfaces for geometric entities
export interface IPoint {
    getID():number;
    getPosition():number[];
    setPosition(xyz:number[]):number[];
}
export interface IEntity {
    getID():number;
    getVertices():IVertex[];
    getEdges():IEdge[];
    getWires():IWire[];
    getFaces():IFace[];
    getShells():IShell[];
    getType():EEntityType;
    isPolyline():boolean;
    isPolymesh():boolean;
}
export interface IPolyline  extends IEntity {
}
export interface IPolymesh extends IEntity {
}
// interfcae for attributes
export interface IAttribute {
    getID():number;
    getName():string;
    setName(name:string):string;
    getAttributeType():EAttributeType;
    getDataType():EDataType;
}
//interface for property
export interface IProperty {
    getName():string;
    setName(name:string):string;
    getValue():any;
    setValue(value:any):any;
}
//interface for collection
export interface ICollection {
    getID():number;
    getName():string;
    setName(name:string):string;
    //Collections
    getParentCollections():ICollection[];
    getChildCollections():ICollection[];
    addChildCollection(collection:ICollection):boolean;
    removeChildCollection(collection:ICollection):boolean;
    //Entities
    getEntitieIDs(entity_type?:EEntityType):number[];
    addEntity(entity_id:number):boolean;
    addEntities(entity_ids:number[]):boolean;
    removeEntity(entity_id:number):boolean;
    removeEntities(entity_ids:number[]):boolean;
    //Properties
    addProperty(property:IProperty):boolean;
    deleteProperty(property:IProperty):boolean;
    getPropeties():IProperty[];
    //Type
    getCollectionType():ECollectionType;
}
// interface for component path
export interface IComponentPath {
    component_type:0|1; //wires or faces
    component_number:number; //wire or face number
    sub_component_number:number; //vertex or edge number
}