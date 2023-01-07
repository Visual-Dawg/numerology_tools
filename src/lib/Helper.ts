export const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  numberingSystem: "latn",
  calendar: "iso8601",
})

export const numberFormatter = new Intl.NumberFormat("de-DE", {
  compactDisplay: "long",
})
