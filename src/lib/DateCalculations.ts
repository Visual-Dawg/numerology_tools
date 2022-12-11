import { pipe } from "fp-ts/lib/function.js"
import { map, reduce } from "fp-ts/lib/ReadonlyNonEmptyArray.js"

import { reduceNumber, sumUpNumbers } from "./Pures.js"

import type { ICalculatedDate } from "#types/Types"

export function calculateDate(date: Date): ICalculatedDate {
  return {
    date,
    lifePath: calculateLifepath(date),
    attitude: calculateAttitude(date),
    generation: calculateGeneration(date),
    dayOfBirth: calculateDayOfBirth(date),
  }
}

function calculateLifepath(date: Date): number {
  return reduceNumbers(getYearMontAndhDay(date))
}

function calculateAttitude(date: Date): number {
  return reduceNumbers(getMonthAndDay(date))
}

function calculateGeneration(date: Date): number {
  return reduceNumber(date.getFullYear())
}

/**
 * Calculate the numerological number of the day of birth
 */
function calculateDayOfBirth(date: Date): number {
  return reduceNumber(date.getDate())
}

/**
 * Takes an array of numbers, reduces each of them, then redcuses their total.
 */
function reduceNumbers(numbers: readonly number[]): number {
  return pipe(numbers, map(reduceNumber), reduce(0, sumUpNumbers), reduceNumber)
}

function getYearMontAndhDay(date: Date): readonly [number, number, number] {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()] as const
}

function getMonthAndDay(date: Date): readonly [number, number] {
  return [date.getMonth() + 1, date.getDate()] as const
}

// TODO Add get dates with certain number(s) from a picked range
// function calculateDateRange(
//   start: Date,
//   end: Date
// ): readonly ICalculatedDate[] {
//   return eachDayOfInterval({ start, end }).map(calculateDate)
// }
