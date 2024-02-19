function SET_SESSION_TOKEN(params = {}) {
    let { state, action } = params
    let { data: { sessionToken } } = action
    let newState = JSON.parse(JSON.stringify(state))

    newState.params.sessionToken=sessionToken
    return newState;
}
export default SET_SESSION_TOKEN