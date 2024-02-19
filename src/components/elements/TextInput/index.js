import React from 'react'
import styles from "./styles.module.scss"
/**
 @TextInput {//* type:string,name:string,label:string,errorMessage:string,value:string,onChange:function}
 **/
const TextInput = (props) => {
  let { type = "text", value = "", name = "", label = "", errorMessage, onChange = (e) => { }, placeholder = "" } = props

  return (
    <section className={styles.form_input} >
      {typeof errorMessage === 'string' ? <p className={`error_message ${styles.form_input_error}`}>{errorMessage}</p> : <React.Fragment></React.Fragment>}
      <input required err={String(typeof errorMessage === 'string' && errorMessage.length > 0)} type={type} value={value} name={name} onChange={onChange} placeholder={placeholder} className={`${styles.input}`} />
      <label htmlFor={name} className={styles.label}> {label} </label>
    </section>
  )
}

export default TextInput