(function ($) {
  'use strict';

  var header = $('.header'),
    minLoadPage = 5000,
    portfolioContainer = $('.portfolio-list'),
    currentLang = $('html').attr('lang'),
    translation = function () {
      var tmp = null;
      $.ajax({
        'async': false,
        'type': "GET",
        'global': false,
        'dataType': 'json',
        'url': baseURL + '/assets/js/translation.json',
        'success': function (data) {
          tmp = data.t;
        }
      });
      return tmp;
    }();

  function buildPortfolioCard(portfolio) {
    var output = '<div class="portfolio-card hide">' +
      '<a href="#">' +
      '<div class="portfolio-image">' +
      '<img src="' + baseURL + '/assets/imgs/works/' + portfolio.cover + '" alt="' + portfolio.name + '" class="portfolio-cover">' +
      '<span class="see-more" data-text="' + translation[currentLang].misc.seemore + '">' + translation[currentLang].misc.seemore + '</span>' +
      '</div>' +
      '<div class="portfolio-info">' +
      '<h4 class="portfolio-name">' + portfolio.name + ' - <span class="porfolio-category">' + portfolio.category + '</span></h4>' +
      '<h5 class="portfolio-role">' + translation[currentLang].misc.role;

    for (var i = 0; i < portfolio.roles.length; i++) {
      output += '<span class="badge">' + portfolio.roles[i] + '</span>';
    }

    output += '</h5>' +
      '</div>' +
      '</a>' +
      '</div>';

    return output;
  }

  /* detect touch */
  if ("ontouchstart" in window) {
    document.documentElement.className = document.documentElement.className + " touch";
  }

  $(window).on('load', function () {
    // wait at last minLoadPage for hide intro
    if (counter.current() < minLoadPage) {
      var remaining = minLoadPage - counter.current();
      setTimeout(function() {
        $('body').css('overflow-y', 'auto');
        $('body').addClass('content-loaded');
      }, remaining);
    } else {
      $('.intro').removeClass('animate');
      $('body').addClass('content-loaded');
      $('body').css('overflow-y', 'auto');
    }

    // Stop counter in background
    counter.stop();

    Typed.new('.phrases .headline .type', {
      stringsElement: document.querySelector('.phrases .hide'),
      startDelay: minLoadPage + 2000,
      loop: true,
      typeSpeed: 50,
      backSpeed: 50
    });

  });

  $(document).ready(function () {

    $('.navigation a').click(function (event) {
      event.preventDefault();
      var target = $(this).attr('href').substring(1);

      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 1200);
    });

    if (!$('html').hasClass('touch')) {
      /* background fix */
      $(".hero").css("background-attachment", "fixed");
    }

    if (!$('html').hasClass('touch')) {
      $('.hero').each(function () {
        var $obj = $(this);

        $(window).scroll(function () {
          var yPos = -($(window).scrollTop() / $obj.data('speed'));

          var bgpos = '50% calc(50% + ' + yPos + 'px)';

          $obj.css('background-position', bgpos);

        });
      });
    }
  });

  $('.trigger-more').click(function () {
    var thisButton = $(this),
      loader = thisButton.next();

    $.get(baseURL + '/assets/js/portfolio.json', function (data) {
      var qtyShowing = portfolioContainer.children().length,
        filteredPortfolio = data.slice(qtyShowing, qtyShowing + 3);

      if (filteredPortfolio.length === 0) {
        thisButton.prop('disabled', true);
        thisButton.addClass('disabled');
        return;
      }

      loader.addClass('loading');

      setTimeout(function () {
        for (var i = 0; i < filteredPortfolio.length; i++) {
          var portfolioCard = buildPortfolioCard(filteredPortfolio[i]);
          portfolioContainer.append(portfolioCard);
        }

        setTimeout(function () {
          portfolioContainer.find('.hide').removeClass('hide');
        }, 100);

        var lastCardOffset = portfolioContainer.children().eq('-3').offset().top; // get offset of first appended card
        $('html, body').animate({
          scrollTop: lastCardOffset - 120
        }, 1000);


        loader.removeClass('loading');
      }, 2000);

    });
  });

  $(window).scroll(function () {
    var top = $(window).scrollTop();

    if (top > 150) {
      header.addClass('inverted');
    } else {
      header.removeClass('inverted');
    }

  });

})(jQuery);

