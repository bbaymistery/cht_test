export function reservationSchemeValidator(params = {}, options = {}) {
  if (params.reservations) {
    let reservations = params.reservations || [];
    let { checkTransferDetails = false, checkQuotation = false, checkPaymentDetails = false } = options;
    let errorHolder = {
      'status': 200,
      'reservations': reservations?.map(obj => ({
        quotation: {}, // object
        paymentDetails: {}, // paymentDetails
        transferDetails: {}, // transferDetails
        passengerDetails: {}, // passengerDetails // fisrtname -> undefined || string
        reservationDetails: {}, // reservationDetails
        selectedPickupPoints: obj.selectedPickupPoints.map(obj => ({})), // array of objects // selectedPickupPoints
        selectedDropoffPoints: obj.selectedDropoffPoints.map(obj => ({})), // selectedDropoffPoints
      }))
    };


    // looping
    for (let index in reservations) {
      let keys = Object.keys(reservations[index]);
      // looping inside reservation keys
      for (let key of keys) {
        if (Array.isArray(reservations[index][key])) {
          if (reservations[index][key].length === 0) {
            errorHolder.status = 403
            errorHolder.reservations[index][key] = 'select one point at least'
          } else {
            // looping inside points
            for (let i in reservations[index][key]) {
              //if (typeof reservations[index][key][i] !== 'object' || (typeof reservations[index][key][i] === 'object' && typeof reservations[index][key][i].token !== 'string')) {

              if ((typeof reservations[index][key][i] === 'object' && typeof reservations[index][key][i].token !== 'string')) {
                errorHolder.reservations[index][key][i] = 'invalid point';
                errorHolder.status = 403
              }

              // checking points details
              if (checkTransferDetails === true) {
                let point = reservations[index][key][i];
                let { pcatId } = point;
                let type = key.includes('Pickup') ? 'pickup' : 'dropoff';

                if (pcatId === 1) { // airport
                  let { flightDetails } = point; // flightDetails.flightNumber  , flightDetails.waitingPickupTime
                  if (typeof flightDetails === 'object') {
                    errorHolder.reservations[index][key][i]['flightDetails'] = {}
                    // flightNumber is mandutary for first pickup point
                    if (typeof flightDetails.flightNumber === 'string') {
                      if (type === 'pickup' && parseInt(i) === 0 && flightDetails.flightNumber.length === 0) {
                        errorHolder.status = 403
                        errorHolder.reservations[index][key][i]['flightDetails']['flightNumber'] = 'required'
                      }
                      // the rest of points have optional flightNumber value
                    }
                    else {
                      errorHolder.status = 403
                      errorHolder.reservations[index][key][i]['flightDetails']['flightNumber'] = 'required'
                    }
                    // waitingPickupTime is must be have integer valud and it is mandutary for first pickup point
                    if (!Number.isInteger(flightDetails.waitingPickupTime)) {
                      errorHolder.status = 403
                      errorHolder.reservations[index][key][i]['flightDetails']['waitingPickupTime'] = 'required'
                    }
                  }
                  else {
                    errorHolder.reservations[index][key][i]['flightDetails'] = {}
                    errorHolder.reservations[index][key][i]['flightDetails']['flightNumber'] = 'invalid';
                    errorHolder.reservations[index][key][i]['flightDetails']['waitingPickupTime'] = 'invalid';
                    errorHolder.status = 403
                  }
                }
                //!new  addition
                else if (pcatId === 2) {//cruiseNumber
                  let { cruiseNumber } = point
                  if (typeof cruiseNumber === 'string') {
                    // cruise number is mandutary for first pickup point
                    errorHolder.reservations[index][key][i]['cruiseNumber'] = ""
                    if (typeof cruiseNumber === 'string') {
                      if (type === 'pickup' && parseInt(i) === 0 && cruiseNumber.length === 0) {
                        errorHolder.status = 403
                        errorHolder.reservations[index][key][i]['cruiseNumber'] = 'required'
                      }
                    } else {
                      errorHolder.status = 403
                      errorHolder.reservations[index][key][i]['cruiseNumber'] = 'required'
                    }
                  } else {
                    errorHolder.reservations[index][key][i]['cruiseNumber'] = 'invalid'
                    errorHolder.status = 403
                  }
                }
                //!new  addition
                else if (pcatId === 3) {//trainNumber
                  let { trainNumber } = point
                  if (typeof trainNumber !== "string") {
                    errorHolder.reservations[index][key][i]['trainNumber'] = 'invalid'
                    errorHolder.status = 403
                  }
                }
                //!new  addition
                else if (pcatId === 4) {//roomNumber
                  let { roomNumber } = point
                  if (typeof roomNumber !== "string") {
                    errorHolder.reservations[index][key][i]['roomNumber'] = 'invalid'
                    errorHolder.status = 403
                  }
                }
                else if (pcatId === 5) {//postcodes
                  let { postCodeDetails } = point// postCodeDetails.id  , postCodeDetails.postCodeAddress
                  if (typeof postCodeDetails === 'object') {
                    errorHolder.reservations[index][key][i]['postCodeDetails'] = {}
                    // postCodeDetails.adress mundaty if postcodeDetails.id ===0 (typeof number)
                    if (typeof postCodeDetails.postCodeAddress === 'string' && Number.isInteger(postCodeDetails.id)) {
                      if (postCodeDetails.id === 0 && postCodeDetails.postCodeAddress.length === 0) {
                        errorHolder.status = 403
                        errorHolder.reservations[index][key][i]['postCodeDetails']['postCodeAddress'] = 'required'
                      }
                    } else {
                      errorHolder.status = 403
                      errorHolder.reservations[index][key][i]['postCodeDetails']['id'] = !Number.isInteger(postCodeDetails.id) ? 'invalid' : undefined
                      errorHolder.reservations[index][key][i]['postCodeDetails']["postCodeAddress"] = typeof postCodeDetails.postCodeAddress !== 'string' ? 'required' : undefined
                    }
                  } else {
                    errorHolder.reservations[index][key][i]['postCodeDetails'] = 'invalid'
                    errorHolder.status = 403
                  }
                }
                //!new  addition
                else if (pcatId === 7 || pcatId === 8 || pcatId === 9 || pcatId === 10) {//placeof-interest || cities || universities and colleges || other
                  //!iam not sure about this desctructing
                  let { ["address-description"]: adressDescription } = point
                  if (typeof adressDescription !== "string") {
                    errorHolder.reservations[index][key][i]['address-description'] = 'invalid'
                    errorHolder.status = 403
                  }
                }
              }
            }
          }
        }
        else if (typeof reservations[index][key] === 'object' && reservations[index][key] !== null) {
          // quotation transferDetails , passengerDetails , paymentDetails , reservationDetails
          //!new addition
          if (key === 'quotation') {
            if (checkQuotation === true) {
              let quotation = reservations[index][key];
              let { token, price, carId } = quotation
              if (typeof (token) !== 'string') {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]["token"] = 'invalid data type'
              }
              if (typeof (price) !== 'string') {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]["price"] = 'invalid data type'
              }
              if (!Number.isInteger(carId)) {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]["price"] = 'invalid data type'
              }
            }
          }
          //!new addition
          else if (key === 'transferDetails') {
            let transferDetails = reservations[index][key];
            let { transferDateTimeString, passengersNumber, pickupCategoryId, specialRequests } = transferDetails

            if (!Number.isInteger(passengersNumber)) {
              errorHolder.status = 403;
              errorHolder.reservations[index][key]["passengersNumber"] = 'invalid data type'
            }

            if (!Number.isInteger(pickupCategoryId)) {
              errorHolder.status = 403;
              errorHolder.reservations[index][key]["pickupCategoryId"] = 'invalid data type'
            }
            //in our hgt "2022-12-01 20:00"     date structure in this way
            if (typeof (transferDateTimeString) !== 'string') {
              errorHolder.status = 403;
              errorHolder.reservations[index][key]["transferDateTimeString"] = 'invalid data type'
            }
            if (typeof (specialRequests) !== 'string') {
              errorHolder.status = 403;
              errorHolder.reservations[index][key]["specialRequests"] = 'invalid data type'
            }
          }
          else if (key === 'passengerDetails') {

            if (checkTransferDetails === true) {

              let passengerDetails = reservations[index][key];

              // firstname , lastname , email , phone , language
              if (typeof passengerDetails['firstname'] !== 'string' || (typeof passengerDetails['firstname'] === 'string' && passengerDetails['firstname'].length === 0)) {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]['firstname'] = 'required'
              }
              //!new addition for @ email checking
              if (typeof passengerDetails['email'] !== 'string' || (typeof passengerDetails['email'] === 'string' && passengerDetails['email'].length === 0) || !passengerDetails["email"].includes("@")) {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]['email'] = 'required'
              }
              if (typeof passengerDetails['phone'] !== 'string' || (typeof passengerDetails['phone'] === 'string' && passengerDetails['phone'].length === 0)) {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]['phone'] = 'required'
              }

              if (typeof passengerDetails['lastname'] !== 'string') {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]['lastname'] = 'invalid data type'
              }
              if (typeof passengerDetails['language'] !== 'string') {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]['language'] = 'invalid data type'
              }
              if (typeof passengerDetails['token'] !== 'string') {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]['token'] = 'invalid data type'
              }

              // check all keys
              let undifinedKeys = Object.keys(passengerDetails).filter(key => !['firstname', 'lastname', 'email', 'phone', 'language', "token"].includes(key))
              if (undifinedKeys.length !== 0) {
                errorHolder.status = 403;
                for (let invalidKey of undifinedKeys) {
                  errorHolder.reservations[index][key][invalidKey] = 'invalid'
                }
              }
            }
          }
          //!new addition
          else if (key === 'paymentDetails') {
            if (checkPaymentDetails) {
              let paymentDetails = reservations[index][key];
              let { token, paymentTpye, account, price } = paymentDetails

              if (typeof (token) !== 'string') {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]["token"] = 'invalid'
              }
              if (typeof (paymentTpye) !== 'string' || !Number.isInteger(paymentTpye)) {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]["paymentTpye"] = 'invalid'
              }
              if (!Number.isInteger(account)) {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]["account"] = 'invalid'
              }
              if (!Number.isInteger(price)) {
                errorHolder.status = 403;
                errorHolder.reservations[index][key]["price"] = 'invalid'
              }
            }
          }
          //!new addition
          else if (key === 'reservationDetails') {
            let reservationDetails = reservations[index][key];
            let { channelId, accountId } = reservationDetails
            if (!Number.isInteger(channelId)) {
              errorHolder.status = 403;
              errorHolder.reservations[index][key]["channelId"] = 'invalid'
            }
            if (!Number.isInteger(accountId)) {
              errorHolder.status = 403;
              errorHolder.reservations[index][key]["accountId"] = 'invalid'
            }
          }
          else {
            errorHolder.status = 403;
            errorHolder.reservations[index][key] = 'Invalid property inside reservation object'
          }
        }
        else {
          errorHolder.status = 403;
          errorHolder.reservations[index][key] = 'Invalid property inside reservation object'
        }
      }
    }

    return errorHolder;
  }


}

/*
let errorHolder = {
      'status': 200,
      'reservations': reservations?.map(obj => ({
        quotation: { ...obj.quotation }, // object
        paymentDetails: { ...obj.paymentDetails }, // paymentDetails
        transferDetails: { ...obj.transferDetails }, // transferDetails
        passengerDetails: { ...obj.passengerDetails }, // passengerDetails // fisrtname -> undefined || string
        reservationDetails: { ...obj.reservationDetails }, // reservationDetails
        selectedPickupPoints: [...obj.selectedPickupPoints], // array of objects // selectedPickupPoints
        selectedDropoffPoints: [...obj.selectedDropoffPoints], // selectedDropoffPoints
      }))
    };
*/