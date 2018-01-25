"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTorus = getTorus;

var _gsJson = require("gs-json");

var gs = _interopRequireWildcard(_gsJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Creates a model containing a torus with two holes.
 * @returns The model.
 */
function getTorus() {
  return gs.genModelTorus();
}
//# sourceMappingURL=examples.js.map
/**
 * These functions call examples for mobius.
 */
/**
 *
 */