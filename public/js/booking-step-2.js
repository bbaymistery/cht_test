const formItems = [
  'pickup-address', 'dropoff-address','p_address','d_address',
  'pickup-date', 'pickup-time-hour', 'pickup-time-minute', 'p_flight_number',
  'number-of-passenger', 'number-of-bags', 'passenger-title', 'first-name',
  'last-name', 'email-address', 'phone-number', 'additional-information',
  'vehicle', 'driverPickupMin'
];


const isPickupAirport = localStorageGet('pickup-address');

const validateItems = [
						  'title', 'first-name', 'last-name', 'email-address', 'phone-number',
						  'vehicle', 'number-of-passenger', 'number-of-bags'
					  ];

if (isPickupAirport.catId === "1"){
		validateItems.push('driverPickupMin');
}



const getQuoteData = () => {
  $('#step-2-content-wrapper').block();
  const data = {
    method: 'wbsv_getQuotation',
    tripType: 'single',
    pickupPointsTransfer: encodeURIComponent(lsValue('pickup-address')),
    dropoffPointsTransfer: encodeURIComponent(lsValue('dropoff-address')),
    pickupDateTransfer: encodeURIComponent(lsValue('pickup-date', 'label')),
    pickupHourTransfer: encodeURIComponent(lsValue('pickup-time-hour', 'id')),
    pickupMinTransfer: encodeURIComponent(lsValue('pickup-time-minute', 'id')),
  };

  axios.post(API_BASE, {
    data,
  })
  .then(({ data }) => {
    const rootDomain = 'https://www.q-taxi.co.uk';
    const selectedVehicle = localStorageGet('vehicle');
	
	localStorageSet('meeting-point',data.meetingPoint);

    if (data.firstLegPrice.prices) {
      $('#step-2-vehicle-list').empty();
      _.map((vehicle) => {
        const template = `<div id="vehicle-${vehicle.car_id}" class="vehicle-section clearfix"
        data-vehicle-id="vehicle-${vehicle.car_id}"
        data-vehicle-name="${vehicle.carname}"
        data-vehicle-price="${vehicle.price}"
        data-vehicle-currency="${vehicle.currency}"
        data-vehicle-bag-limit="${vehicle.carsuitcases}"
        data-vehicle-passenger-limit="${vehicle.carpax}"
		data-vehicle-transfer-type="${vehicle.transfertype}"
        >
        <p>${vehicle.carname} <strong>${getCurrencySymbol(vehicle.currency)}${vehicle.price}</strong></p>
        <ul>
          <li class="vehicle-bag-limit">${vehicle.carsuitcases}</li>
          <li class="vehicle-passenger-limit">${vehicle.carpax}</li>
        </ul>
        <img src="${rootDomain}${vehicle.carimagepath}" alt="${vehicle.carname}" />
      </div>`;
      $('#step-2-vehicle-list').append(template);
    },data.firstLegPrice.prices)
  }



  if (selectedVehicle) {
    $(`#${selectedVehicle.label}`).addClass('selected');
  }

  $('.vehicle-section').on('click', function(e){
    const id = 'vehicle';
    const value = $(this).data('vehicle');
    const carid = $(this).data('vehicle-id');
    const carname = $(this).data('vehicle-name');
    const price = $(this).data('vehicle-price');
    const currency = $(this).data('vehicle-currency');
    const bagLimit = $(this).data('vehicle-bag-limit');
    const pasLimit = $(this).data('vehicle-passenger-limit');
	const transferType =  $(this).data('vehicle-transfer-type');

    $('#step-2-vehicle-list').removeClass('form-error');

    let bagLimitOptions = '<option value="Select">Select</option>';
    for (var i = 0; i < bagLimit+1; i++) {
      bagLimitOptions += `<option value="${i}">${i}</option>`
    }

    let pasLimitOptions = '<option value="Select">Select</option> ';
    for (var i = 1; i < pasLimit+1; i++) {
      pasLimitOptions += `<option value="${i}">${i}</option>`
    }

    $('#number-of-bags').html(bagLimitOptions);
    $('#number-of-passenger').html(pasLimitOptions);

    $('.vehicle-section').removeClass('selected');
    $(this).addClass('selected');
	
    localStorageSet(id, {
      id: carid.replace('vehicle-', ''),
      label: carname,	  
      value,
      price: price,
      currency: currency,
	  transferType: transferType,
    }, 'div');
	
  });

  $('#step-2-content-wrapper').unblock();

})
.catch(finalErrorHandler => console.log(finalErrorHandler));
}

$(function () {
  let timeType = '';
  let mapPickupAddress = '';
  let mapDropoffAddress = '';
  _.map((item) => {
    const value = localStorageGet(item);

    if (value) {
      if (value.type === 'input') {
        $(`#${item}`).val(value.label);
        $(`span#${item}-area`).text(value.label);
      } else if (value.type === 'select') {
        $(`#${item}`).val(value.id).change()
        .parent().append('<span class="input-action-icon"><i class="fa fa-check"></i></span>');
        $(`span#${item}-area`).text(value.label);
      } else {
        $(`#${item}`).val(value.label)
        .parent().append('<span class="input-action-icon"><i class="fa fa-check"></i></span>');
        $(`span#${item}-area`).text(value.label);
      }

      if (item === 'pickup-address') {
        let pickupTimeLabel = 'Pick Up Time';
        let pickupDateLabel = 'Pick Up Date';
        $('#pickup-address-select-container').hide();
        if (value.catId === '1') {
          pickupTimeLabel = 'Flight Landing Time'
          pickupDateLabel = 'Flight Landing Date'
          $('#when-should-pick-up-container').show();

          validateItems.push('p_flight_number');

        }else if (value.catId === '5') {
          axios.post(API_BASE, {
            data: {
              method: 'wbsv_getPostCodeAddresses',
              postcode: value.value.replace(", United Kingdom", ""),
            },
          })
          .then(({ data }) => {
            $("#p_address").empty();
            $('<option>').val("Select").text("Select").appendTo("#p_address");
            $.each(data.addresses, function (i, address) {
              $('<option>').val(address.address).text(address.address).appendTo("#p_address");
            })
          });
          $('#pickup-address-select-container').show();
          validateItems.push('p_address');
        }
        $('#date-input-label').text(`${pickupDateLabel}:`);
        $('#time-input-label').text(`${pickupTimeLabel}:`);
        mapPickupAddress = value.label;
      } else if (item === 'dropoff-address') {
        mapDropoffAddress = value.label;
        $('#dropoff-address-select-container').hide();
        if (value.catId === '5') {
          axios.post(API_BASE, {
            data: {
              method: 'wbsv_getPostCodeAddresses',
              postcode: value.value.replace(", United Kingdom", ""),
            },
          })
          .then(({ data }) => {
            $("#d_address").empty();
            $('<option>').val("Select").text("Select").appendTo("#d_address");
            $.each(data.addresses, function (i, address) {
              $('<option>').val(address.address).text(address.address).appendTo("#d_address");
            })
          });
          $('#dropoff-address-select-container').show();
          validateItems.push('d_address');
        }

      } else if (item === 'pickup-time-hour') {
        $(`span#${item}-area`).text(value.label);
        // timeType = value.label.slice(-2);
      } else if (item === 'pickup-time-minute') {
        $(`span#${item}-area`).text(`${value.label}`);
        $(`span#pickup-time-type`).text(timeType);
      } else if (item === 'vehicle') {
        $(`#${value.label}`).addClass('selected');
      }
    }
  }, formItems);

  getQuoteData();

  mapPickupAddress && mapDropoffAddress &&
  $('.view-map-button').attr('href', '//maps.google.com/maps?saddr='+ encodeURIComponent(mapPickupAddress) +'&daddr='+ encodeURIComponent(mapDropoffAddress) +'&ie=UTF8&amp;z=12&amp;layer=t&amp;t=m&amp;iwloc=A&amp;output=embed?iframe=true&amp;width=640&amp;height=480')

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

  $('#confirm-and-pay-button').on('click', function(e){
    e.preventDefault();
    let error = false;
    validateItems.map(item => {
      const value = localStorageGet(item);
      if (item === 'vehicle') {
        $selected = $('#step-2-vehicle-list').find('.selected');
        if ($selected.length <= 0) {
          error = true;
          $('#step-2-vehicle-list').addClass('form-error');
        } else {
          $('#step-2-vehicle-list').removeClass('form-error');
        }
      } else {

        if ($(`#${item}`).val() === '' || $(`#${item}`).val() === 'Select') {
          console.log(`${item} degeri hatali -> `, $(`#${item}`).val());
          error = true;
          $(`#${item}`).parent().addClass('form-error').find('.input-action-icon').remove();
          // if ($(`#${item}`).prop('type') !== 'select-one') {

          $(`#${item}`).parent().append('<span class="input-action-icon"><i class="fa fa-times"></i></span>');
          // }
        } else {
          $(`#${item}`).parent().removeClass('form-error').find('.input-action-icon').remove()
          // if ($(`#${item}`).prop('type') !== 'select-one') {
          $(`#${item}`).parent().append('<span class="input-action-icon"><i class="fa fa-check"></i></span>');
          // }
        }
      }
    });

    console.log('form error: ', error);

    if (!error) {
      window.location.href="/booking3.html";
    }
  })
  
  $('.meeting_time_msg').qtip({
                 content: {
                     text: '<p>Please allow enough time to clear immigration and baggage reclaim, <span style="color:#007ACC; font-weight:bold;"> after the requested pickup time, \
							there will be a 30 minutes FREE waiting time at the airport</span>.  Our driver will be waiting for you in the arrivals hall, with an “Airport Pickups” \
							name board with your name on it. They will then accompany you to the vehicle.</p> \
							<p>If you realise that you will not be able to meet the driver within the 30 minutes, then if you contact us, we will hold the driver in the terminal\
							for an extra 30 mins at a charge of £5.00 for every 15 minutes. If you are still not out within this time then the driver will be pulled off and the job\
							will be registered as a no show.</p><p>For example, if your flight lands at 10:00 am, and you have requested your pickup time to be 60 mins after the flight landing time;\
							our driver will be in the terminal at 11 am. The driver will wait till 11:30 am FREE of charge. After this time, if requested, the driver will wait an additional 30 mins\
							chargeable at £5.00 for every 15 minutes.</p>'
                 },
                 position: {
                     adjust: { scroll: true },

                     corner: {
                         target: 'topLeft',
                         tooltip: 'bottomRight'

                     }
                 },
                 style: {
                     width: 600,
                     height: 300,
                     background: '#fffeea',
                     color: 'black',
                     textAlign: 'left',
                     border: {
                         width: 7,
                         radius: 5,
                         color: '#A0A8AE'
                     },
                     tip: 'bottomRight',
                     name: 'dark'
                 },
                 adjust: {
                     screen: true
                 }


             });

});
