import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardQuotationItem from '../../components/elements/CardQuotationItem';
import HandleSearchResults from '../../components/elements/HandleSearchResults';
import SelectedPointsOnHomePage from '../../components/elements/SelectedPointsOnHomePage';
import StepsOfPages from '../../components/elements/StepsOfPages';
import GlobalLayout from '../../components/layouts/GlobalLayout';
import { hours, minutes } from '../../constants/minutesHours';
import { currentDate } from '../../helpers/getDates';
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwanted';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper';
import env from '../../resources/env';
import { useConfirm } from '../../hooks/useConfirm'
import styles from "./styles.module.scss"
let keywords = ""
let title = "Select a Vehicle - Churchill Transfers: London Airport Transfers - churchilltransfers.com"
let description = ""




const collectPoints = (params = {}, callback = () => { }) => {

    let { value = '', reducerSessionToken = "" } = params;
    const url = `${env.apiDomain}/api/v1/suggestions`;
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({ value, "session-token": reducerSessionToken })
    const config = { method, headers, body }

    fetch(url, config)
        .then((res) => res.json())
        .then((res) => { callback(res) })
        .catch((error) => {
            let message = "Churchill  quotation result  component _ collectPoints()  function catch blog  "
            window.handelErrorLogs(error, message, { config })
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
    console.log({ trSelectedPickPoints },
        { trSelectedDroppPoints },
        { transferDAteTimeString });

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
                let message = "Churchill  quotation result  component _ collectPoints()  function catch blog     if part >>     parseInt(journeyType) === 0  "
                window.handelErrorLogs(error, message, { configTransfer })
            });
    } else {
        Promise.all([fetch(url, configTransfer), fetch(url, configReturn)])
            .then(function (responses) { return Promise.all(responses.map(function (response) { return response.json() })) })
            .then(function (data) {
                callback(data, "data");
            })
            .catch(function (error) {
                let message = "Churchill  quotation result  component _ collectPoints()  function catch blog    else part of  >>     parseInt(journeyType) === 0  "
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

    //checking for one  journey inputsfields
    if (isJourneyPointsEmpty) {
        setInternalState({ [`pickup-points-error-${journeyType}`]: "Select one point at least, invalid" })
        setInternalState({ [`dropoff-points-error-${journeyType}`]: "Select one point at least, invalid" })
    }

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
            if (status1 !== 200 && log[0]?.error?.global?.[0]) {
                setInternalState({ ["error-booking-message-0"]: log[0]?.error?.global[0] })
            }
            if (status2 !== 200 && log[1]?.error?.global?.[0]) {
                setInternalState({ ["error-booking-message-1"]: log[1]?.error?.global[0] })
            }
            if (status1 === 200 && status2 === 200) {
                pushToQuotationsResultPage({ dispatch, router, log, journeyType })
                setInternalState({ ["error-booking-message-1"]: "" })
                setInternalState({ ["error-booking-message-0"]: "" })

            }

        } else {
            let { status } = log

            if (status === 200) {
                pushToQuotationsResultPage({ dispatch, router, log, journeyType })
                setInternalState({ ["error-booking-message-0"]: "" })
            }
            if (log?.error?.global?.[0]) {
                setInternalState({ ["error-booking-message-0"]: log?.error?.global[0] })
            }
        }
        setInternalState({ ["quotation-loading"]: false })
    })()
}
const pushToQuotationsResultPage = (params = {}) => {
    let { dispatch, router, log, journeyType } = params
    dispatch({ type: "GET_QUOTATION", data: { results: log, journeyType } })
    // router.push("/quotation-result")
}
const QuotationResults = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    let state = useSelector((state) => state.pickUpDropOffActions)
    //this quotations parametr is:  the quotations which we collect on home page
    let { params, reservations } = state
    let { quotations, sessionToken: reducerSessionToken, journeyType } = params
    //in order having confirmation message
    const confirmationAlert = useConfirm({ previousUrl: "/", nextUrl: "/transfer-details", message: "If you refresh the page, all data will be deleted." })

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
        //quotation loading
        "quotation-loading": false,
        "error-booking-message-0": "",
        "error-booking-message-1": "",


    })
    const onChangeHanler = (params = {}) => {
        let { index, value, destination } = params
        let { passengerDetails: { token: passengerDetailsToken } } = reservations[0]

        //hinder user  to add some Characters
        if (ifHasUnwantedCharacters(value)) return

        setInternalState({ [`${destination}-search-value-${index}`]: value })

        if (value.length > 2) {
            (async () => {
                //set input loading to true
                setInternalState({ [`${destination}-search-loading-${index}`]: true })

                let log = await collectPointsAsync({ value, reducerSessionToken })
                let { status, result, "session-token": sessionToken = "", token } = log

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
            setInternalState({ [`collecting-${destination}-points-${index}`]: [] })
        }
    }

    //it is valid when our journey is both way
    const gotoTransferDetailsClick = () => {
        let { quotation: transferQuotation } = reservations[0]
        let { quotation: returnQuotation } = reservations[1]
        //if quotation token doesnt exist ,it means he /she can go to next page

        if (!returnQuotation.token && !transferQuotation.token) {
            alert("Please select which quotation do you want  for your journey?");
            return
        }

        if (!returnQuotation.token) {
            alert("Please select which quotation do you want  for your return  journey?");
            return
        }
        if (!transferQuotation.token) {
            alert("Please select which quotation do you want  for your journey?");
            return
        }

        router.push("/transfer-details");

    };
    const onChangeSetDateTimeHandler = (params = {}) => {
        let { value, hourOrMinute, journeyType } = params
        dispatch({ type: 'SET_JOURNEY_DATETIME', data: { journeyType, hourOrMinute, value } })
        // getQuotations()
    }
    const handleAddNewInput = (params = {}) => {
        let { index, destination } = params
        setInternalState({ [`show-${destination}-extra-point-${index}`]: false })
    }


    const getQuotations = () => {
        let isReturnJourneyEmpty, isOneWayJourneyEmpty;
        console.log(reservations);

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
            setInternalState({ [`show-pickup-extra-point-0`]: true })
            setInternalState({ [`show-dropoff-extra-point-0`]: true })
        }

        if (journeyType === 1) {
            let { selectedDropoffPoints, selectedPickupPoints } = reservations[1]
            if (selectedDropoffPoints?.length > 0 && selectedPickupPoints?.length > 0) {
                setInternalState({ [`show-pickup-extra-point-1`]: true })
                setInternalState({ [`show-dropoff-extra-point-1`]: true })
            }
        }

        //scrolling
        const mainContainer = document.querySelector("#main_container")
        window.scrollTo({ top: mainContainer.offsetTop, left: 0, behavior: "smooth", })
    }, [])
    useEffect(() => {
        if (
            reservations?.[0]?.transferDetails?.transferDateTimeString ||
            reservations?.[1]?.transferDetails?.transferDateTimeString
        ) {
            getQuotations();
        }
    }, [reservations?.[0]?.transferDetails?.transferDateTimeString, reservations?.[1]?.transferDetails?.transferDateTimeString]);

    return (
        <GlobalLayout keywords={keywords} title={title} description={description}>
            {/* <Breadcrumb title="Quotation Result" /> */}
            <div className={"content-wrapper-outer clearfix"}>
                <div className="main-content quotaiton-main-content main-content-full">
                    <StepsOfPages vehicle="current" />
                    <div className={styles.quotation_section} id="main_container">
                        {reservations.map((obj, index) => {
                            let { transferDetails, selectedPickupPoints, selectedDropoffPoints } = obj
                            let { transferDateTimeString } = transferDetails

                            const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
                            const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
                        

                            return (
                                <div key={index} >
                                    {index === 1 ? <p className={styles.return_details_title}>Return Details</p> : ""}
                                    <div className={styles.main_container}>
                                        <div className={styles.quotation_panel}>
                                            <div className={styles.form_div} action="">
                                                <div className={styles.search_menu}>

                                                    <h4>Pick up location</h4>
                                                    {/* selectedPoints */}
                                                    {selectedPickupPoints.length > 0 &&
                                                        <SelectedPointsOnHomePage index={index} destination="pickup" points={selectedPickupPoints} getQuotations={getQuotations} />}
                                                    {/* add extra pooint div */}
                                                    {selectedPickupPoints.length > 0 &&
                                                        <div className={styles.add_point_div} onClick={() => handleAddNewInput({ index, destination: "pickup" })}  >
                                                            <i className={`fa-solid fa-plus ${styles.add_point_icon}`}  ></i>
                                                            <p className={styles.add_point_text}>  Add Extra Point   </p>
                                                        </div>}
                                                    <div className={styles.input_div}>
                                                        {selectedPickupPoints.length === 0 &&
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="Pick up address"
                                                                value={internalState[`pickup-search-value-${index}`]}
                                                                onChange={(e) => onChangeHanler({ index, destination: 'pickup', value: e.target.value })}
                                                                className={`${internalState[`pickup-points-error-${index}`] ? "border_error-2" : ""} ${internalState[`pickup-search-loading-${index}`] ? "ui-autocomplete-loading" : ""}`}
                                                            />}

                                                        {!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 &&
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="Pick up address"
                                                                value={internalState[`pickup-search-value-${index}`]}
                                                                onChange={(e) => onChangeHanler({ index, destination: 'pickup', value: e.target.value })}
                                                                className={`${internalState[`pickup-points-error-${index}`] ? "border_error-2" : ""} ${internalState[`pickup-search-loading-${index}`] ? "ui-autocomplete-loading" : ""}`}
                                                            />}
                                                        {(!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 && !internalState[`pickup-search-loading-${index}`]) ?
                                                            <i onClick={(e) => deleteField({ destination: "pickup", index })} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                                                            : <React.Fragment></React.Fragment>}
                                                        {internalState[`collecting-pickup-points-${index}`].constructor !== Array &&
                                                            //setInternalState>>>after adding item we set input field  to empty and add extradiv to true
                                                            <HandleSearchResults index={index} destination="pickup" setInternalState={setInternalState} collectingPoints={internalState[`collecting-pickup-points-${index}`]} getQuotations={getQuotations} />}
                                                    </div>
                                                </div>
                                                <div className={styles.search_menu}>
                                                    <h4>Drop off location</h4>
                                                    {selectedDropoffPoints.length > 0 &&
                                                        <SelectedPointsOnHomePage index={index} destination="dropoff" points={selectedDropoffPoints} getQuotations={getQuotations} />}

                                                    {/* add extra pooint div */}
                                                    {internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 &&
                                                        <div className={styles.add_point_div} onClick={() => handleAddNewInput({ index, destination: "dropoff" })}  >
                                                            <i className={`fa-solid fa-plus ${styles.add_point_icon}`}  ></i>
                                                            <p className={styles.add_point_text}>  Add Extra Point   </p>
                                                        </div>}

                                                    <div className={styles.input_div}>
                                                        {selectedDropoffPoints.length === 0 &&
                                                            <input type="text"
                                                                autoComplete="off"
                                                                placeholder="Drop 0ff address"
                                                                value={internalState[`dropoff-search-value-${index}`]}
                                                                onChange={(e) => onChangeHanler({ index, destination: 'dropoff', value: e.target.value })}
                                                                className={`${internalState[`dropoff-points-error-${index}`] ? "border_error-2" : ""} ${internalState[`dropoff-search-loading-${index}`] ? "ui-autocomplete-loading" : ""}`}
                                                            />}

                                                        {!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 &&
                                                            <input type="text"
                                                                autoComplete="off"
                                                                placeholder="Drop off address"
                                                                value={internalState[`dropoff-search-value-${index}`]}
                                                                onChange={(e) => onChangeHanler({ index, destination: 'dropoff', value: e.target.value })}
                                                                className={`${internalState[`dropoff-points-error-${index}`] ? "border_error-2" : ""} ${internalState[`dropoff-search-loading-${index}`] ? "ui-autocomplete-loading" : ""}`}

                                                            />}

                                                        {/* //delete field icon inside input  */}
                                                        {(!internalState[`show-dropoff-extra-point-${index}`] && selectedDropoffPoints.length > 0 && !internalState[`dropoff-search-loading-${index}`]) ?
                                                            <i onClick={(e) => deleteField({ destination: "dropoff", index })} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i>
                                                            : <React.Fragment></React.Fragment>}
                                                        {/* results when we get points */}
                                                        {internalState[`collecting-dropoff-points-${index}`].constructor !== Array &&

                                                            < HandleSearchResults index={index} destination="dropoff" setInternalState={setInternalState} collectingPoints={internalState[`collecting-dropoff-points-${index}`]} getQuotations={getQuotations} />}
                                                    </div>
                                                </div>
                                                <div className={styles.search_menu}>
                                                    <h4>{reservations[index]?.selectedPickupPoints[0]?.pcatId === 1 ? "Landing" : "Pick Up"} Date</h4>
                                                    <div className={styles.input_div}>
                                                        <input
                                                            type="date"
                                                            name="pickup-date"
                                                            value={splitedDate}
                                                            min={index === 0 ? currentDate() : reservations[1].transferDetails.transferDateTimeString.split(" ")[0]}
                                                            onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: "date", journeyType: index })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={`${styles.select_time_div} `}>
                                                    {Array.from(new Array(2)).map((arr, i) => {
                                                        return (<div key={i} className={styles.booking_form_hour_minute_wrapper}>
                                                            <i className="fa-sharp fa-solid fa-angle-down"></i>
                                                            <label htmlFor="time-select">
                                                                {i === 0
                                                                    ? `${selectedPickupPoints[0]?.pcatId === 1 ? "Landing" : "Pick Up"} Hour`
                                                                    : `${selectedPickupPoints[0]?.pcatId === 1 ? "Landing" : "Pick Up"} Minute`
                                                                }
                                                            </label>
                                                            <select
                                                                id="time-select"
                                                                defaultValue={i === 0 ? splitedHour : splitedMinute}
                                                                onChange={(e) => onChangeSetDateTimeHandler({ value: e.target.value, hourOrMinute: i === 0 ? "hour" : "minute", journeyType: index })} >
                                                                {/* //if index==0 thenhours will show up if not then minutes show up */}
                                                                {i === 0 ?
                                                                    hours.map((hour) => (<option key={hour.id} id={hour.id} value={hour.value}> {hour.value} </option>))
                                                                    :
                                                                    minutes.map((minute) => (<option key={minute.id} id={minute.id} value={minute.value} >{minute.value} </option>))}
                                                            </select>
                                                        </div>)
                                                    })}
                                                </div>

                                                <div className={`btn_primary btn mt_1 ${styles.button}`} onClick={() => getQuotations()} >
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                    <span>{internalState[`quotation-loading`] ? "Loading" : "Update "}</span>
                                                </div>
                                                {internalState[`error-booking-message-${index}`] ?
                                                    <div className={styles.errorBookedMessage}>
                                                        <p>{internalState[`error-booking-message-${index}`]}</p>
                                                    </div>
                                                    : <></>}
                                            </div>

                                        </div>
                                        <div className={styles.location_names_for_mobile}>
                                            {selectedPickupPoints.length > 0 ? <p className={styles.point_title}>Pick Up Points </p> : <React.Fragment></React.Fragment>}
                                            {/* selectedPoints */}
                                            {selectedPickupPoints.length > 0 ? <SelectedPointsOnHomePage index={index} destination="pickup" points={selectedPickupPoints} /> : <React.Fragment></React.Fragment>}
                                            {/* add extra pooint div */}
                                            {selectedDropoffPoints.length > 0 && <p className={styles.point_title}>Drop Off Points </p>}
                                            {selectedDropoffPoints.length > 0 ? <SelectedPointsOnHomePage index={index} destination="dropoff" points={selectedDropoffPoints} /> : <React.Fragment></React.Fragment>}
                                        </div>
                                        {/* //*Card item of results */}
                                        {!internalState[`error-booking-message-${index}`] && selectedPickupPoints.length > 0 && selectedDropoffPoints.length > 0 &&
                                            < CardQuotationItem quotationOptions={quotations[index].quotationOptions} index={index} selectedQuotation={reservations[index]?.quotation} quotationLoading={internalState[`quotation-loading`]} />}
                                        {index === 1 &&
                                            <div className={`${styles.items_buttons}`}>
                                                <div className={`${styles.item} ${styles.btn_item}`}> <div className={styles.item_body} onClick={() => router.back()}> <button>Go Back</button></div></div>
                                                <div className={`${styles.item} ${styles.btn_item}`}> <div className={styles.item_body} onClick={gotoTransferDetailsClick}><button>Book Now</button></div></div>
                                            </div>}

                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )
}

export default QuotationResults


//it is prevent us to go directly quotaion-result page
export async function getServerSideProps({ req, res }) {
    if (req.url === "/quotation-result") {
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

