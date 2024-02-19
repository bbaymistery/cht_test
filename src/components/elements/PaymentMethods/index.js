import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import env from "../../../resources/env";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const PaymentMethods = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { params: { journeyType, tokenForArchieve, sessionToken }, reservations, paymentTypes } = state
  const [iframeStripe, setIframeStripe] = useState("");
  const [dataTokenForWebSocket, setDataTokenForWebSocket] = useState("");
  const [statusToken, setStatusToken] = useState("");

  const fetchArchieveToken = async (params = {}) => {
    let { token, paymentType, stage } = params

    let reservationObj = reservations

    if (parseInt(journeyType) === 1) {
      reservationObj = [
        {
          ...reservationObj[0],
          paymentDetails: {
            ...reservationObj[0].paymentDetails,
            token: token,
            paymentType: paymentType,
          },
        },
        {
          ...reservationObj[1],
          paymentDetails:
          {
            ...reservationObj[1].paymentDetails,
            token: token,
            paymentType: paymentType,
          },
        }
      ]
    } else {
      reservationObj = [{ ...reservationObj[0], paymentDetails: { ...reservationObj[0].paymentDetails, token: token, paymentType: paymentType, }, },]
    }
    const method = "POST"
    const url = `${env.apiDomain}/api/v1/sessions/add`;
    const body = JSON.stringify({ token: tokenForArchieve, details: reservationObj, stage })
    const headers = { "Content-Type": "application/json" }
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();
    console.log(stage, data);

  };

  //*payment methods
  const cashMethod = (params = {}) => {
    let { token, paymentType } = params
    // if it is cash payment you have set payment type first of all then send archive
    fetchArchieveToken({ token: "", paymentType: "", stage: "CLICK_OVER_CASH_BUTTON" })
    dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token, paymentType } })
    router.push("/reservations-document")
  };
  const stripeMethod = (params = {}) => {
    let { id, quotations, passengerEmail, url } = params
    if (!iframeStripe) {
      // if it is card payment you have set payment type first of all then send archive then
      fetchArchieveToken({ token: "", paymentType: 7, stage: "CLICK_OVER_CARD_BUTTON" })
      const method = "POST"
      const body = JSON.stringify({
        quotations,
        type: id,
        language: "en",
        passengerEmail,
        "session-id": sessionToken,
        // mode: "sandbox",
      })
      const headers = { "Content-Type": "application/json" }
      const config = { method, headers, body, };
      try {
        fetch(url, config)
          .then((res) => res.json())
          .then((data) => {
            setDataTokenForWebSocket(data); //in order to a tag of pop up window
            setStatusToken(data.webSocketToken); //it will trigger interval and will make request
            setIframeStripe(data?.href);

          })
          .catch((error) => {
            window.handelErrorLogs(error, 'Churchill PaymentMethods Component - stripeMethod function fetching catch blog  ', { config, url })
          });
      } catch (error) {
        window.handelErrorLogs(error, ' Churchill PaymentMethods Component - stripeMethod function try catch blog ', { id, quotations, passengerEmail, url })
      }
    }
  };

  //this function includes all the methods of payments
  const startPayment = (id) => {
    try {
      //general settings FOR PAYMENTS
      const paymentPagePath = JSON.parse(paymentTypes.filter((payment) => payment.id === id)[0].pagePath).path;
      const url = `${env.apiDomain}${paymentPagePath}`;
      let quotations = parseInt(journeyType) === 0 ? [reservations[0].quotation] : [reservations[0].quotation, reservations[1].quotation];
      let passengerEmail = reservations[0].passengerDetails.email;
      let passengerPhoneNumber = reservations[0].passengerDetails.phone;

      //Payment methods
      if (id === 1) cashMethod({ token: "", paymentType: id })

      if (id === 7) stripeMethod({ id, quotations, passengerEmail, url });

    } catch (error) {
      window.handelErrorLogs(error, 'Churchill PaymentMethods Component -startPayment function trys catch blog', { id })
    }
  }

  //this is checking up interval for each second (payment suces or not)
  useEffect(() => {
    let interVal;

    if (statusToken) {
      interVal = setInterval(async () => {

        const method = "POST"
        const headers = { "Content-Type": "application/json", }
        const body = JSON.stringify({ token: statusToken })
        const url = `${env.apiDomain}/api/v1/payment/status`;
        let config = { method, headers, body };
        try {
          let requ = await fetch(url, config);
          let resp = await requ.json();

          if (resp?.status === 200) {
            //after you get a success payment status and after set a token into paymentDEtails object then send archive
            fetchArchieveToken({ token: resp.data.token, paymentType: 7, stage: "GET_SUCCESS_CARD_PAYMENT" })
            window.scroll({ top: 0, left: 0, behavior: "smooth", });

            if (dataTokenForWebSocket?.href?.includes("stripe")) {
              dispatch({ type: "SET_PAYMENT_TYPE_AND_TOKEN", data: { token: resp.data.token, paymentType: 7 } })
              setIframeStripe("");
              setStatusToken("");
              router.push("/reservations-document")
            } else {
              let error = "!dataTokenForWebSocket?.href?.includes(stripe)"
              let message = "Churchill PaymentMethods Component - Useffect statustoken   if payment done successfully but it didnt includes (stipe)"
              window.handelErrorLogs(error, message, { config, resp })
            }
            clearInterval(interVal);
          }
        } catch (error) {
          let message = "Churchill PaymentMethods Component - useEffect statusToken catch blog  "
          window.handelErrorLogs(error, message, { config })
        }
      }, 2000);
    }
    return () => clearInterval(interVal);
  }, [statusToken]);
  return (
    <>
      <div className={`${styles.payment_details}`}>
        <div className={styles.header}>
          <div className={styles.header_top}>
            <h2 className={styles.header_top_title}>  How would you like to pay ?   </h2>
            <Link href={"/terms"} target="_blank" >
              <p className={styles.header_top_subtitle}>
                <i className="fa-solid fa-check"></i>
                By proceeding, you agree to our{" "}
                <span>terms and conditions</span>
              </p>
            </Link>
          </div>
          <div className={styles.header_tot_price}>
            <p className={styles.header_tot_price_text}>Total Price</p>
            <span className={styles.header_tot_price_price}>
              £ {parseInt(journeyType) === 0 ? reservations[0].quotation.price : parseInt(reservations[0].quotation.price) + parseInt(reservations[1].quotation.price)}
            </span>
          </div>
        </div>

        <div className={styles.payment_list}>
          {iframeStripe.length > 0 ? <iframe src={iframeStripe} className={styles.iframe} frameBorder="0" allow="payment" ></iframe> : <React.Fragment></React.Fragment>}

          <div className={`${styles.items_buttons}`}>
            <div title="Pay with Cash to Driver" onClick={() => startPayment(1)} className={` ${styles.item} ${styles.item_1}`}   >
              <p>Pay Cash to Driver </p>
              <img src="/images/pp.jpg" alt="" />
            </div>
            <div onClick={() => startPayment(7)} title="Pay with Stripe" className={`${styles.item} ${styles.item_4}`}   >
              <p>Pay by Card </p>
              <img src="/images/vsMaster.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
