import React from 'react'
import { useDispatch } from 'react-redux';
import FlightWaitingTimeContent from '../FlightWaitingTimeContent';
import styles from "./styles.module.scss";
/**
 @TextInput {//*name:string,label:string,errorMessage:string,value:string,onChange:function,placeholder:string,data:number||string,flightInfoIcon:boolean}
 **/
const Select = (props) => {
  let { name = "", value = "", label = "", errorMessage = "", onChange = (e) => { }, postCodeSelectOption = "", data = number || [], flightSelectOption = false, flightInfoIcon = false } = props
  const dispatch = useDispatch()
  const setModalInfo = (par) => {
    dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: true } })
  }
  return (
    <div className={styles.select_wrapper}>
      <label className={`${styles.select}`} err={String(typeof errorMessage === 'string' && errorMessage.length > 0)} >
        <select className={styles.select__field} required name={name} onChange={onChange} defaultValue={value} >
          {parseInt(data)
            ? Array(data).fill().map((x, i) => <option key={i} id={i + 1} value={i + 1} >{i + 1}</option>)
            : data?.map((d, i) => {
              //here we check d.id typeof string for flight number (go to component Checkfor flight )
              if (typeof d.id === 'string' && typeof d.value === 'string' && flightSelectOption === true) {
                return <option key={i} value={d.id} > {d.value}</option>
              }
              //here we check d.if isInteger for postcodes
              else if ((Number.isInteger(d.id)) && typeof d.value === 'string' && postCodeSelectOption === true) {
                return <option key={i} value={d.id} > {d.value}</option>
              }
              else {
                <option key={i} id={d.id} value={d.value}> {d.value}</option>
              }
            })}
        </select>
        {errorMessage ? <p className={styles.form_input_error}>{errorMessage}</p> : <React.Fragment></React.Fragment>}

        <span id="icon" className={styles.select__label} >{label}</span>
        {flightInfoIcon ?
          <div className={styles.flightinfo_div}>
            <FlightWaitingTimeContent />
          </div>
          : <React.Fragment></React.Fragment>}


      </label>
      {flightInfoIcon ? <i className={`fa-solid fa-circle-info ${styles.info_icon}`} onClick={setModalInfo}></i> : <React.Fragment></React.Fragment>}
    </div>
  )
}

export default Select
