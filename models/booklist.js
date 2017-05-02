var mongoose = require("mongoose");
var booklistSchema = require("../schemas/booklist");
var book = mongoose.model('lib', booklistSchema);
module.exports = book;