/**
 * Round the number to 2 decimal places
 * Even a number like 1.5 becomes 1.50
 * source: https://stackoverflow.com/a/12830454
 * @param {number} number
 * @return {string}
 */
export const round = number => number.toFixed(2)

/**
 * Convert pounds into pence. Example: £10 => 1000 pence
 * source: https://stackoverflow.com/a/8388483
 * @param {number} pounds
 * @return {string} pence
 */
export const toPence = pounds => toInt(pounds * 100)

/**
 * Convert a decimal to an integer
 * @param {number} number
 * @return {number} integer
 */
export const toInt = number => parseInt(number, 10)
