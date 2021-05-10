var Twitter = require('twitter');

require('dotenv').config()

  /* const apikey=process.env.apikey;
  const apiSecretKey= process.env.apikeysecret;
  const accessToken= process.env.access_token_key;
  const accessTokenSecret= process.env.access_token_secret;
  
  apikey = nDjVpiuUK01JSTLm6SEfkzkiM
  apikeysecret= 3BgyQfBdiqYcvaXJVZhea4U36Tg2sIY7CXWI61GYZ0ZmoldVp5
  accesstoken = 1367858703869898759-2859nqRB2DmZ45xa1DHERQFzgspZgsh
  accesstokensecret= uKtF9iqJg8EjIBqODZgWqUC2s5gGSakRtIBKJrHhY6CSg
  
  
  const apikey="nDjVpiuUK01JSTLm6SEfkzkiM";
  const apiSecretKey= "3BgyQfBdiqYcvaXJVZhea4U36Tg2sIY7CXWI61GYZ0ZmoldVp5";
  const accessToken= "1367858703869898759-2859nqRB2DmZ45xa1DHERQFzgspZgsh";
  const accessTokenSecret= "uKtF9iqJg8EjIBqODZgWqUC2s5gGSakRtIBKJrHhY6CSg";
  
  var client = new Twitter({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token_key: accessToken,
    accessTokenSecret: accessTokenSecret
});*/


var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });


client.get('search/tweets', {q: '支配'}, function(error, tweets, response) {
    console.log(tweets);
    /* tweets.statuses.forEach(function(tweet) {
        console.log("tweet: " + tweet.text)
    }); */
 });