import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import styles from "./styles.module.scss";
const InfoModal = ({ content }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  let clickedOutside = useOutsideClick(wrapperRef);
  useEffect(() => {
    if (clickedOutside) dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: false } });
  }, [clickedOutside])



  const setToFalse = () => {
    dispatch({ type: "SET_MODAL_INFO", data: { trueOrFalse: false } });
    document.body.style.overflow = "unset";
  };
  return (
    <div className={` ${styles.modal} `}>
      <div className={`${styles.modal_container}`} ref={wrapperRef} id="infoModal">
        <p>{content?.length ? content : null}</p>
        <div>{typeof content === "object" ? content : null}
        </div>
        <div className={styles.button_div}>
          <button onClick={setToFalse} className="btn btn_primary">Close </button>
        </div>

        <i onClick={setToFalse} className={`fa-solid fa-x ${styles.close_icon}`}></i>
      </div>

    </div>
  );
};

export default InfoModal;
