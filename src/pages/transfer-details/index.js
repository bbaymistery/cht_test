import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../components/elements/Select';
import StepsOfPages from '../../components/elements/StepsOfPages'
import Textarea from '../../components/elements/Textarea';
import TextInput from '../../components/elements/TextInput';
import TransferJourneySummaryPanel from '../../components/elements/TransferJourneySummaryPanel';
import GlobalLayout from '../../components/layouts/GlobalLayout';
import { splitDateTimeStringIntoDate, splitDateTimeStringIntoHourAndMinute } from '../../helpers/splitHelper';
import CheckBox from './CheckBox';
import styles from "./styles.module.scss";
import SelectedPointsOnTransferDetails from '../../components/elements/SelectedPointsOnTransferDetails'
import { reservationSchemeValidator } from '../../helpers/reservationSchemeValidator';
import { ifHasUnwantedCharacters } from '../../helpers/ifHasUnwanted';
import { useRouter } from 'next/router';
import InfoModal from '../../components/elements/InfoModal/InfoModal'
import { useConfirm } from "../../hooks/useConfirm";
import FlightWaitingTimeContent from '../../components/elements/FlightWaitingTimeContent';
let title = ""
let keywords = ""
let description = ""
const TransferDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  let state = useSelector((state) => state.pickUpDropOffActions)
  let { reservations, appData, params: { passengerDetailsStatus, modalInfo } } = state
  //we use it to render paxs inside select component
  const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});
  let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
    'errorHolder': [],
  })
  let { errorHolder } = internalState;
  const confirmationAlert = useConfirm({ previousUrl: "/quotation-result", nextUrl: "/payment-details", message: "If you leave the page, all data will be deleted." })


  function checkValidation(e) {
    let errorHolder = reservationSchemeValidator({ reservations }, { checkTransferDetails: true });
    setInternalState({ errorHolder })
    if (errorHolder.status === 200) router.push("/payment-details")
  }


  const onchangeHandler = (e, index) => {
    let { name, value } = e.target;
    //hinder user  to add some Characters
    if (ifHasUnwantedCharacters(value)) return

    if (['firstname', 'email', 'phone'].includes(name)) {
      dispatch({ type: 'SET_PASSEGER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })
    }
    if (['passengersNumber', "specialRequests"].includes(name)) {
      dispatch({ type: 'SET_TRANSFER_DETAILS', data: { name, value, index, updateBothJourneyCheckBox: passengerDetailsStatus } })
    }
  }

  //scrolling from top
  useEffect(() => {
    const mainContainer = document.querySelector("#main_container")
    window.scrollTo({ top: mainContainer.offsetTop, left: 0, behavior: "smooth", })
  }, [])



  return (
    <GlobalLayout keywords={keywords} title={title} description={description}>
      <div className={"content-wrapper-outer clearfix"}>
        <div className="main-content quotaiton-main-content main-content-full">

          {modalInfo ? <InfoModal content={<FlightWaitingTimeContent />} /> : <React.Fragment></React.Fragment>}
          <StepsOfPages passengerDetails={"current"} vehicle="completed" />

          <div className={styles.transfer_details_section} id="main_container">
            {reservations.map((obj, index) => {
              let reservationError = (errorHolder.status === 403 && Array.isArray(errorHolder.reservations)) ? errorHolder.reservations[index] : {};
              let { transferDetails, passengerDetails, quotation, selectedPickupPoints, selectedDropoffPoints } = obj
              let { transferDateTimeString, passengersNumber, specialRequests } = transferDetails
              let { phone, email, firstname } = passengerDetails

              const [splitedHour, splitedMinute] = splitDateTimeStringIntoHourAndMinute(transferDateTimeString) || []
              const [splitedDate] = splitDateTimeStringIntoDate(transferDateTimeString) || []
              //passenger details errors
              return (
                <div key={index}>
                  <div className={styles.main_container}>
                    <div className={styles.details_panel}>
                      {/* //!passenger details for transfer journey */}
                      {/* //!if client choise unchecked for input checkbox then it will show up  */}
                      {index === 0 || (!passengerDetailsStatus && index === 1) ?
                        <div className={styles.passenger_details_div}>
                          {index === 0 ? <h2> Passenger Details</h2> : <h2 className={styles.return_pas_details_header}>Passenger Details For Return Journey</h2>}
                          <div className={styles.passenger_details}>
                            <div className={styles.input_div}>
                              <TextInput label="Full Name" type="text" name="firstname" onChange={e => onchangeHandler(e, index)} value={firstname} errorMessage={reservationError?.passengerDetails?.firstname} />
                            </div>
                            <div className={styles.input_div}>
                              <TextInput label="Email" type="text" name="email" onChange={e => onchangeHandler(e, index)} value={email} errorMessage={reservationError?.passengerDetails?.email} />
                            </div>
                            <div className={styles.input_div}>
                              <Select label="Number of passengers" name="passengersNumber" onChange={e => onchangeHandler(e, index)} value={passengersNumber} data={carObject[quotation.carId]?.pax} />
                            </div>
                            <div className={styles.input_div}>
                              <TextInput label="Phone Number" type="number" name="phone" onChange={e => onchangeHandler(e, index)} value={phone} errorMessage={reservationError?.passengerDetails?.phone} />
                              <p>* with international dialling code</p>
                            </div>
                          </div>
                        </div> : <React.Fragment></React.Fragment>}

                      {/* transfer || return  journey details  */}
                      <div className={styles.selected_points_details}>
                        <h2>{index === 0 ? "" : "Return"}  Journey Details</h2>
                        <div className={styles.selecteditems} >
                          <div className={`${styles.points} ${styles.selectedlist_points_left}`} >
                            <h3 className={styles.points_header}>Selected Pick Up points</h3>
                            {/* //index =0 it is like destination pickup  */}
                            <SelectedPointsOnTransferDetails selectedPoints={selectedPickupPoints} pointsError={reservationError['selectedPickupPoints']} journeyType={index} type='pickup' />
                          </div>
                          {/* {  selectedlist_points_left     bunu aldk select komponentde kulandk} */}
                          <div className={`${styles.points} ${styles.selectedlist_points_right}`}>
                            <h3 className={styles.points_header}>Selected Drop Off points</h3>
                            {/* //index =1 it is like destination dropoff */}
                            <SelectedPointsOnTransferDetails pointsError={reservationError['selectedDropoffPoints']} selectedPoints={selectedDropoffPoints} journeyType={index} type='dropoff' />
                          </div>
                        </div>
                      </div>

                      <div className={styles.textarea_div}>
                        <Textarea label="Special Request" name="specialRequests" value={specialRequests} onChange={(e) => onchangeHandler(e, index)} />
                      </div>
                      {index === 1 ? <CheckBox /> : <React.Fragment></React.Fragment>}
                    </div>

                    <TransferJourneySummaryPanel index={index} splitedHour={splitedHour} splitedMinute={splitedMinute} splitedDate={splitedDate} quotation={quotation} selectedDropoffPoints={selectedDropoffPoints} selectedPickupPoints={selectedPickupPoints} />
                  </div>
                </div>)
            })}

            {/* go back and next button */}
            <div className={styles.buttons}>
              <div className={styles.left}>
                <Link href="quotation-result">
                  <button className='btn btn_primary'>Go back</button>
                </Link>

                <button onClick={(e) => checkValidation(e)} className='btn btn_primary'>Next</button>
              </div>
              <div className={styles.right}>

              </div>
            </div>
          </div>

        </div>

      </div>
    </GlobalLayout>
  )
}

export default TransferDetails

//it is prevent us to go directly quotaion-result page
export async function getServerSideProps({ req, res }) {
  if (req.url === "/transfer-details") {
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

