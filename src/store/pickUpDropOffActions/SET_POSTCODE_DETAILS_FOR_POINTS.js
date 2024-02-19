function SET_POSTCODE_DETAILS_FOR_POINTS(params = {}) {
    let { state, action } = params;
    let { data: { type, index: journeyType, pointIndex, postCodeDetails } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    let point = newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex]
    newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex] = {
        ...point,
        postCodeDetails: { ...point.postCodeDetails, ...postCodeDetails }
    }
    return newState;
}

export default SET_POSTCODE_DETAILS_FOR_POINTS