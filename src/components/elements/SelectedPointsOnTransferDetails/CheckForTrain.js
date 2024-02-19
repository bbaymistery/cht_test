import React from "react";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwanted";

import TextInput from "../TextInput";
import styles from "./styles.module.scss";
const CheckForTrain = (props) => {
  let { point, objectDetailStatuses, type, onChange = () => { }, errorMessage } = props

  const onchangeHandler = (e, params = {}) => {
    let { value } = e.target
    if (ifHasUnwantedCharacters(value)) return
    let newTrainNumber = value
    onChange(newTrainNumber)
  };
  return (
    <>
      {point.pcatId === 3 ?
        (<div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            <TextInput label="Train Number" type="text" name="trainNumber" value={point.trainNumber} onChange={(e) => onchangeHandler(e)} errorMessage={errorMessage} />
          </div>
        </div>)
        : <React.Fragment></React.Fragment>}
    </>
  );
};

export default CheckForTrain;
