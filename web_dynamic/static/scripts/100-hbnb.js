$(document).ready(function () {
  let amenities = {};
  let statesChecked = {};
  let citiesChecked = {};

  $('input[type="checkbox"]').change(function () {
    let id = $(this).data('id');
    let name = $(this).data('name');
    let type = $(this).closest('.locations').find('h3').text();

    if ($(this).is(':checked')) {
      if (type === 'States') {
        statesChecked[id] = name;
      } else {
        citiesChecked[id] = name;
      }
    } else {
      if (type === 'States') {
        delete statesChecked[id];
      } else {
        delete citiesChecked[id];
      }
    }

    let statesList = Object.values(statesChecked).join(', ');
    let citiesList = Object.values(citiesChecked).join(', ');
    let locationsList = '';
    if (statesList !== '') {
      locationsList += 'States: ' + statesList;
    }
    if (statesList !== '' && citiesList !== '') {
      locationsList += ' | ';
    }
    if (citiesList !== '') {
      locationsList += 'Cities: ' + citiesList;
    }
    $('.locations h4').text(locationsList);
  });

  $('button').click(function () {
    let selectedAmenities = Object.keys(amenities);
    let selectedStates = Object.keys(statesChecked);
    let selectedCities = Object.keys(citiesChecked);

    let requestData = {
      amenities: selectedAmenities,
      states: selectedStates,
      cities: selectedCities
    };

    $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify(requestData), function(data) {
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
