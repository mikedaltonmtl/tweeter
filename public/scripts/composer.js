$(document).ready(function() {

  // scroll to top of page, put focus in textarea for new tweet
  const scrollToTop = function() {
    $( "html, body" ).animate({ scrollTop: 0 }, "slow");
    $( "#tweet-text" ).focus();
  };

  // scroll to top from nav bar > new tweet
  $( "nav div" ).click(() => scrollToTop());

  // scroll to top from bottom button
  const $bottomBtn = $( "#bottom-button" );
  $bottomBtn.click(() => scrollToTop());

  // hide button if already at top of page
  // scrollTop() returns the number of pixels hidden above the scrollable area
  $(window).scroll(() => {
    if ($(window).scrollTop() > 100) {
      $bottomBtn.addClass('show');
    } else {
      $bottomBtn.removeClass('show');
    }
  });

});