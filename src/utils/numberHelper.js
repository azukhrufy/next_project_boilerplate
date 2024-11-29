import { isFinite } from 'lodash'

const locale = 'id-ID'

const formatterIDR = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

const formatterUSD = new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

const formatterNumber = new Intl.NumberFormat(locale, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

const formatterPreciseNumber = new Intl.NumberFormat(locale, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 20
})

const formatterCompactNumber = new Intl.NumberFormat(locale, {
  notation: 'compact',
  compactDisplay: 'short'
})

const groupSeparator = new Intl.NumberFormat(locale)
  .format(1111)
  .replace(/1/g, '')
const groupSeparatorRegex = new RegExp(`\\${groupSeparator}`, 'g')
const decimalSeparator = new Intl.NumberFormat(locale)
  .format(1.1)
  .replace(/1/g, '')
const decimalSeparatorRegex = new RegExp(`\\${decimalSeparator}`, 'g')

/**
 * @param {number} number
 * @returns {string}
 */
export function formatIDR(number) {
  return formatterIDR.format(number)
}

/**
 * Formats a number as USD currency.
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted USD currency string.
 */
export function formatUSD(number) {
  return formatterUSD.format(number)
}

/**
 * @param {number} number
 * @returns {string}
 */
export function formatNumber(number) {
  return formatterNumber.format(number)
}

/**
 * @param {number} number
 * @returns {string}
 */
export function formatCompactNumber(number) {
  return formatterCompactNumber.format(number)
}

/**
 * @param {number} number
 * @returns {string}
 */
export function formatPreciseNumber(number) {
  return formatterPreciseNumber.format(number)
}

/**
 * @param {number} number
 * @returns {string}
 */
export function formatPercentage(number) {
  return `${formatNumber(number)}%`
}

/**
 * @param {number} number
 * @param {Function} formatFunction
 * @param {string} [fallback='-']
 * @returns {string}
 */
export function formatOrFallback(number, formatFunction, fallback = '-') {
  return isFinite(number) ? formatFunction(number) : fallback
}

/**
 * Check if a string could be a formatted number
 * Accept misplaced group separator, i.e. 100.00, or 10.0000
 * @param {string} formattedNumber
 * @returns {boolean}
 */
export function isFormattedNumberish(formattedNumber) {
  const decimalSeparatorCount = (
    formattedNumber.match(decimalSeparatorRegex) || []
  ).length
  const isMatchPattern = new RegExp(
    `^[\\d\\${groupSeparator}\\${decimalSeparator}]+[\\d]$`
  )

  return isMatchPattern.test(formattedNumber) && decimalSeparatorCount <= 1
}

/**
 * @param {string} formattedNumber
 * @param {Object} [options={}]
 * @param {boolean} [options.returnNumber=false]
 * @returns {string}
 */
export function parseFormattedNumber(formattedNumber, options = {}) {
  const { returnNumber = false } = options

  if (!isFormattedNumberish(formattedNumber)) return null

  const isFloat = formattedNumber.includes(decimalSeparator)

  let reversedVal = formattedNumber.replace(groupSeparatorRegex, '')
  reversedVal = reversedVal.replace(decimalSeparatorRegex, '.')

  if (!returnNumber) return Number.isNaN(reversedVal) ? null : reversedVal

  return isFloat ? parseFloat(reversedVal) : parseInt(reversedVal)
}
