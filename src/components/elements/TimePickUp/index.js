import React from 'react'
import styles from  "./styles.module.scss"
const TimePickUp = () => {
  return (
      <div className={styles.booking_form_hour_minute_wrapper} >
          <i className="fa-sharp fa-solid fa-angle-down"></i>
          <select onChange={(e) => onChangeTimePicker({ value: e.target.value, hourOrMinute: "minute" })}>
              <option value="">Select</option>
              {minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}>{minute.value}</option>))}
          </select>
      </div>
  )
}

export default TimePickUp