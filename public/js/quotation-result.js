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

const isPickupAirport = localStorageGet("pickup-address");
const tripType = lsValue("trip-type", "value");

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

if (isPickupAirport.catId === "1") {
  validateItems.push("driverPickupMin");
  $("#pickup-time-title").html("Flight Arrival Date & Time");
} else {
  $("#pickup-time-title").html("Pick-up Date & Time");
}

let pickupDateTime =
  lsValue("pickup-date", "label") +
  " " +
  lsValue("pickup-time-hour", "id") +
  ":" +
  lsValue("pickup-time-minute", "id");

$("#pickup-address-span").html(lsValue("pickup-address", "label"));
$("#dropoff-address-span").html(lsValue("dropoff-address", "label"));
$("#pickup-time-span").html(pickupDateTime);

const getQuoteData = () => {
  $("#step-2-content-wrapper").block();
  const data = {
    method: "wbsv_getQuotation",
    tripType: encodeURIComponent(lsValue("trip-type", "value")),
    pickupPointsTransfer: encodeURIComponent(lsValue("pickup-address")),
    dropoffPointsTransfer: encodeURIComponent(lsValue("dropoff-address")),
    pickupDateTransfer: encodeURIComponent(lsValue("pickup-date", "label")),
    pickupHourTransfer: encodeURIComponent(lsValue("pickup-time-hour", "id")),
    pickupMinTransfer: encodeURIComponent(lsValue("pickup-time-minute", "id"))
  };

  if (lsValue("trip-type", "value") === "return") {
    data.pickupPointsReturn = encodeURIComponent(
      lsValue("pickup-address-return")
    );
    data.dropoffPointsReturn = encodeURIComponent(
      lsValue("dropoff-address-return")
    );
    data.pickupDateReturn = encodeURIComponent(
      lsValue("pickup-date-return", "label")
    );
    data.pickupHourReturn = encodeURIComponent(
      lsValue("pickup-time-hour-return", "id")
    );
    data.pickupMinReturn = encodeURIComponent(
      lsValue("pickup-time-minute-return", "id")
    );
  }

  axios
    .post(API_BASE, {
      data
    })
    .then(({ data }) => {
      const rootDomain = "https://www.q-taxi.co.uk";
      //const selectedVehicle = localStorageGet("vehicle");

      localStorageSet("meeting-point", data.meetingPoint);

      if (data.firstLegPrice.prices) {
        initMap(
          "map",
          lsValue("pickup-address", "label"),
          lsValue("dropoff-address", "label"),
          "",
          "distance",
          "duration"
        );

        $("#step-2-vehicle-list").empty();
        _.map(vehicle => {
          const template = `<div class="vehicle-section clearfix">
      <div class="vehicle-first-column">
          <div class="vehicle-image">
              <img src="${rootDomain}${vehicle.carimagepath}" alt="${
            vehicle.carname
          }">
          </div>
          <div class="vehicle-title">
              ${vehicle.carname}
      </div>
  </div>
  <div class="vehicle-second-column">
      <div class="vehicle-second-column-row">
          <span class="vehicle-icon-item" title="Free Meet & Greet"><i class="meet-and-greet-icon"></i><span class="icon-explain">Free Meet & Greet</span></span>      
          <span class="vehicle-icon-item" title="Flight Tracking"><i class="flight-icon"></i><span class="icon-explain">Flight Tracking</span></span>
          <span class="vehicle-icon-item" title="Free Waiting Time"><i class="waiting-time-icon"></i><span class="icon-explain">Free Waiting Time</span></span>
          <span class="vehicle-icon-item" title="No charge for flight delays"><i class="no-charge-icon"></i><span class="icon-explain">No charge for flight delays</span></span>
      </div>
  </div>
  <div class="vehicle-third-column">
      <div class="vehicle-third-column-column">
          <i class="pax-icon"></i><span class="icon-explain">Max ${
            vehicle.carpax
          } people per vehicle</span>
      </div>
      <div class="vehicle-third-column-column">
          <i class="luggage-icon"></i><span class="icon-explain">Max ${
            vehicle.carsuitcases
          } medium suitcases per vehicle</span>
      </div>
  </div>
  <div class="vehicle-fourth-column">
      <div class="vehicle-fourth-column-row"><span class="vehicle-price">${getCurrencySymbol(
        vehicle.currency
      )}${vehicle.price}</span></div>
      <div class="vehicle-fourth-column-row"><span class="vehicle-price-info">per vehicle</span></div>
      <div class="vehicle-fourth-column-row">
          <div class="divRadio grey ">
          <input id="${vehicle.car_id}" type="radio" name="rbCarType" 
          value='{
             "car_id":"${vehicle.car_id}",
             "carname":"${vehicle.carname}",
             "carpax":"${vehicle.carpax}",
             "carsuitcases":"${vehicle.carsuitcases}",
             "transfertype":"${vehicle.transfertype}",
             "journeyprice":"${vehicle.price}"
            }' onclick="selectedVehicle(this,'vehicle');">
          <label class="" for="${vehicle.car_id}">
              <span class="radioText">Select</span>
          </label>
          </div>
      </div>
  </div>
  </div>
  </div>`;

          $("#step-2-vehicle-list").append(template);
        }, data.firstLegPrice.prices);
      }

      if (typeof data.secondLegPrice !== "undefined") {
        if (data.secondLegPrice.prices) {
          const isPickupAirportReturn = localStorageGet(
            "pickup-address-return"
          );

          const map_template = `<div class="break-new-line"></div><h4>Select a Return Vehicle</h4>
                                    <div class="transferDetails">
                                      <div class="divRow grey-background"><span class="headTitle">Return Transfer Details</span></div>
                                      <div class="divRow"><span class="title">Pick-up Point </span><span id="pickup-address-span-return" class="value"></span></div>
                                      <div class="divRow"><span class="title">Drop-off Point </span><span id="dropoff-address-span-return" class="value"></span></div>
                                      <div class="divRow"><span class="title" id="pickup-time-title-return">Flight Arrival Date &amp; Time</span>
                                          <span id="pickup-time-span-return" class="value"></span></div>
                                      <div class="divRow-break"></div>
                                    </div>
                                      <div class="transferDetails">
                                          <div class="divRow">
                                              <div id="map-return" style="width: 100%; height: 200px"> </div>
                                          </div>
                                      </div>
                                      <div class="transferDetails">
                                              <div class="divRow">
                                                  <span class="title">Distance </span>
                                                  <span class="value" id="distance-return"> </span>
                                              </div>
                                              <div class="divRow">
                                                  <span class="title">Duration </span>
                                                  <span class="value" id="duration-return"> </span>
                                              </div>
                                          <div class="divRow-break"></div>
                                      </div>
                                      <div class="break-new-line"></div>`;

          $("#step-2-vehicle-list-return").empty();
          $("#step-2-vehicle-list-return").html(map_template);

          let pickupDateTimeReturn =
            lsValue("pickup-date-return", "label") +
            " " +
            lsValue("pickup-time-hour-return", "id") +
            ":" +
            lsValue("pickup-time-minute-return", "id");

          if (isPickupAirportReturn.catId === "1") {
            validateItems.push("driverPickupMinReturn");
            $("#pickup-time-title-return").html("Flight Arrival Date & Time");
          } else {
            $("#pickup-time-title-return").html("Pick-up Date & Time");
          }

          $("#pickup-address-span-return").html(
            lsValue("pickup-address-return", "label")
          );
          $("#dropoff-address-span-return").html(
            lsValue("dropoff-address-return", "label")
          );
          $("#pickup-time-span-return").html(pickupDateTimeReturn);

          initMap(
            "map-return",
            lsValue("pickup-address-return", "label"),
            lsValue("dropoff-address-return", "label"),
            "",
            "distance-return",
            "duration-return"
          );

          _.map(vehicle => {
            const template = `<div class="vehicle-section clearfix">
          <div class="vehicle-first-column">
              <div class="vehicle-image">
                  <img src="${rootDomain}${vehicle.carimagepath}" alt="${
              vehicle.carname
            }">
              </div>
              <div class="vehicle-title">
                  ${vehicle.carname}
          </div>
              </div>
              <div class="vehicle-second-column">
                  <div class="vehicle-second-column-row">
                      <span class="vehicle-icon-item" title="Free Meet & Greet"><i class="meet-and-greet-icon"></i><span class="icon-explain">Free</span></span>
                      <span class="vehicle-icon-item" title="Max ${
                        vehicle.carpax
                      } people per vehicle"><i class="pax-icon"></i><span class="icon-explain">x${
              vehicle.carpax
            }</span></span>
                      <span class="vehicle-icon-item" title="Max ${
                        vehicle.carsuitcases
                      } suitcases per vehicle"><i class="luggage-icon"></i>
                      <span class="icon-explain">x${
                        vehicle.carsuitcases
                      }</span></span>
                  </div>
                  <div class="vehicle-second-column-row">
                      <span class="vehicle-icon-item" title="Flight Tracking"><i class="flight-icon"></i><span class="icon-explain">Free</span></span>
                      <span class="vehicle-icon-item" title="Free Waiting Time"><i class="waiting-time-icon"></i><span class="icon-explain">Free</span></span>
                      <span class="vehicle-icon-item" title="No charge for flight delays"><i class="no-charge-icon"></i><span class="icon-explain">Free</span></span>
                  </div>
              </div>
              <div class="vehicle-third-column">
                  <div class="vehicle-third-column-column">
                      <i class="pax-icon"></i><span class="icon-explain">Max ${
                        vehicle.carpax
                      } people per vehicle</span>
                  </div>
                  <div class="vehicle-third-column-column">
                      <i class="luggage-icon"></i><span class="icon-explain">Max ${
                        vehicle.carsuitcases
                      } medium suitcases per vehicle</span>
                  </div>
              </div>
              <div class="vehicle-fourth-column">
                  <div class="vehicle-fourth-column-row"><span class="vehicle-price">${getCurrencySymbol(
                    vehicle.currency
                  )}${vehicle.price}</span></div>
                  <div class="vehicle-fourth-column-row"><span class="vehicle-price-info">per vehicle</span></div>
                  <div class="vehicle-fourth-column-row">
                      <div class="divRadio grey ">
                          <input id="${
                            vehicle.car_id
                          }R" type="radio" name="rbCarTypeR" 
                          value='{
                            "car_id":"${vehicle.car_id}",
                            "carname":"${vehicle.carname}",
                            "carpax":"${vehicle.carpax}",
                            "carsuitcases":"${vehicle.carsuitcases}",
                            "transfertype":"${vehicle.transfertype}",
                            "journeyprice":"${vehicle.price}"
                           }' onclick="selectedVehicle(this,'vehicle-return');">
                          <label class="" for="${vehicle.car_id}R">
                              <span class="radioText">Select</span>
                          </label>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
            $("#step-2-vehicle-list-return").append(template);
          }, data.secondLegPrice.prices);
        }
      }
      $(".radioText").text("Select");

      if (localStorage["vehicle"] === undefined) {
        /*$("#1").attr("checked", true);
        $("#1")
          .parent()
          .find(".radioText")[0].textContent = "Selected";

        localStorageSet(
          "vehicle",
          { value: jQuery.parseJSON($("#1").val()) },
          "object"
        );*/
      } else {
        let selected_vehicle = lsValue("vehicle", "value");

        $("#" + selected_vehicle.car_id).attr("checked", true);
        $("#" + selected_vehicle.car_id)
          .parent()
          .find(".radioText")[0].textContent = "Selected";

        localStorageSet("vehicle", { value: selected_vehicle }, "object");
      }

      if (
        lsValue("trip-type", "value") === "return" &&
        localStorage["vehicle-return"] === undefined
      ) {
        /*$("#1R").attr("checked", true);
        $("#1R")
          .parent()
          .find(".radioText")[0].textContent = "Selected";

        localStorageSet(
          "vehicle-return",
          { value: jQuery.parseJSON($("#1R").val()) },
          "object"
        );*/
      } else {
        if (
          lsValue("trip-type", "value") === "return" &&
          localStorage["vehicle-return"] !== undefined
        ) {
          let selected_vehicle_return = lsValue("vehicle-return", "value");

          $("#" + selected_vehicle_return.car_id + "R").attr("checked", true);
          $("#" + selected_vehicle_return.car_id + "R")
            .parent()
            .find(".radioText")[0].textContent = "Selected";

          localStorageSet(
            "vehicle",
            { value: selected_vehicle_return },
            "object"
          );
        }
      }

      /*
      if (selectedVehicle) {
        $(`#${selectedVehicle.label}`).addClass("selected");
      }*/

      $("#step-2-content-wrapper").unblock();
    })
    .catch(finalErrorHandler => console.log(finalErrorHandler));
};

$(function() {
  getQuoteData();
});

const selectedVehicle = (inputItem, storageKey) => {
  let selectedValue = jQuery.parseJSON(inputItem.value);
  $(".radioText").text("Select");
  inputItem.parentElement.getElementsByClassName("radioText")[0].textContent =
    "Selected";
  localStorageSet(storageKey, { value: selectedValue }, "object");
  if (tripType === "single") {
    goto_customer_page();
  }
};

const goto_home_page = () => {
  localStorageSet("fist-page-clicked", true);
  window.location.href = "/";
};

const goto_customer_page = () => {
  localStorage["fist-page-clicked"] = false;
  let go_to_page = false;

  if (tripType === "single") {
    if (localStorage["vehicle"] === undefined) {
      go_to_page = false;
      show_dialog_message("Please select a vehicle", "Information");
      return false;
    } else {
      go_to_page = true;
    }
  } else {
    if (localStorage["vehicle"] === undefined) {
      go_to_page = false;
      show_dialog_message("Please select a vehicle", "Information");
      return false;
    } else {
      go_to_page = true;
    }

    if (localStorage["vehicle-return"] === undefined) {
      go_to_page = false;
      show_dialog_message("Please select a return vehicle", "Information");
      return false;
    } else {
      go_to_page = true;
    }
  }

  if (go_to_page) {
    window.location.href = "/customer-details.html";
    //show_dialog_message("Vehicle has been selected", "Information");
  }
};

const show_dialog_message = (message, title) => {
  $("<div></div>")
    .html(message)
    .dialog({
      title: title,
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
};
