const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//connect to db
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(()=>{
        console.log("connect t Mongo Altas");
    })
    .catch((e)=>{
        console.log(e);
    })

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/api/user", authRoute);
app.use("./api", passport.authenticate("jwt",{session: false}), courseRoute);

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});


