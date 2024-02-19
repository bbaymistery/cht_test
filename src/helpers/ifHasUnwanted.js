//if input has unwanted characters
export const ifHasUnwantedCharacters = (value) => {
    if (value.includes('"') || value.includes(`'`) || value.includes('/') || value.includes('\\')) return true
}
