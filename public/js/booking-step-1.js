
const NO_RESULT_TEXT = 'No matches found';
const formItems = [
  'pickup-address', 'dropoff-address',
  'pickup-date', 'pickup-time-hour', 'pickup-time-minute'
];

const getIdValue = (array) => array.map((a) => {
  const rootDomain = 'https://www.airport-pickups-london.com/asset-new/css/images';
  return {
    id: a.pdetail,
    value: a.address,
    postcode: a.postcode,
    category: a.pcatname,
    icon: a.pcatname.toLowerCase() === 'airports' ? 'plane' : 'hotel',
  }
});

const noResult = {
  label: NO_RESULT_TEXT,
  value: NO_RESULT_TEXT,
};

const getData = (request, response) => {
  $('.input-action-icon').remove();
  const data = {
    method: 'wbsv_getQueryResults',
    q: encodeURIComponent(request.term),
  };

  fetch("apiRequests.php", {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
  })
  .then(response => response.json())
  .then(json => {
    let merged = {};
    if (json.result.AIRPORTS || json.result.HOTELS) {
      const airports = json.result.AIRPORTS ? getIdValue(json.result.AIRPORTS) : [];
      const hotels = json.result.HOTELS ? getIdValue(json.result.HOTELS) : [];
      merged = merge(airports, hotels);
    }

    const googleData = {
      method: 'wbsv_getQueryResultsGoogle',
      q: encodeURIComponent(request.term),
    };
    fetch("apiRequests.php", {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: Object.keys(googleData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(googleData[key])).join('&')
    })
    .then(response => response.json())
    .then(json => {
      if (json.result['GOOGLE PLACE']) {
        const googlePlaces = json.result['GOOGLE PLACE'] ? getIdValue(json.result['GOOGLE PLACE']) : [];
        const m = merge(merged, googlePlaces);
        return response(m);
      }
      return response(merged);
    })
    .catch(finalErrorHandler => {
      if (merged) {
        return response(merged);
      }

      return response(noResult);
    });
  })
  .catch(finalErrorHandler => response(noResult));
}

const selectItem = (event, ui) => {
  localStorageSet(event.target.id, ui.item);
  $(`#${event.target.id}`).val(ui.item.value);
  return false;
}

$("select").change(function () {
  const id = $(this).attr("id");
  const value = $(this).val();
  localStorageSet(id, { id: value, label: value, value } , 'select');
});

$(function () {
  _.map((item) => {
    const value = localStorageGet(item);
    if (value) {
      if (value.type === 'input') {
        $(`#${item}`).val(value.label);
      } else if (value.type === 'select') {
        $(`#${item}`).val(value.id).change();
      } else {
        $(`#${item}`).val(value.label);
      }
    }
  }, formItems);

  $.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      const uniqList = _.uniqBy(e => e.label, items);
      const that = this;
      let currentCategory = '';
      $.each( uniqList, function( index, item ) {
        let li;
        if ( item.category && item.category !== currentCategory ) {
          ul.append(`<li class='ui-autocomplete-category'>
            <span>${item.category}</span>
            <span><i class="fa fa-${item.icon}" aria-hidden="true"></i></span>
          </li>`);
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });

  $("#pickup-address, #dropoff-address").catcomplete({
      source: getData,
      select: selectItem,
      minLength: 3,
      delay: 500,
      appendTo: ".header-booking-form-wrapper",
      search: (event, ui) => {
        $('#booking-form').block({
          message: '<h1>Please wait..</h1>',
        });
      },
      response: (event, ui) => {
        $('#booking-form').unblock();
      },
      open: () => {
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
          $(".ui-autocomplete").off("menufocus hover mouseover")
      },
  })
  .catcomplete( "instance" )._renderItem = (ul, item) => {
    const postcode = item.postcode ? `<br>${item.postcode}` : '';
    const icon = item.icon ? `<span><i class="fa fa-${item.icon}" aria-hidden="true"></i></span>` : '';
    let classes = '';
    if (item.label === NO_RESULT_TEXT) {
      classes += ' ui-autocomplete-no-result';
    }
    console.log(item);
      return $("<li>")
      .addClass(classes)
      .append(`<div>${item.value}${postcode}</div>${icon}`)
      .appendTo(ul);
  };
});
