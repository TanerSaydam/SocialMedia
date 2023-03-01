var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
    _id: String,
    user_id: String,
    content: String,
    date: Date
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
