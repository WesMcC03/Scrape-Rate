let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ReviewSchema = new Schema ({
    title: String,

    body: String

});

var Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;

