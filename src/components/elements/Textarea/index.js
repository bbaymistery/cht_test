import React from 'react'
import styles from "./styles.module.scss";
/**
 @TextInput {//* name:string,label:string,errorMessage:string,value:string,onChange:function}
 **/
const Textarea = (props) => {
    let { name = "", label = "", errorMessage = "", value = "", onChange = (e) => { }, } = props
    return (
        <section className={styles.form_input}>
            {errorMessage ? <p className={`error_message ${styles.form_input_error}`}>{errorMessage}</p> : <React.Fragment></React.Fragment>}
            <textarea value={value} name={name} onChange={onChange} className={`${styles.textarea} `} err={String(typeof errorMessage === 'string' && errorMessage.length > 0)} />
            <label htmlFor={name} className={styles.label}> {label} </label>
        </section>
    )
}

export default Textarea