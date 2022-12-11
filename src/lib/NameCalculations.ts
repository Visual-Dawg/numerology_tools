import { pipe } from "fp-ts/lib/function"
import * as RA from "fp-ts/lib/ReadonlyArray"
import * as S from "fp-ts/lib/String"
import { words } from "fp-ts-std/String"
import { reduceNumber, sumUpNumbers, sumUpStringedNumbers } from "./Pures"
import type { ICalculatedName } from "#types/Types"

/**
 *
 * @param name
 * @returns
 */
export function calculateName(name: string): ICalculatedName {
  return {
    name,
    expression: calculateExpression(name),
    soulUrge: calculateSouleUrge(name),
    personality: calculatePersonality(name),
  }
}

/**
 * @param name The name to be calculated. Can contain spaces. Currently only latin characters or numbers.
 * @returns The numerological value
 */
function calculateExpression(name: string): number {
  return reduceWords(name)
}

function calculateSouleUrge(name: string) {
  return pipe(name, S.replace(/([^aeiou]+)/gi, ""), reduceWords)
}

function calculatePersonality(name: string) {
  return pipe(name, S.replace(/([^b-df-hj-np-tv-z]+)/gi, ""), reduceWords)
}

/**
 * Get the value of a word without reducing the letters.
 *
 * For example "K" has a value of 11 and it will not get reduced to 2.
 *
 * Then all totals get reduced together.
 * @param word An array of strings without spaces
 * @returns The numerological value of the given strings
 */
function getWordValueWithLettersUnreduced(word: string[]): number {
  const result = word
    .map(getLetterValueUnreduced)
    .reduce(sumUpStringedNumbers, 0)

  return result
}

/**
 *
 * @param letter One letter as a string, can also be a number like "123"
 */
function getLetterValueUnreduced(letter: string): number {
  if (!Number.isNaN(Number(letter))) return Number(letter)

  const result = letter.toLowerCase().codePointAt(0) - 96

  return result
}

/**
 * @example
 * "Hi there" -> [ ["H", "i"] , ["T","h","e","r","e"] ]
 */
function convertWordsToLetterArrays(name: string): readonly string[][] {
  return pipe(
    name,
    words,
    RA.map((word) => [...word])
  )
}

/**
 * Convert some characters to their numerological equivalent (like "ö" to "oe") and remove special characters.
 */
export function cleanUpString(string: string): string {
  return string
    .replace("ß", "ss")
    .replace("ä", "ae")
    .replace("ü", "ue")
    .replace("ö", "oe")
    .replace(/([^\da-z]+)/gi, " ")
}

/**
 * Reduces a string of a word or words like "Foo Bar" to its numerological value.
 * @param string
 * @returns The numerological value
 */
function reduceWords(string: string): number {
  return pipe(
    string,
    convertWordsToLetterArrays,
    RA.map(getWordValueWithLettersUnreduced),
    RA.reduce(0, sumUpNumbers),
    reduceNumber
  )
}
