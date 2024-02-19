const formItems = [
  'pickup-address', 'dropoff-address','p_address','d_address','p_flight_number',
  'pickup-date', 'pickup-time-hour', 'pickup-time-minute',
  'number-of-passenger', 'number-of-bags', 'first-name',
  'last-name', 'email-address', 'phone-number', 'additional-information',
  'vehicle', 'driverPickupMin', 'passenger-title', 'orderInfo', 'meeting-point'
];

const validateItems = [
  'CCType', 'CCNumber', 'CCName', 'secNo', 'expiryMonth', 'expiryYear',
  'CHADDRESS', 'CHPOSTCODE', 'CHPOSTCODE', 'CHCTRY', 'chkAgree'
];

$(function () {
  let timeType = '';
  let mapPickupAddress = '';
  let mapDropoffAddress = '';
  $('#step-4-content-wrapper').block();
  const userDetails = {};
  _.map((item) => {
    const value = localStorageGet(item);
    let payment_title = "";
    let payment_message = "";
    let payment_type = "";

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

      if (item === 'orderInfo') {
          // Payment type: cash
          payment_type = value.payment_type;
        if (value.payment_type === 'cash') {
          payment_title = "Payment Successful";
          payment_message= "Your payment has been accepted, details of your booking will be emailed to you shortly, if you have any questions please do not hesitate to get in touch through the contact page or by phone";
          // Payment type: card
        } else if (value.payment_type === 'card') {
          if (value.card_response === "Success") {
            payment_title = "Payment Successful";
            payment_message= "Your payment has been accepted, details of your booking will be emailed to you shortly, if you have any questions please do not hesitate to get in touch through the contact page or by phone";

          } else {
            payment_title = "Payment Declined";
            payment_message= "We will still be providing your transfer, although you will be required to pay cash to the driver on arrival. If you still wish to pay by card, please feel free to contact us and we will try to take your payment again.";
          }
        }

        $(`span#order-id-area`).text(value.chtReferenceId);
        $(`#payment_title`).html(payment_title);
        $(`#payment_message`).html(payment_message);

        //$(`span#reference-id-area`).text(value.referenceId);
        //$(`span#customer-id-area`).text(value.customerId);

      } else if (item === 'pickup-address') {
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

    switch (item) {
      case 'email-address':
            userDetails.email = (value !=null ? value.label : "");break;
      case 'passenger-title':
            userDetails.title = (value !=null ? value.label : "");break;
        case 'first-name':
            userDetails.fname = (value !=null ? value.label : "");break;
        case 'last-name':
            userDetails.lname = (value !=null ? value.label : "");break;
			
      case 'orderInfo':
        userDetails.order = value;
        userDetails.payment = {
          type: payment_type,
          title: payment_title,
          message: payment_message,
        }; break;
        case 'number-of-passenger':
            userDetails.numberOfPassenger = (value !=null ? value.label : "");break;
        case 'phone-number':
            userDetails.contactNumber = (value !=null ? value.label : "");break;
        case 'pickup-date':
            userDetails.pickupDate = (value !=null ? value.label : "");break;
        case 'pickup-time-hour':
            userDetails.pickupTimeHour = (value !=null ? value.label : "");break;
        case 'pickup-time-minute':
            userDetails.pickupTimeMinute = (value !=null ? value.label : "");break;
        case 'p_flight_number':
            userDetails.p_flight_number = (value !=null ? value.label : "");break;
        case 'driverPickupMin':
            userDetails.driverPickupMin = (value !=null ? value.label : "");break;
        case 'pickup-address':
            userDetails.pickupAddress = (value !=null ? value.label : "");
            userDetails.pickupCatId = (value !=null ? value.catId : "");break;
        case 'p_address':
            userDetails.p_address = (value !=null ? value.label : "");break;
        case 'dropoff-address':
            userDetails.dropOffAddress = (value !=null ? value.label : "");
            userDetails.dropOffCatId = (value !=null ? value.catId : "");break;
        case 'd_address':
            userDetails.d_address = (value !=null ? value.label : "");break;
		case 'meeting-point':
            userDetails.meeting_point = (value !=null ? value : "");break;			
      case 'vehicle':
        userDetails.vehicleType = value.label;
		userDetails.transfeType = value.transferType;
        userDetails.price = value.price;
        userDetails.priceCurrency = value.currency; break;
        case 'additional-information':
            userDetails.additionalInformation = (value !=null ? value.label : "");break;
      default: break;
    }
  }, formItems);

  fetch('sendgrid.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userDetails),
  })
  .then(response => response.json())
  .then(json => {
    if (json.message === 'success') {
      console.log('response', json);
    }
    //window.localStorage.clear();
  });

  $('#step-4-content-wrapper').unblock();

  mapPickupAddress && mapDropoffAddress &&
  $('.view-map-button').attr('href', '//maps.google.com/maps?saddr='+ encodeURIComponent(mapPickupAddress) +'&daddr='+ encodeURIComponent(mapDropoffAddress) +'&ie=UTF8&amp;z=9&amp;layer=t&amp;t=m&amp;iwloc=A&amp;output=embed?iframe=true&amp;width=640&amp;height=480')

function strpad00(s)
{
    s = s + '';
    if (s.length === 1) s = '0'+s;
    return s;
}

var now = new Date();
var currentDate = strpad00(now.getDate())+ "/" + strpad00(now.getMonth()+1) + "/" +  now.getFullYear();

  
  
  
   let feefo_data = [{
						description: userDetails.pickupAddress + " to " + userDetails.dropOffAddress,
						productsearchcode: "CUSTOMERTRANSFERS",
						amount: userDetails.price, 
						productlink: "https://www.churchilltransfers.com", 
						currency: "GBP", 
						tags: {
							saleschannel: "Web",
							productline: "Taxi Service"
						},
					}];

  
  
  var ifrm = $("#FSI_IFrame");		
        ifrm.attr("src", "https://api.feefo.com/api/sales/merchant?merchantidentifier=churchill-transfers");
		ifrm.attr("data-feefo-email", userDetails.email);
		ifrm.attr("data-feefo-orderref", userDetails.order.chtReferenceId);
		ifrm.attr("data-feefo-name", userDetails.fname + " " + userDetails.lname);
		ifrm.attr("data-feefo-customerref", "QTX-" + userDetails.order.referenceId);
		ifrm.attr("data-feefo-feedbackdate", userDetails.pickupDate);
		ifrm.attr("data-feefo-products", JSON.stringify(feefo_data));
		
		 var FPMH = new Feefo.PostMessageHandler();
  FPMH.init();
  
  
});
