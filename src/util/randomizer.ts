/**
 * Returns a psuedorandom integer between 0 (inclusive) and the range value (exclusive).
 *
 * @param {number} range The upper limit the integer can take.
 * @returns {number} Any number between 0 and the upper limit.
 */
export function randomInt(range: number): number;

/**
 * Returns a psuedorandom integer between the lower limit (inclusive) and the upper limit (exclusive).
 *
 * @param {number} lowerLimit The lower limit the integer can take.
 * @param {number} upperLimit The upper limit the integer can take.
 * @returns {number} Any number between the lower limit and the upper limit.
 */
export function randomInt(lowerLimit: number, upperLimit: number): number;

export function randomInt(num1: number, num2?: number) {
  return num1 + Math.floor(Math.random() * ((num2 ?? 0) - num1));
}


/**
 * Takes in an array then return a random value in that array.
 *
 * @param {any} array The working array of any type.
 * @returns {any} Any one value in the array.
 */
export function randomValueFromArray(array: any[]): any {
  return array[randomInt(array.length)];
}