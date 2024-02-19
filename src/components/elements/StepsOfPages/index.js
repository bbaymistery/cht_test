import React from 'react'
import styles from "./styles.module.scss"
const StepsOfPages = (params = {}) => {

    let { vehicle = "not-yet", passengerDetails = "not-yet", payment = "not-yet", confirmation = "not-yet" } = params

    return (
        <div className="booking-step-wrapper clearfix pt_4">
            <div className="step-wrapper clearfix">
                <div className="step-icon-wrapper">
                    <div className="step-icon">1.</div>
                </div>
                <div className="step-title">Trip Details</div>
            </div>

            <div className="step-wrapper clearfix">
                <div className="step-icon-wrapper">
                    <div className={`step-icon ${vehicle === "current" ? "step-icon-current" : ""} ${vehicle === "completed" && "step-icon"} `}>2.</div>
                </div>
                <div className="step-title">Select Vehicle</div>
            </div>

            <div className="step-wrapper clearfix">
                <div className="step-icon-wrapper">
                    <div className={`step-icon ${passengerDetails === "current" ? "step-icon-current" : `${passengerDetails === "completed" ? "" : "step-icon-not-completed"}`}`}>3.</div>
                </div>
                <div className="step-title">Transfer Details</div>
            </div>

            <div className="step-wrapper clearfix">
                <div className="step-icon-wrapper">
                    <div className={`step-icon ${payment === "current" ? "step-icon-current" : `${payment === "completed" ? "" : "step-icon-not-completed"}`} `}>4.</div>
                </div>
                <div className="step-title">Payment Details</div>
            </div>

            <div className="step-wrapper qns-last clearfix">
                <div className="step-icon-wrapper">
                    <div className={`step-icon ${confirmation === "current" ? "step-icon-current" : `${confirmation === "completed" ? "" : "step-icon-not-completed"}`} `}>5.</div>
                </div>
                <div className="step-title">Confirmation</div>
            </div>

            <div className="step-line"></div>

        </div>
    )
}

export default StepsOfPages