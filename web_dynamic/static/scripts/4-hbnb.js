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

  $('button').click(function () {
    $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify(Object.keys(amenities)), function(data) {
      $('section.places').empty();
      $.each(data, function(index, place) {
        $('section.places').append('<article>\
          <div class="title_box">\
            <h2>' + place.name + '</h2>\
            <div class="price_by_night">$' + place.price_by_night + '</div>\
          </div>\
          <div class="information">\
            <div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div>\
            <div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div>\
            <div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div>\
          </div>\
          <div class="description">\
            ' + place.description + '\
          </div>\
        </article>');
      });
    }, 'json');
  });
});
