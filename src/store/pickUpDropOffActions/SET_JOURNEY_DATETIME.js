import { convertDateToMilliSecond } from "../../helpers/getDates";
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from "../../helpers/splitHelper";

//when date changes :if transfer date behind return date then it will trigger
const isReturnDateLessThanTransferDate = (transferDate, returnDate) => {
    const TRANSFER_DATE_IN_MILLISECONDS = convertDateToMilliSecond(transferDate.split(" ")[0])
    const RETURN_DATE_IN_MILLI_SECONDS = convertDateToMilliSecond(returnDate?.split(" ")[0])

    return TRANSFER_DATE_IN_MILLISECONDS >= RETURN_DATE_IN_MILLI_SECONDS
}

const putReturnDateTimeOneHourForward = (params = {}) => {
    let { newState, value, DateTimeString, splitedMinute, splitedHour } = params

    //vaue => 2022-11-11
    let trDate = value
    let returnDate = newState?.reservations[1]?.transferDetails?.transferDateTimeString.split(" ")[0]

    //If return transferDateTimeString less than trasnfer transferDateTimeString
    // then we add 1 day to returndateTimeString


    if (isReturnDateLessThanTransferDate(trDate, returnDate)) {

        const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000;

        //TAKE TRASNFER DATE MILLISECOND ADD One day to it and assing to returnTranferDate
        const TR_DATE_IN_MILLISECONDS = convertDateToMilliSecond(trDate)

        //Add one day to transfer date and assign to new variable
        //Wed Jan 04 2023 00:00:00 GMT+0400 (Azerbaijan Standard Time)
        let newDatee = new Date(TR_DATE_IN_MILLISECONDS + MILLISECONDS_PER_DAY)

        //arranging new date like 2022-01-01
        let year = `${newDatee.getFullYear()}`
        let month = `${newDatee.getMonth()+1< 10 ? `0${newDatee.getMonth()+1}` : newDatee.getMonth() + 1}`
        let day = `${newDatee.getDate() < 10 ? `0${newDatee.getDate()}` : newDatee.getDate()}`

        if (month === '00') month = "01"

        //2021-11-11  for return
        let newDatee2 = `${year}-${month}-${day}`

        let returnDateTimeString = DateTimeString
        returnDateTimeString = `${newDatee2} ${splitedHour}:${splitedMinute}`;
        // returnDateTimeString = trDate;

        // console.log({ data: newDatee.getDate(), month: newDatee.getMonth(), year: newDatee.getFullYear() });
        // console.log({month});
        // console.log({ newDatee2 });


        //saving date to reservation
        newState.reservations[1].transferDetails.transferDateTimeString = returnDateTimeString
    }

    return newState
}
function SET_JOURNEY_DATETIME(params = {}) {
    let { state, action } = params
    let { data: { journeyType, hourOrMinute, value } } = action

    let newState = JSON.parse(JSON.stringify(state))


    //reaching to previous dateTimeString
    let DateTimeString = newState.reservations[journeyType].transferDetails.transferDateTimeString
    //destructing one by one
    const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(DateTimeString) || []
    const [splitedDate] = splitDateTimeStringIntoDate(DateTimeString) || []


    //setting hour || minute || date  to DateTimeString
    if (hourOrMinute === "hour") DateTimeString = `${splitedDate} ${value}:${splitedMinute}`;
    if (hourOrMinute === "minute") DateTimeString = `${splitedDate} ${splitedHour}:${value}`;

    if (hourOrMinute === "date") DateTimeString = `${value} ${splitedHour}:${splitedMinute}`;

    //here we chack if client choiced both journey by newState.reservations.length > 1
    if (newState.reservations.length > 1 && hourOrMinute === "date") {
        newState = putReturnDateTimeOneHourForward({ newState, value, DateTimeString, splitedHour, splitedMinute })

    }

    //saving DateTimeString by journeytpe
    newState.reservations[journeyType].transferDetails.transferDateTimeString = DateTimeString
    return newState;
}
export default SET_JOURNEY_DATETIME


