function GET_QUOTATION(params = {}) {
    let { state, action } = params
    let { data: { results, journeyType } } = action
    let newState = JSON.parse(JSON.stringify(state))

    if (parseInt(journeyType) === 0) {
        newState.params.quotations = [results]
    } else {
        // ..when we make both journey request ıt responds already array
        newState.params.quotations = results
    }

    return newState;
}
export default GET_QUOTATION