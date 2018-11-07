var express = require("express");
var path = require("path");
require('dotenv').config();
const axios = require('axios')

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(__dirname + '/'));

app.post("/api/edamam", function (req, res) {
    // console.log(req.body)
    let searchTerm = req.body.searchTerm;
    // console.log(searchTerm)
    let edamamURL = `https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.EDAMAM_ID}&app_key=${process.env.EDAMAM_KEY}`
    // return res.json(characters);
    axios.get(edamamURL)
    .then(response => {
        let test = response;
        console.log(test)
        return res.send(test.data)
    }).catch(error => {console.log(error)})
    // res.send("IT WORKED")
});


app.post("/api/characters", function (req, res) {

    var newcharacter = req.body;

    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcharacter);

    characters.push(newcharacter);

    res.json(newcharacter);
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
