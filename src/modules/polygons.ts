import * as ent from "../libs/gs_json/utils/entities";

export class Pgon {
	public makePolygon(points:ent.IPoint[]):ent.IPolygon {
		//to be implemented, this is just a temporary example
		return {points:points};
	}
	//lots more to come here
}

export class Gen {
    Pgon: IPolygon;
    constructor(Pgon: IPolygon) {
        this.Pgon = Pgon;
    }
    public extrude(Axis: IVec): IExtrusion {
        return {Pgon: this.Pgon, Axis: Axis}
    }
    public revolve(Axis: IVec): IRevolve {
        return {Pgon: this.Pgon, Axis: Axis}
    }
    public sweap(Pline:IPolyline):ISweap{
        return {Pgon:this.Pgon, Pline:Pline}
    }
    public loft(Pgons:IPolygon[]):ILoft{
        return {Pgons:Pgons}
    }
}
