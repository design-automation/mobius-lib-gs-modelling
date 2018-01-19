/**
 * Math contains funtions for calculations, analysing numbers and representing numbers like pi and infinty.
 */

import * as gs from "gs-json";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
/**
 * Returns the value of pi
 * @returns Value of pi
 */
export function PI(): number {
    return Math.PI;
}

/**
 * Returns the value of positive infinity
 * @returns Value of positive infinity
 */
export function POS_INFINITY(): number {
    return Number.POSITIVE_INFINITY;
}

/**
 * Returns the value of negative infinity
 * @returns Value of negative infinity
 */
export function NEG_INFINITY(): number {
    return Number.NEGATIVE_INFINITY;
}

//  ===============================================================================================================
//  Math Methods ==================================================================================================
//  ===============================================================================================================

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
/**
 * Returns the cosine of a specified angle in degrees
 * @param angle Angle in degrees
 * @returns Cosine of angle
 */
export function cos(angle: number): number {
    return Math.cos(angle*(180/Math.PI));
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
/**
 * Returns the sine of a specified angle in degrees
 * @param angle Angle in degrees
 * @returns Sine of angle
 */
export function sin(angle: number): number {
    return Math.sin(angle*(180/Math.PI));
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tan
/**
 * Returns the tangent of a specified angle in degrees
 * @param angle Angle in degrees
 * @returns Tangent of angle
 */
export function tan(angle: number): number {
    return Math.tan(angle*(180/Math.PI));
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
/**
 * Returns a number representing the given base taken to the power of the given exponent
 * @param base Base number
 * @param exponent Power of exponent
 * @returns Number representing the given base taken to the power of the given exponent
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.pow(2,3)</code><br/><br/>
 * Expected value of num is 8
 */
export function pow(base: number, exponent: number): number {
    return Math.pow(base, exponent);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
/**
 * Rounds a number up to the nearest integer
 * @param num Number
 * @returns A number representing the smallest integer more than or equal to the specified number
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.ceiling(4.3)</code><br/><br/>
 * Expected value of num is 5
 */
export function ceiling(num: number): number {
    return Math.ceil(num);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
/**
 * Rounds a number down to the nearest integer
 * @param num Number
 * @returns A number representing the largest integer less than or equal to the specified number
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.floor(4.3)</code><br/><br/>
 * Expected value of num is 4
 */
export function floor(num: number): number {
    return Math.floor(num);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
/**
 * Returns the absolute value of a number
 *
 * Returns num if num is positive, -num if num is negative and 0 if num=0<br/>
 * @param num Number
 * @returns A number representing the absolute value of the specified number
 *
 * <h3>Example:</h3>
 * <code>
 * num = Math.abs(-5)</code><br/><br/>
 * Expected value of num is 5
 */
export function abs(num: number): number {
    return Math.abs(num);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
/**
 * Returns the largest number in a list of numbers
 * @param nums List of numbers
 * @returns A number representing the largest number in specified list of numbers
 *
 * <h3>Example:</h3>
 * <code>
 * list = [89,6,1]<br/>
 * num = Math.max(list)</code><br/><br/>
 * Expected value of num is 89
 */
export function max(nums: number[]): number {
    let maximum = Number.NEGATIVE_INFINITY;
    for (const num of nums) {
        if(num > maximum) {
            maximum = num;
        }
    }
    return maximum;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
/**
 * Returns the smallest number in a list of numbers
 * @param num List of numbers
 * @returns A number representing the smallest number in specified list of numbers
 *
 * <h3>Example:</h3>
 * <code>
 * list = [89,6,1]<br/>
 * num = Math.max(list)</code><br/><br/>
 * Expected value of num is 1
 */
export function min(nums: number[]): number {
    let minimum = Number.POSITIVE_INFINITY;
    for (const num of nums) {
        if(num < minimum) {
            minimum = num;
        }
    }
    return minimum;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive)
 *
 * Number can be scaled to apply for a larger range
 * @returns A pseudo-random number
 */
export function rand(): number {
    return Math.random();
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Returns a pseudo-random integer between two numbers
 *
 * Bottom bound number is inclusive and top bound number is exclusive
 * @param bottom_bound Bottom bound number of range
 * @param top_bound Top bound number of range
 * @returns A pseudo-random number
 */
export function randInt(bottom_bound: number, top_bound: number): number {
    const lower = Math.ceil(bottom_bound);
    const upper = Math.floor(top_bound);
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Returns a pseudo-random integer between two numbers
 *
 * Bottom and top bound numbers are inclusive
 * @param bottom_bound Bottom bound number of range
 * @param top_bound Top bound number of range
 * @returns A pseudo-random number
 */
export function randIntInclusive(bottom_bound: number, top_bound: number): number {
    const lower = Math.ceil(bottom_bound);
    const upper = Math.floor(top_bound);
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
