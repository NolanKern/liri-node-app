// initial requires for node to function
var keys = require('./keys.js');
var fs = require('fs');
var inquirer = require('inquirer');

var update = new Date();
update = update.toDateString();

function liri(){
    console.log("here");
    inquirer.prompt([
        {
            type: "list",
            message: "What would you want to see?",
            choices: ["Twitter", "Music", "Movies", "Finish Program"],
            name: "selection"
        },
    ]).then(function(user){
        fs.appendFile("log2.txt", "\n\n User input aquired at: "+ update+"\n\n", function(err){if(err){throw err;}})

    switch(user.action) {
        case "Twitter":
            var twitter = require('twitter');
            var me = new Twitter (keys.twitterKeys);
            var myName = {screen_name: user.username};
            me.get('statuses/user_timeline', myName, function(error, tweet, response){
                if (!error) {
                    console.log("Here are your last 20 Tweets:");
                    console.log("\n");
                    fs.appendFile("log2.txt", "\nNolan Kern's last 20 tweets " + user.username + ": \n ", function(err) 
                            {if(err) throw err;}
                    );

                    for(var i = 0; i < 20; i++) {
                        console.log(tweet[i].text);
                        console.log("Date/Time created: " + tweet[i].created_at);
                        console.log("");

                        fs.appendFile("log2.txt", tweet[i].text + "\nDate/Time created: " + tweet[i].created_at + "\n \n", function(err) 
                            {if(err) throw err;}
                        );
                    }
                    liri();
                } else {
                    console.log(error);
                }
              });
            break;


        case "Music":
        inquirer.prompt([
			{
				type: "input",
				message: "What song do you want to know more about?",
				name: "song"
			}
			]).then(function (user) {
				var spotify = require('spotify');
				var song = user.song;
				

				spotify.search({ type: 'track', query: song }, function(err, data) {
				    if (err) {
				        throw err;
				    }

					console.log("");
				    console.log("Song Name: " + data.tracks.items[0].name);
				 	console.log("Artist: " + data.tracks.items[0].artists[0].name);
				 	console.log("Album: " + data.tracks.items[0].album.name);
				 	console.log("Preview Link: " + data.tracks.items[0].preview_url);

				 	fs.appendFile("log2.txt", "\nSong Name: " + data.tracks.items[0].name + "\nArtist: " +
				 		data.tracks.items[0].artists[0].name + "\nAlbum: " + data.tracks.items[0].album.name +
				 		"\nPreview Link: " + data.tracks.items[0].preview_url, function(err) {if(err) throw err;});
				 	liri();
				});				
			});
            break;

        case "Movies":
        inquirer.prompt([
			{
				type: "input",
				message: "What movie do you want to know more about?",
				name: "movie"
			}
			]).then(function (user) {
				var request = require('request');
				var movie = user.movie;

				var queryURL = "http://www.omdbapi.com/?t=40e9cece" + movie + "&y=&plot=short&r=json&tomatoes=true"

				request(queryURL, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						console.log("");
						console.log("Title: " + JSON.parse(body)["Title"]);
						console.log("Year: " + JSON.parse(body)["Year"]);
						console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
						console.log("Country: " + JSON.parse(body)["Country"]);
						console.log("Language: " + JSON.parse(body)["Language"]);
						console.log("Plot: " + JSON.parse(body)["Plot"]);
						console.log("Actors: " + JSON.parse(body)["Actors"]);
						console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
						console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);

						fs.appendFile("log2.txt", "\nTitle: " + JSON.parse(body)["Title"] + "\nYear: " + JSON.parse(body)["Year"] +
							"\nIMDB Rating: " + JSON.parse(body)["imdbRating"] + "\nCountry: " + JSON.parse(body)["Country"] +
							"\nLanguage: " + JSON.parse(body)["Language"] + "\nPlot: " + JSON.parse(body)["Plot"] +
							"\nActors: " + JSON.parse(body)["Actors"] + "\nRotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] +
							"\nRotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"], function(err) {if(err) throw err;});
					
					liri();
					} else {
						console.log(error);
					}
				})
			});
            break;

        case "Finish Program":
            console.log("Thanks for hanging out with me!");
            fs.appendFile("log2.txt", "User left program");
            return;
            break;

        default:
        console.log("something went wrong here");
            
    }

    })
}

liri();