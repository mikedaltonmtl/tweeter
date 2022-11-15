/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // escape any 'unsafe' characters from the tweet content
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    // use timeago to convert timestamp into 'time since...
    const timeSinceTweet = timeago.format(tweetData.created_at);
    const safeTweetContent = escape(tweetData.content.text);

    const tweet = $(`
      <article class="tweet">
        <header>
          <img src=${tweetData.user.avatars} alt="avatar for user ${tweetData.user.name}"/>
          <p>${tweetData.user.name}</p>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <p class="tweet-text">${safeTweetContent}</p>
        <footer>
          <p>${timeSinceTweet}</p>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </footer>
      </article>`
    );
    return tweet;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const tweetHtml = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $( "#tweets-container" ).append(tweetHtml);
    }
  };

  // fetch the tweets from the http://localhost:8080/tweets page with a AJAX, GET request
  const loadTweets = function() {
    $.getJSON('/tweets', function(data) {
      console.log('success (get), data:', data);
      renderTweets(data);
    });
  };

  loadTweets();

  // this function will probably be defunct once we start using SQL tweets...
  const loadNewTweet = function() {
    $.getJSON('/tweets', function(data) {
      console.log('loadNewTweet - success (get), data:', data);
      const newTweet = [data[data.length - 1]];
      renderTweets(newTweet);
    });
  };

  // event handler for a new tweet submission
  $( "#new-tweet-form" ).submit(function(event) { 
    event.preventDefault();
    const $tweetText = $( this ).children( "textarea#tweet-text" ).val();

    // validate for character length
    if ($tweetText.length > 140) {
      alert('Sorry, your tweet exceeds the maximum length (140 chars)');
      return;
    }
    // validate for empty or null tweet
    if ($tweetText === "" || $tweetText === null) {
      alert('Please compose your tweet to submit');
      return;
    }

    // convert form data into key-value-pair string
    const $formString = $( "form" ).serialize();

    // $.post parameters: url, data to submit, success callback
    $.post('/tweets/', $formString, function() {
      console.log('success (post): data sent:', $formString);
    })
    .then(() => {
      $( this ).trigger('reset');
      $( this ).children( "textarea#tweet-text" ).trigger('input');
      loadNewTweet();
      // this below might be a better solution when we switch to SQL backend?
      // $( "#tweets-container" ).empty();
      // loadTweets();
    });
  });


}); // end of $(document).ready