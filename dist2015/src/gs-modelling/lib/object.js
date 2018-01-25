"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//  ===============================================================================================================
//  Object Get ====================================================================================================
//  ===============================================================================================================
/**
 * Gets an object from the model
 * @param model Model to get object from
 * @param id ID of object to get
 * @returns An object if successful, null if unsuccessful or on error
 */
function Get(model, id) {
    var obj = model.getGeom().getObj(id);
    if (obj === undefined) {
        return null;
    }
    switch (obj.getObjType()) {
        case 1 /* ray */:
            return obj;
        case 1 /* ray */:
            return obj;
        case 1 /* ray */:
            return obj;
        case 1 /* ray */:
            return obj;
        case 1 /* ray */:
            return obj;
        case 1 /* ray */:
            return obj;
    }
}
//  ===============================================================================================================
//  Object Constructors ===========================================================================================
//  ===============================================================================================================
//  ===============================================================================================================
//  Object Functions ==============================================================================================
//  ===============================================================================================================
//# sourceMappingURL=object.js.map
/**
 * Objects are a type of entity. They consist of conics, polylines, polymeshes, planes and rays.
 *
 * Objects are formed by a combination of topologies. More information can be found on the page for topo.
 */