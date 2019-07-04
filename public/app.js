// Returns BSON objects from MongoDB into JSON
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the article information in the articles id.
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].url + "</p>");
    }
  });

//   "<p data-id='" + data[i]._id + "'>" +