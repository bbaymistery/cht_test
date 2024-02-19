import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper'
import StepsOfPages from '../../components/elements/StepsOfPages'
import GlobalLayout from '../../components/layouts/GlobalLayout'
import DropOffPoints from './DropOffPoints'
import { useSelector } from 'react-redux'
import PickUpPoints from './PickUpPoints'
import styles from "./styles.module.scss"
import pdf from "./pdf.module.scss"
import React, { useState } from 'react'
import html2canvas from "html2canvas";
import { useEffect } from 'react'
import jsPDF from "jspdf";
import ProgresBar from '../../components/elements/ProgresBar'
import env from '../../resources/env'
import { useConfirm } from '../../hooks/useConfirm'
let title = ""
let keywords = ""
let description = ""
const ReservationDocument = () => {
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { reservations, appData, params: { journeyType, tokenForArchieve } } = state
  const [reservId, setReservId] = useState("")

  const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
 
  const confirmationAlert = useConfirm({ previousUrl: "/", nextUrl: "/", message: "If you leave the page, all data will be deleted." })

  //when passenger gets reserv d we need archieve token
  const fetchArchieveToken = async (params = {}) => {
    let { id, stage } = params
    console.log(id, "inside fetchToken");


    let reservationObj = parseInt(journeyType) === 1 ? reservations : [reservations[0]];
    if (reservationObj.length > 1) {
      reservationObj = [
        {
          ...reservationObj[0],
          reservationDetails: {
            ...reservationObj[0].reservationDetails,
             id: id[0][0]
          },
        },
        {
          ...reservationObj[1],
          reservationDetails: {
            ...reservationObj[1].reservationDetails,
             id: id[0][1]
          },
        },
      ]
    } else {
      reservationObj = [
        {
          ...reservationObj[0],
          reservationDetails: {
            ...reservationObj[0].reservationDetails,
            id: id[0][0]
          },
        },
      ]
    }

    let url = `${env.apiDomain}/api/v1/sessions/add`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: tokenForArchieve,
        details: reservationObj,
        stage
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log({ stage, data, reservationObj });
  };

  const generatePdf = (e) => {
    if (typeof window === "object") {
      let file = document.getElementById("pdf_file");
      html2canvas(file, { logging: true, letterRendering: 1, useCORS: true, })
        .then(function (canvas) {
          var imgData = canvas.toDataURL("img/png", "red");
          var doc = new jsPDF("p", "mm", "a4");
          doc.addImage(
            imgData,
            "PNG",
            20,
            reservations[1]?.quotation?.token ? 0 : 10,
            file.clientWidth / 5,
            reservations[1]?.quotation?.token ? file.clientHeight / 6.7 : file.clientHeight / 5.2
          );
          doc.save("reserv.pdf");

        });

    }
  };
  function isJSON(string) {
    try {
      let json = JSON.parse(string);
      return true;
    } catch (error) {
      return false;
    }
  }
  const submitDataToGetReservId = () => {

    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({ reservation: reservations, configurations: { sendConfirmationEmailToPassenger: true } })
    const url = `${env.apiDomain}/api/v1/reservation/`
    var requestOptions = { method, headers, body, };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        response = isJSON(isJSON) ? JSON.parse(response) : response;


        if (typeof response === "object" && response.status === 200) {
          setReservId(response.data["reservations-ids"] ? response.data["reservations-ids"] : null);
          console.log(response, "reservation id responds");
          fetchArchieveToken({ id: response.data["reservations-ids"], stage: "GET_RESERVATION_ID" });

        } else {
          fetchArchieveToken({ id: [[null], [null]], stage: "GET_SERVER_RESPONED" });
          let location = "else part fetch response  https://api.london-tech.com/api/v1/reservation"
          let message = 'Churchil reservations-document Component - submitDataToGetReservId function fetch_response_ else part '
          let options = { requestOptions, response, body }
          window.handelErrorLogs(location, message, options)
        }
      })
      .catch((error) => {
        let location = error
        let message = 'Churchil reservations-document Component - submitDataToGetReservId function fetch_ cathc blog'
        let options = { body }
        window.handelErrorLogs(location, message, options)
      });
  };
  // scrolling from top
  useEffect(() => {
    const mainContainer = document?.querySelector("#main_container")
    window.scrollTo({ top: mainContainer?.offsetTop, left: 0, behavior: "smooth", })
    submitDataToGetReservId();
  }, [])

  useEffect(() => {
    if (reservId) {
      fetchArchieveToken({ id: reservId, stage: "RENDER_RESERVATION_DETAILS" });
    }
  }, [reservId]);
  return (
    <GlobalLayout keywords={keywords} title={title} description={description}>
      <div className="content-wrapper-outer clearfix">
        {reservId ?
          <div className="main-content quotaiton-main-content main-content-full">
            <StepsOfPages passengerDetails="completed" vehicle="completed" transferDetails="completed" payment="completed" confirmation="current" />
            <div className={styles.document_details_section} id="main_container"  >
              <div className={styles.first_section}>
                <div className={styles.icon_div}><i className="fa-solid fa-check"></i></div>
                <p className={styles.succes_message2}>Your booking is now confirmed!</p>
                <p className={styles.sub_succes_message}> Booking details has been sent to: {reservations[0].passengerDetails.email}</p>
              </div>
              {reservations.map((obj, index) => {
                let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints } = obj
                let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                let { phone, email, firstname } = passengerDetails
                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                return (
                  <div key={index}>
                    <div className={styles.second_section}>
                      {index === 1 ? <p className={styles.title}>Return Journey Booking Details </p> : <p className={styles.title}> Booking Details </p>}
                      <div className={styles.columns}>
                        <div className={styles.column_div}>
                          <div className={styles.text1}> Order Number</div>
                          <div className={styles.text2}> {reservId[0][index]}</div>
                        </div>
                        <div className={styles.column_div}>
                          <div className={styles.text1}> Date</div>
                          <div className={styles.text2}> {`${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`} {splitedHour}:{splitedMinute} </div>
                        </div>
                        <div className={styles.column_div}>
                          <div className={styles.text1}>Total</div>
                          <div className={styles.text2}>
                            £{parseInt(journeyType) === 0 ? reservations[0].quotation.price : parseInt(reservations[0].quotation.price) + parseInt(reservations[1].quotation.price)}
                          </div>
                        </div>
                        <div className={styles.column_div}>
                          <div className={styles.text1}>Payment Method</div>
                          <div className={styles.text2}>
                            {reservations[0]?.paymentDetails?.paymentType === 1 && "Pay With Cash To Driver"}
                            {reservations[0]?.paymentDetails?.paymentType === 2 && "Pay With Credit Card"}
                            {reservations[0]?.paymentDetails?.paymentType === 6 && "Pay With American Express"}
                            {reservations[0]?.paymentDetails?.paymentType === 7 && "Pay With Stripe"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.third_section}>
                      {index === 1 ? <p className={styles.title}>Return Journey Details </p> : <p className={styles.title}>Journey Details </p>}
                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Full Name </div>
                        <div className={styles.right}>{firstname} </div>
                      </div>
                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Phone </div>
                        <div className={styles.right}>{phone}</div>
                      </div>
                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Email</div>
                        <div className={styles.right}>{email}</div>
                      </div>
                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Passengers Number</div>
                        <div className={styles.right}>{passengersNumber}</div>
                      </div>

                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Vehicle Type</div>
                        <div className={styles.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.name : <React.Fragment></React.Fragment>}</div>
                      </div>
                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Transfer Type</div>
                        <div className={styles.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.transferType : <React.Fragment></React.Fragment>}</div>
                      </div>
                      <PickUpPoints selectedPickupPoints={selectedPickupPoints} />
                      <DropOffPoints selectedDropoffPoints={selectedDropoffPoints} />
                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Price</div>
                        <div className={styles.right}>£{quotation.price}</div>
                      </div>
                      <div className={styles.passenger_info}>
                        <div className={styles.left}>Special Requests</div>
                        <div className={styles.right}>{specialRequests}</div>
                      </div>
                    </div>
                  </div>)
              })}
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, display: 'block', zIndex: -1000, width: 0, height: 0, overflow: 'hidden' }}>
              <div style={{ width: 1080, minHeight: 1000 }}>
                <div className={pdf.document_details_section_pdf} id="pdf_file"  >
                  <div className={pdf.first_section}>
                    <div className={pdf.icon_div}><i className="fa-solid fa-check"></i></div>
                    <p className={pdf.succes_message}> Your order was submitted successfully!</p>
                    <p className={pdf.succes_message2}>Your booking is now confirmed!</p>

                    <p className={pdf.sub_succes_message}> Booking details has been sent to: admin@bookingcore.test</p>
                  </div>
                  {reservations.map((obj, index) => {
                    let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints } = obj
                    let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
                    let { phone, email, firstname } = passengerDetails
                    const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                    const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                    return (
                      <div key={index}>
                        <div className={pdf.second_section}>
                          {index === 1 ? <p className={pdf.title}>Return Journey Booking Details </p> : <p className={pdf.title}> Booking Details </p>}
                          <div className={pdf.columns}>
                            <div className={pdf.column_div}>
                              <div className={pdf.text1}> Order Number</div>
                              <div className={pdf.text2}> {reservId[0][index]}</div>
                            </div>
                            <div className={pdf.column_div}>
                              <div className={pdf.text1}> Date</div>
                              <div className={pdf.text2}> {splitedDate} {splitedHour}:{splitedMinute} </div>
                            </div>
                            <div className={pdf.column_div}>
                              <div className={pdf.text1}>Total</div>
                              <div className={pdf.text2}>
                                £{parseInt(journeyType) === 0 ? reservations[0].quotation.price : parseInt(reservations[0].quotation.price) + parseInt(reservations[1].quotation.price)}
                              </div>
                            </div>
                            <div className={pdf.column_div}>
                              <div className={pdf.text1}>Payment Method</div>
                              <div className={pdf.text2}>Pay With Cash</div>
                            </div>
                          </div>
                        </div>
                        <div className={pdf.third_section}>
                          {index === 1 ? <p className={pdf.title}>Return Journey Details </p> : <p className={pdf.title}>Journey Details </p>}
                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Full Name </div>
                            <div className={pdf.right}>{firstname} </div>
                          </div>
                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Phone </div>
                            <div className={pdf.right}>{phone}</div>
                          </div>
                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Email</div>
                            <div className={pdf.right}>{email}</div>
                          </div>
                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Passengers Number</div>
                            <div className={pdf.right}>{passengersNumber}</div>
                          </div>

                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Vehicle Type</div>
                            <div className={pdf.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.name : <React.Fragment></React.Fragment>}</div>
                          </div>
                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Transfer Type</div>
                            <div className={pdf.right}>{typeof carObject === "object" ? carObject[quotation?.carId]?.transferType : <React.Fragment></React.Fragment>}</div>
                          </div>
                          <PickUpPoints selectedPickupPoints={selectedPickupPoints} />
                          <DropOffPoints selectedDropoffPoints={selectedDropoffPoints} />
                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Price</div>
                            <div className={pdf.right}>£{quotation.price}</div>
                          </div>
                          <div className={pdf.passenger_info}>
                            <div className={pdf.left}>Special Requests</div>
                            <div className={pdf.right}>{specialRequests}</div>
                          </div>
                        </div>
                      </div>)
                  })}
                </div>
              </div>
            </div>
            <div className="main-content quotaiton-main-content main-content-full">
              <div className={styles.document_details_section}>
                <div className={styles.btn_div}><button onClick={generatePdf} className='btn btn_primary mb_3'>Downland The Confirmation</button></div>
              </div>
            </div>
          </div>
          :
          <ProgresBar />
        }
      </div>
    </GlobalLayout>

  )
}

export default ReservationDocument

export async function getServerSideProps({ req, res }) {
  if (req.url === "/reservations-document") {
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

