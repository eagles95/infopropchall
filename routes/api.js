//----------------Imports-------------------
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const defaultJson = require("./default.json");
var fs = require("fs");


router.get('/default',(req,res,next) => {
    if(isQueryEmpty(req.query)){
        res.json(defaultJson);
    }
    else{
        res.json(filter(defaultJson,req.query))
    }
});

router.get('/uploaded',(req,res,next) => {
    var fs = require('fs');
    if (fs.existsSync("./routes/uploaded.json")) {
        let uploadedJson = JSON.parse(fs.readFileSync("./routes/uploaded.json", 'utf8'));
        if(isQueryEmpty(req.query)){
            res.json(uploadedJson);
        }
        else{
            res.json(filter(uploadedJson,req.query))
        }
    }
    else{
        res.status(404).send("error");
    }
});


router.post('/upload',(req,res,next) => {
    if(!req.files){
        res.status(500).send("error");
    }
    let file = req.files.file;
    let flag = false;
    file.mv('./routes/uploaded.csv',function(err) {
        if(err){
            res.status(500).send("error");
        }
        const { spawn } = require('child_process');
        const pyprog = spawn('python',["./routes/clean_csv.py",'./routes/uploaded.csv']);

        pyprog.stdout.on('data', function(data) {
            console.log(data.toString());
            if(flag){
                res.status(500).send("error");
            }
            else{
                res.send("ok");
            }
        });
        pyprog.stderr.on('data', (data) => {
            console.log("wewwewewewew");
            console.log(data.toString());
            flag = true;
        });
        
    });
});


function filter(data,query){
    retData = [];
    for (let i = 0; i < data.length;i++){
        let flag = true;
        for( let key in query){
            //check if value is a number
            if(isNaN(query[key])){
                return ("Error, value should be a number")
            }

            //split into column and param
            const split = key.split("-");

            //check if column is correct
            if ((!(split[0] in data[i])) || (isNaN(data[i][split[0]])) ){
                return("Error, can't query " + key +" column");
            }

            //check param
            if( !( (split[1] == 'g') || (split[1] == 'l')) ){
                return("Error, invalid query param");
            }

            //query it
            if(!check(data[i],split[0],split[1],query[key])){
                flag = false;
                break;
            }
        }
        if(flag){
            retData.push(data[i]);
        }
    }
    return(retData);
}




function check(data,col,type,value){
    if(type === 'g'){
        return (data[col] >= value);
    } 
    else if (type === 'l'){
        return ((data[col] <= value) && (data[col] > 0));
    }
}

function isQueryEmpty (query){
    return(Object.keys(query).length === 0 
    && query.constructor === Object);
}


//----------------Exports--------------------
module.exports = router;



/*
'price' : int - 
'area' : int -
'price_by_sqm': float - 
'condominium_fee' : int -
'iptu'   : int - 
'rooms'  : int - 
'bathrooms' : int - 
'garage' : int - 
*/