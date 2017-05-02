var mongoose = require("mongoose");
var booklistSchema = mongoose.Schema({
	name : String,
	book : String,
	price :Number
})
module.exports = booklistSchema 