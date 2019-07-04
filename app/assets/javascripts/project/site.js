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
  $('.input-datepicker').datepicker({
    autoclose: true,
    format: "dd/mm/yyyy"
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
    $.each($('.carsList img'), function(index, ele) {
      $(ele).off('load').on('load', function(event) {
        $(ele).closest('.car_details').height($(ele).height())
      })
    })

    $('.car_details:not(.disabled)').off('click').on('click', function(event) {
      $('.checked_icon').addClass('hide')
      $(this).find('.checked_icon').removeClass('hide');
    })
  }
})