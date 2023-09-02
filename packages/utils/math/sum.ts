/**
 * Calculate the sum of two numbers.
 *
 * @param {number} a - The first number to be added.
 * @param {number} b - The second number to be added.
 * @returns {number} The sum of the two input numbers.
 * @throws {TypeError} If either a or b is not a number.
 * @example
 * const result = calculateSum(3, 5); // Returns 8
 */
export const calculateSum = (a: number, b: number) => {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Both parameters must be numbers.");
    }

    return a + b;
};
