function SET_PASSEGER_DETAILS(params = {}) {
    let { state, action } = params
    let { data: { name, value, index, updateBothJourneyCheckBox } } = action
    let { params: { journeyType } } = state

    let newState = JSON.parse(JSON.stringify(state))
    let transferDetails = newState.reservations[index].transferDetails

    if (name === "passengersNumber") {
        if (journeyType === 1 && updateBothJourneyCheckBox) {
            newState.reservations[0].transferDetails = { ...transferDetails, [name]: parseInt(value) }
            newState.reservations[1].transferDetails = { ...transferDetails, [name]: parseInt(value) }
        } else {
            newState.reservations[index].transferDetails = { ...transferDetails, [name]: parseInt(value) }
        }
    } else if (name ==="specialRequests") {
        newState.reservations[index].transferDetails = { ...transferDetails, [name]: value }
    }
    return newState;
}
export default SET_PASSEGER_DETAILS