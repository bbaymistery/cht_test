import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import env from '../../../resources/env'
//mock data
let dropOffToken = "1e973c715da6e86754a72c7d2dad7b143463c1ba3a7844adc9d6f651115b15d151b0e1b0eeacae3a1432afdcb6c4cc87dbc0b81fc5aec5da6a8f9a73442e1c783298798b7a94b96f625131820183a2ebcbf9b550f2b1bb139b81e8d54fb2469a230a0bfbb10daf98c96e36dce1214331af21ce53972bda15659070b60b125d650cb8911c14f5eeb97e906153dd262b3ecc4e7e35fa99574a174ce6cf4f0c189940efa15ef5e2454c3efa9445798e0e11d5c7c86ae5496f7b016c7f0775ad6b8b"
let dropPoint = {
    token: dropOffToken,
    pid: 4176,
    ptype: 2,
    address: "Westminster, London",
    postcode: "SW1A 0AA",
    pcatId: 7
}
let pickToken = "9a619c5147a0cf4c5738fe72f5025fe16318f15b4c01af12d4dba1691d01c04ab56e2581be1b28b1d8f021dc7908988bc7d1d8f28c9982145576671571b9bada97aee5a6eb89d0ff3113cecfc8ed6db3227af533cee37d8cb44c87dfd23bf20abec72f86369a24391604a934fed7750c7db7dbfb655fb2b1d7946e25be6f594860841e5e5c4b7897d33172f3fb3a5402a5fdf18223e9de603a2fc69e0f8ee79d66a8028422ee465dc88c9239e9cbd8dc711bcd666c615cde26c44ba033ee0c2847e28c35f1a93178c940f8cab93cad21"
let pickPoint = {
    token: pickToken,
    pid: 4529,
    ptype: 2,
    address: "London Heathrow Airport, Terminal 2",
    postcode: "TW6 1EW",
    pcatId: 1
}


import styles from "./styles.module.scss"
const MeetYourNeeds = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector(state => state.pickUpDropOffActions)
    let { reservations } = state

    const [loading, setLoading] = useState(false)
    //getting quotations
    const addPointCollectPoints = () => {
        let transferDAteTimeString = reservations[0]?.transferDetails?.transferDateTimeString;
        const url = `${env.apiDomain}/api/v1/quotation`;
        const method = "POST"
        const headers = { "Content-Type": "application/json" }

        const configTransfer = {
            method,
            headers,
            body: JSON.stringify({
                selectedPickupPoints: [{ ...pickPoint }],
                selectedDropoffPoints: [{ ...dropPoint }],
                transferDateTimeString: transferDAteTimeString,
            }),
        };

        setLoading(true)
        fetch(url, configTransfer)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                localStorage.setItem('meetyourneeds', 'yes');
                if (data.status === 200) {
                    router.push("/quotation-result")
                    dispatch({ type: "GET_QUOTATION", data: { results: data, journeyType: 0 } })
                    dispatch({ type: 'ADD_NEW_POINT', data: { point: pickPoint, destination: "pickup", index: 0 } })
                    dispatch({ type: 'ADD_NEW_POINT', data: { point: dropPoint, destination: "dropoff", index: 0 } })
                }
                
            })
            .catch((error) => {
                let message = "Churchill  MeetYourNeeds component _addPointCollectPoints()  function catch blog  "
                window.handelErrorLogs(error, message, { configTransfer })
                console.log(error);

            });

    }



    return (
        <section className={`${styles.section}`}>
            <div className="call-to-action-1-section-inner">
                <h3>Churchill has a wide array of pricing options to meet all of your needs</h3>
                <p style={{ cursor: 'pointer' }} onClick={addPointCollectPoints} className="button0">
                    {loading ? "Loading " : "View Pricing"}
                </p>
            </div>
        </section>
    )
}

export default MeetYourNeeds

