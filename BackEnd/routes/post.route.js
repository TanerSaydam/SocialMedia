let express = require("express"),
    multer = require("multer"),
    mongoose = require("mongoose"),        
    router = express.Router();

const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require('uuid')
let Post = require("../models/Post");
let Like = require("../models/Like");

router.post("/post/add", (req, res) =>{
    let model = new Post(req.body);
    model._id = uuidv4();

    model.save().then(() => {
        res.send();
    });
});

router.get("/post/getAll", (req, res) => {
    Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "users"
            }            
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "post_id",
                as: "likes"
            }
        }
    ]).sort({date: -1}).then((data) => {
        res.send(data);
    });   
});

router.post("/post/removeById", (req,res) => {
    const { _id } = req.body
    Post.findByIdAndDelete(_id).then(() => {
        res.send();
    });
})

module.exports = router;