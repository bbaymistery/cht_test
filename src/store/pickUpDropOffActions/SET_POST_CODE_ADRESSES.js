function SET_POST_CODE_ADRESSES(params = {}) {
    let { state, action } = params;
    let { data: { result } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    newState.params.postCodeAdresses.push(result);
    return newState;
}

export default SET_POST_CODE_ADRESSES