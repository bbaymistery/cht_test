import React from "react";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwanted";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForCruises = (props) => {
  let { point, error, onChange = () => { }, } = props

  const onchangeHandler = (e, params = {}) => {
    let { value } = e.target
    if (ifHasUnwantedCharacters(value)) return
    let newCruisenumber = value
    onChange(newCruisenumber)
  };

  return (
    <>
      {point.pcatId === 2 ? (<div className={styles.insideInputs}>
        <div className={styles.insideInputs_input}>
          <TextInput label="Cruise Name" type="text" name="cruiseNumber" value={point.cruiseNumber} errorMessage={error.cruiseNumber} onChange={(e) => onchangeHandler(e)} />
        </div>
      </div>)
        : <React.Fragment></React.Fragment>}
    </>
  );
};

export default CheckForCruises;
