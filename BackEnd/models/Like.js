var mongoose = require("mongoose");
var Scheme = mongoose.Schema;

var likeScheme = new Scheme({
    _id: String,
    user_id: String,
    post_id: String
});

var Like = mongoose.model("Like", likeScheme);

module.exports = Like;