$(document).ready(function () {
  // Object to store Amenity IDs and Names
  let amenities = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    // Get Amenity ID and Name from data attributes
    let amenityID = $(this).data('id');
    let amenityName = $(this).data('name');

    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add Amenity ID and Name to the amenities object
      amenities[amenityID] = amenityName;
    } else {
      // Remove Amenity ID and Name from the amenities object
      delete amenities[amenityID];
    }

    // Update the text content of the <h4> tag inside the .amenities div
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
});
