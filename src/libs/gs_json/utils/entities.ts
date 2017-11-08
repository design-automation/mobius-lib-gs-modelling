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
export interface IVec {
// a Vector is defined by 2 points
    	a: IPoint;
    	b: IPoint;
}
