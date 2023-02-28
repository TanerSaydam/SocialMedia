let express = require("express"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    dbConfig = require("./database/db");

const api = require("./routes/auth.route");

//MongoDB Configuration
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(()=> {
    console.log("Database bağlantısı başarılı")
}, err => {
    console.log("Database bağlantısı başarısız! Hata: " + err)
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use("/public", express.static("public"));

app.use("/api", api)

const port = process.env.POST || 4000;
const server = app.listen(port, () => {
    console.log(port + " port üzerinden dinleniyor");
});

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error("Bir sorun çıktı!"));
    });
});

app.use(function (err, req, res, next){
    //console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});