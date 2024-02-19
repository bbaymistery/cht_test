import React, { useEffect } from "react";
import styles from "./styles.module.scss";
const Alert = (props) => {
  const { setAlert } = props;
  const { message, close, warning, error, alert } = props.alert;

  useEffect(() => {
    if (alert)  setTimeout(() => { setAlert({ alert: false, message: "", close: false }); }, 5000);
    
  }, [alert, setAlert]);

  return (
    <div className={styles.alert_container}>
      <div
        className={`
        ${styles.alert_div} ${message.length > 0 ? styles.showAlert : ""}
        ${warning && styles.alert_div_warning}
        ${error && styles.alert_div_error}
        `}
      >
        <i className={`fa-solid fa-circle-check ${styles.check}`}></i>
        <span>{message}</span>
        {close && (
          <i onClick={() => setAlert({ alert: false, message: "", close: false })} className={`fa-solid fa-xmark ${styles.close}`}    ></i>
        )}
        <div className={styles.container}>
          <div className={`${styles.progress2} ${styles.progress_moved}`}>
            <div className={styles.progress_bar2}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
