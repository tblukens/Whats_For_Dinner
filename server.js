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
    console.log(searchTerm)
    let edamamURL = `https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.EDAMAM_ID}&app_key=${process.env.EDAMAM_KEY}`
    // return res.json(characters);
    axios.get(edamamURL)
        .then(response => {
            return res.send(response.data)
        }).catch(error => { console.log(error) })
    // res.send("IT WORKED")
});




app.post("/api/zomato", function (req, res) {
    let requestData = req.body.city;
    console.log(req.body)
    console.log(`||-- ${requestData} --||`)
    axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${requestData}`, {
        headers: { 'user-key': process.env.ZOMATO_API_KEY },

    }).then(response => {
        // res.send(response.data)
        var entity_id = response.data.location_suggestions[0].entity_id;
        var entity_type = response.data.location_suggestions[0].entity_type;
        // console.log(entity_id, entity_type)
        axios.get(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${entity_id}&entity_type=${entity_type}`, {
            headers: { 'user-key': process.env.ZOMATO_API_KEY },

        }).then(detailsResponse => {
            // res.send(detailsResponse.data)
            // console.log(detailsResponse)
            res.send(detailsResponse.data)
        }).catch(error => { console.log(error) })
    }).catch(error => { console.log(error) })
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
