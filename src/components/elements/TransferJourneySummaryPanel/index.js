import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { quotationImagesObj } from '../../../constants/quotationImages'
import env from '../../../resources/env'
import styles from "./styles.module.scss"
const TransferJourneySummaryPanel = (props) => {
    let { index, quotation, selectedPickupPoints, selectedDropoffPoints, splitedDate, splitedHour, splitedMinute } = props


    let state = useSelector((state) => state.pickUpDropOffActions)
    let { params, appData } = state
    let { quotations } = params;


    //cartypes object for card item as {1:{image:'sds, name:Economy}}
    const carObject = appData?.carsTypes?.reduce(
        (obj, item) => ({
            ...obj,
            [item.id]: item,
        }),
        {}
    );

    return (
        <div className={styles.journey_summary_panel}>
            <div className={styles.content}>
                <h3>{index === 0 ? "Booking Details" : "Return Journey Booking Details"}</h3>

                <div className={styles.journey_card}>
                    <div className={`${styles.img_div} ${quotation.carId === 4 ? styles.carIdFour : ""} ${quotation.carId === 6 || quotation.carId === 5 ? styles.cardIdSix : ""} `} style={{ backgroundImage: `url(${env.apiDomain}${quotationImagesObj[quotation?.carId]?.image})` }}>

                    </div>
                    <div className={styles.details_div}>
                        <div id="from to" className={styles.fromto}>
                            <h5>FROM:</h5>
                            {selectedPickupPoints.map((pickup, i) => { return <li key={i}><span>{i + 1}.  {pickup.address}</span></li> })}
                            <div className={styles.space}> </div>
                            <h5>TO:</h5>
                            {selectedDropoffPoints.map((dropoff, i) => { return <li key={i + 15}><span>{i + 1}. {dropoff.address}</span></li> })}
                            <h5>ON:</h5>
                            <li>
                                <span>
                                    {`${splitedDate.split(" ")[0].replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}`}
                                    &nbsp;
                                    {`${splitedHour}:${splitedMinute}`}
                                </span>
                            </li>
                        </div>
                    </div>
                </div>
                <div className={styles.total_journey}>
                    <div className={styles.text_1}>Total Length of journey: </div>
                    <div className={styles.duration}>
                        <span>Distance</span>
                        <span>{quotations[index].distance}</span>
                    </div>
                    <div className={styles.duration}>
                        <span>Duration</span>
                        <span>{quotations[index].duration}</span>
                    </div>
                </div>
                <div className={styles.you_selected_div}>
                    <div className={styles.left}>
                        <div className={styles.text_1}>You selected: </div>
                        <div className={styles.car_name}>{carObject[quotation.carId]?.name} _ {carObject[quotation.carId]?.transferType} </div>
                        <Link href="/quotation-result">
                            Change your selection
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <span>{carObject[quotation.carId]?.suitcases} <i className="fa-solid fa-suitcase"></i></span>
                        <span>{carObject[quotation.carId]?.pax} <i className="fa-solid fa-user"></i></span>
                    </div>
                </div>
                <div className={styles.price_div}>
                    <div className={styles.text_1}>Price: </div>
                    <div className={styles.price}>£ {quotation.price}</div>
                </div>
            </div>
        </div>
    )
}

export default TransferJourneySummaryPanel