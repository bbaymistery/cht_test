const formItems = [
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
  "passenger-title"
];

const validateItems = ["chkAgree"];

const zeroDigitFix = value => {
  return value < 9 ? "0" + value : value;
};

const tripType = lsValue("trip-type", "value");

const journey_price = lsValue("vehicle", "value").journeyprice;

let total_price = "";

if (tripType === "return") {
  let journey_price_return = lsValue("vehicle-return", "value").journeyprice;

  total_price = (
    Number.parseFloat(journey_price) + Number.parseFloat(journey_price_return)
  ).toFixed(2);

  $("#total-price-area").text("GBP " + total_price);
} else {
  total_price = Number.parseFloat(journey_price);
  $("#total-price-area").text("GBP " + total_price.toFixed(2));
}

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
    <div id='map-div-return' style='width: 100%; height: 333px'> </div>
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
  $("#step-3-content-wrapper").block();
  _.map(item => {
    const value = localStorageGet(item);

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

      $("#full-name-area").text(
        lsValue("first-name", "id") + " " + lsValue("last-name", "id")
      );

      if (item === "pickup-address") {
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
        $(`span#${item}-area`).text(
          `${value.label} minutes from flight landing time. `
        );
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
  }, formItems);

  $("#step-3-content-wrapper").unblock();

  initMap("map-div", mapPickupAddress, mapDropoffAddress, "", "", "");

  $("select, input, textarea").change(function() {
    // console.log($(this).prop('type'));
    const id = $(this).attr("id");
    const value = $(this).val();
    localStorageSet(
      id,
      { id: value, label: value, value },
      $(this)
        .prop("type")
        .replace("-one", "")
    );
  });

  $("input").change(function() {
    const id = $(this).attr("id");
    const value = $(this).val();
    if ($(`#${id}`).val() === "") {
      error = true;
      $(`#${id}`)
        .parent()
        .addClass("form-error")
        .find(".input-action-icon")
        .remove();
      if ($(`#${id}`).prop("type") !== "select-one") {
        $(`#${id}`)
          .parent()
          .append(
            '<span class="input-action-icon"><i class="fa fa-times"></i></span>'
          );
      }
    }
  });

  var agreeDiv =
    '<div class="qns-one book-input checkbox-wrapper payment-agreement-box">\
            <input type="checkbox" id="chkAgree" name="chkAgree" />\
            <a href="#" title="I agree with terms and conditions" id="readTerm" style="color: #fff;" onclick="return false;"> I agree with terms and conditions</a>\
        </div>';

  $("#cash-agreement").html("");
  $("#cash-agreement").html(agreeDiv);
  $("#card-agreement").html("");

  $("#payment-button-card").on("click", function(e) {
    e.preventDefault();

    $("#card-agreement").html("");
    $("#card-agreement").html(agreeDiv);
    $("#cash-agreement").html("");

    $("#payment-details-wrapper").slideDown();
  });

  $("#payment-button-cash").on("click", function(e) {
    e.preventDefault();
    let error = false;

    if ($("#cash-agreement").find("input").length != 1) {
      $("#cash-agreement").html("");
      $("#cash-agreement").html(agreeDiv);
      $("#card-agreement").html("");
    }

    $("#payment-details-wrapper").slideUp();
    const agreementControl = checkAgreement("cash");

    if (agreementControl) {
      error = true;
    }

    if (error) {
      console.log("validated");
      postCardData();
      // window.location.href="/booking4.html";
    }
  });

  $("#proceed-to-payment-button").on("click", function(e) {
    e.preventDefault();
    let error = false;

    const agreementControl = checkAgreement("card");
    console.log("agreementControl", agreementControl);

    if (agreementControl) {
      error = true;
    }

    if (!error) {
      console.log("validated");
      postCardData("card");
      // window.location.href="/booking4.html";
    } else {
      console.log("An unknown error occured");
    }
  });

  $("a#readTerm").on("click", function(e) {
    e.preventDefault();
    $("#dialog-message").dialog({
      modal: true,
      minWidth: 600,
      maxHeight: 600,
      appendTo: "body",
      buttons: {
        Ok: function() {
          $(this).dialog("close");
        }
      }
    });
  });
});

const checkAgreement = pt => {
  let error = false;

  console.log("validateItems", validateItems);

  if (pt === "cash") {
    if (!$(`input#chkAgree`).is(":checked")) {
      $(`input#chkAgree`)
        .parent()
        .addClass("form-error")
        .find(".input-action-icon")
        .remove();
      $(`input#chkAgree`)
        .parent()
        .append(
          '<span class="input-action-icon"><i class="fa fa-times"></i></span>'
        );
    } else {
      $(`input#chkAgree`)
        .parent()
        .removeClass("form-error")
        .find(".input-action-icon")
        .remove();
      $(`input#chkAgree`)
        .parent()
        .append(
          '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
        );
      error = true;
    }
  } else {
    if ($(`input#chkAgree`).is(":checked")) {
      validateItems.push("CCType");
      validateItems.push("CCNumber");
      validateItems.push("CCName");
      validateItems.push("secNo");
      validateItems.push("expiryMonth");
      validateItems.push("expiryYear");
      validateItems.push("CHADDRESS");
      validateItems.push("CHPOSTCODE");
      validateItems.push("CHPOSTCODE");
      validateItems.push("CHCTRY");

      validateItems.map(item => {
        const value = localStorageGet(item);

        if (item === "chkAgree") {
          if ($(`input#${item}`).is(":checked")) {
            $(`#${item}`)
              .parent()
              .removeClass("form-error")
              .find(".input-action-icon")
              .remove();
            $(`#${item}`)
              .parent()
              .append(
                '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
              );
          } else {
            $(`#${item}`)
              .parent()
              .addClass("form-error")
              .find(".input-action-icon")
              .remove();
            $(`#${item}`)
              .parent()
              .append(
                '<span class="input-action-icon"><i class="fa fa-times"></i></span>'
              );
          }
        } else if ($(`#${item}`).val() === "") {
          error = true;
          $(`#${item}`)
            .parent()
            .addClass("form-error")
            .find(".input-action-icon")
            .remove();
          $(`#${item}`)
            .parent()
            .append(
              '<span class="input-action-icon"><i class="fa fa-times"></i></span>'
            );
        } else {
          $(`#${item}`)
            .parent()
            .removeClass("form-error")
            .find(".input-action-icon")
            .remove();
          $(`#${item}`)
            .parent()
            .append(
              '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
            );
        }
      });
    } else {
      error = true;
      $(`#chkAgree`)
        .parent()
        .addClass("form-error")
        .find(".input-action-icon")
        .remove();
      $(`#chkAgree`)
        .parent()
        .append(
          '<span class="input-action-icon"><i class="fa fa-times"></i></span>'
        );
    }
  }

  return error;
};

const chtReferenceId = ""; // `CHT${unixTime()}`;

const postCardData = (paymentType = "cash") => {
  $("#payment-details-wrapper").block();
  $("#total-price-display").block();

  let data = {
    method: "wbsv_newBooking",
    isReturn: tripType === "single" ? "0" : "1",
    accountId: 49, //This a unique number which we provide
    accprefix: "CHT", //This a unique code which we provide
    createdBy: "UserName", //This is the name of the one who is creating the booking
    bookingPlatform: "www.churchilltransfers.com", //Do not change this  one
    firstLeg: [
      {
        title: lsValue("passenger-title", "label"),
        passengerName: encodeURIComponent(
          `${lsValue("first-name", "label")} ${lsValue("last-name", "label")}`
        ),
        emailAddress: lsValue("email-address", "label"),
        contactNumber: encodeURIComponent(lsValue("phone-number", "label")),
        pickupPoints: [
          {
            point: encodeURIComponent(lsValue("pickup-address", "label")),
            //“address” field from wbsv_getQueryResults method
            catId: lsValue("pickup-address", "catId"), //“pcatId” field from wbsv_getQueryResults method
            pointDetail: encodeURIComponent(lsValue("pickup-address", "detail")),
            //”pdetail” field from wbsv_getQueryResults method
            pDate: lsValue("pickup-date", "label"),
            pTime: `${lsValue("pickup-time-hour", "label")}:${lsValue(
              "pickup-time-minute",
              "label"
            )}`,
            flightDetails: {
              flightNumber: encodeURIComponent(
                lsValue("p_flight_number", "label")
              ),
              driverPickupMin: lsValue("driverPickupMin", "label")
            },
            cruiseName: "",
            trainNumber: "",
            hotelRoomNumber: "",
            address: encodeURIComponent(lsValue("p_address", "label"))
          }
        ],
        dropOffPoints: [
          {
            point: encodeURIComponent(lsValue("dropoff-address", "label")),
            catId: lsValue("dropoff-address", "catId"),
            pointDetail: encodeURIComponent(lsValue("dropoff-address", "detail")),
            flightDetails: {
              flightNumber: ""
            },
            cruiseName: "",
            trainNumber: "",
            hotelRoomNumber: "",
            address: encodeURIComponent(lsValue("d_address", "label"))
          }
        ],
        vehicle: {
          type: encodeURIComponent(lsValue("vehicle", "value").carname), //”carname” field from wbsv_getQuotation method
          carId: lsValue("vehicle", "value").car_id //”car_id” field from wbsv_getQuotation method
        },
        transferType: encodeURIComponent(
          lsValue("vehicle", "value").transfertype
        ),
        pax: lsValue("number-of-passenger", "value"),
        specialRequest: encodeURIComponent(
          lsValue("additional-information", "label")
        ),
        journeyPrice: journey_price,
        accountRefId: "" //This must be your unique reference ID on your side
      }
    ],
    paymentDetails: {
      currency: "GBP",
      totalPrice: total_price,
      paymentType,
      paymentTypeId: paymentType === "cash" ? "1" : "2",
      accountDetails: {
        accountId: 49, //This a unique number which we provide
        accprefix: "CHT" //This a unique code which we provide
      }
    }
  };

  if (tripType === "return") {
    const secondLegData = {
      secondLeg: [
        {
          title: lsValue("passenger-title-return", "label"),
          passengerName: encodeURIComponent(
            `${lsValue("first-name-return", "label")} ${lsValue(
              "last-name-return",
              "label"
            )}`
          ),
          emailAddress: lsValue("email-address-return", "label"),
          contactNumber: encodeURIComponent(
            lsValue("phone-number-return", "label")
          ),
          pickupPoints: [
            {
              point: encodeURIComponent(
                lsValue("pickup-address-return", "label")
              ),
              //“address” field from wbsv_getQueryResults method
              catId: lsValue("pickup-address-return", "catId"), //“pcatId” field from wbsv_getQueryResults method
              pointDetail: encodeURIComponent(lsValue("pickup-address-return", "detail")),
              //”pdetail” field from wbsv_getQueryResults method
              pDate: lsValue("pickup-date-return", "label"),
              pTime: `${lsValue("pickup-time-hour-return", "label")}:${lsValue(
                "pickup-time-minute-return",
                "label"
              )}`,
              flightDetails: {
                flightNumber: encodeURIComponent(
                  lsValue("p_flight_number-return", "label")
                ),
                driverPickupMin: lsValue("driverPickupMin-return", "label")
              },
              cruiseName: "",
              trainNumber: "",
              hotelRoomNumber: "",
              address: encodeURIComponent(lsValue("p_address-return", "label"))
            }
          ],
          dropOffPoints: [
            {
              point: encodeURIComponent(
                lsValue("dropoff-address-return", "label")
              ),
              catId: lsValue("dropoff-address-return", "catId"),
              pointDetail: encodeURIComponent(lsValue("dropoff-address-return", "detail")),
              flightDetails: {
                flightNumber: ""
              },
              cruiseName: "",
              trainNumber: "",
              hotelRoomNumber: "",
              address: encodeURIComponent(lsValue("d_address-return", "label"))
            }
          ],
          vehicle: {
            type: encodeURIComponent(
              lsValue("vehicle-return", "value").carname
            ), //”carname” field from wbsv_getQuotation method
            carId: lsValue("vehicle-return", "value").car_id //”car_id” field from wbsv_getQuotation method
          },
          transferType: encodeURIComponent(
            lsValue("vehicle-return", "value").transfertype
          ),
          pax: lsValue("number-of-passenger-return", "value"),
          specialRequest: encodeURIComponent(
            lsValue("additional-information-return", "label")
          ),
          journeyPrice: lsValue("vehicle-return", "value").journeyprice,
          accountRefId: "" //This must be your unique reference ID on your side
        }
      ]
    };
    data.secondLeg = secondLegData.secondLeg;
  }

  const cardData = {
    CCName: encodeURIComponent(lsValue("CCName", "label")),
    CCNumber: lsValue("CCNumber", "label"),
    CCType: encodeURIComponent(lsValue("CCType", "label")),
    secNo: lsValue("secNo", "label"),
    CHADDRESS: encodeURIComponent(lsValue("CHADDRESS", "label")),
    CHCTRY: encodeURIComponent(lsValue("CHCTRY", "label")),
    CHPOSTCODE: encodeURIComponent(lsValue("CHPOSTCODE", "label")),
    expiryMonth: lsValue("expiryMonth", "label"),
    expiryYear: lsValue("expiryYear", "label")
  };

  const { paymentDetails } = data;

  if (paymentType === "card") {
    data = {
      ...data,
      paymentDetails: {
        ...paymentDetails,
        ...cardData
      }
    };
  }

  //console.log(data);
  //return;

  //data.firstLeg[0].accountRefId =

  var jsonData = JSON.stringify(data);

  $.ajax({
    async: false,
    dataType: "json",
    type: "POST",
    url: "/mobile-api/",
    data:
      "process=churchill_orders_add&acc_id=49&accountCode=ec1f687b29d0d8efd24a0c8aa6535c230a23978c&customerName=" +
      encodeURIComponent(
        `${lsValue("first-name", "label")} ${lsValue("last-name", "label")}`
      ) +
      "&customerEmail=" +
      lsValue("email-address", "label") +
      "&jsonData=" +
      encodeURIComponent(jsonData),
    success: function(res_data) {
      console.log("response_data", res_data);
      if (res_data.status === 200 || res_data.status === "200") {
        data.firstLeg[0].accountRefId = "CHT" + res_data.referenceId;

        if (tripType === "return") {
          data.secondLeg[0].accountRefId = "CHT" + res_data.referenceId + "R";
        }

        axios
          .post(API_BASE, {
            jsonData: data
          })
          .then(({ data }) => {
            console.log("response_data", data);
            if (data.status === 200 || data.status === "200") {
              const orderInfo = {
                customerId: data.customerId,
                orderId: data.orderId,
                referenceId: data.referenceId,
                chtReferenceId: "CHT" + res_data.referenceId,
                card_response: data.card_response,
                payment_type: paymentType
              };

              if (tripType === "return") {
                orderInfo.chtReferenceIdReturn =
                  "CHT" + res_data.referenceId + "R";
              }

              localStorageSet("orderInfo", orderInfo);

              window.location.href = "/order-details.html";
              $("#payment-details-wrapper").unblock();
              $("#total-price-display").unblock();
            } else {
              const error_message =
                data.result_message || "An error occured. Please try again.";

              $("<div></div>")
                .html(error_message)
                .dialog({
                  title: data.message_title || "ERROR",
                  resizable: false,
                  modal: true,
                  buttons: {
                    OK: function() {
                      $(this).dialog("close");
                    }
                  },
                  close: function() {
                    // onCloseCallback();
                    /* Cleanup node(s) from DOM */
                    $(this)
                      .dialog("destroy")
                      .remove();
                  }
                });

              $("#total-price-display").unblock();
              $("#payment-details-wrapper").unblock();
            }
          })
          .catch(finalErrorHandler => console.log(finalErrorHandler));
      } else {
        const error_message =
          res_data.result_message || "An error occured. Please try again.";

        $("<div></div>")
          .html(error_message)
          .dialog({
            title: res_data.result || "ERROR",
            resizable: false,
            modal: true,
            buttons: {
              OK: function() {
                $(this).dialog("close");
              }
            },
            close: function() {
              // onCloseCallback();
              /* Cleanup node(s) from DOM */
              $(this)
                .dialog("destroy")
                .remove();
            }
          });

        $("#total-price-display").unblock();
        $("#payment-details-wrapper").unblock();
      }
    }
  });
};
