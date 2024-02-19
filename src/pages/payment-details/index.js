import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PaymentPageSummary from '../../components/elements/PaymentPageSummary'
import StepsOfPages from '../../components/elements/StepsOfPages'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper'
import PaymentMethods from '../../components/elements/PaymentMethods'
import styles from "./styles.module.scss"
import Router from "next/router";

import env from '../../resources/env'
let title = ""
let keywords = ""
let description = ""
const PaymentDetails = () => {
    let state = useSelector((state) => state.pickUpDropOffActions)
    let { reservations, params: { tokenForArchieve } } = state
    const [confirmation, setConfirmation] = useState(true);

    //passenger landing payment page We need archieveToken
    const fetchArchieveToken = async (params = {}) => {
        let { stage, } = params

        const reservationObj = reservations
        const method = "POST"
        const url = `${env.apiDomain}/api/v1/sessions/add`;
        const body =
        JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage })
        const headers = { "Content-Type": "application/json" }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        console.log({stage, data})
        console.log("caisiyor");


    };
  
    // prompt the user if they try and leave with unsaved changes
    useEffect(() => {
        let previousUrl = "/transfer-details"
        let nextUrl = "/reservations-document"
        const confirmationMessage = "If you leave the page, all data will be deleted.";
        const beforeUnloadHandler = async (e) => {
            //when we click to close browser
            setTimeout(() => { fetchArchieveToken({ stage: "PLAN_TO_CLOSE_PAYMENT_PAGE" }) }, 10)
            // /in case if it is cancelled
            if (window.event.cancelable) {
                setTimeout(() => { fetchArchieveToken({ stage: "PAYMENT_PAGE_NOT_CLOSED" }) }, 450)
            }
            if (confirmation) {
                (e || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            }

        };

        // burasi bizim hangi sayfaya gecdigimizi soyler  (tiklayinca)
        const beforeRouteHandler = (url) => {
            if (confirmation) {
                if (url === nextUrl || url === previousUrl) {
                    setConfirmation(false)
                    return
                } else {
                    setConfirmation(true)
                }
                if (Router.pathname !== url && !confirm(confirmationMessage)) {
                    Router.events.emit("routeChangeError");
                    throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
                }
            }
        };

        const handleEndConcert = async () => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const method = "POST"
            const reservationObj = reservations
            const url = `${env.apiDomain}/api/v1/sessions/add`;
            const body = JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage: "PAYMENT_PAGE_IS_CLOSED" })
            const response = await fetch(url, { method, body, headers, keepalive: true });
            const data = await response.json();
            console.log({ data, });
        }
        window.addEventListener("beforeunload", beforeUnloadHandler);
        window.addEventListener('unload', handleEndConcert)
        Router.events.on("routeChangeStart", beforeRouteHandler);
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            window.removeEventListener('unload', handleEndConcert);
            Router.events.off("routeChangeStart", beforeRouteHandler);
        };
    }, [confirmation]);

    //scrolling from top
    useEffect(() => {

        const mainContainer = document.querySelector("#main_container")
        window.scrollTo({ top: mainContainer.offsetTop, left: 0, behavior: "smooth", })
    }, [])
    useEffect(() => {
        //passenger landing payment page We need archieveToken
        fetchArchieveToken({ stage: "LANDED_INTO_PAYMENT_PAGE" })
    }, [])
    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            <div className={"content-wrapper-outer clearfix"}>
                <div className="main-content quotaiton-main-content main-content-full">
                    <StepsOfPages passengerDetails="completed" vehicle="completed" payment="current" />
                    <div className={styles.payment_details_section} id="main_container">
                        {reservations.map((obj, index) => {
                            let { transferDetails, quotation, selectedPickupPoints, selectedDropoffPoints, passengerDetails } = obj
                            let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                            const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                            const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []

                            return (
                                <div key={index}>
                                    <div className={styles.main_container} >
                                        <PaymentPageSummary
                                            index={index}
                                            quotation={quotation}
                                            splitedHour={splitedHour}
                                            splitedDate={splitedDate}
                                            splitedMinute={splitedMinute}
                                            email={passengerDetails.email}
                                            phone={passengerDetails.phone}
                                            specialRequests={specialRequests}
                                            passengersNumber={passengersNumber}
                                            firstname={passengerDetails.firstname}
                                            selectedPickupPoints={selectedPickupPoints}
                                            selectedDropoffPoints={selectedDropoffPoints}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        <PaymentMethods />
                    </div>

                </div>
            </div>
        </GlobalLayout>
    )
}

export default PaymentDetails

export async function getServerSideProps({ req, res }) {
    if (req.url === "/payment-details") {
        return {
            redirect: {
                destination: `/`,
                permanent: false
            }
        }
    }

    return {
        props: {
            data: "",
        },
    };
}

