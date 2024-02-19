//if return date is behind transfer date it will show up error
//we used to compare date(with milliseconds)
export const convertDateToMilliSecond = (data) => {
    var myDate = data.split("-");
    var newDateWithMs = new Date(Number(myDate[0]), Number(myDate[1] - 1), Number(myDate[2]));
    return newDateWithMs.getTime();
};

//!  'yyyy-mm-dd HH:MM'   FOR   transferDateTimeString
export const currentDateForReturnJourney = () => {
    //6+24 =>1 day difference
    // 6+24+24 >2 day difference
    //6+24+24+24 =>3 day difference
    let tmpDt = new Date(Date.now() + 1000 * 60 * 60 * (6 + 24));
    let year = tmpDt.getFullYear();
    let month = tmpDt.getMonth() + 1 < 10 ? `0${tmpDt.getMonth() + 1}` : tmpDt.getMonth() + 1;
    let date = tmpDt.getDate() < 10 ? `0${tmpDt.getDate()}` : tmpDt.getDate();
    let hours = tmpDt.getHours() < 10 ? `0${tmpDt.getHours()}` : tmpDt.getHours();
    if (month === "00") {
        month = "01"
    }
    let minute = "00";
    let currentDate = `${year}-${month}-${date} ${hours}:${minute}`;
    return currentDate;
};
//We use it for setting  minimum date on transfer journey
export const currentDate = () => {
    let tmpDt = new Date(Date.now());
    let year = tmpDt.getFullYear();
    let month = tmpDt.getMonth() + 1 < 10 ? `0${tmpDt.getMonth() + 1}` : tmpDt.getMonth() + 1;
    if (month === "00") {
        month = "01"
    }
    let date = tmpDt.getDate() < 10 ? `0${tmpDt.getDate()}` : tmpDt.getDate();
    let currentDate = `${year}-${month}-${date}`;
    return currentDate;
};