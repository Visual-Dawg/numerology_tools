import { MASTER_NUMBERS } from "./Consts"

/**
 *
 * @param name The name to be calculated. Can contain spaces. Currently only latin characters or numbers (we see you Elon)
 * @returns The numerological value
 */
export function calculateName(name: string): number {
	const words = name
		.toLowerCase()
		.split(" ") // Split the string into words
		.map((word) => word.split("")) // Split the words into letters, creating arrays in an array

	const unreducedTotal = words
		.map(getWordValueWithLettersUnreduced)
		.reduce(sumUpNumbers)

	return reduceNumber(unreducedTotal)
}

/**
 *
 * @param word A string without spaces
 * @returns The numerological value
 */
function getWordValueWithLettersUnreduced(word: string[]): number {
	const result = word
		.map(getLetterValueUnreduced)
		.reduce(sumUpStringsAsNumber, 0)

	return result
}

/**
 *
 * @param letter One letter as a string, can also be a number like "123"
 */
function getLetterValueUnreduced(letter: string): number {
	if (!Number.isNaN(Number(letter))) return Number(letter)

	const result = letter.toLowerCase().charCodeAt(0) - 96

	return result
}

function reduceNumber(number: number): number {
	if (Number.isNaN(number)) throw new Error(`Invalid number: ${number}`)

	if ((MASTER_NUMBERS as readonly number[]).includes(number)) return number

	if (String(number).length > 1) {
		const added = String(number).split("").reduce(sumUpStringsAsNumber, 0)
		return reduceNumber(added)
	}

	return number
}

/**
 * To be used with `.reduce`
 * @param total  The total of the summed values
 * @param letterToAdd The current letter or number as string to be added to the result
 */
function sumUpStringsAsNumber(total: number, letterToAdd: string | number) {
	return total + Number(letterToAdd)
}

/**
 * To be used with `.reduce`
 * @param total  The total to be added to
 * @param numberToAdd The number to be added to the result
 * @returns The total of the summed values
 */
function sumUpNumbers(total: number, numberToAdd: number) {
	return total + numberToAdd
}
