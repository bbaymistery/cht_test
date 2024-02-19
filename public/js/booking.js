const formItems = [
  'pickup-address', 'dropoff-address',
  'pickup-date', 'pickup-time-hour', 'pickup-time-minute',
  'number-of-passenger', 'number-of-bags', 'first-name',
  'last-name', 'email-address', 'phone-number', 'additional-information',
  'vehicle'
];

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
        $(`#${item}`).val(value.id).change();
        $(`span#${item}-area`).text(value.label);
      } else {
        $(`#${item}`).val(value.label);
        $(`span#${item}-area`).text(value.label);
      }

      if (item === 'pickup-address') {
        mapPickupAddress = value.label;
      } else if (item === 'dropoff-address') {
        mapDropoffAddress = value.label;
      } else if (item === 'pickup-time-hour') {
        $(`span#${item}-area`).text(value.label.slice(0, 2));
        timeType = value.label.slice(-2);
      } else if (item === 'pickup-time-minute') {
        $(`span#${item}-area`).text(`${value.label}`);
        $(`span#pickup-time-type`).text(timeType);
      } else if (item === 'vehicle') {
        $(`#${value.label}`).addClass('selected');
      }
    }
  }, formItems);

  mapPickupAddress && mapDropoffAddress &&
    $('.view-map-button').attr('href', '//maps.google.com/maps?saddr='+ encodeURIComponent(mapPickupAddress) +'&daddr='+ encodeURIComponent(mapDropoffAddress) +'&ie=UTF8&amp;z=9&amp;layer=t&amp;t=m&amp;iwloc=A&amp;output=embed?iframe=true&amp;width=640&amp;height=480')

  $('.vehicle-section').on('click', function(e){
    const id = 'vehicle';
    const value = $(this).data('vehicle');

    $('.vehicle-section').removeClass('selected');
    $(this).addClass('selected');
    localStorageSet(id, { id: value, label: value, value } , 'div');
  });

  $("select, input, textarea").change(function () {
    // console.log($(this).prop('type'));
    const id = $(this).attr("id");
    const value = $(this).val();
    localStorageSet(id, { id: value, label: value, value } , $(this).prop('type').replace('-one', ''));
  });
});
