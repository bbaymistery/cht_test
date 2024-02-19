import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
const CheckBox = () => {
  const dispatch = useDispatch()

  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { passengerDetailsStatus } } = state

  const onchangeHandler = (e) => {
    dispatch({ type: "SET_SAME_PASSENGER_DETAILS_STATUS", data: { status: !e.currentTarget.previousSibling.checked } })
  }

  return (
    <div className={styles.form_checkbox}>
      <input className={styles.checkbox} type="checkbox" id="checkbox-2" defaultChecked={passengerDetailsStatus} />
      <label htmlFor="checkbox-2" className={`${!passengerDetailsStatus ? styles.primary_text : styles.red_text}`} onClick={(e) => onchangeHandler(e)}>
        the passenger details
        {passengerDetailsStatus ? "  are a same" : <span className={styles.textMiddle}> are not same{"  "}</span>} for both journey
      </label>
    </div>
  );
};

export default CheckBox;
