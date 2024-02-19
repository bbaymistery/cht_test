import React from "react";
import { waitingMinutes } from "../../../constants/transferDetails";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwanted";
import Select from "../Select";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForFlight = (props) => {
  //index it is a destination if 0 it means pick up
  let { point, onChange = () => { }, objectDetailStatuses, type, error = {} } = props

  const onchangeHandler = (e, params = {}) => {
    let { value, name } = e.target
    if (ifHasUnwantedCharacters(value)) return


    //150 minutes after flight has landed     = >150
    let splitedNumberOfWaitingTime = ""
    if (name === "waitingPickupTime") {
      splitedNumberOfWaitingTime = e?.target?.options[e?.target?.selectedIndex].innerText.trim().split(" ")[0]

      if (parseInt(splitedNumberOfWaitingTime) >= 0) {
        splitedNumberOfWaitingTime = parseInt(splitedNumberOfWaitingTime)
      } else {
        splitedNumberOfWaitingTime = ""
      }

    }

    let newFlightDetails = {
      ...point.flightDetails,
      [name]: name === 'waitingPickupTime' ? splitedNumberOfWaitingTime : value
    }
    onChange(newFlightDetails)
  };


  return (
    <>
      {/* //!checking for flight pickups transfer */}
      {point.pcatId === 1 ?
        (<div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            <TextInput label="Flight No" type="text" name="flightNumber" value={point.flightDetails.flightNumber} errorMessage={error?.flightDetails?.flightNumber} onChange={(e) => onchangeHandler(e)} />
            {objectDetailStatuses[1]?.flightDetails?.waitingPickupTime[type] === 1 &&
              <Select
                label="When should the driver pick you up?"
                data={[{ id: "", value: "--select--" }, ...waitingMinutes?.length > 0 ? waitingMinutes : []]}
                name="waitingPickupTime"
                onChange={(e) => onchangeHandler(e)}
                errorMessage={error?.flightDetails?.waitingPickupTime}
                value={point.flightDetails.waitingPickupTime}
                // value={
                //   `${point.flightDetails.waitingPickupTime ? `${point.flightDetails.waitingPickupTime} minute${point.flightDetails.waitingPickupTime === 0 ? '' : 's'} after flight has landed` : ``}`
                // }
                flightSelectOption={true}
                flightInfoIcon={true}
              />}
          </div>
        </div>)
        : <React.Fragment></React.Fragment>}
    </>
  );
};

export default CheckForFlight;
/*
  <Select
                label="When should the driver pick you up?"
                data={[{
                  id: point.flightDetails.waitingPickupTime ? point.flightDetails.waitingPickupTime : "",
                  value: point.flightDetails.waitingPickupTime ? point.flightDetails.waitingPickupTime : "--select--"
                },
                ...waitingMinutes?.length > 0 ? waitingMinutes : []]
                }
                name="waitingPickupTime"
                onChange={(e) => onchangeHandler(e)}
                errorMessage={error?.point.flightDetails.waitingPickupTime}
                value={`${point.flightDetails.waitingPickupTime} minute after flight has landed`}
                opt={true}
                flightInfoIcon={true}
              />
*/