var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var RocketsSchema = new Schema({
  headline: { 
    type: String, 
    require: true
    },

  summary: {
    type: String,
    require: true},
  url:  {
    type: String,
    require: true},

});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", RocketsSchema);

// Export the Article model
module.exports = Article;
