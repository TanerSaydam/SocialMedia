var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    userId: String,
    content: String,
    date: Date
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
