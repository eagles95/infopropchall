//----------------Imports-------------------
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require("cors");

//----------------Start---------------------

//init app
const app = express();
app.use(fileUpload());
//api route
const api = require('./routes/api');

//----------------MIDDLEWARE----------------

//cors
app.use(cors());

//body-parser
app.use(bodyParser.json());

//----------------Routes--------------------

//set static folder
app.use(express.static(path.join(__dirname, '/public')));

//api route
app.use('/api', api);

//get index dummy page
app.get('/', (req, res) => {
    res.send("Invalid page");
});

//----------------Start Server-------------
//port and server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server started on port:" + port);
});
