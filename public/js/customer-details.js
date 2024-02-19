const formItems = [
  "trip-type",
  "pickup-address",
  "dropoff-address",
  "p_address",
  "d_address",
  "pickup-date",
  "pickup-time-hour",
  "pickup-time-minute",
  "p_flight_number",
  "number-of-passenger",
  "number-of-bags",
  "passenger-title",
  "first-name",
  "last-name",
  "email-address",
  "phone-number",
  "additional-information",
  "vehicle",
  "driverPickupMin"
];

const validateItems = [
  "title",
  "first-name",
  "last-name",
  "email-address",
  "phone-number",
  "vehicle",
  "number-of-passenger",
  "number-of-bags"
];

const zeroDigitFix = value => {
  return value < 9 ? "0" + value : value;
};

const pax_bag_fill = (input_id, input_value) => {
  $(input_id).empty();
  $("<option>")
    .val("Select")
    .text("Select")
    .appendTo(input_id);

  for (var i = 1; i <= input_value; i++) {
    $("<option>")
      .val(i)
      .text(i)
      .appendTo(input_id);
  }
};
pax_bag_fill("#number-of-passenger", lsValue("vehicle", "value").carpax);
pax_bag_fill("#number-of-bags", lsValue("vehicle", "value").carpax);

const tripType = lsValue("trip-type", "value");

const returnTemplate = `<div class="break-new-line">
<h4>Return Journey Details</h4>
<div class="title-block7"></div>
<div class="trip-details-wrapper-1">
<input type="hidden" name="pickup-address-return" id="pickup-address-return" />
<input type="hidden" name="dropoff-address-return" id="dropoff-address-return" />
<input type="hidden" name="pickup-date-return" id="pickup-date-return" />
<input type="hidden" name="pickup-time-hour-return" id="pickup-time-hour-return" />
<input type="hidden" name="pickup-time-minute-return" id="pickup-time-minute-return" />
<p class="clearfix"><strong>From</strong> <span id="pickup-address-return-area"></span></p>
<p class="clearfix"><strong>To</strong> <span id="dropoff-address-return-area"></span></p>
<p class="clearfix"><strong id="date-input-label-return">Pick Up Date</strong> <span id="pickup-date-return-area"></span></p>
<p class="clearfix"><strong>Vehicle Type</strong> <span id="vehicle-type-return-area"></span></p>
<p class="clearfix"><strong>Transfer Type</strong> <span id="transfer-type-return-area"></span></p>
<p class="clearfix"><strong>Journey Price</strong> <span id="journey-price-return-area"></span></p>
<!-- END .trip-details-wrapper-1 -->
</div>
<!-- BEGIN .trip-details-wrapper-2 -->
<div class="trip-details-wrapper-2">
<div id='map-div-return' style='width: 100%; height: 245px'> </div>
<!-- END .trip-details-wrapper-2 -->
</div>
<div class="clearboth"></div>
<!-- BEGIN .clearfix -->
<div class="clearfix qns-one" id="when-should-pick-up-container-return">
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half book-input">
    <label>Flight Number*</label>
    <input type="text" id="p_flight_number-return" name="p_flight_number-return" value="" />
    <!-- END .qns-one-half -->
</div>
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half last-col">
    <label>When should the driver pick you up ?*</label>
    <div class="multi-content">
        <div class="select-wrapper" style="width: 35%">
            <i class="fa fa-angle-down"></i>
            <div class="book-input">
                <select id="driverPickupMin-return" name="driverPickupMin-return">
                    <option value="Select">Select</option>
                    <option value="0">0</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                    <option value="120">120</option>
                    <option value="150">150</option>
                    <option value="180">180</option>
                </select>
            </div>
        </div>
        <span style="font-size: 14px;">mins after flight has landed
            <img src="/images/information.png" alt="" style="width: 20px; height: 20px; cursor: pointer; margin-top: -5px;" class="meeting_time_msg"></span>
    </div>
    <!-- END .qns-one-half -->
</div>
<!-- END .clearfix -->
</div>
<div class="clearfix qns-one">
<div class="clearfix qns-one-half" id="pickup-address-select-container-return">
    <!-- BEGIN .qns-one-half -->
    <div class="qns-one">
        <label>Pick Up Address*</label>
        <div class="select-wrapper">
            <i class="fa fa-angle-down"></i>
            <div class="book-input">
                <select id="p_address-return" name="p_address-return" class="address-select">
                </select>
            </div>
        </div>
        <!-- END .qns-one-half -->
    </div>
</div>
<div class="clearfix qns-one-half last-col" id="dropoff-address-select-container-return">
    <!-- BEGIN .qns-one-half -->
    <div class="qns-one">
        <label>Drop Off Address*</label>
        <div class="select-wrapper">
            <i class="fa fa-angle-down"></i>
            <div class="book-input">
                <select id="d_address-return" name="d_address-return" class="address-select">
                </select>
            </div>
        </div>
        <!-- END .qns-one-half -->
    </div>
</div>
</div>
<!-- BEGIN .clearfix -->
<div class="clearfix">
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half">
    <label>Number Of Passengers*</label>
    <div class="select-wrapper">
        <i class="fa fa-angle-down"></i>
        <div class="book-input">
            <select id="number-of-passenger-return" name="number-of-passenger-return">
            </select>
        </div>
    </div>
    <!-- END .qns-one-half -->
</div>
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half last-col">
    <label>Number Of Bags*</label>
    <div class="select-wrapper">
        <i class="fa fa-angle-down"></i>
        <div class="book-input">
            <select id="number-of-bags-return" name="number-of-bags-return">
            </select>
        </div>
    </div>
    <!-- END .qns-one-half -->
</div>
<!-- END .clearfix -->
</div>
<!-- BEGIN .clearfix -->
<div class="clearfix">
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half book-input ">
        <label>First Name*</label>
        <input type="text" id="first-name-return" name="first-name-return" value="" />
    <!-- END .qns-one-half -->
</div>
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half last-col book-input">
    <label>Last Name*</label>
    <input type="text" id="last-name-return" name="last-name-return" value="" />
    <!-- END .qns-one-half -->
</div>
<!-- END .clearfix -->
</div>
<!-- BEGIN .clearfix -->
<div class="clearfix">
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half book-input">
    <label>Email Address*</label>
    <input type="text" id="email-address-return" name="email-address-return" value="" />
    <!-- END .qns-one-half -->
</div>
<!-- BEGIN .qns-one-half -->
<div class="qns-one-half last-col book-input">
    <label>Phone Number*</label>
    <input type="text" id="phone-number-return" name="phone-number-return" value="" />
    <!-- END .qns-one-half -->
</div>
<!-- END .clearfix -->
</div>
<div class="book-input">
<label>Additional Information</label>
<textarea id="additional-information-return" name="additional-information-return" cols="10" rows="5"></textarea>
</div>`;

let pickupDateTime =
  lsValue("pickup-date", "label") +
  " " +
  lsValue("pickup-time-hour", "id") +
  ":" +
  lsValue("pickup-time-minute", "id");

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

  validateItems.push("title-return");
  validateItems.push("first-name-return");
  validateItems.push("last-name-return");
  validateItems.push("email-address-return");
  validateItems.push("phone-number-return");
  validateItems.push("number-of-passenger-return");
  validateItems.push("number-of-bags-return");

  pax_bag_fill(
    "#number-of-passenger-return",
    lsValue("vehicle-return", "value").carpax
  );
  pax_bag_fill(
    "#number-of-bags-return",
    lsValue("vehicle-return", "value").carpax
  );

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

$(function () {
  $("#pickup-date-area").html(pickupDateTime);

  let timeType = "";
  let mapPickupAddress = "";
  let mapDropoffAddress = "";
  let mapPickupAddressReturn = "";
  let mapDropoffAddressReturn = "";
  _.map(item => {
    const value = localStorageGet(item);

    if (value) {
      if (value.type === "input") {
        // console.log(item);
        $(`#${item}`).val(value.label);
        if (item === "pickup-date" || item === "pickup-date-return") {
          //$(`span#${item}-area`).text(value.label);
        } else {
          $(`span#${item}-area`).text(value.label);
        }
      } else if (value.type === "select") {
        $(`#${item}`)
          .val(value.id)
          .change()
          .parent()
          .append(
            '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
          );
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

      if (item === "pickup-address") {
        let pickupDateLabel = "Pick Up Date and Time";
        $("#pickup-address-select-container").hide();
        $("#when-should-pick-up-container").hide();
        if (value.catId === "1") {
          pickupTimeLabel = "Flight Landing Time";
          pickupDateLabel = "Flight Landing Date and Time";
          $("#when-should-pick-up-container").show();

          validateItems.push("p_flight_number");
          validateItems.push("driverPickupMin");
        } else if (value.catId === "5") {
          axios
            .post(API_BASE, {
              data: {
                method: "wbsv_getPostCodeAddresses",
                postcode: value.value.replace(", United Kingdom", "")
              }
            })
            .then(({ data }) => {
              $("#p_address").empty();
              $("<option>")
                .val("Select")
                .text("Select")
                .appendTo("#p_address");
              if (typeof data.addresses !== "undefined") {
                $.each(data.addresses, function (i, address) {
                  $("<option>")
                    .val(address.address)
                    .text(address.address)
                    .appendTo("#p_address");
                });
                $("#pickup-address-select-container").show();
                validateItems.push("p_address");
              }

            });


        }
        $("#date-input-label").text(`${pickupDateLabel}`);
        // $("#time-input-label").text(`${pickupTimeLabel}:`);
        mapPickupAddress = value.label;
      } else if (item === "dropoff-address") {
        mapDropoffAddress = value.label;
        $("#dropoff-address-select-container").hide();
        if (value.catId === "5") {
          axios
            .post(API_BASE, {
              data: {
                method: "wbsv_getPostCodeAddresses",
                postcode: value.value.replace(", United Kingdom", "")
              }
            })
            .then(({ data }) => {
              $("#d_address").empty();
              $("<option>")
                .val("Select")
                .text("Select")
                .appendTo("#d_address");
              if (typeof data.addresses !== "undefined") {
                $.each(data.addresses, function (i, address) {
                  $("<option>")
                    .val(address.address)
                    .text(address.address)
                    .appendTo("#d_address");
                });
                $("#dropoff-address-select-container").show();
                validateItems.push("d_address");
              }
            });

        }
      } else if (item === "vehicle") {
        $("#vehicle-type-area").text(value.value.carname);
        $("#transfer-type-area").text(value.value.transfertype);
        $("#journey-price-area").text("GBP " + value.value.journeyprice);
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
          zeroDigitFix(lsValue("pickup-time-hour-return", "id")) +
          ":" +
          zeroDigitFix(lsValue("pickup-time-minute-return", "id"));

        $("#pickup-date-return-area").html(pickupDateTimeReturn);

        let pickupDateLabel = "Pick Up Date and Time";
        $("#pickup-address-select-container-return").hide();
        $("#when-should-pick-up-container-return").hide();
        if (value.catId === "1") {
          pickupTimeLabel = "Flight Landing Time";
          pickupDateLabel = "Flight Landing Date and Time";
          $("#when-should-pick-up-container-return").show();

          validateItems.push("p_flight_number-return");
        } else if (value.catId === "5") {
          axios
            .post(API_BASE, {
              data: {
                method: "wbsv_getPostCodeAddresses",
                postcode: value.value.replace(", United Kingdom", "")
              }
            })
            .then(({ data }) => {
              $("#p_address-return").empty();
              $("<option>")
                .val("Select")
                .text("Select")
                .appendTo("#p_address-return");
              if (typeof data.addresses !== "undefined") {
                $.each(data.addresses, function (i, address) {
                  $("<option>")
                    .val(address.address)
                    .text(address.address)
                    .appendTo("#p_address-return");
                });
                $("#pickup-address-select-container-return").show();
                validateItems.push("p_address-return");
              }
            });

        }
        $("#date-input-label-return").text(`${pickupDateLabel}`);
        // $("#time-input-label").text(`${pickupTimeLabel}:`);
        mapPickupAddressReturn = value.label;
      } else if (item === "dropoff-address-return") {
        mapDropoffAddressReturn = value.label;
        $("#dropoff-address-select-container-return").hide();
        if (value.catId === "5") {
          axios
            .post(API_BASE, {
              data: {
                method: "wbsv_getPostCodeAddresses",
                postcode: value.value.replace(", United Kingdom", "")
              }
            })
            .then(({ data }) => {
              $("#d_address-return").empty();
              $("<option>")
                .val("Select")
                .text("Select")
                .appendTo("#d_address-return");
              if (typeof data.addresses !== "undefined") {
                $.each(data.addresses, function (i, address) {
                  $("<option>")
                    .val(address.address)
                    .text(address.address)
                    .appendTo("#d_address-return");
                });
                $("#dropoff-address-select-container-return").show();
                validateItems.push("d_address-return");
              }
            });

        }
      } else if (item === "vehicle-return") {
        $("#vehicle-type-return-area").text(value.value.carname);
        $("#transfer-type-return-area").text(value.value.transfertype);
        $("#journey-price-return-area").text("GBP " + value.value.journeyprice);
      }
    }
  }, formItems);

  initMap("map-div", mapPickupAddress, mapDropoffAddress, "", "", "");

  $(".view-map-button").attr("href");

  $("select, input, textarea").change(function () {
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

  $("input").change(function () {
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

  $("#quotation-page-button").on("click", function (e) {
    window.location.href = "/quotation-result.html";
    console.log("quotation-result.html");
    
  });

  $("#confirm-and-pay-button").on("click", function (e) {
    e.preventDefault();
    let error = false;
    validateItems.map(item => {
      const value = localStorageGet(item);
      if ($(`#${item}`).val() === "" || $(`#${item}`).val() === "Select") {
        console.log(`${item} degeri hatali -> `, $(`#${item}`).val());
        error = true;
        $(`#${item}`)
          .parent()
          .addClass("form-error")
          .find(".input-action-icon")
          .remove();
        // if ($(`#${item}`).prop('type') !== 'select-one') {
        //   console.log(`#${item}`);
        $(`#${item}`)
          .parent()
          .append(
            '<span class="input-action-icon"><i class="fa fa-times"></i></span>'
          );
        // }
      } else {
        $(`#${item}`)
          .parent()
          .removeClass("form-error")
          .find(".input-action-icon")
          .remove();
        // if ($(`#${item}`).prop('type') !== 'select-one') {
        $(`#${item}`)
          .parent()
          .append(
            '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
          );
        // }
      }
    });

    console.log("form error: ", error);

    if (!error) {
      window.location.href = "/secure-payment.html";
    }
  });

  $(".meeting_time_msg").qtip({
    content: {
      text:
        '<p>Please allow enough time to clear immigration and baggage reclaim, <span style="color:#007ACC; font-weight:bold;"> after the requested pickup time, \
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
        target: "topLeft",
        tooltip: "bottomRight"
      }
    },
    style: {
      width: 600,
      height: 300,
      background: "#fffeea",
      color: "black",
      textAlign: "left",
      border: {
        width: 7,
        radius: 5,
        color: "#A0A8AE"
      },
      tip: "bottomRight",
      name: "dark"
    },
    adjust: {
      screen: true
    }
  });
});
