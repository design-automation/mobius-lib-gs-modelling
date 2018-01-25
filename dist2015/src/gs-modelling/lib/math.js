"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PI = PI;
exports.POS_INF = POS_INF;
exports.NEG_INF = NEG_INF;
exports.cos = cos;
exports.sin = sin;
exports.tan = tan;
exports.pow = pow;
exports.ceiling = ceiling;
exports.floor = floor;
exports.abs = abs;
exports.max = max;
exports.min = min;
exports.rand = rand;
exports.randInt = randInt;
exports.randFloat = randFloat;
/**
 * The <i>Math</i> module provides commonly used mathematical functions.
 * It also provides functions that return a number of constants such as PI and positive and negative infinity.
 */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
/**
 * Returns the value of PI.
 * @returns Value of pi
 */
function PI() {
    return Math.PI;
}
/**
 * Returns the value of positive infinity
 * @returns Value of positive infinity
 */
function POS_INF() {
    return Number.POSITIVE_INFINITY;
}
/**
 * Returns the value of negative infinity
 * @returns Value of negative infinity
 */
function NEG_INF() {
    return Number.NEGATIVE_INFINITY;
}
//  ===============================================================================================================
//  Math Methods ==================================================================================================
//  ===============================================================================================================
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
/**
 * Returns the cosine of a specified angle in degrees.
 *
 * @param angle Angle in degrees.
 * @returns Cosine of angle.
 */
function cos(angle) {
    if (angle === undefined) {
        throw new Error("Invalid arg: angle must be defined.");
    }
    return Math.cos(angle * (Math.PI / 180));
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
/**
 * Returns the sine of a specified angle in degrees.
 *
 * @param angle Angle in degrees.
 * @returns Sine of angle.
 */
function sin(angle) {
    if (angle === undefined) {
        throw new Error("Invalid arg: angle must be defined.");
    }
    return Math.sin(angle * (Math.PI / 180));
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tan
/**
 * Returns the tangent of a specified angle in degrees.
 *
 * @param angle Angle in degrees.
 * @returns Tangent of angle.
 */
function tan(angle) {
    if (angle === undefined) {
        throw new Error("Invalid arg: angle must be defined.");
    }
    return Math.tan(angle * (Math.PI / 180));
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
/**
 * Returns a number representing the given base taken to the power of the given exponent.
 *
 * @param base Base number.
 * @param exponent Power of exponent.
 * @returns Number representing the given base taken to the power of the given exponent.
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.pow(2,3)</code><br/><br/>
 * Expected value of num is 8.
 */
function pow(base, exponent) {
    if (base === undefined) {
        throw new Error("Invalid arg: base must be defined.");
    }
    if (exponent === undefined) {
        throw new Error("Invalid arg: exponent must be defined.");
    }
    return Math.pow(base, exponent);
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
/**
 * Rounds a number up to the nearest integer.
 *
 * @param num Number.
 * @returns A number representing the smallest integer more than or equal to the specified number.
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.ceiling(4.3)</code><br/><br/>
 * Expected value of num is 5.
 */
function ceiling(num) {
    if (num === undefined) {
        throw new Error("Invalid arg: num must be defined.");
    }
    return Math.ceil(num);
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
/**
 * Rounds a number down to the nearest integer.
 *
 * @param num Number.
 * @returns A number representing the largest integer less than or equal to the specified number.
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.floor(4.3)</code><br/><br/>
 * Expected value of num is 4.
 */
function floor(num) {
    if (num === undefined) {
        throw new Error("Invalid arg: num must be defined.");
    }
    return Math.floor(num);
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
/**
 * Returns the absolute value of a number.
 *
 * Returns num if num is positive, -num if num is negative and 0 if num=0<br/>
 *
 * @param num Number.
 * @returns A number representing the absolute value of the specified number.
 *
 * <h3>Example:</h3>
 * <code>
 * num1 = Math.abs(-1.234)
 * num2 = Math.abs(2.345)<br/>
 * </code><br/><br/>
 * Expected value of num1 is 1.234, and of num2 is 2.345.
 */
function abs(num) {
    if (num === undefined) {
        throw new Error("Invalid arg: num must be defined.");
    }
    return Math.abs(num);
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
/**
 * Returns the largest number in a list of numbers.
 *
 * @param nums List of numbers.
 * @returns A number representing the largest number in specified list of numbers.
 *
 * <h3>Example:</h3>
 * <code>
 * list = [8,9,6,1,3]<br/>
 * num = Math.max(list)</code><br/><br/>
 * Expected value of num is 9.
 */
function max(nums) {
    if (nums === undefined) {
        throw new Error("Invalid arg: nums must be defined.");
    }
    var maximum = Number.NEGATIVE_INFINITY;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = nums[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var num = _step.value;

            if (num > maximum) {
                maximum = num;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return maximum;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
/**
 * Returns the smallest number in a list of numbers.
 *
 * @param num List of numbers.
 * @returns A number representing the smallest number in specified list of numbers.
 *
 * <h3>Example:</h3>
 * <code>
 * list = [8,9,6,1,3]<br/>
 * num = Math.max(list)</code><br/><br/>
 * Expected value of num is 1.
 */
function min(nums) {
    if (nums === undefined) {
        throw new Error("Invalid arg: nums must be defined.");
    }
    var minimum = Number.POSITIVE_INFINITY;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = nums[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var num = _step2.value;

            if (num < minimum) {
                minimum = num;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return minimum;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).
 *
 * @returns A pseudo-random number.
 */
function rand() {
    return Math.random();
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Returns a pseudo-random integer number between two numbers.
 *
 * Lower bound number is inclusive and upper bound number is exclusive.
 * @param min Lower bound of range.
 * @param max Upper bound of range.
 * @returns A pseudo-random integer number.
 */
function randInt(min, max) {
    if (min === undefined) {
        throw new Error("Invalid arg: min must be defined.");
    }
    if (max === undefined) {
        throw new Error("Invalid arg: max must be defined.");
    }
    var lower = Math.ceil(min);
    var upper = Math.floor(max);
    return Math.floor(Math.random() * (upper - lower)) + lower;
}
/**
 * Returns a pseudo-random floating point number between two numbers.
 *
 * @param min Lower bound of range.
 * @param max Upper bound of range.
 * @returns A pseudo-random floating point number.
 */
function randFloat(min, max) {
    if (min === undefined) {
        throw new Error("Invalid arg: min must be defined.");
    }
    if (max === undefined) {
        throw new Error("Invalid arg: max must be defined.");
    }
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=math.js.map