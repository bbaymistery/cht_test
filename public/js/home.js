window.localStorage.clear();

const NO_RESULT_TEXT = "No matches found";
const formItems = [];

const valuesToRemove = [
  "pickup-address-return",
  "dropoff-address-return",
  "pickup-date-return",
  "pickup-time-hour-return",
  "pickup-time-minute-return"
];

const selectItem = (event, ui) => {
  localStorageSet(event.target.id, ui.item);
  let pickupTimeLabel = "Pick Up Time";
  let pickupDateLabel = "Pick Up Date";
  if (ui.item.catId === "1") {
    pickupTimeLabel = "Flight Landing Time";
    pickupDateLabel = "Flight Landing Date";
  }

  if (event.target.id === "pickup-address") {
    $("#time-input-label").text(pickupTimeLabel);
    $("#pickup-date").attr("placeholder", pickupDateLabel);
  } else if (event.target.id === "pickup-address-return") {
    $("#time-input-label-return").text(pickupTimeLabel);
    $("#pickup-date-return").attr("placeholder", pickupDateLabel);
  }
  $(`#${event.target.id}`)
    .val(ui.item.value)
    .parent()
    .removeClass("form-error")
    .append(
      '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
    );
  return false;
};

const changeClass = (id, className) => {
  $(`#${id}`)
    .parent()
    .removeClass(className);
};

$("select").change(function() {
  const id = $(this).attr("id");
  const value = $(this).val();
  localStorageSet(id, { id: value, label: value, value }, "select");
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

if ($("#radioSingle").prop("checked") == true) {
  quoteButton("single");
  formItems.length = 0;
  formItems.push("pickup-address");
  formItems.push("dropoff-address");
  formItems.push("pickup-date");
  formItems.push("pickup-time-hour");
  formItems.push("pickup-time-minute");
  formItems.push("trip-type");

  formItems.filter(item => !valuesToRemove.includes(item));

  localStorageSet("trip-type", { label: "single", value: "single" }, "input");

  $("#trip-type").val("single");

  localStorage.removeItem("pickup-address-return");
  localStorage.removeItem("dropoff-address-return");
  localStorage.removeItem("pickup-date-return");
  localStorage.removeItem("pickup-time-hour-return");
  localStorage.removeItem("pickup-time-minute-return");
}

$("#radioSingle").click(function() {
  quoteButton("single");
  formItems.length = 0;
  formItems.push("pickup-address");
  formItems.push("dropoff-address");
  formItems.push("pickup-date");
  formItems.push("pickup-time-hour");
  formItems.push("pickup-time-minute");

  formItems.filter(item => !valuesToRemove.includes(item));

  localStorage["trip-type"] =
    '{"label":"single","value":"single","type":"input"}';

  $("#trip-type").val("single");

  localStorage.removeItem("pickup-address-return");
  localStorage.removeItem("dropoff-address-return");
  localStorage.removeItem("pickup-date-return");
  localStorage.removeItem("pickup-time-hour-return");
  localStorage.removeItem("pickup-time-minute-return");
});

$("#radioReturn").click(function() {
  quoteButton("return");
  formItems.push("pickup-address-return");
  formItems.push("dropoff-address-return");
  formItems.push("pickup-date-return");
  formItems.push("pickup-time-hour-return");
  formItems.push("pickup-time-minute-return");

  $("#trip-type").val("return");

  localStorage["trip-type"] =
    '{"label":"return","value":"return","type":"input"}';
  localStorage.setItem(
    "pickup-address-return",
    localStorage.getItem("dropoff-address")
  );
  localStorage.setItem(
    "dropoff-address-return",
    localStorage.getItem("pickup-address")
  );

  localStorage.setItem(
    "pickup-time-hour-return",
    localStorage.getItem("pickup-time-hour")
  );
  localStorage.setItem(
    "pickup-time-minute-return",
    localStorage.getItem("pickup-time-minute")
  );

  let tt = localStorageGet("pickup-date").value;
  let tt2 = tt.replace(/\//g, "-");

  let date = new Date(tt2.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  let newdate = new Date(date);

  newdate.setDate(newdate.getDate() + 3);

  let dd = newdate.getDate();
  let mm = newdate.getMonth() + 1;
  let y = newdate.getFullYear();

  let someFormattedDate = dd + "/" + mm + "/" + y;

  localStorageSet(
    "pickup-date-return",
    { label: someFormattedDate, value: someFormattedDate },
    "input"
  );

  $("#pickup-date-return").val(someFormattedDate);
  $("#pickup-address-return").val(localStorageGet("dropoff-address").value);
  $("#dropoff-address-return").val(localStorageGet("pickup-address").value);
  $("#pickup-time-hour-return").val(localStorageGet("pickup-time-hour").value);
  $("#pickup-time-minute-return").val(
    localStorageGet("pickup-time-minute").value
  );
});

function quoteButton(radioBtn) {
  if (radioBtn === "single") {
    $("#tab-return").css("display", "none");
  } else if (radioBtn === "return") {
    $("#tab-return").css("display", "");
  }
}

$(function() {
  _.map(item => {
    const value = localStorageGet(item);
    if (value) {
      if (value.type === "input") {
        if (item === "trip-type") {
          $(`#${item}`).val(value.label);
        } else {
          $(`#${item}`)
            .val(value.label)
            .parent()
            .append(
              '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
            );
        }
      } else if (value.type === "select") {
        $(`#${item}`)
          .val(value.id)
          .change()
          .parent()
          .append(
            '<span class="input-action-icon"><i class="fa fa-check"></i></span>'
          );
      } else {
        $(`#${item}`).val(value.label);
      }
    }
  }, formItems);

  var ajaxes = [];
  function killAjaxes() {
    $.each(ajaxes, function(i, ajax) {
      ajax.abort();
    });
  }

  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu(
        "option",
        "items",
        "> :not(.ui-autocomplete-category)"
      );
    },
    _renderMenu: function(ul, items) {
      const uniqList = _.uniqBy(e => e.label, items);
      const that = this;
      let currentCategory = "";
      $.each(uniqList, function(index, item) {
        let li;
        if (item.category && item.category !== currentCategory) {
          ul.append(`<li class='ui-autocomplete-category'>
                <span>${item.category}</span>
                <span><i class="fa fa-${
                  item.icon
                }" aria-hidden="true"></i></span>
                </li>`);
          currentCategory = item.category;
        }
        li = that._renderItemData(ul, item);
        if (item.category) {
          li.attr("aria-label", item.category + " : " + item.label);
        }
      });
      if (uniqList.length > 1) {
        if (ul[0].lastElementChild.innerText === NO_RESULT_TEXT) {
          ul[0].lastElementChild.remove();
        }
      }
    }
  });

  $("#pickup-address").keyup(function() {
    autoComplete($(this));
  });

  $("#dropoff-address").keyup(function() {
    autoComplete($(this));
  });

  $("#pickup-address-return").keyup(function() {
    autoComplete($(this));
  });

  $("#dropoff-address-return").keyup(function() {
    autoComplete($(this));
  });

  function autoComplete(id) {
    $(id)
      .catcomplete({
        appendTo: ".header-booking-form-wrapper",
        source: function(request, response) {
          $("blink").empty();
          killAjaxes();
          ajaxes = [
            $.ajax({
              dataType: "json",
              type: "POST",
              url: API_BASE,
              beforeSend: function(jqXHR, settings, event) {
                jqXHR.setRequestHeader(
                  "Content-Type",
                  "application/json; charset=utf-8"
                );
                var data = {
                  data: {
                    method: "wbsv_getQueryResults",
                    q: request.term.replace(/[^a-zA-Z0-9 ]/g, "")
                  }
                };
                settings.hasContent = true;
                settings.type = "POST";
                settings.data = JSON.stringify(data);
              },
              success: function(data, status, xhr) {
                $(id).removeClass("ui-autocomplete-loading");

                if (data.status !== "200") {
                  valid = false;
                } else {
                  response(formatJSON(data));
                  valid = true;
                }

                return valid;
              }
            }),
            $.ajax({
              dataType: "json",
              type: "POST",
              url: API_BASE,
              beforeSend: function(jqXHR, settings, event) {
                jqXHR.setRequestHeader(
                  "Content-Type",
                  "application/json; charset=utf-8"
                );

                var gdata = {
                  data: {
                    method: "wbsv_getQueryResultsGoogle",
                    q: request.term.replace(/[^a-zA-Z0-9 ]/g, "")
                  }
                };
                settings.hasContent = true;
                settings.type = "POST";
                settings.data = JSON.stringify(gdata);
              },
              success: function(data, status, xhr) {
                $(id).removeClass("ui-autocomplete-loading");

                if (data.status !== "200") {
                  valid = false;
                } else {
                  response(formatJSON(data));
                  valid = true;
                }

                return valid;
              }
            })
          ];
          $.when.apply(0, ajaxes).then(function() {
            response(
              Array.prototype.map
                .call(arguments, function(res) {
                  return res[0];
                })
                .reduce(function(p, c) {
                  p.result["GOOGLE PLACE"] = c.result["GOOGLE PLACE"];
                  return formatJSON(p);
                })
            );
          });
        },
        minLength: 3,
        open: function(event, ui) {
          if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $(".ui-autocomplete").off("menufocus hover mouseover");
          }
        },
        close: function(event, ui) {},
        select: selectItem
      })
      .catcomplete("instance")._renderItem = (ul, item) => {
      let classes = "";
      let itemImg = "";
      if (item.label === NO_RESULT_TEXT) {
        classes += " ui-autocomplete-no-result";
        itemImg = "";
      } else {
        itemImg =
          "<span class='li-image'><img src='" + item.image + "' /></span>";
      }

      return $("<li>")
        .addClass(classes)
        .append("<span class='li-label'>" + item.label + "</span>" + itemImg)
        .appendTo(ul);
    };
  }

  function formatJSON(data) {
    var array = new Array();
    var previous = "";

    if (!data) {
      $("input:focus")
        .parent()
        .parent()
        .addClass("field_error");
      return false;
    }

    $.each(data, function(k, v) {
      var image;

      if (k === "result") {
        $.each(v, function(k1, loc) {
          if (k1 === "GOOGLE PLACE") {
            k_temp =
              k1 +
              "<img class='google-img' src='https://www.q-taxi.co.uk/asset-new/css/powered-by-google-on-white.png' />";
          } else {
            k_temp = k1;
          }

          if (loc == undefined) {
            array.push({
              catId: "0",
              value: "",
              label: NO_RESULT_TEXT,
              category: "",
              detail: "",
              image: "https://www.q-taxi.co.uk"
            });
          } else {
            $.each(loc, function(key, value) {
              var arr = value.pdetail.split("_");
              array.push({
                catId: arr[6],
                value: value.address,
                label: value.address,
                category: k_temp,
                detail: value.pdetail,
                image: "https://www.q-taxi.co.uk" + value.pcimage
              });
            });
          }
        });
      }
    });

    return array;
  }

  $("#reserve-button").on("click", function(e) {
    e.preventDefault();
    let error = false;
    formItems.map(item => {
      if ($(`#${item}`).val() === "") {
        error = true;
        $(`#${item}`)
          .parent()
          .addClass("form-error")
          .find(".input-action-icon")
          .remove();
        // if ($(`#${item}`).prop('type') !== 'select-one') {
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

    if (!error) {
      window.location.href = "/quotation-result.html";
    }
  });
});
