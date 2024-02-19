import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from '../../../hooks/useWindowSize';
import env from '../../../resources/env';
import styles from "./styles.module.scss"

//!when we get search result: there pcatId is :  from greater to less    like >>   4 3 2 1
//!arrange points maake that from less to more  like >> 1 2 3 4
const moveZeroosToTheEndMakeAnArray = (params = {}) => {
    let { keyss = [], collectingPoints = {}, } = params
    let zeros = 0;

    for (let i = 0; i < keyss.length; i++) {
        let isZero = keyss[i] === "0";
        if (isZero) {
            zeros++;
            keyss.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < zeros; i++) {
        keyss.push("0");
    }
    let newOrderedItems = keyss.map((key) => (collectingPoints[key]));
    return newOrderedItems;
};
const getPostCodesAndAddToList = (params = {}, callback = () => { }) => {
    let { point } = params
    const url = `${env.apiDomain}/api/v1/postcode-address`;
    const headers = { "Content-Type": "application/json" }
    const method = "POST"
    const body = JSON.stringify({ postcodes: [point.postcode] })
    const config = { method, headers, body };
    fetch(url, config)
        .then((res) => res.json())
        .then((data) => { callback(data) })
        .catch((error) => {
            let message = "Churchil  HandleSearchResults Component - getPostCodesAndAddToList function      fetching catch blog  "
            window.handelErrorLogs(error, message, { config, url })
        });
}

const requestForGooglePLace = (params = {}, callback = () => { }) => {
    let { point } = params
    const url = `${env.apiDomain}/api/v1/google-places`;
    const headers = { "Content-Type": "application/json" }
    const method = "POST"
    const body = JSON.stringify({ point })
    const config = { method, headers, body };
    fetch(url, config)
        .then((res) => res.json())
        .then((data) => { callback(data) })
        .catch((error) => {
            let message = "Churchil  HandleSearchResults Component - requestForGooglePLace function      fetching catch blog  "
            window.handelErrorLogs(error, message, { config, url })
        });
}


const getPostCodesAndAddToListAsync = params => new Promise((resolve, reject) => getPostCodesAndAddToList(params, log => resolve(log)))
const requestForGogglePalceAsync = (params) => new Promise((resolve, reject) => requestForGooglePLace(params, log => resolve(log)))
const HandleSearchResults = (params = {}) => {
    let { collectingPoints, destination, setInternalState, index, getQuotations = () => { } } = params
    let newOrderedItems = []
    if (Object.keys(collectingPoints)?.length !== 0) {
        let keyss = Object.keys(collectingPoints);
        //take this  f12(collectingPoints); >>//{0: Array(30), 1: Array(4)} to turn this   //f12(newOrderedItems); // [Array(4), Array(30)]
        newOrderedItems = moveZeroosToTheEndMakeAnArray({ keyss, collectingPoints });
    }
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector(state => state.pickUpDropOffActions)
    let { appData, reservations } = state

    const imgObj = appData?.pointTypeCategories?.reduce(
        (obj, item) => ({
            ...obj,
            [item.id]: item.image,
        }),
        {}
    );
    const namePlaceOfObj = appData?.pointTypeCategories?.reduce(
        (obj, item) => ({
            ...obj,
            [item.id]: item.categoryName,
        }),
        {}
    );

    const objectDetailss = appData?.pointTypeCategories?.reduce(
        (obj, item) => ({
            ...obj,
            [item.id]: JSON.parse(item.objectDetails),
        }),
        {}
    );

    //hook
    let size = useWindowSize();
    let { width } = size

    const handleAddItemToSelectList = (params = {}) => {
        let { point, destination } = params
        //setting postcode adressess
        if (point.pcatId === 5) {
            (async () => {
                let log = await getPostCodesAndAddToListAsync({ point })
                let { status, results } = log
                if (status && results.length > 0) dispatch({ type: "SET_POST_CODE_ADRESSES", data: { result: results[0] } })
            })()
        }
        //make one request more if point pcatId is equal to 10
        if (point.pcatId === 10) {
            (async () => {
                let log = await requestForGogglePalceAsync({ point })
                if (log.status) point = log.point
            })()
        }
        point = { ...point, ...objectDetailss[point.pcatId] }//...point    flightDetails{ flightNumber="",waitingPickupTime=0}
        dispatch({ type: 'ADD_NEW_POINT', data: { point, destination, index } })

        // cleaning input field after adding item
        setInternalState({
            [`${destination}-search-value-${index}`]: "",
            [`${destination}-points-error-${index}`]: "",
            [`${destination}-search-focus-${index}`]: false,
            [`collecting-${destination}-points-${index}`]: [],
            [`show-${destination}-extra-point-${index}`]: true,
        })

        if (router.pathname === "/quotation-result") {
            let points = reservations[index][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`]
            reservations[index][`selected${destination === 'pickup' ? 'Pickup' : 'Dropoff'}Points`] = [...points, point]
            getQuotations()
        }
    }

    return (
        <div className={styles.search_results} w={String(width <= 990)}  >
            {newOrderedItems?.length ? (
                <ul >
                    {newOrderedItems?.map((arr) => {
                        return arr?.map((item, i) => {
                            return (
                                <div key={i}>
                                    {/* this list  for group name  */}
                                    {i === 0 ?
                                        (<li key={i} className={i === 0 ? styles.groupName : ""}>
                                            {item.pcatId === 10 ? <img src={`${env.apiDomain}/media/g-google.svg`} alt="" /> : imgObj && (<img src={`${env.apiDomain}${imgObj[item.pcatId]}`} alt="" />)}
                                            <a href="/"> {namePlaceOfObj && namePlaceOfObj[item.pcatId]}   </a>
                                            {item.pcatId === 10 ? (<img src={`${env.apiDomain}/media/powered-by-google.png`} alt="" className={styles.googleImage} />) : <React.Fragment></React.Fragment>}
                                        </li>) : <React.Fragment></React.Fragment>}

                                    {/* this list for the rest of group subname */}
                                    {/* //destination journey type comes from Hero component Which we pass a prop  */}
                                    <li onClick={() => handleAddItemToSelectList({ point: item, destination })}>
                                        {imgObj ? (<img src={`${env.apiDomain}${imgObj[item.pcatId]}`} alt="" />) : <React.Fragment></React.Fragment>}
                                        <p>{item.address} {`${item?.postcode ? `-  ${item?.postcode}` : ""}`}</p>
                                    </li>
                                </div>
                            );
                        });
                    })}
                </ul>
            ) : <ul>
                <li className={styles.no_results}>
                    <i className="fas fa-times-circle" aria-hidden="true"></i>
                    <p>
                        No any result matched <br /> if you want a quotation, try to contact
                        with this phone number :{" "}
                        <a href="tel: +44 (0) 208 683 2330">+44 (0) 208 683 2330</a>
                    </p>
                </li>
            </ul>}
        </div>
    )
}

export default HandleSearchResults

