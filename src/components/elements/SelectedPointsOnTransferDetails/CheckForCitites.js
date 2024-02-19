import React from "react";
import TextInput from "../TextInput";
import { ifHasUnwantedCharacters } from "../../../helpers/ifHasUnwanted";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForCitites = (props) => {
  let { point, onChange = () => { }, errorMessage } = props

  const onchangeHandler = (e) => {
    let { value } = e.target
    if (ifHasUnwantedCharacters(value)) return
    onChange(value)
  };

  return (
    <>
      {point.pcatId === 8 ?
        (<div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            <TextInput label="Cities" type="text" name="address-description" onChange={(e) => onchangeHandler(e)} value={point["address-description"]} errorMessage={errorMessage} />
          </div>
        </div>)
        : <React.Fragment></React.Fragment>}

    </>
  );
};

export default CheckForCitites;
