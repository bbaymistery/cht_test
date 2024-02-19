function SET_MODAL_INFO(params = {}) {
    let { state, action } = params
    let { data: { trueOrFalse } } = action
    let newState = JSON.parse(JSON.stringify(state))
    newState.params.modalInfo = trueOrFalse
    return newState;
}
export default SET_MODAL_INFO