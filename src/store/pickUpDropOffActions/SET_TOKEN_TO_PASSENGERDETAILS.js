function SET_TOKEN_TO_PASSENGERDETAILS(params = {}) {
    let { state, action } = params
    let { data: { token } } = action
    let newState = JSON.parse(JSON.stringify(state))

    let { params: { journeyType } } = newState

    if (parseInt(journeyType) === 0) {
        newState.reservations[0].passengerDetails.token = token
    } else {
        newState.reservations[0].passengerDetails.token = token
        newState.reservations[1].passengerDetails.token = token
    }
    newState.params.tokenForArchieve = token

    return newState;
}
export default SET_TOKEN_TO_PASSENGERDETAILS