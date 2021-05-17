require('dotenv').config();

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });


client.get('search/tweets', {q: '支配'}, function(error, tweets, response) {
    console.log(tweets);
    /* tweets.statuses.forEach(function(tweet) {
        console.log("tweet: " + tweet.text)
    }); */
    if(error){
      console.log(error);
    }
    /* if(response){
      console.log(response);
    } */
 });