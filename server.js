const fs = require('fs');
const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
app.use(express.json())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
//app.use(bodyParser);
app.use(express.static('build'));

process.chdir(__dirname);

app.get("/beers", function (req, res) {
    fs.readFile("./data/beers.json", function (err, data) { 
        res.send(data.toString())
    });
});

app.get("/taps", function (req, res) {
    fs.readFile("./data/taps.json", function (err, data) {
        res.send(data.toString())
    });
});

app.get("/ondeck", function (req, res) {
    fs.readFile("./data/onDeck.json", function (err, data) {
        res.send(data.toString())
    });
});

app.post("/setBeers", function(req,res){    
    fs.writeFile("./data/beers.json",JSON.stringify(req.body), 'utf8', (err, data)=>{
        res.send(JSON.stringify([{"result":"saved"}]))
    })
});

app.post("/setOnDeck", function(req,res){
    fs.writeFile("./data/onDeck.json",JSON.stringify(req.body), 'utf8', (err, data)=>{
        res.send(JSON.stringify([{"result":"saved"}]))
    })
});

app.post("/setTaps", function(req,res){
    fs.writeFile("./data/taps.json",JSON.stringify(req.body), 'utf8', (err, data)=>{
        res.send(JSON.stringify([{"result":"saved"}]))
    })
});

const server = app.listen(7767, function () {
    console.log('7767')
});