import * as gs from "gs-json";


/**
 * Add geometry to a group
 *
 * Returns null if objects is already present in group
 * @param group Group to add to
 * @param geom Geometry to add, can be IPoint, IObj, or ITopo
 * @returns True if successful, null if unsuccessful or on error
 */
export function addGeom(group: gs.IGroup, geom: gs.IPoint | gs.IObj | gs.ITopo): boolean {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.addPoint(geom as gs.IPoint);
        case gs.EGeomType.objs:
            return group.addObj(geom as gs.IObj);
        default:
            //return group.addTopo(geom as gs.ITopo); TODO
    }
}

/**
 * Remove geometry from a group
 *
 * Returns null if specified geometry cannot be found in specified group
 * @param group Group
 * @param geom Geometry to remove,  can be IPoint, IObj, or ITopo
 * @returns True if successful, null if unsuccessfull or on error
 */
export function removeGeom(group: gs.IGroup, geom: gs.IPoint | gs.IObj | gs.ITopo): boolean {
    switch (geom.getGeomType()) {
        case gs.EGeomType.points:
            return group.removePoint(geom as gs.IPoint);
        case gs.EGeomType.objs:
            return group.removeObj(geom as gs.IObj);
        default:
            //return group.removeTopo(geom as gs.ITopo); TODO
    }
}
