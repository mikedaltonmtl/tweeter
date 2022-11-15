/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const createTweetElement = function(tweetData) {

    // use timeago to convert timestamp into 'time since...)
    const timeSinceTweet = timeago.format(tweetData.created_at);

    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src=${tweetData.user.avatars} alt="avatar for user ${tweetData.user.name}"/>
          <p>${tweetData.user.name}</p>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <p class="tweet-text">${tweetData.content.text}</p>
        <footer>
          <p>${timeSinceTweet}</p>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </footer>
      </article>`
    );
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

  // event handler for a new tweet submission
  $( "#new-tweet-form" ).submit(function(event) {

    let validTweet = true;

    const tweetText = $( this ).children( "textarea#tweet-text" ).val();
    console.log('tweetText', tweetText);

    // validate for character length
    if (tweetText.length > 140) {
      alert('Sorry, your tweet exceeds the maximum length (140 chars)');
      validTweet = false;
    }

    // validate for empty or null tweet
    if (tweetText === "" || tweetText === null) {
      alert('Please compose your tweet to submit');
      validTweet = false;
    }

    if (validTweet) {
      const str = $( "form" ).serialize();
      // $.post parameters: url, data to submit, success callback
      $.post('/tweets/', str, function() {
        console.log('success (post): data sent:', str);
      });
    }

    event.preventDefault();
  });

  // fetch the tweets from the http://localhost:8080/tweets page with a AJAX, GET request
  const loadTweets = function() {
    $.getJSON('/tweets', function(data) {
      console.log('success (get), data:', data);
      renderTweets(data);
    });
  };

  loadTweets();

}); // end of $(document).ready