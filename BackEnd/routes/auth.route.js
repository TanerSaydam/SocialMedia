let express = require("express"),
    multer = require("multer"),
    mongoose = require("mongoose"),    
    router = express.Router();

const { v4: uuidv4 } = require('uuid')

const DIR = "./public/";

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, DIR);
    },
    filename: (req, file, cb) =>{
        const fileName = file.originalname.toLocaleLowerCase().split(" ").join("-");
        cb(null, uuidv4() + "-" + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=> {
        if(file.mimetype == "image/png" ||
           file.mimetype == "image/jpg" ||
           file.mimetype == "image/jpeg"){
            cb(null, true);
           }
        else{
            cb(null, false);
            return cb(new Error("Sadece resim dosyası yükleyebilirsiniz!"));
        }
    }
});

//User Model
let User = require("../models/User");

router.post("/register", upload.single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: url +"/public/" + req.file.filename
    });

    user.save().then(result =>{
        res.status(201).json({
            message: "Kullanıcı kaydı başarıyla tamamlandı!",
            user: user
        })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            error:err
        });
    });
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;   
    
    User.find({email: email, password: password}).then(data => {
        if(data.length > 0)
            res.send({user: data[0]});
        else    
            res.status(400).send({message: "Kullanıcı adı ya da şifre yanlış!"});
    });
})

module.exports = router;