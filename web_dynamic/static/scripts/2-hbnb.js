$(document).ready(function () {
  let amenities = {};

  $('input[type="checkbox"]').change(function () {
    let amenityID = $(this).data('id');
    let amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityID] = amenityName;
    } else {
      delete amenities[amenityID];
    }

    $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
