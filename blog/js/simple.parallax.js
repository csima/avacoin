/*!
 * jQuery SimpleParallax v0.1.0
 * https://github.com/nandomoreirame/simple.parallax
 *
 * Copyright (c) 2016 Fernando Moreira (http://nandomoreira.me)
 * Licensed under the MIT license (https://github.com/nandomoreirame/simple.parallax/blob/master/LICENSE)
 **/

$.fn.sparallax = function(options) {
  var $window  = $(window),
      defaults = {
        $elements: $(this),
        speed: 4
      },
      settings = $.extend(defaults, options);

  $.each(settings.$elements, function(i, el) {
    var $el = $(el), offset = 0,
        speed = ($el.data('parallax-speed') ? $el.data('parallax-speed') : defaults.speed);

    $window.scroll(function() {
      offset = -($window.scrollTop() / speed);
      $el.css({ backgroundPosition: '50% ' + offset + 'px' });
    });
  });
};
