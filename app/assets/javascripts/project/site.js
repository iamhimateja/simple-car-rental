var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};
$(document).on('turbolinks:load', function() {
  $('.input-datepicker').datetimepicker({
    format: "DD/MM/YYYY",
    minDate: moment(),
    maxDate: moment().add(6, 'months')
  })

  $('#location').typeahead({
    hint: true,
    highlight: true,
    minLength: 0
  },
  {
    name: 'states',
    source: substringMatcher(gon.locations)
  });

  if ($(document.body).hasClass('showPage')) {
    if ($('.selected_location').length > 0) {
      $(document.body).highlight($('.selected_location').text())
    }

    $.each($('.carsList img'), function(index, ele) {
      $(ele).off('load').on('load', function(event) {
        $(ele).closest('.car_details').height($(ele).height() + 25)
      })
    })

    $('.car_details:not(.disabled)').off('click').on('click', function(event) {
      $('.checked_icon').addClass('hide')
      $(this).find('.checked_icon').removeClass('hide');
    });

    $('.filter_trigger').off('click').on('click', function(event) {
      $(this).siblings('.popover_content').toggleClass('hide')
    })

    $('.sort_trigger').off('click').on('click', function(event) {
      if ($(this).hasClass('ascending_order')) {
        $('.carsList').find('.carsListItem').sort(function (a, b) {
          return $(b).attr('data-cost') - $(a).attr('data-cost');
        }).appendTo('.carsList');
        $(this).find('i.fa').removeClass('fa-sort-amount-asc').addClass('fa-sort-amount-desc')
        $(this).removeClass('ascending_order').addClass('descending_order')
      } else {
        $('.carsList').find('.carsListItem').sort(function (a, b) {
          return $(a).attr('data-cost') - $(b).attr('data-cost');
        }).appendTo('.carsList');
        $(this).find('i.fa').removeClass('fa-sort-amount-desc').addClass('fa-sort-amount-asc')
        $(this).removeClass('descending_order').addClass('ascending_order')
      }
    })
    $('.sort_trigger').trigger('click')

    $('.popover_content input[name="transmission"]').off('change').on('change', function(event) {
      $('.carsList .carsListItem').addClass('hide')
      switch($(this).val()) {
        case "All":
          $('.carsList .carsListItem.hide').removeClass('hide')
          break;
        case "Manual":
          $('.carsList .carsListItem[data-transmission-type="Manual"]').removeClass('hide')
          break;
        case "Auto":
          $('.carsList .carsListItem[data-transmission-type="Automatic"]').removeClass('hide')
          break;
      }
    })

    $('.popover_content input[name="car_type"]').off('change').on('change', function(event) {
      $('.carsList .carsListItem').addClass('hide')
      switch($(this).val()) {
        case "All":
          $('.carsList .carsListItem.hide').removeClass('hide')
          break;
        case "Hatchback":
          $('.carsList .carsListItem[data-car-type="Hatchback"]').removeClass('hide')
          break;
        case "Sedan":
          $('.carsList .carsListItem[data-car-type="Sedan"]').removeClass('hide')
          break;
        case "SUV":
          $('.carsList .carsListItem[data-car-type="SUV"]').removeClass('hide')
          break;
        case "Mini SUV":
          $('.carsList .carsListItem[data-car-type="Mini SUV"]').removeClass('hide')
          break;
      }
    })

    $('.popover_content input[name="fuel_type"]').off('change').on('change', function(event) {
      $('.carsList .carsListItem').addClass('hide')
      switch($(this).val()) {
        case "All":
          $('.carsList .carsListItem.hide').removeClass('hide')
          break;
        case "Petrol":
          $('.carsList .carsListItem[data-fuel="Petrol"]').removeClass('hide')
          break;
        case "Diesel":
          $('.carsList .carsListItem[data-fuel="Diesel"]').removeClass('hide')
          break;
      }
    })
  }
})