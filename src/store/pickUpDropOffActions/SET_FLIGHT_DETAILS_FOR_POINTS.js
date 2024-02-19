function SET_FLIGHT_DETAILS_FOR_POINTS(params = {}) {
    let { state, action } = params;
    let { data: { type, index: journeyType, pointIndex, flightDetails } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    let point = newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex]
    newState.reservations[journeyType][`selected${type === 'pickup' ? "Pickup" : "Dropoff"}Points`][pointIndex] = {
        ...point,
        flightDetails: { ...point.flightDetails, ...flightDetails }
    }
    return newState;
}

export default SET_FLIGHT_DETAILS_FOR_POINTS