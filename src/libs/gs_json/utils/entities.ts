export interface IPoint {
	x: number;
	y: number;
	z: number;
}
export interface IPolyline {
	points: IPoint[];
}
export interface IPolygon {
	points: IPoint[];
}
export interface IVect{
    a: IPoint;
    b: IPoint;
}
export interface IVec {
    a: IPoint;
    b: IPoint;
}
export interface IExtrusion{
    Pgon:IPolygon;
    Axis:IVec;
}
export interface IRevolve{
    Pgon:IPolygon;
    Axis:IVec;
}
export interface ILoft{
    Pgons:IPolygon[];
}
export interface ISweap{
    Pgon:IPolygon;
    Pline:IPolyline;
}
