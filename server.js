
// All dependencies for Server
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var path = require("path");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// // Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI ||
//   "mongodb://localhost/ReviewData", { useNewUrlParser: true });



// Makes public folder static
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", function (req, res) {
res.sendFile(__dirname + '/index.html');
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});




// API ROUTES
//GET route for scraping the ESPN website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.espn.com/nba/team/_/name/hou/houston-rockets").then(function(response) {
 
      var $ = cheerio.load(response.data);
  
      // Grabs news feed content from Article
      $(".text-container div h1").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.headline = $(this)
          .children("a")
          .text();
        result.url = $(this)
          .children("a")
          .attr("href");
        // result.summary = $(this)
        //   .sibling("p")
        //   .text();

          console.log(result);
  
        // db.Article.create(result)
        //   .then(function(dbArticle) {
    
        //     console.log(dbArticle);
        //   })
        //   .catch(function(err) {

        //     console.log(err);
        //   });
      });
  
      res.send("Scrape is Complete!");
    });
  });

  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  // Set up Promises with Mongoose
  mongoose.Promise = global.Promise;

  // Connect to Mongo DB
  mongoose.connect(
    process.env.MONGODB_URI ||
  
  "mongodb://root:Password1@ds347367.mlab.com:47367/heroku_h9gxp413", {
    useNewUrlParser: true 
  
  }
  );

  // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

