const formItems = [
  'pickup-address', 'dropoff-address','p_address','d_address','p_flight_number',
  'pickup-date', 'pickup-time-hour', 'pickup-time-minute',
  'number-of-passenger', 'number-of-bags', 'first-name',
  'last-name', 'email-address', 'phone-number', 'additional-information',
  'vehicle', 'driverPickupMin', 'passenger-title'
];

const validateItems = [
  'CCType', 'CCNumber', 'CCName', 'secNo', 'expiryMonth', 'expiryYear',
  'CHADDRESS', 'CHPOSTCODE', 'CHPOSTCODE', 'CHCTRY', 'chkAgree'
];

$(function () {
  let timeType = '';
  let mapPickupAddress = '';
  let mapDropoffAddress = '';
  $('#step-3-content-wrapper').block();
  _.map((item) => {
    const value = localStorageGet(item);

    if (value) {
      if (value.type === 'input') {
        // console.log(item);
        $(`#${item}`).val(value.label);
        $(`span#${item}-area`).text(value.label);
      } else if (value.type === 'select') {
        $(`#${item}`).val(value.id).change();
        $(`span#${item}-area`).text(value.label);
      } else {
        $(`#${item}`).val(value.label)
        .parent().append('<span class="input-action-icon"><i class="fa fa-check"></i></span>');
        $(`span#${item}-area`).text(value.label);
      }

      if (item === 'pickup-address') {
        let pickupTimeLabel = 'Pick Up Time';
        let pickupDateLabel = 'Pick Up Date';
        if (value.catId === '1') {
          pickupTimeLabel = 'Flight Landing Time';
          pickupDateLabel = 'Flight Landing Date';
          $('#driverPickupMin-title').show();
          $('#p_flight_number-title').show();
        }
        $('#date-input-label').text(`${pickupDateLabel}:`);
        $('#time-input-label').text(`${pickupTimeLabel}:`);

        mapPickupAddress = value.label;
      } else if (item === 'dropoff-address') {
        mapDropoffAddress = value.label;
      } else if (item === 'p_address') {
        $(`span#p_address`).text(`${value.label}`);
      } else if (item === 'd_address') {
        $(`span#d_address`).text(`${value.label}`);
      } else if (item === 'pickup-time-hour') {
        $(`span#${item}-area`).text(value.label.slice(0, 2));
        timeType = value.label.slice(-2);
      } else if (item === 'pickup-time-minute') {
        $(`span#${item}-area`).text(`${value.label}`);
        $(`span#pickup-time-type`).text(timeType);
      } else if (item === 'driverPickupMin') {
        $(`span#${item}-area`).text(`${value.label} minute(s) later`);
      } else if (item === 'p_flight_number') {
        $(`span#${item}-area`).text(`${value.label}`);
      } else if (item === 'vehicle') {
        $(`strong#price-area`).text(`${getCurrencySymbol(value.currency)}${value.price}`);
		$('#transfer-type-area').text(`${value.transferType}`);
      }
    }
  }, formItems);

  $('#step-3-content-wrapper').unblock();

  mapPickupAddress && mapDropoffAddress &&
    $('.view-map-button').attr('href', '//maps.google.com/maps?saddr='+ encodeURIComponent(mapPickupAddress) +'&daddr='+ encodeURIComponent(mapDropoffAddress) +'&ie=UTF8&amp;z=9&amp;layer=t&amp;t=m&amp;iwloc=A&amp;output=embed?iframe=true&amp;width=640&amp;height=480')

  $("select, input, textarea").change(function () {
    // console.log($(this).prop('type'));
    const id = $(this).attr("id");
    const value = $(this).val();
    localStorageSet(id, { id: value, label: value, value } , $(this).prop('type').replace('-one', ''));
  });

  $("input").change(function () {
    const id = $(this).attr("id");
    const value = $(this).val();
    if ($(`#${id}`).val() === '') {
      error = true;
      $(`#${id}`).parent().addClass('form-error').find('.input-action-icon').remove();
      if ($(`#${id}`).prop('type') !== 'select-one') {
        $(`#${id}`).parent().append('<span class="input-action-icon"><i class="fa fa-times"></i></span>');
      }
    }
});


        var agreeDiv = '<div class="qns-one book-input checkbox-wrapper payment-agreement-box">\
            <input type="checkbox" id="chkAgree" name="chkAgree" />\
            <a href="#" title="I agree with terms and conditions" id="readTerm" style="color: #fff;" onclick="return false;"> I agree with terms and conditions</a>\
        </div>';

        $("#cash-agreement").html("");
        $("#cash-agreement").html(agreeDiv);
        $("#card-agreement").html("");



  $('#payment-button-card').on('click', function(e){
      e.preventDefault();

      $("#card-agreement").html("");
      $("#card-agreement").html(agreeDiv);
      $("#cash-agreement").html("");


    $('#payment-details-wrapper').slideDown();
  });

  $('#payment-button-cash').on('click', function(e){
    e.preventDefault();
    let error = false;



    if ($("#cash-agreement").find('input').length != 1 ) {
        $("#cash-agreement").html("");
        $("#cash-agreement").html(agreeDiv);
        $("#card-agreement").html("");
    }

    $('#payment-details-wrapper').slideUp();
    const agreementControl = checkAgreement('cash');

    if (agreementControl) {
      error = true;
    }

    if (error) {
      console.log('validated');
      postCardData();
      // window.location.href="/booking4.html";
    }
  });

  $('#proceed-to-payment-button').on('click', function(e){
    e.preventDefault();
    let error = false;

    const agreementControl = checkAgreement('card');
    console.log('agreementControl', agreementControl);

    if (agreementControl) {
      error = true;
    }

    if (!error) {
      console.log('validated');
      postCardData('card');
      // window.location.href="/booking4.html";
    } else {
      console.log('An unknown error occured');
    }

  });

  $('a#readTerm').on('click', function(e) {
    e.preventDefault();
    $( "#dialog-message" ).dialog({
      modal: true,
      minWidth: 600,
      maxHeight: 600,
      appendTo: "body",
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });

  })
});

const checkAgreement = (pt) => {
  let error = false;

console.log('validateItems', validateItems);


    if (pt ==='cash') {
        if (!$(`input#chkAgree`).is(':checked')) {
            $(`input#chkAgree`).parent().addClass('form-error').find('.input-action-icon').remove();
            $(`input#chkAgree`).parent().append('<span class="input-action-icon"><i class="fa fa-times"></i></span>');
        }else {
            $(`input#chkAgree`).parent().removeClass('form-error').find('.input-action-icon').remove()
            $(`input#chkAgree`).parent().append('<span class="input-action-icon"><i class="fa fa-check"></i></span>');
            error = true;
        }
    }else {
        if ($(`input#chkAgree`).is(':checked')) {
                validateItems.map(item => {
                    const value = localStorageGet(item);

                    if (item === 'chkAgree') {
                        if ($(`input#${item}`).is(':checked')) {
                            $(`#${item}`).parent().removeClass('form-error').find('.input-action-icon').remove()
                        $(`#${item}`).parent().append('<span class="input-action-icon"><i class="fa fa-check"></i></span>');
                    } else {
                        $(`#${item}`).parent().addClass('form-error').find('.input-action-icon').remove();
                        $(`#${item}`).parent().append('<span class="input-action-icon"><i class="fa fa-times"></i></span>');
                    }
                    } else if ($(`#${item}`).val() === '') {
                        error = true;
                        $(`#${item}`).parent().addClass('form-error').find('.input-action-icon').remove();
                        $(`#${item}`).parent().append('<span class="input-action-icon"><i class="fa fa-times"></i></span>');
                    } else {
                            $(`#${item}`).parent().removeClass('form-error').find('.input-action-icon').remove()
                            $(`#${item}`).parent().append('<span class="input-action-icon"><i class="fa fa-check"></i></span>');
                    }
                });

        }else {
            error = true;
            $(`#chkAgree`).parent().addClass('form-error').find('.input-action-icon').remove();
            $(`#chkAgree`).parent().append('<span class="input-action-icon"><i class="fa fa-times"></i></span>');
        }
    }

  return error;
}

const chtReferenceId = ""; // `CHT${unixTime()}`;

const postCardData = (paymentType = 'cash') => {
  $('#payment-details-wrapper').block();
  $('#total-price-display').block();

  let data = {
    method: 'wbsv_newBooking',
    isReturn: "0",
    accountId: 49, //This a unique number which we provide
    accprefix: "CHT", //This a unique code which we provide
    createdBy: "UserName", //This is the name of the one who is creating the booking
    bookingPlatform: "www.churchilltransfers.com", //Do not change this  one
    firstLeg: [{
      title: lsValue('passenger-title', 'label'),
      passengerName: encodeURIComponent(`${lsValue('first-name', 'label')} ${lsValue('last-name', 'label')}`),
      emailAddress: lsValue('email-address', 'label'),
      contactNumber: encodeURIComponent(lsValue('phone-number', 'label')),
      pickupPoints: [{
        point: encodeURIComponent(lsValue('pickup-address', 'label')),
        //“address” field from wbsv_getQueryResults method
        catId: lsValue('pickup-address', 'catId'), //“pcatId” field from wbsv_getQueryResults method
        pointDetail: lsValue('pickup-address', 'detail'),
        //”pdetail” field from wbsv_getQueryResults method
        pDate: lsValue('pickup-date','label'),
        pTime: `${lsValue('pickup-time-hour', 'label')}:${lsValue('pickup-time-minute', 'label')}`,
        flightDetails: {
          flightNumber: encodeURIComponent(lsValue('p_flight_number', 'label')),
          driverPickupMin: lsValue('driverPickupMin', 'label')
        },
        cruiseName: "",
        trainNumber: "",
        hotelRoomNumber: "",
        address: encodeURIComponent(lsValue('p_address', 'label'))
      }],
      dropOffPoints: [{
        point: encodeURIComponent(lsValue('dropoff-address', 'label')),
        catId: lsValue('dropoff-address', 'catId'),
        pointDetail: lsValue('dropoff-address', 'detail'),
        flightDetails: {
          flightNumber: ""
        },
        cruiseName: "",
        trainNumber: "",
        hotelRoomNumber: "",
        address: encodeURIComponent(lsValue('d_address', 'label'))
      }],
      vehicle: {
        type: encodeURIComponent(lsValue('vehicle', 'label')), //”carname” field from wbsv_getQuotation method
        carId: lsValue('vehicle', 'id') //”car_id” field from wbsv_getQuotation method
      },
      transferType: encodeURIComponent(lsValue('vehicle', 'transferType')),
      pax: lsValue('number-of-passenger', 'value'),
      specialRequest: encodeURIComponent(lsValue('additional-information', 'label')),
      journeyPrice: lsValue('vehicle', 'price'),
      accountRefId: "" //This must be your unique reference ID on your side
    }],
    paymentDetails: {
      currency: "GBP",
      totalPrice: lsValue('vehicle', 'price'),
      paymentType,
      paymentTypeId: paymentType === 'cash' ? '1' : '2',
      accountDetails: {
        accountId: 49, //This a unique number which we provide
        accprefix: "CHT", //This a unique code which we provide
      },
    }
  };

  const cardData = {
    CCName: encodeURIComponent(lsValue('CCName', 'label')),
    CCNumber: lsValue('CCNumber', 'label'),
    CCType: encodeURIComponent(lsValue('CCType', 'label')),
    secNo: lsValue('secNo', 'label'),
    CHADDRESS: encodeURIComponent(lsValue('CHADDRESS', 'label')),
    CHCTRY: encodeURIComponent(lsValue('CHCTRY', 'label')),
    CHPOSTCODE: encodeURIComponent(lsValue('CHPOSTCODE', 'label')),
    expiryMonth: lsValue('expiryMonth', 'label'),
    expiryYear: lsValue('expiryYear', 'label'),
  };

  const { paymentDetails } = data;

  if (paymentType === 'card') {
    data = {
      ...data,
      paymentDetails: {
        ...paymentDetails,
        ...cardData
      },
    };
  }

  console.log(data);
   //return;
   
   
   
   ;
   
   //data.firstLeg[0].accountRefId =
   
   
   
    var jsonData = JSON.stringify(data);

		$.ajax({
			async: false,
			dataType: "json",
			type: 'POST',
			url: '/mobile-api/',
			data: "process=churchill_orders_add&acc_id=49&accountCode=ec1f687b29d0d8efd24a0c8aa6535c230a23978c&customerName="+ encodeURIComponent(`${lsValue('first-name', 'label')} ${lsValue('last-name', 'label')}`) +"&customerEmail="+lsValue('email-address', 'label')+"&jsonData=" + encodeURIComponent(jsonData),
			success: function (res_data) {
				
				console.log('response_data', res_data);
				if (res_data.status === 200 || res_data.status === '200') {
				
					data.firstLeg[0].accountRefId = "CHT"+res_data.referenceId;
					
				  axios.post(API_BASE, {
					jsonData: data,
				  })
				  .then(({ data }) => {
					console.log('response_data', data);
					if (data.status === 200 || data.status === '200') {
					  localStorageSet('orderInfo', {
						customerId: data.customerId,
						orderId: data.orderId,
						referenceId: data.referenceId,
						chtReferenceId: "CHT"+res_data.referenceId,
						card_response: data.card_response,
						payment_type:paymentType
					  });

					  window.location.href="/booking4.html";
					  $('#payment-details-wrapper').unblock();
					  $('#total-price-display').unblock();
					} else {

					  const error_message = data.result_message || 'An error occured. Please try again.';

					  $("<div></div>").html(error_message).dialog({
						title: data.message_title || 'ERROR',
						resizable: false,
						modal: true,
						buttons: {
						  "OK": function () {
							$(this).dialog("close");
						  }
						},
						close: function() {
						  // onCloseCallback();
						  /* Cleanup node(s) from DOM */
						  $(this).dialog('destroy').remove();
						}
					  });

					  $('#total-price-display').unblock();
					  $('#payment-details-wrapper').unblock();
					}
				  })
				  .catch(finalErrorHandler => console.log(finalErrorHandler));
				  
				} else {

				  const error_message = res_data.result_message || 'An error occured. Please try again.';

				  $("<div></div>").html(error_message).dialog({
					title: res_data.result || 'ERROR',
					resizable: false,
					modal: true,
					buttons: {
					  "OK": function () {
						$(this).dialog("close");
					  }
					},
					close: function() {
					  // onCloseCallback();
					  /* Cleanup node(s) from DOM */
					  $(this).dialog('destroy').remove();
					}
				  });

				  $('#total-price-display').unblock();
				  $('#payment-details-wrapper').unblock();
				}
				
			}
		});
                        
	
	
	
  
   
  
	  
}