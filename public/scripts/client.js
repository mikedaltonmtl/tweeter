/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweetData) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <img src=${tweetData.user.avatars} alt="avatar for user ${tweetData.user.name}"/>
        <p>${tweetData.user.name}</p>
        <p class="handle">${tweetData.user.handle}</p>
      </header>
      <p class="tweet-text">${tweetData.content.text}</p>
      <footer>
        <p>${tweetData.created_at}</p>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </footer>
    </article>`);
  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of data) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet);
  }
};

renderTweets(data);