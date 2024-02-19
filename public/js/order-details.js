const formItems = [
  "trip-type",
  "pickup-address",
  "dropoff-address",
  "p_address",
  "d_address",
  "p_flight_number",
  "pickup-date",
  "pickup-time-hour",
  "pickup-time-minute",
  "number-of-passenger",
  "number-of-bags",
  "first-name",
  "last-name",
  "email-address",
  "phone-number",
  "additional-information",
  "vehicle",
  "driverPickupMin",
  "passenger-title",
  "orderInfo",
  "meeting-point"
];

const validateItems = [
  "CCType",
  "CCNumber",
  "CCName",
  "secNo",
  "expiryMonth",
  "expiryYear",
  "CHADDRESS",
  "CHPOSTCODE",
  "CHPOSTCODE",
  "CHCTRY",
  "chkAgree"
];

const zeroDigitFix = value => {
  return value < 9 ? "0" + value : value;
};

const capitalizeFirstLetter = value => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const tripType = lsValue("trip-type", "value");

const journey_price = lsValue("vehicle", "value").journeyprice;

let total_price = "";

if (tripType === "return") {
  const journey_price_return = lsValue("vehicle-return", "value").journeyprice;

  total_price = (
    Number.parseFloat(journey_price) + Number.parseFloat(journey_price_return)
  ).toFixed(2);

  $("#total-price-area").text("GBP " + total_price);
} else {
  total_price = Number.parseFloat(journey_price);
  $("#total-price-area").text("GBP " + total_price.toFixed(2));
}

$("#payment-method-area").text(
  capitalizeFirstLetter(localStorageGet("orderInfo").payment_type)
);

const returnTemplate = `					<hr class="space2" />
<h4>Return Journey Details</h4>
<div class="title-block7"></div>

<div class="clearfix">
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half">
  <input type="hidden" name="pickup-address-return" id="pickup-address-return" />
  <input type="hidden" name="dropoff-address-return" id="dropoff-address-return" />
  <input type="hidden" name="pickup-date-return" id="pickup-date-return" />
  <input type="hidden" name="pickup-time-hour-return" id="pickup-time-hour-return" />
  <input type="hidden" name="pickup-time-minute-return" id="pickup-time-minute-return" />

  <p class="clearfix"><strong>Reservation ID</strong> <span id="order-id-return-area">0</span></p>
  <p class="clearfix"><strong>From</strong> <span id="pickup-address-return-area"></span><span id="p_address-return"></span></p>
  <p class="clearfix"><strong>To</strong> <span id="dropoff-address-return-area"></span><span id="d_address-return"></span></p>
  
  <p class="clearfix"><strong id="date-input-label-return">Pick Up Date</strong> <span id="pickup-date-return-area"></span></p>
  <p class="clearfix" id="driverPickupMin-title-return" style="display:none"><strong>Pick Up Time</strong> <span id="driverPickupMin-return-area">0</span></p>
  <p class="clearfix" id="p_flight_number-title-return" style="display:none"><strong>Flight Number</strong> <span id="p_flight_number-return-area">0</span></p>
  <p class="clearfix"><strong>Vehicle</strong> <span id="vehicle-return-area"></span></p>
  <p class="clearfix"><strong>Transfer Type</strong> <span id="transfer-type-return-area"></span></p>
  <p class="clearfix"><strong>Journey Price</strong> <span id="journey-price-return-area"></span></p>
  <!-- END .qns-one-half -->
</div>

<!-- BEGIN .qns-one-half -->
<div class="qns-one-half last-col">
    <div id='map-div-return' style='width: 100%; height: 290px'> </div>
<!-- END .qns-one-half -->
</div>

<!-- END .clearfix -->
</div>

<hr class="space2" />

<h4>Return Passengers Details</h4>
<div class="title-block7"></div>

<!-- BEGIN .clearfix -->
<div class="clearfix">

  <div class="qns-one-half">									
      <p class="clearfix"><strong>Name</strong><span id="full-name-return-area"></span></span></p>
      <p class="clearfix"><strong>Email</strong> <span id="email-address-return-area"></span></p>
      <p class="clearfix"><strong>Phone</strong> <span id="phone-number-return-area"></span></p>
      <p class="clearfix"><strong>Passengers</strong> <span id="number-of-passenger-return-area">0</span></p>
      <p class="clearfix"><strong>Suitcases</strong> <span id="number-of-bags-return-area">0</span></p>
  </div>						

  <!-- BEGIN .passenger-details-wrapper -->
  <div class="passenger-details-wrapper additional-information-wrapper last-col">

    <p class="clearfix"><strong>Additional Information:</strong> <span id="additional-information-return-area"></span></p>

  <!-- END .passenger-details-wrapper -->
  </div>

<!-- END .clearfix -->
</div>`;

if (tripType === "return") {
  $("#return-customer-details").html("");
  $("#return-customer-details").html(returnTemplate);

  formItems.push("pickup-address-return");
  formItems.push("dropoff-address-return");
  formItems.push("p_address-return");
  formItems.push("d_address-return");
  formItems.push("pickup-date-return");
  formItems.push("pickup-time-hour-return");
  formItems.push("pickup-time-minute-return");
  formItems.push("p_flight_number-return");
  formItems.push("number-of-passenger-return");
  formItems.push("number-of-bags-return");
  formItems.push("passenger-title-return");
  formItems.push("first-name-return");
  formItems.push("last-name-return");
  formItems.push("email-address-return");
  formItems.push("phone-number-return");
  formItems.push("additional-information-return");
  formItems.push("vehicle-return");
  formItems.push("driverPickupMin-return");

  let mapPickupAddressReturn = lsValue("pickup-address-return", "value");
  let mapDropoffAddressReturn = lsValue("dropoff-address-return", "value");

  initMap(
    "map-div-return",
    mapPickupAddressReturn,
    mapDropoffAddressReturn,
    "",
    "",
    ""
  );
}

$(function() {
  let timeType = "";
  let mapPickupAddress = "";
  let mapDropoffAddress = "";
  let mapPickupAddressReturn = "";
  let mapDropoffAddressReturn = "";
  $("#step-4-content-wrapper").block();
  const userDetails = {};
  _.map(item => {
    const value = localStorageGet(item);
    let payment_title = "";
    let payment_message = "";
    let payment_type = "";

    if (value) {
      if (value.type === "input") {
        // console.log(item);
        $(`#${item}`).val(value.label);
        if (item === "pickup-date" || item === "pickup-date-return") {
          //$(`span#${item}-area`).text(value.label);
        } else if (
          item === "first-name" ||
          item === "last-name" ||
          item === "first-name-return" ||
          item === "last-name-return"
        ) {
          //$(`span#${item}-area`).text(value.label);
        } else {
          $(`span#${item}-area`).text(value.label);
        }
      } else if (value.type === "select") {
        $(`#${item}`)
          .val(value.id)
          .change();
        $(`span#${item}-area`).text(value.label);
      } else {
        $(`#${item}`)
          .val(value.label)
          .parent()
          .append(
            '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
          );
        $(`span#${item}-area`).text(value.label);
      }

      if (item === "orderInfo") {
        // Payment type: cash
        payment_type = value.payment_type;
        if (value.payment_type === "cash") {
          payment_title = "Payment Successful";
          payment_message =
            "Your payment has been accepted, details of your booking will be emailed to you shortly, if you have any questions please do not hesitate to get in touch through the contact page or by phone";
          // Payment type: card
        } else if (value.payment_type === "card") {
          if (value.card_response === "Success") {
            payment_title = "Payment Successful";
            payment_message =
              "Your payment has been accepted, details of your booking will be emailed to you shortly, if you have any questions please do not hesitate to get in touch through the contact page or by phone";
          } else {
            payment_title = "Payment Declined";
            payment_message =
              "We will still be providing your transfer, although you will be required to pay cash to the driver on arrival. If you still wish to pay by card, please feel free to contact us and we will try to take your payment again.";
          }
        }

        if (tripType === "return") {
          $(`span#order-id-return-area`).text(value.chtReferenceIdReturn);
        }

        $(`span#order-id-area`).text(value.chtReferenceId);
        $(`#payment_title`).html(payment_title);
        $(`#payment_message`).html(payment_message);

        //$(`span#reference-id-area`).text(value.referenceId);
        //$(`span#customer-id-area`).text(value.customerId);
      } else if (item === "pickup-address") {
        let pickupDateTime =
          lsValue("pickup-date", "label") +
          " " +
          lsValue("pickup-time-hour", "id") +
          ":" +
          lsValue("pickup-time-minute", "id");

        $("#pickup-date-area").html(pickupDateTime);
        let pickupDateLabel = "Pick Up Date and Time";

        if (value.catId === "1") {
          pickupTimeLabel = "Flight Landing Time";
          pickupDateLabel = "Flight Landing Date and Time";
          $("#driverPickupMin-title").show();
          $("#p_flight_number-title").show();
        }
        $("#date-input-label").text(`${pickupDateLabel}`);

        mapPickupAddress = value.label;
      } else if (item === "dropoff-address") {
        mapDropoffAddress = value.label;
      } else if (item === "p_address") {
        $(`span#p_address`).text(`${value.label}`);
      } else if (item === "d_address") {
        $(`span#d_address`).text(`${value.label}`);
      } else if (item === "pickup-time-hour") {
        $(`span#${item}-area`).text(value.label.slice(0, 2));
        timeType = value.label.slice(-2);
      } else if (item === "pickup-time-minute") {
        $(`span#${item}-area`).text(`${value.label}`);
        $(`span#pickup-time-type`).text(timeType);
      } else if (item === "driverPickupMin") {
        $(`span#${item}-area`).text(`${value.label} minute(s) later`);
      } else if (item === "p_flight_number") {
        $(`span#${item}-area`).text(`${value.label}`);
      } else if (item === "vehicle") {
        $("#vehicle-area").text(`${value.value.carname}`);
        $(`#journey-price-area`).text(`GBP ${value.value.journeyprice}`);
        $("#transfer-type-area").text(`${value.value.transfertype}`);
      } else if (item === "pickup-address-return") {
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        };
        const pickupDateTimeReturn =
          new Date(lsValue("pickup-date-return", "label")).toLocaleDateString(
            "en-US",
            options
          ) +
          " " +
          lsValue("pickup-time-hour-return", "id") +
          ":" +
          lsValue("pickup-time-minute-return", "id");

        $("#pickup-date-return-area").html(pickupDateTimeReturn);

        let pickupDateLabel = "Pick Up Date and Time";

        if (value.catId === "1") {
          pickupTimeLabel = "Flight Landing Time";
          pickupDateLabel = "Flight Landing Date and Time";
          $("#driverPickupMin-title-return").show();
          $("#p_flight_number-title-return").show();
        }
        $("#date-input-label-return").text(`${pickupDateLabel}`);

        mapPickupAddress = value.label;
      } else if (item === "dropoff-address-return") {
        mapDropoffAddress = value.label;
      } else if (item === "p_address-return") {
        $(`span#p_address-return`).text(`${value.label}`);
      } else if (item === "d_address-return") {
        $(`span#d_address-return`).text(`${value.label}`);
      } else if (item === "pickup-time-hour-return") {
        $(`span#${item}-return-area`).text(value.label.slice(0, 2));
        timeType = value.label.slice(-2);
      } else if (item === "pickup-time-minute-return") {
        $(`span#${item}-return-area`).text(`${value.label}`);
        $(`span#pickup-time-type-return`).text(timeType);
      } else if (item === "driverPickupMin-return") {
        $(`span#${item}-return-area`).text(
          `${value.label} minutes from flight landing time. `
        );
      } else if (item === "p_flight_number-return") {
        $(`span#${item}-return-area`).text(`${value.label}`);
      } else if (item === "vehicle-return") {
        $("#vehicle-return-area").text(`${value.value.carname}`);
        $(`#journey-price-return-area`).text(`GBP ${value.value.journeyprice}`);
        $("#transfer-type-return-area").text(`${value.value.transfertype}`);
      }
    }

    switch (item) {
      case "trip-type":
        userDetails.trip_type = value != null ? value.label : "";
        break;
      case "email-address":
        userDetails.email = value != null ? value.label : "";
        break;
      case "passenger-title":
        userDetails.title = value != null ? value.label : "";
        break;
      case "first-name":
        userDetails.fname = value != null ? value.label : "";
        break;
      case "last-name":
        userDetails.lname = value != null ? value.label : "";
        break;

      case "orderInfo":
        userDetails.order = value;
        userDetails.payment = {
          type: payment_type,
          title: payment_title,
          message: payment_message
        };
        break;
      case "number-of-passenger":
        userDetails.numberOfPassenger = value != null ? value.label : "";
        break;
      case "phone-number":
        userDetails.contactNumber = value != null ? value.label : "";
        break;
      case "pickup-date":
        userDetails.pickupDate = value != null ? value.label : "";
        break;
      case "pickup-time-hour":
        userDetails.pickupTimeHour = value != null ? value.label : "";
        break;
      case "pickup-time-minute":
        userDetails.pickupTimeMinute = value != null ? value.label : "";
        break;
      case "p_flight_number":
        userDetails.p_flight_number = value != null ? value.label : "";
        break;
      case "driverPickupMin":
        userDetails.driverPickupMin = value != null ? value.label : "";
        break;
      case "pickup-address":
        userDetails.pickupAddress = value != null ? value.label : "";
        userDetails.pickupCatId = value != null ? value.catId : "";
        break;
      case "p_address":
        userDetails.p_address = value != null ? value.label : "";
        break;
      case "dropoff-address":
        userDetails.dropOffAddress = value != null ? value.label : "";
        userDetails.dropOffCatId = value != null ? value.catId : "";
        break;
      case "d_address":
        userDetails.d_address = value != null ? value.label : "";
        break;
      case "meeting-point":
        userDetails.meeting_point = value != null ? value : "";
        break;
      case "vehicle":
        userDetails.vehicleType = value.value.carname;
        userDetails.transfeType = value.value.transfertype;
        userDetails.journeyprice = value.value.journeyprice;
        userDetails.priceCurrency = value.value.currency;
        userDetails.total_price = total_price;
        break;
      case "additional-information":
        userDetails.additionalInformation = value != null ? value.label : "";
        break;
      case "email-address-return":
        userDetails.email_return = value != null ? value.label : "";
        break;
      case "passenger-title-return":
        userDetails.title_return = value != null ? value.label : "";
        break;
      case "first-name-return":
        userDetails.fname_return = value != null ? value.label : "";
        break;
      case "last-name-return":
        userDetails.lname_return = value != null ? value.label : "";
        break;

      case "orderInfo":
        userDetails.order = value;
        userDetails.payment = {
          type: payment_type,
          title: payment_title,
          message: payment_message
        };
        break;
      case "number-of-passenger-return":
        userDetails.numberOfPassenger_return = value != null ? value.label : "";
        break;
      case "phone-number-return":
        userDetails.contactNumber_return = value != null ? value.label : "";
        break;
      case "pickup-date-return":
        userDetails.pickupDate_return = value != null ? value.label : "";
        break;
      case "pickup-time-hour-return":
        userDetails.pickupTimeHour_return = value != null ? value.label : "";
        break;
      case "pickup-time-minute-return":
        userDetails.pickupTimeMinute_return = value != null ? value.label : "";
        break;
      case "p_flight_number-return":
        userDetails.p_flight_number_return = value != null ? value.label : "";
        break;
      case "driverPickupMin-return":
        userDetails.driverPickupMin_return = value != null ? value.label : "";
        break;
      case "pickup-address-return":
        userDetails.pickupAddress_return = value != null ? value.label : "";
        userDetails.pickupCatId_return = value != null ? value.catId : "";
        break;
      case "p_address-return":
        userDetails.p_address_return = value != null ? value.label : "";
        break;
      case "dropoff-address-return":
        userDetails.dropOffAddress_return = value != null ? value.label : "";
        userDetails.dropOffCatId_return = value != null ? value.catId : "";
        break;
      case "d_address-return":
        userDetails.d_address_return = value != null ? value.label : "";
        break;
      case "meeting-point-return":
        userDetails.meeting_point_return = value != null ? value : "";
        break;
      case "vehicle-return":
        userDetails.vehicleType_return = value.value.carname;
        userDetails.transfeType_return = value.value.transfertype;
        userDetails.journeyprice_return = value.value.journeyprice;
        userDetails.priceCurrency_return = value.value.currency;
        break;
      case "additional-information-return":
        userDetails.additionalInformation_return =
          value != null ? value.label : "";
        break;
      default:
        break;
    }
  }, formItems);

  fetch("sendgrid.php", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userDetails)
  })
    .then(response => response.json())
    .then(json => {
      if (json.message === "success") {
        console.log("response", json);
      }
      //window.localStorage.clear();
    });

  $("#step-4-content-wrapper").unblock();

  initMap("map-div", mapPickupAddress, mapDropoffAddress, "", "", "");

  function strpad00(s) {
    s = s + "";
    if (s.length === 1) s = "0" + s;
    return s;
  }

  var now = new Date();
  var currentDate =
    strpad00(now.getDate()) +
    "/" +
    strpad00(now.getMonth() + 1) +
    "/" +
    now.getFullYear();

  let feefo_data = [
    {
      description:
        userDetails.pickupAddress + " to " + userDetails.dropOffAddress,
      productsearchcode: "CUSTOMERTRANSFERS",
      amount: userDetails.price,
      productlink: "https://www.churchilltransfers.com",
      currency: "GBP",
      tags: {
        saleschannel: "Web",
        productline: "Taxi Service"
      }
    }
  ];

  var ifrm = $("#FSI_IFrame");
  ifrm.attr(
    "src",
    "https://api.feefo.com/api/sales/merchant?merchantidentifier=churchill-transfers"
  );
  ifrm.attr("data-feefo-email", userDetails.email);
  ifrm.attr("data-feefo-orderref", userDetails.order.chtReferenceId);
  ifrm.attr("data-feefo-name", userDetails.fname + " " + userDetails.lname);
  ifrm.attr("data-feefo-customerref", "QTX-" + userDetails.order.referenceId);
  ifrm.attr("data-feefo-feedbackdate", userDetails.pickupDate);
  ifrm.attr("data-feefo-products", JSON.stringify(feefo_data));

  var FPMH = new Feefo.PostMessageHandler();
  FPMH.init();
});
