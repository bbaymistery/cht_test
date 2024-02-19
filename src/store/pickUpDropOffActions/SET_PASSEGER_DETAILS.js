function SET_PASSEGER_DETAILS(params = {}) {
    let { state, action } = params
    let { data: { name, value, index, updateBothJourneyCheckBox  } } = action
    let { params: { journeyType } } = state

    let newState = JSON.parse(JSON.stringify(state))
    let passengerDetails = newState.reservations[index].passengerDetails


    if (journeyType === 1 && updateBothJourneyCheckBox) {
        newState.reservations[0].passengerDetails = { ...passengerDetails, [name]: value }
        newState.reservations[1].passengerDetails = { ...passengerDetails, [name]: value }
    } else {
        newState.reservations[index].passengerDetails = { ...passengerDetails, [name]: value }
    }
    return newState;
}
export default SET_PASSEGER_DETAILS