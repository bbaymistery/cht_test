
function RESET_SELECTED_POINTS(params = {}) {
    let { state, action } = params
    let newState = JSON.parse(JSON.stringify(state))

    newState.reservations[0]["selectedPickupPoints"] = []
    newState.reservations[0]["selectedDropoffPoints"] = []
    newState.reservations[0].quotation = {}
    return newState
}

export default RESET_SELECTED_POINTS


