function SET_TRAIN_NUMBER_FOR_POINTS(params = {}) {
    let { state, action } = params;
    let { data: { type, index: journeyType, pointIndex, trainNumber } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    let point = newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex]
    newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex] = {
        ...point,
        trainNumber
    }
    return newState;
}

export default SET_TRAIN_NUMBER_FOR_POINTS