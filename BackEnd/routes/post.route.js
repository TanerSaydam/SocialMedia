let express = require("express"),
    multer = require("multer"),
    mongoose = require("mongoose"),    
    router = express.Router();

let Post = require("../models/Post");

router.post("/post", (req, res) =>{
    const {userId,content,date} = req.body;

    let model = new Post(req.body);
    model.save().then(() => {
        Post.find({}).then(data => {
            res.send(data);
        });
    });
});

router.get("/post/getAll", (req, res) => {
    Post.find({}).then(data => {
        res.send(data);
    });
});

module.exports = router;