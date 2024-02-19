import SET_ADRESS_DESCRIPTION_FOR_POINTS from "./SET_ADRESS_DESCRIPTION_FOR_POINTS";
import SET_SAME_PASSENGER_DETAILS_STATUS from "./SET_SAME_PASSENGER_DETAILS_STATUS";
import SET_POSTCODE_DETAILS_FOR_POINTS from "./SET_POSTCODE_DETAILS_FOR_POINTS";
import SET_TOKEN_TO_PASSENGERDETAILS from "./SET_TOKEN_TO_PASSENGERDETAILS";
import DELETE_ITEM_FROM_SELECTEDLIST from "./DELETE_ITEM_FROM_SELECTEDLIST";
import SET_FLIGHT_DETAILS_FOR_POINTS from "./SET_FLIGHT_DETAILS_FOR_POINTS";
import SET_CRUISE_NUMBER_FOR_POINTS from "./SET_CRUISE_NUMBER_FOR_POINTS";
import SET_TRAIN_NUMBER_FOR_POINTS from "./SET_TRAIN_NUMBER_FOR_POINTS";
import SET_PAYMENT_TYPE_AND_TOKEN from "./SET_PAYMENT_TYPE_AND_TOKEN";
import CHECHK_FLIGHT_WAITING_TIME from "./CHECHK_FLIGHT_WAITING_TIME";
import SET_POST_CODE_ADRESSES from "./SET_POST_CODE_ADRESSES";
import RESET_SELECTED_POINTS from "./RESET_SELECTED_POINTS";
import SET_JOURNEY_DATETIME from "./SET_JOURNEY_DATETIME";
import SET_PASSEGER_DETAILS from "./SET_PASSEGER_DETAILS";
import SET_TRANSFER_DETAILS from "./SET_TRANSFER_DETAILS";
import SET_SESSION_TOKEN from "./SET_SESSION_TOKEN";
import SET_MODAL_INFO from "./SET_MODAL_INFO";
import SWITCH_JOURNEY from "./SWITCH_JOURNEY";
import GET_QUOTATION from "./GET_QUOTATION";
import ADD_NEW_POINT from "./ADD_NEW_POINT";
import SET_QUOTATION from "./SET_QUOTATION";
import GET_APP_DATA from "./GET_APP_DATA";

//!'yyyy-mm-dd HH:MM'   FOR   transferDateTimeString
const currentDateForJourney = () => {
  let tmpDt = new Date(Date.now() + 1000 * 60 * 60 * 6); //6
  let year = tmpDt.getFullYear();
  let month = tmpDt.getMonth() + 1 < 10 ? `0${tmpDt.getMonth() + 1}` : tmpDt.getMonth() + 1;
  let date = tmpDt.getDate() < 10 ? `0${tmpDt.getDate()}` : tmpDt.getDate();
  let hours = tmpDt.getHours() < 10 ? `0${tmpDt.getHours()}` : tmpDt.getHours();
  let minute = "00";
  let currentDate = `${year}-${month}-${date} ${hours}:${minute}`;
  return currentDate;
};

let initialReservationState = [{
  reservationDetails: {
    channelId: 8,
    accountId: 1609,
  },
  selectedPickupPoints: [],
  selectedDropoffPoints: [],
  quotation: {},
  transferDetails: {
    transferDateTimeString: currentDateForJourney(),
    pickupCategoryId: "",
    passengersNumber: 1,
    passengerSuitcase: 1,
    specialRequests: "",
  },
  passengerDetails: {
    token: "",
    lastname: "",
    language: "en",
    firstname: "",
    email: "",
    phone: "",
  },
  paymentDetails: {
    token: "",
    paymentType: "",
    account: 1609,

  },
}]
const INITIAL_STATE = {
  reservations: initialReservationState,
  params: {
    journeyType: "0",
    sessionToken: "",
    modalInfo: false,//when we click carInfo icon pops up modal,  //!checking again if we dont need eliminate this
    quotations: [{}],//we use it when we collect quotations
    postCodeAdresses: [],//when we select pcatId5 we need to add adresses
    passengerDetailsStatus: true,//checkbox status on transferdetails page
    tokenForArchieve: ""
  }
};
export const pickUpDropOffActions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SWITCH_JOURNEY': {
      return SWITCH_JOURNEY({ state, action })
    }
    case "SET_JOURNEY_DATETIME": {
      return SET_JOURNEY_DATETIME({ state, action })
    }
    case "SET_TOKEN_TO_PASSENGERDETAILS": {
      return SET_TOKEN_TO_PASSENGERDETAILS({ state, action })
    }
    case "GET_APP_DATA": {
      return GET_APP_DATA({ state, action })
    }
    case "ADD_NEW_POINT": {
      return ADD_NEW_POINT({ state, action })
    }
    case "DELETE_ITEM_FROM_SELECTEDLIST": {
      return DELETE_ITEM_FROM_SELECTEDLIST({ state, action })
    }
    case "SET_SESSION_TOKEN": {
      return SET_SESSION_TOKEN({ state, action })
    }
    case "GET_QUOTATION": {
      return GET_QUOTATION({ state, action })
    }
    case "SET_MODAL_INFO": {
      return SET_MODAL_INFO({ state, action })
    }
    case "SET_QUOTATION": {
      return SET_QUOTATION({ state, action })
    }
    case "SET_POST_CODE_ADRESSES": {
      return SET_POST_CODE_ADRESSES({ state, action })
    }
    case "SET_PASSEGER_DETAILS": {
      return SET_PASSEGER_DETAILS({ state, action })
    }
    case "SET_SAME_PASSENGER_DETAILS_STATUS": {
      return SET_SAME_PASSENGER_DETAILS_STATUS({ state, action })
    }
    case "SET_TRANSFER_DETAILS": {
      return SET_TRANSFER_DETAILS({ state, action })
    }
    //!handling selected points inside transfer details
    case "SET_FLIGHT_DETAILS_FOR_POINTS": {
      return SET_FLIGHT_DETAILS_FOR_POINTS({ state, action })
    }
    case "SET_TRAIN_NUMBER_FOR_POINTS": {
      return SET_TRAIN_NUMBER_FOR_POINTS({ state, action })
    }
    case "SET_POSTCODE_DETAILS_FOR_POINTS": {
      return SET_POSTCODE_DETAILS_FOR_POINTS({ state, action })
    }
    case "SET_CRUISE_NUMBER_FOR_POINTS": {
      return SET_CRUISE_NUMBER_FOR_POINTS({ state, action })
    }
    case "SET_ADRESS_DESCRIPTION_FOR_POINTS": {
      return SET_ADRESS_DESCRIPTION_FOR_POINTS({ state, action })
    }
    //!finish handling selected points inside transfer details


    case "SET_PAYMENT_TYPE_AND_TOKEN": {
      return SET_PAYMENT_TYPE_AND_TOKEN({ state, action })
    }
    case "RESET_SELECTED_POINTS": {
      return RESET_SELECTED_POINTS({ state, action })
    }
    //
    case "CHECHK_FLIGHT_WAITING_TIME": {
      return CHECHK_FLIGHT_WAITING_TIME({ state, action })
    }
    default:
      return state;
  }
};
