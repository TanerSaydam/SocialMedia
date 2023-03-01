let express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router();

const { v4: uuidv4} = require("uuid");
let Like = require("../models/Like");

router.post("/post/like", (req, res) => {
    let model = new Like(req.body);
    model._id = uuidv4();

    Like.find({user_id: model.user_id, post_id: model.post_id})
        .then(data => {            
            if(data.length > 0){
                Like.findByIdAndRemove(data[0]._id).then(() => {
                    res.send();
                });
            }else {
                model.save().then(() => {
                    res.send();
                })
            }
        });
});

router.post("/post/getLikeByPostId", (req, res) => {
    Like.find({user_id: model.user_id, post_id: model.post_id})
        .then(data => {            
            res.send(data);
    });
})

module.exports = router;