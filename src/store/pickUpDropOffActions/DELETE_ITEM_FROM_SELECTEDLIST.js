function DELETE_ITEM_FROM_SELECTEDLIST(params = {}) {
    let { state, action } = params
    let { data: { currentIndexOfDeletedItem, index: journeyType, destination } } = action
    let newState = JSON.parse(JSON.stringify(state))

    let points = newState.reservations[journeyType][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`];
    newState.reservations[journeyType][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`] = points.filter((point,i)=>i!==currentIndexOfDeletedItem)
    return newState;
}
export default DELETE_ITEM_FROM_SELECTEDLIST