function SET_SAME_PASSENGER_DETAILS_STATUS(params = {}) {
    let { state, action } = params
    let { data: { status } } = action

    let newState = JSON.parse(JSON.stringify(state))

    let passengerDetailsTransfer = newState.reservations[0].passengerDetails
    let trPassenegersNumber= newState.reservations[0].transferDetails.passengersNumber

    if (status) {
        //update all passengerdetals
        newState.reservations[1].passengerDetails = { ...newState.reservations[1].passengerDetails, ...passengerDetailsTransfer }

        //update only passengersNumber inside transferDetails
        newState.reservations[1].transferDetails = { ...newState.reservations[1].transferDetails, passengersNumber: trPassenegersNumber }
    }

    //setting new journeytype
    newState.params.passengerDetailsStatus = status


    return newState;
}
export default SET_SAME_PASSENGER_DETAILS_STATUS