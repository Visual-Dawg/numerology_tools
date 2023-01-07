export type ICalculatedPerson = ICalculatedName & ICalculatedDate

export type IAllNumbers = Readonly<IBirthNumbers & INameNumbers & Maturity>

export type ICalculatedDate = IBirthNumbers & DateObject

export type ICalculatedName = INameNumbers & Name

export type IBirthNumbers = Readonly<
  LifePath & Attitude & Generation & DayOfBirth
>

export type INameNumbers = Readonly<Expression & SoulUrge & Personality>

type LifePath = { readonly lifePath: number }
type Generation = { readonly generation: number }
type Attitude = { readonly attitude: number }
type DayOfBirth = { readonly dayOfBirth: number }
type Expression = { readonly expression: number }
type SoulUrge = { readonly soulUrge: number }
type Personality = { readonly personality: number }
type Maturity = { readonly maturity: number }
type DateObject = { readonly date: Date }
type Name = { readonly name: string }

export type IFindDateArgument = Readonly<{
  type: "FIND_DATE"
  id: string
  selectedLifepaths: readonly number[]
  start: Date
  end: Date
}>

export type IFindDateResult = Readonly<{
  type: "FIND_DATE_RESULT"
  id: string
  result: readonly ICalculatedDate[]
}>
