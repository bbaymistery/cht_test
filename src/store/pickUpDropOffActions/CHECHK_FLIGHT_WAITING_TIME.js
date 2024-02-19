function CHECHK_FLIGHT_WAITING_TIME(params = {}) {
    let { state, action } = params
    let { data: { journeyType } } = action
    let newState = JSON.parse(JSON.stringify(state))

    let pickUpSelectedPoints = newState.reservations[journeyType].selectedPickupPoints
    //changing waitingpickuptime to empty string if destination is pickup
    let newSelectedPickUpPoints = pickUpSelectedPoints.map((point, index) => {
        if (point.pcatId === 1) {
            return point = { ...point, flightDetails: { ...point.flightDetails, waitingPickupTime: 0 } }
        } else {
            return point
        }
    })
    newState.reservations[journeyType].selectedPickupPoints = newSelectedPickUpPoints


    return newState;
}
export default CHECHK_FLIGHT_WAITING_TIME


