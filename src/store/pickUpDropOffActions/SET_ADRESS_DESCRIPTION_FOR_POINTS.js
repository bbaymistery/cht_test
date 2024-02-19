function SET_ADRESS_DESCRIPTION_FOR_POINTS(params = {}) {
    let { state, action } = params;
    let { data: { type, index: journeyType, pointIndex, value } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    let point = newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex]
    newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex] = {
        ...point,
        ["address-description"]: value
    }
    return newState;
}

export default SET_ADRESS_DESCRIPTION_FOR_POINTS