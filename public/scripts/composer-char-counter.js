$(document).ready(function() {

  $( "textarea#tweet-text" ).on("input", function() {

    // const maxlength = $(this).attr("maxlength");
    const maxlength = 140;
    const currentLength = $( this ).val().length;

    // select counter relative to the textarea (this)
    const outputCounter = $( this ).parent().find( "output.counter" );
    outputCounter.text(maxlength - currentLength);

    // add class (for CSS) if remaining characters turns negative
    outputCounter.toggleClass("negative", currentLength > maxlength);

  });
});