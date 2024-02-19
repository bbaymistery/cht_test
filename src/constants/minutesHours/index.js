export const hours = Array.from(new Array(24)).map((m, i) => ({
    id: i + 1,
    value: i < 10 ? `0${i}` : String(i)
}))


export const minutes = Array.from(new Array(12)).map((m, i) => ({
    id: i, value: ((i + 1 - 1) * 5) < 10 ? `0${((i + 1 - 1) * 5)}` : String(((i + 1 - 1) * 5))
}))