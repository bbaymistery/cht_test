function ADD_NEW_POINT(params = {}) {
    let { state, action } = params;
    let { data: { point, index, destination } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    //changing waitingpickuptime to empty string if destination is pickup
    // if (destination == "pickup") point = { ...point, flightDetails: { ...point.flightDetails, waitingPickupTime: "" } }

    let points = newState.reservations[index][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`]
    newState.reservations[index][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`] = [...points, point]

    return newState;
}

export default ADD_NEW_POINT