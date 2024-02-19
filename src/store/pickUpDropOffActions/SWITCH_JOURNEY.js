import { convertDateToMilliSecond } from "../../helpers/getDates";
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from "../../helpers/splitHelper";



//if trasnfer date 11-11-2021   then retun will be 12-11-2021 (when ever journeytype chnage)
const putReturnDateTimeOneDayForward = (params = {}) => {
    let { newState } = params
    //in order put forward one day return dateTimEsTRING WE ARE REACHING TO TRANSFERDateTIme string
    let trDate = newState.reservations[0].transferDetails.transferDateTimeString;

    //destructing one by one
    const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(trDate) || []
    const [splitedDate] = splitDateTimeStringIntoDate(trDate) || []

    const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000;
    //TAKE TRASNFER DATE MILLISECOND ADD One day to it and assing to returnTranferDate
    const TR_DATE_IN_MILLISECONDS = convertDateToMilliSecond(splitedDate)
    //Add one day to transfer date and assign to new variable //Wed Jan 04 2023 00:00:00 GMT+0400 (Azerbaijan Standard Time)
    let newDatee = new Date(TR_DATE_IN_MILLISECONDS + MILLISECONDS_PER_DAY)

    //arranging new date like 2022-01-01
    let year = `${newDatee.getFullYear()}`
    let month = `${newDatee.getMonth() + 1 < 10 ? `0${newDatee.getMonth() + 1}` : newDatee.getMonth() + 1}`
    let day = `${newDatee.getDate() < 10 ? `0${newDatee.getDate()}` : newDatee.getDate()}`
    if (month === '00') month = "01"

    //2021-11-11  for return
    let newDatee2 = `${year}-${month}-${day}`
    let returnDateTimeString = trDate
    returnDateTimeString = `${newDatee2} ${splitedHour}:${splitedMinute}`;

    return returnDateTimeString
}

function SWITCH_JOURNEY(params = {}) {
    let { state, action } = params;
    let { data: { journeyType } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    //setting new journeytype
    newState.params.journeyType = journeyType

    //get pick and drops point from transferJourney
    let pickUpsTr = newState.reservations[0].selectedPickupPoints;
    let dropOffsTr = newState.reservations[0].selectedDropoffPoints;

    //11/ 10/2022
    if (parseInt(journeyType) === 1) {
        //clone the first reservation obj
        let newReserVationObject = [{ ...newState.reservations[0] }]

        //Changing pick and drop points  and setting return transferDateTimeString
        newReserVationObject = [{
            ...newReserVationObject[0],
            selectedPickupPoints: [...dropOffsTr],
            selectedDropoffPoints: [...pickUpsTr],
            transferDetails: {
                ...newReserVationObject[0].transferDetails,
                transferDateTimeString: putReturnDateTimeOneDayForward({ newState })
            }
        }]
        //putting newReserVationObject to the near of  previous one
        newState.reservations = [{ ...newState.reservations[0] }, { ...newReserVationObject[0] },]
    } else {
        newState.reservations = [{ ...newState.reservations[0] }]
    }

    return newState;
}

export default SWITCH_JOURNEY