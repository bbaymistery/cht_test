// export const waitingMinutes = [0, 15, 30, 45, 50, 60, 70, 80, 90, 100, 120, 150].map((min, i) => ({ id: i + 1, value: `${min} minute${min === 0 ? '' : 's'} after flight has landed` }))
export const waitingMinutes = [0, 15, 30, 45, 50, 60, 70, 80, 90, 100, 120, 150]
    .map((min, i) => ({
        id: min.toString(),
        value: `${min} minute${min === 0 ? '' : 's'} after flight has landed`
    }))
