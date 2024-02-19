import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hours, minutes } from '../../../constants/minutesHours';
import styles from "./styles.module.scss"
import RadioButton from '../../elements/RadioButton'
import env from '../../../resources/env';
import { splitDateTimeStringIntoHourAndMinute } from '../../../helpers/splitHelper';
import { splitDateTimeStringIntoDate } from '../../../helpers/splitHelper';
import HandleSearchResults from '../../elements/HandleSearchResults';
import SelectedPointsOnHomePage from '../../elements/SelectedPointsOnHomePage';
import { useRouter } from 'next/router';
import { currentDate } from '../../../helpers/getDates';
import { ifHasUnwantedCharacters } from '../../../helpers/ifHasUnwanted';
import OutsideClickAlert from '../../elements/OutsideClickAlert';
const collectPoints = (params = {}, callback = () => { }) => {

  let { value = '', reducerSessionToken = "" } = params;
  const url = `${env.apiDomain}/api/v1/suggestions`;
  const method = "POST"
  const headers = { "Content-Type": "application/json" }
  const body = JSON.stringify({ value, "session-token": reducerSessionToken })
  const config = { method, headers, body }

  fetch(url, config)
    .then((res) => res.json())
    .then((res) => {
      callback(res)
      console.log("callback hissesi");

    })
    .catch((error) => {
      let message = "Churchill  Hero component _collectPoints()  function catch blog "
      window.handelErrorLogs(error, message, { config })
      console.log({ message: "Catch blocg", error });

    });
}
const collectPointsAsync = params => new Promise((resolve, reject) => collectPoints(params, log => resolve(log)))

//getting quotations
const collectQuotations = (params = {}, callback = () => { }) => {

  let { reservations, journeyType } = params

  //transfer
  let trSelectedPickPoints = reservations[0]?.selectedPickupPoints;
  let trSelectedDroppPoints = reservations[0]?.selectedDropoffPoints;
  let transferDAteTimeString = reservations[0]?.transferDetails?.transferDateTimeString;
  //return
  let returnPickPoints = reservations[1]?.selectedPickupPoints;
  let returnDroppPoints = reservations[1]?.selectedDropoffPoints;
  let returnDAteTimeString = reservations[1]?.transferDetails?.transferDateTimeString;

  const url = `${env.apiDomain}/api/v1/quotation`;
  const method = "POST"
  const headers = { "Content-Type": "application/json" }

  const configTransfer = {
    method,
    headers,
    body: JSON.stringify({
      selectedPickupPoints: trSelectedPickPoints,
      selectedDropoffPoints: trSelectedDroppPoints,
      transferDateTimeString: transferDAteTimeString,
    }),
  };


  const configReturn = {
    method,
    headers,
    body: JSON.stringify({
      selectedPickupPoints: returnPickPoints,
      selectedDropoffPoints: returnDroppPoints,
      transferDateTimeString: returnDAteTimeString,
    }),
  };

  //check if tru then get oneway guotations
  if (parseInt(journeyType) === 0) {
    fetch(url, configTransfer)
      .then((res) => res.json())
      .then((data) => {
        callback(data, "data");

      })
      .catch((error) => {
        let message = "Churchill  Hero component _collectQuotations()  function catch blog  parseInt(journeyType) === 0"
        window.handelErrorLogs(error, message, { configTransfer })
      });
  } else {
    Promise.all([fetch(url, configTransfer), fetch(url, configReturn)])
      .then(function (responses) { return Promise.all(responses.map(function (response) { return response.json() })) })
      .then(function (data) {
        callback(data, "data");
      })
      .catch(function (error) {
        let message = "Churchill  Hero component _collectQuotations()  function catch blog  else part of>> parseInt(journeyType) === 0"
        window.handelErrorLogs(error, message, { configReturn })
      });
  }
}
const collectQuotationsAsync = params => new Promise((resolve, reject) => collectQuotations(params, log => resolve(log)))

//inputfields handling errors When goto next page
const checkingErrorOnInputFields = (params = {}) => {
  let { setInternalState, reservations, journeyType } = params
  var { selectedPickupPoints, selectedDropoffPoints } = reservations[journeyType]

  var isJourneyPointsEmpty = selectedPickupPoints.length < 1 || selectedDropoffPoints.length < 1
  if (selectedPickupPoints.length < 1) setInternalState({ [`pickup-points-error-${journeyType}`]: "Select one point at least, invalid" })
  //checking for one  journey inputsfields
  if (selectedDropoffPoints.length < 1) setInternalState({ [`dropoff-points-error-${journeyType}`]: "Select one point at least, invalid" })
  return isJourneyPointsEmpty

}

//when we click getQuotations there we check fields .If fields not empty then it will be triggering
const readyToCollectQuotations = (params = {}) => {
  (async () => {
    let { dispatch, setInternalState, router, journeyType, reservations } = params

    setInternalState({ ["quotation-loading"]: true })
    let log = await collectQuotationsAsync({ reservations, journeyType })
    console.log(log);
    //if our journey both way
    if (parseInt(journeyType) === 1) {
      let { status: status1 } = log[0]
      let { status: status2 } = log[1]
      if (status1 !== 200 && log[0]?.error?.global[0]) {
        setInternalState({ ["error-booking-message-0"]: log[0]?.error?.global[0] })
        setTimeout(() => {
          setInternalState({ [`error-booking-message-0`]: "" })
        }, 2500);
      }
      if (status2 !== 200 && log[1]?.error?.global[0]) {
        setInternalState({ ["error-booking-message-1"]: log[1]?.error?.global[0] })
        setTimeout(() => {
          setInternalState({ [`error-booking-message-1`]: "" })
        }, 2500);
      }
      if (status1 === 200 && status2 === 200) {
        pushToQuotationsResultPage({ dispatch, router, log, journeyType })
        setInternalState({ ["error-booking-message-0"]: "" })
        setInternalState({ ["error-booking-message-1"]: "" })
      }

    } else {
      let { status } = log
      if (status === 200) {
        pushToQuotationsResultPage({ dispatch, router, log, journeyType })
      } else {
        setInternalState({ [`error-booking-message-0`]: log?.error?.global[0] })
        setTimeout(() => {
          setInternalState({ [`error-booking-message-0`]: "" })
        }, 2500);
      }
    }
    setInternalState({ ["quotation-loading"]: false })
  })()
}
const pushToQuotationsResultPage = (params = {}) => {
  let { dispatch, router, log, journeyType } = params
  dispatch({ type: "GET_QUOTATION", data: { results: log, journeyType } })
  router.push("/quotation-result")
}
const Hero = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const state = useSelector((state) => state.pickUpDropOffActions)
  let { reservations, params } = state
  let { sessionToken: reducerSessionToken, journeyType } = params

  let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
    'pickup-search-value-0': '',
    'dropoff-search-value-0': '',
    'pickup-search-value-1': '',
    'dropoff-search-value-1': '',
    'collecting-pickup-points-0': [],
    'collecting-dropoff-points-0': [],
    'collecting-pickup-points-1': [],
    'collecting-dropoff-points-1': [],
    'pickup-search-loading-0': false,
    'dropoff-search-loading-0': false,
    'pickup-search-loading-1': false,
    'dropoff-search-loading-1': false,
    'show-pickup-extra-point-0': false,
    'show-dropoff-extra-point-0': false,
    'show-pickup-extra-point-1': false,
    'show-dropoff-extra-point-1': false,
    //errors if doesnt exist selectedPoints
    "pickup-points-error-0": "",
    "dropoff-points-error-0": "",
    "pickup-points-error-1": "",
    "dropoff-points-error-1": "",
    //focus
    'pickup-search-focus-0': false,//it is for modal
    'dropoff-search-focus-0': false,//it is for modal
    'pickup-search-focus-1': false,//it is for modal
    'dropoff-search-focus-1': false,//it is for modal

    "quotation-loading": false,
    "error-booking-message-0": "",
    "error-booking-message-1": ""

  })

  const onChangeHanler = (params = {}) => {
    let { index, value, destination } = params
    let { passengerDetails: { token: passengerDetailsToken } } = reservations[0]
    console.log({ params });

    //hinder user  to add some Characters
    if (ifHasUnwantedCharacters(value)) return

    setInternalState({ [`${destination}-search-value-${index}`]: value })

    if (value.length > 2) {
      (async () => {
        //set input loading to true
        setInternalState({ [`${destination}-search-loading-${index}`]: true })
        let log = await collectPointsAsync({ value, reducerSessionToken })
        let { status, result, "session-token": sessionToken = "", token } = log
        console.log({ log });

        if (status == 200) {
          setInternalState({ [`${destination}-search-loading-${index}`]: false })

          //if we dont have passengerDetailsToken then save token on reservation objects;s passenger details
          if (!passengerDetailsToken) dispatch({ type: 'SET_TOKEN_TO_PASSENGERDETAILS', data: { token } })

          //check if session doesnt exist then  set session token to the reducer
          if (!reducerSessionToken) dispatch({ type: 'SET_SESSION_TOKEN', data: { sessionToken } });

          setInternalState({ [`collecting-${destination}-points-${index}`]: result })
        } else {
          setInternalState({ [`collecting-${destination}-points-${index}`]: {} })
          setInternalState({ [`${destination}-search-loading-${index}`]: false })
        }
      })()
    } else {
      //reset collecting points
      console.log("iki uzunugunnan kucuk");

      setInternalState({ [`collecting-${destination}-points-${index}`]: [] })
    }
  }

  const onChangeSetDateTimeHandler = (params = {}) => {
    let { value, hourOrMinute, journeyType } = params
    dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType, hourOrMinute, value } })
  }

  const handleAddNewInput = (params = {}) => {
    let { index, destination } = params
    setInternalState({ [`show-${destination}-extra-point-${index}`]: false })
  }

  const getQuotations = () => {

    let isReturnJourneyEmpty, isOneWayJourneyEmpty;

    isOneWayJourneyEmpty = checkingErrorOnInputFields({ setInternalState, reservations, journeyType: 0 })

    //if points are not empty then get quotations
    if (parseInt(journeyType) === 1) {
      isReturnJourneyEmpty = checkingErrorOnInputFields({ setInternalState, reservations, journeyType: 1 })
      //if both way journey fields not empty
      if (!isReturnJourneyEmpty && !isOneWayJourneyEmpty) {
        readyToCollectQuotations({ dispatch, setInternalState, router, journeyType: 1, reservations })
      }
    } else {
      if (!isOneWayJourneyEmpty) {
        readyToCollectQuotations({ dispatch, setInternalState, router, journeyType: 0, reservations })
      }
    }


  }
  const closeModal = (params = {}) => {
    let { index, destination } = params
    let inputField = document.getElementById("input_focused")
    inputField.style.opacity = 1
    setInternalState({ [`${destination}-search-focus-${index}`]: false, [`${destination}-search-value-${index}`]: "", [`collecting-${destination}-points-${index}`]: [] })

  }
  const setFocusToInput = (params = {}) => {
    let { e, destination, index } = params

    e.target.style.opacity = 0
    setInternalState({ [`${destination}-search-focus-${index}`]: window.innerWidth > 990 ? false : true })
    setTimeout(() => e.target.style.opacity = 1);
  }

  const outsideClick = ({ destination, index }) => {
    //it means if we have seggested points then it will work otherwise it is nt
    if (!Array.isArray(internalState[`collecting-${destination}-points-${index}`])) {
      setInternalState({ [`collecting-${destination}-points-${index}`]: [], [`${destination}-search-focus-${index}`]: false })
    }
  }

  //deleting input field
  const deleteField = (params = {}) => {
    let { destination, index } = params
    setInternalState({
      [`${destination}-search-value-${index}`]: "",
      [`${destination}-points-error-${index}`]: "",
      [`${destination}-search-focus-${index}`]: false,
      [`collecting-${destination}-points-${index}`]: [],
      [`show-${destination}-extra-point-${index}`]: true,
    })
  }

  //when we go quotation page then go back In that case we should check
  //if we have points or not.According for that we will show add extrapoint or not
  useEffect(() => {
    let { selectedDropoffPoints, selectedPickupPoints } = reservations[0]
    if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
      setInternalState({ [`show-pickup-extra-point-0`]: true, [`show-dropoff-extra-point-0`]: true })
    }
    dispatch({ type: "CHECHK_FLIGHT_WAITING_TIME", data: { journeyType } })

    if (localStorage.getItem("meetyourneeds") === "yes") {
      dispatch({ type: 'RESET_SELECTED_POINTS' })
    }
  }, [])

  return (

    <div className={`large-header-wrapper ${styles.large_header_wrapper}`} >
      <div className={`large-header ${styles.large_header}`}>
        <div className={styles.header_booking_form_wrapper}>
          <div className={styles.booking_tabs}>
            <RadioButton setInternalState={setInternalState} />

            <form action="">
              {reservations?.map((obj, index) => {

                let { transferDetails, selectedPickupPoints, selectedDropoffPoints } = obj
                let { transferDateTimeString } = transferDetails

                const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []

                return (
                  <div key={index} className={styles.journey_tab} >
                    {index == 1 ? <div className={styles.return_journey_title}>Return Journey Details</div> : <React.Fragment></React.Fragment>}

                    {selectedPickupPoints.length > 0 ? <p className={styles.point_title}>Pick Up Points </p> : <React.Fragment></React.Fragment>}
                    {/* selectedPoints */}
                    {selectedPickupPoints.length > 0 ? <SelectedPointsOnHomePage index={index} destination="pickup" points={selectedPickupPoints} /> : <React.Fragment></React.Fragment>}
                    {/* add extra pooint div */}
                    {internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 ?
                      <div className={styles.add_point_div} onClick={() => handleAddNewInput({ index, destination: "pickup" })}  >
                        <i className={`fa-solid fa-plus ${styles.add_point_icon}`}  ></i>
                        <p className={styles.add_point_text}>  Add Extra Point   </p>
                      </div> : <React.Fragment></React.Fragment>}
                    {internalState[`pickup-points-error-${index}`] ? <p className={styles.error_message}>{internalState[`pickup-points-error-${index}`]} </p> : <React.Fragment></React.Fragment>}
                    <div className={styles.book_input} >

                      <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "pickup", index })}>
                        <div f={String(internalState[`pickup-search-focus-${index}`])} className={styles['search-input-container']}>

                          <div className={styles.popup_header} f={String(internalState[`pickup-search-focus-${index}`])}>
                            <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "pickup" })}></i>
                            <p>From ?</p>
                          </div>

                          {/* input handler :if we do not wahe points by default it will show => selectedPickupPoints.length === 0*/}
                          {selectedPickupPoints.length === 0 || (!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0) ?
                            <input
                              id="input_focused"
                              type="text"
                              autoComplete="off"
                              placeholder="Pick Up Address"
                              value={internalState[`pickup-search-value-${index}`]}
                              onFocus={e => setFocusToInput({ e, destination: "pickup", index })}
                              onChange={(e) => onChangeHanler({ index, destination: 'pickup', value: e.target.value })}
                              className={` ${internalState[`pickup-search-loading-${index}`] ? "ui-autocomplete-loading" : ""}`}
                              f={String(internalState[`pickup-search-focus-${index}`])} //giving a style if we focused
                            /> : <React.Fragment></React.Fragment>}

                          {/* //delete field icon inside input  */}
                          {(!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 && !internalState[`pickup-search-loading-${index}`]) ?
                            <i onClick={(e) => deleteField({ destination: "pickup", index })} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                            : <React.Fragment></React.Fragment>}



                          {/* if !internalState[`pickup-search-value-${index}`] then our handleSearchResults will be belong to styles.book.input */}
                          {!Array.isArray(internalState[`collecting-pickup-points-${index}`]) ?
                            //setInternalState>>>after adding item we set input field  to empty and add extradiv to true
                            <HandleSearchResults index={index} destination="pickup" setInternalState={setInternalState} collectingPoints={internalState[`collecting-pickup-points-${index}`]} /> : <React.Fragment></React.Fragment>}

                        </div>
                      </OutsideClickAlert>
                    </div>

                    {/*//! <!-- dropoff points  start *** dropoff points  start ** dropoff points  start **dropoff points  start --> */}
                    {selectedDropoffPoints.length > 0 && <p className={styles.point_title}>Drop Off Points </p>}

                    {selectedDropoffPoints.length > 0 ? <SelectedPointsOnHomePage index={index} destination="dropoff" points={selectedDropoffPoints} /> : <React.Fragment></React.Fragment>}
                    {/* add extra pooint div */}
                    {internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 ?
                      <div className={styles.add_point_div} onClick={() => handleAddNewInput({ index, destination: "dropoff" })}  >
                        <i className={`fa-solid fa-plus ${styles.add_point_icon}`}  ></i>
                        <p className={styles.add_point_text}>  Add Extra Point   </p>
                      </div> : <React.Fragment></React.Fragment>}

                    {internalState[`dropoff-points-error-${index}`] ? <p className={styles.error_message}>{internalState[`dropoff-points-error-${index}`]} </p> : <React.Fragment></React.Fragment>}
                    <div className={styles.book_input} >
                      <OutsideClickAlert onOutsideClick={(e) => outsideClick({ destination: "dropoff", index })}>
                        <div f={String(internalState[`dropoff-search-focus-${index}`])} className={styles['search-input-container']}>

                          <div className={styles.popup_header} f={String(internalState[`dropoff-search-focus-${index}`])}>
                            <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index, destination: "dropoff" })}></i>
                            <p>To where ?</p>
                          </div>

                          {/* input handler :if we do not wahe points by default it will show => selectedPickupPoints.length === 0*/}
                          {selectedDropoffPoints.length === 0 || (!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0) ?
                            <input type="text"
                              autoComplete="off"
                              placeholder="Drop Off Address"
                              value={internalState[`dropoff-search-value-${index}`]}
                              onFocus={e => setFocusToInput({ e, destination: "dropoff", index })}
                              onChange={(e) => onChangeHanler({ index, destination: 'dropoff', value: e.target.value })}
                              className={` ${internalState[`dropoff-search-loading-${index}`] ? "ui-autocomplete-loading" : ""}`}
                              f={String(internalState[`dropoff-search-focus-${index}`])}
                            /> : <React.Fragment></React.Fragment>}

                          {/* //delete field icon inside input  */}
                          {(!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 && !internalState[`dropoff-search-loading-${index}`]) ?
                            <i onClick={(e) => deleteField({ destination: "dropoff", index })} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                            : <React.Fragment></React.Fragment>}
                          {/* results when we get points */}
                          {!Array.isArray(internalState[`collecting-dropoff-points-${index}`]) ?
                            <HandleSearchResults index={index} destination="dropoff" setInternalState={setInternalState} collectingPoints={internalState[`collecting-dropoff-points-${index}`]} /> : <React.Fragment></React.Fragment>}
                        </div>
                      </OutsideClickAlert>
                    </div>
                    {/*//! <!-- finish dro off handle inputs--> */}
                    <div className={`${styles.book_input} ${styles.book_input_date}`}>
                      <label >{selectedPickupPoints[0]?.pcatId === 1 ? `Flight Landing ` : "Pick Up"} Date</label>
                      {/* hasflightpick={String(selectedPickupPoints[0]?.pcatId === 1)} */}
                      <div className={styles.date_div}>
                        <input
                          type="date"
                          name="pickup-date"
                          value={splitedDate}
                          min={index === 0 ? currentDate() : reservations[0].transferDetails.transferDateTimeString.split(" ")[0]}
                          onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", journeyType: index })}
                        />
                      </div>
                      <i className={`fa-solid fa-calendar-days ${styles.date_picker_icon}`}></i>
                    </div>
                    <div className={styles.hours_minutes}>
                      <div className={styles.booking_form_title}>
                        {/*  hasflightpick={String(selectedPickupPoints[0]?.pcatId === 1)} */}
                        <label >{selectedPickupPoints[0]?.pcatId === 1 ? "Flight Landing" : "Pick Up"} Time</label>
                      </div>
                      <div className={styles.select_time_div}>
                        {Array.from(new Array(2)).map((arr, i) => {
                          return (<div key={i} className={styles.booking_form_hour_minute_wrapper}>
                            <i className="fa-sharp fa-solid fa-angle-down"></i>
                            <select
                              defaultValue={i === 0 ? splitedHour : splitedMinute}
                              onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })} >
                              {/* //if index==0 thenhours will show up if not then minutes show up */}
                              {i === 0
                                ? hours.map((hour) => (<option key={hour.id} id={hour.id} value={hour.value}> {hour.value} </option>))
                                : minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value}  > {minute.value} </option>))}
                            </select>
                          </div>)
                        })}
                      </div>
                    </div>
                    {internalState[`error-booking-message-${index}`] ?
                      <div className={styles.errorBookedMessage}>
                        <p>{internalState[`error-booking-message-${index}`]}</p>
                      </div>
                      : <></>}
                  </div>
                )
              })}

              <div className={styles.form_btn_div_flex}>
                <div className={`btn_primary btn mt_1 ${styles.btn_div}`} onClick={() => getQuotations()}>
                  <span>{internalState[`quotation-loading`] ? "Loading" : "Reserve Now"}</span>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero
