import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quotationImagesObj } from '../../constants/quotationImages'
import env from '../../resources/env'

const GT_Services = (props) => {
    let { populationDestinations } = props


    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations } = state
    const [loading, setLoading] = useState(false)
    const [loadedIndex, setLoadedIndex] = useState('')

    const [firstAdresQuotations, setFirstAdresQuotations] = useState("")

    const [pickPointFirstAdres, setpickPointFirstAdress] = useState("")
    const [dropPointFirstAdress, setdropPointFirstAdress] = useState("")
    const [secondAdressQuotations, setgtsecondAdressQuotations] = useState("")

    const addPointCollectPoints = (index) => {
        setLoadedIndex(index)//in order to prevent loading for all booking butoon
        let transferDAteTimeString = reservations[0]?.transferDetails?.transferDateTimeString;
        const url = `${env.apiDomain}/api/v1/quotation`;
        const method = "POST"
        const headers = { "Content-Type": "application/json" }

        const configTransfer = {
            method,
            headers,
            body: JSON.stringify({
                selectedPickupPoints: [{ ...pickPointFirstAdres }],
                selectedDropoffPoints: [{ ...dropPointFirstAdress }],
                transferDateTimeString: transferDAteTimeString,
            }),
        };
        console.log({
            selectedPickupPoints: [{ ...pickPointFirstAdres }],
            selectedDropoffPoints: [{ ...dropPointFirstAdress }],
            transferDateTimeString: transferDAteTimeString,
        });

        setLoading(true)
        fetch(url, configTransfer)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                console.log(data);

                if (data.status === 200) {
                    dispatch({ type: "GET_QUOTATION", data: { results: data, journeyType: 0 } })
                    dispatch({ type: 'ADD_NEW_POINT', data: { point: pickPointFirstAdres, destination: "pickup", index: 0 } })
                    dispatch({ type: 'ADD_NEW_POINT', data: { point: dropPointFirstAdress, destination: "dropoff", index: 0 } })
                    router.push("/quotation-result")

                }
            })
            .catch((error) => {
                // let message = "Churchill  GT_Services component _addPointCollectPoints()  function catch blog  "
                // window.handelErrorLogs(error, message, { configTransfer })
                console.log(error);

            });

    }
    useEffect(() => {
        setLoadedIndex('')

        dispatch({ type: 'RESET_SELECTED_POINTS' })

        //destructing points from props
        if (populationDestinations["gatwick-london"].quotations.length > 0) {
            // gtLondon = populationDestinations["gatwick-london"]
            setFirstAdresQuotations(populationDestinations["gatwick-london"].quotations)
            //POINTS for hgttolondo
            setpickPointFirstAdress(populationDestinations["gatwick-london"].selectedPickupPoints[0])
            setdropPointFirstAdress(populationDestinations["gatwick-london"].selectedDropoffPoints[0])

            setgtsecondAdressQuotations(populationDestinations["london-gatwick"].quotations)
        }
    }, [])

    return (
        <div className="service-rate-table-wrapper clearfix">

            {/* <!-- BEGIN .service-rate-table-inner-wrapper --> */}
            <div className="service-rate-table-inner-wrapper clearfix">
                <div className="car-list-wrapper">
                    <div className="blank-header"></div>
                    <div className="car-list-inner">
                        {firstAdresQuotations?.length > 0 ? firstAdresQuotations?.map((quotation, index) => {
                            return (
                                <div key={index} className="car-list-section clearfix">
                                    <img src={`${env.apiDomain}${quotationImagesObj[quotation?.carId]?.image}`} alt="Saloon" />
                                    <p><strong>{quotationImagesObj[quotation?.carId]?.name}   </strong></p>
                                </div>
                            )
                        }) : <React.Fragment></React.Fragment>}
                    </div>
                </div>

                <div className="service-rate-wrapper">
                    <div className="service-rate-header"><p><strong>Gatwick to London</strong></p></div>
                    <div className="service-rate-inner">

                        {firstAdresQuotations?.length > 0 ? firstAdresQuotations?.map((quotation, index) => {
                            return <div key={index} className="service-rate-section">
                                <p><strong><span>£{quotation.price}</span></strong> * all inclusive prices</p>
                            </div>
                        }) : <React.Fragment></React.Fragment>}
                    </div>

                </div>

                <div className="service-rate-wrapper">
                    <div className="service-rate-header"><p><strong>London to Gatwick</strong></p></div>
                    <div className="service-rate-inner">
                        {secondAdressQuotations?.length > 0 ? secondAdressQuotations?.map((quotation, index) => {
                            return <div key={index} className="service-rate-section">
                                <p><strong><span>£{quotation.price}</span></strong> * all inclusive prices</p>
                            </div>
                        }) : <React.Fragment></React.Fragment>}
                    </div>
                </div>
                <div className="service-rate-wrapper">
                    <div className="service-rate-header book-button"><p></p></div>
                    <div className="service-rate-inner">
                        {firstAdresQuotations?.length > 0 ? firstAdresQuotations?.map((quotation, index) => {
                            return <div key={index} className="service-rate-section book-button">
                                <p onClick={(e) => addPointCollectPoints(index)} className="button">
                                    <span>
                                        {index === loadedIndex ? "Loading" : "Book Now"}
                                    </span>
                                </p>
                            </div>
                        }) : <React.Fragment></React.Fragment>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GT_Services