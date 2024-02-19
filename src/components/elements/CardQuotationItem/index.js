import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { quotationImagesObj } from '../../../constants/quotationImages';
import env from '../../../resources/env';
import styles from "./styles.module.scss";
import meetAndGret from '../../../../public/images/icons/blackMeetAndGreet.svg'
import Image from 'next/image';
const checkJourneyTypeAndAddQuotationToReducer = (params = {}) => {
  //by this index  we r gonna assure in which journey we should add quotation
  //by journey type we r gonn assure should we directly pass to next page or not
  let { journeyType, quotation, index, router, dispatch } = params

  //if it is both way journey then do not push directly to other page
  if (parseInt(journeyType) === 1) {
    dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
  } else {
    dispatch({ type: "SET_QUOTATION", data: { quotation, journeyType: index } })
    router.push("/transfer-details")
  }
}
const CardQuotationItem = (params = {}) => {

  //by this index  we r gonna assure in which journey we should add quotation
  let { quotationOptions: datas, selectedQuotation, index, quotationLoading } = params

  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pickUpDropOffActions)
  let { appData, params: { journeyType } } = state

  //cartypes object for card item as {1:{image:'sds, name:Economy}}
  const carObject = appData?.carsTypes?.reduce((obj, item) => ({ ...obj, [item.id]: item, }), {});

  const setQuotationHandleClick = (params = {}) => {
    let { quotation } = params
    checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch })
  };

  const handleClickForMobile = ({ e, quotation }) => {
    if (451 > document.documentElement.clientWidth) {
      checkJourneyTypeAndAddQuotationToReducer({ journeyType, quotation, index, router, dispatch })
    }
  };

  return (
    <div className={styles.result_container}>
      {datas?.map((item, index) => {
        return (

          <div
            key={index}
            className={`
              ${styles.card_item}
              ${Number(selectedQuotation?.carId) === Number(quotationImagesObj[item?.carId].id) ? styles.selectedCard : <React.Fragment></React.Fragment>}
              `}
            onClick={(e) => handleClickForMobile({ e, quotation: item })}
          >
            <div data={quotationImagesObj[item?.carId].id} className={styles.column_first} style={{ backgroundImage: `url(${env.apiDomain}${quotationImagesObj[item?.carId]?.image})` }} >
              {/* <img src={quotationImages[0].urlImage.src} alt="" /> */}
              {/* <img src={`${env.apiDomain}${quotationImagesObj[item?.carId]?.image}`} alt="" /> */}
              {/* <img src={`${quotationImagesObj[item?.carId]?.image.src}`} alt="" /> */}
              {/* s */}
            </div>
            <div className={styles.column_second}>
              <div className={styles.column_second_flex_column}>
                <div className={styles.name_and_postcode_div}>
                  <div className={styles.postcode}> {carObject[item?.carId]?.transferType}  </div>
                  <h3 className={styles.name}>{carObject[item?.carId]?.name}  <span className={styles.similar_text}>or similar</span>  </h3>
                </div>
                <div className={styles.car_features}>
                  <div className={styles.feature_column}> <i className="fa-solid fa-user"></i> <span>{carObject[item?.carId]?.pax}</span>  </div>
                  <div className={styles.feature_column}> <i className="fa-solid fa-suitcase"></i><span>{carObject[item?.carId]?.suitcases}</span></div>
                  <div className={styles.feature_column}>
                    <Image src={meetAndGret} width="18" height="20"  alt=""/>
                    <span style={{ paddingLeft: "5px", fontWeight: '500' }}>Meet & Greet</span></div>

                </div>
                <div className={styles.apl_features}>
                  <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className="fa-solid fa-check"></i> <span>  Free meet and greet</span></p>
                  <p className={`${styles.apl_feature} ${styles.show_more_than360}`}>  <i className="fa-solid fa-check"></i><span>No charge for flight delays</span></p>
                  <p className={`${styles.apl_feature} ${styles.show_more_than360}`}><i className="fa-solid fa-check"></i><span>Flight Tracking </span></p>
                  <p className={`${styles.apl_feature} ${styles.show_more_than360}`}> <i className="fa-solid fa-check"></i><span>Free Waiting Time</span> </p>
                  <p className={`${styles.apl_feature} ${styles.show_less_than360}`}><i className="fa-solid fa-check"></i><span>Flight Tracking  </span></p>
                  <p className={`${styles.apl_feature} ${styles.show_less_than360}`}> <i className="fa-solid fa-check"></i><span>Free Waiting Time </span></p>
                  <p className={`${styles.apl_feature} ${styles.show_less_than360}`}>  <i className="fa-solid fa-check"></i><span>Free meet and greet</span></p>
                  <p className={`${styles.apl_feature} ${styles.show_less_than360}`}>  <i className="fa-solid fa-check"></i><span> No charge for flight delays</span></p>
                </div>
              </div>
            </div>

            <div className={styles.column_third}>
              <div className={styles.price}>{quotationLoading ? "..." : `£ ${item?.price}`}</div>
              <div className={styles.total}>Total</div>
              <button onClick={() => setQuotationHandleClick({ quotation: item })} className={`btn btn_primary ${Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id) ? styles.selectedBtn : <React.Fragment></React.Fragment>}`}   >
                {quotationLoading ? "Loading" : Number(selectedQuotation?.carId) === Number(carObject[item?.carId].id) ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CardQuotationItem