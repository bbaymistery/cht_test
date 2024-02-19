
//pass trasnferdateTimeString as parametr then split it  to hour and minute
export const splitDateTimeStringIntoHourAndMinute = (dateString) => {
  return dateString.split(" ")[1]?.split(":")
}

//pass trasnferdateTimeString as parameter then split it to date
export const splitDateTimeStringIntoDate = (dateString) => {
  return dateString.split(" ")
}