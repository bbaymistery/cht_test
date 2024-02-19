function SET_QUOTATION(params = {}) {
    let { state, action } = params
    let { data: { quotation, journeyType } } = action
    let newState = JSON.parse(JSON.stringify(state))

    // set Quotation
    newState.reservations[journeyType].quotation = quotation

    let transferDetails = newState.reservations[journeyType].transferDetails
    let pickUpSelectedPoints = newState.reservations[journeyType].selectedPickupPoints
    let paymentDetails = newState.reservations[journeyType].paymentDetails

    //changing waitingpickuptime to empty string if destination is pickup
    let newSelectedPickUpPoints = pickUpSelectedPoints.map((point, index) => {
        if (point.pcatId === 1) {
            return point = { ...point, flightDetails: { ...point.flightDetails, waitingPickupTime: "" } }
        } else {
            return point
        }
    })
    newState.reservations[journeyType].selectedPickupPoints = newSelectedPickUpPoints



    //set pickUpCategoryId first item of selectedPickUppoints
    newState.reservations[journeyType].transferDetails = { ...transferDetails, pickupCategoryId: pickUpSelectedPoints[0]?.pcatId }

    // set quotation  price to payment details object
    newState.reservations[journeyType].paymentDetails = { ...paymentDetails, price: parseInt(quotation.price) }

    return newState;
}
export default SET_QUOTATION


