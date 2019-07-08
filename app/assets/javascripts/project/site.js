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

    $('.car_details').off('click').on('click', function(event) {
      $('.selectedCar').removeClass('selectedCar')
      $(this).addClass('selectedCar')
      $('.checked_icon').addClass('hide')
      $(this).find('.checked_icon').removeClass('hide');
      $(".continueToCheckout").removeClass('disabled')
    });

    $('.filter_trigger').off('click').on('click', function(event) {
      $(this).siblings('.popover_content').toggleClass('hide')
    });

    $('.close_filters').off('click').on('click', function(event) {
      $('.popover_content').addClass('hide')
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

    $('.popover_content input').off('change').on('change', function(event) {
      $('.carsList .carsListItem').addClass('hide')
      var selector = ""
      if ($('.popover_content input[name="transmission"]:checked').length > 0) {
        selector += '.carsListItem[data-transmission-type="'+$('.popover_content input[name="transmission"]:checked').val()+'"]'
      }
      if ($('.popover_content input[name="car_type"]:checked').length > 0) {
        selector += '.carsListItem[data-car-type="'+$('.popover_content input[name="car_type"]:checked').val()+'"]'
      }
      if ($('.popover_content input[name="fuel_type"]:checked').length > 0) {
        selector += '.carsListItem[data-fuel="'+$('.popover_content input[name="fuel_type"]:checked').val()+'"]'
      }
      $(selector).removeClass('hide')
      if ($('.carsListItem:visible').length > 0) {
        $('.empty_message').addClass('hide')
      } else {
        $('.empty_message').removeClass('hide')
      }
    })

    $('.clear_filters').off('click').on('click', function(event) {
      $('.carsList .carsListItem').removeClass('hide')
      $('.empty_message').addClass('hide')
      $('label.btn.active').removeClass('active')
      $('.popover_content input[name="transmission"]:checked, .popover_content input[name="car_type"]:checked, .popover_content input[name="fuel_type"]:checked').prop('checked', false)
    });

    $("#selectedCars").off('show.bs.modal').on('show.bs.modal', function(event) {
      if ($('.selectedCar').length > 0) {
        var selectedCar = $('.selectedCar').closest('.carsListItem')
        $(event.target).find('.carBg img').attr({
          src: $('.selectedCar').find('.car_image').attr('src'),
          alt: selectedCar.data('car-name')
        });
        $(event.target).find('.car_details.car_name').text(selectedCar.data('car-name'))
        $(event.target).find('.car_details.car_location').text(selectedCar.data('location'))
        $(event.target).find('.car_details.car_seats').text(selectedCar.data('car-seats'))
        $(event.target).find('.car_details.car_transmission').text(selectedCar.data('transmission-type'))
        $(event.target).find('.car_details.car_fuel_type').text(selectedCar.data('fuel'))
        $(event.target).find('.car_details.car_car_type').text(selectedCar.data('car-type'))
        $(event.target).find('.modal-footer .car_price').text("₹. "+selectedCar.data('cost')+" /-")
      }
    })

    $('.order_car').off('click').on('click', function(event) {
      var carCard = $(this).closest('.modal').find('.carCard');
      var modal = $(this).closest('.modal')
      carCard.addClass('showLoading')
      modal.find('.carBg, .carDetailsWrap').addClass('blur')
      setTimeout(function(event) {
        carCard.find('.loading_icon img').addClass('hide')
        carCard.find('.loadContents .load_message').text("Car Booked")
        carCard.find('.loadContents .successBox').removeClass('hide')
        setTimeout(function() {
          Turbolinks.visit('/', {action: "replace"})
        }, 1000)
      }, Math.floor(Math.random()*(3000-1000+1)+1000))
    })
  }
})