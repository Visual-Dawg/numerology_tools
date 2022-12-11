export type ICalculatedPerson = ICalculatedName & ICalculatedDate

export type IAllNumbers = Readonly<IBirthNumbers & INameNumbers & maturity>

export type ICalculatedDate = IBirthNumbers & birthdate

export type ICalculatedName = INameNumbers & name

export type IBirthNumbers = Readonly<
  lifePath & attitude & generation & dayOfBirth
>

export type INameNumbers = Readonly<expression & soulUrge & personality>

type lifePath = { readonly lifePath: number }
type generation = { readonly generation: number }
type attitude = { readonly attitude: number }
type dayOfBirth = { readonly dayOfBirth: number }
type expression = { readonly expression: number }
type soulUrge = { readonly soulUrge: number }
type personality = { readonly personality: number }
type maturity = { readonly maturity: number }
type birthdate = { readonly date: Date }
type name = { readonly name: string }
