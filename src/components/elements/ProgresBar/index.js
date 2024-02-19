import React from "react";
import style from "./styles.module.scss";
const ProgresBar = () => {
  return <div className={`${style.section} `}>
    <div className={style.content}>
      <h1>Loading
        <span className={style.dot}>
          .</span><span className={style.dot}>
          .</span><span className={style.dot}>
          .
        </span>

      </h1>
      <div className={style.progress_bar}>

      </div>
    </div>
  </div>;
};

export default ProgresBar;
