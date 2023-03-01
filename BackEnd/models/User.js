var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    image: {        
        type: String
    }
});

var User = mongoose.model("User", userSchema);

module.exports = User;