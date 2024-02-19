function SET_PAYMENT_TYPE_AND_TOKEN(params = {}) {
  let { state, action } = params
  let { data: { token, paymentType } } = action

  let newState = JSON.parse(JSON.stringify(state))

  newState.reservations.map((obj, index) => {
    return newState.reservations[index].paymentDetails = { ...newState.reservations[index].paymentDetails, token, paymentType }
  })
  return newState;
}
export default SET_PAYMENT_TYPE_AND_TOKEN


// if (parseInt(journeyType) === 0) {
//   let paymentDetails = newState.reservations[0].paymentDetails
//   newState.reservations[0].paymentDetails = { ...paymentDetails, token, paymentType }
// } else {
//   let paymentDetailsTransfer = newState.reservations[0].paymentDetails
//   let paymentDetailsReturn = newState.reservations[1].paymentDetails
//   newState.reservations[0].paymentDetails = { ...paymentDetailsTransfer, token, paymentType }
//   newState.reservations[1].paymentDetails = { ...paymentDetailsReturn, token, paymentType }

// }
