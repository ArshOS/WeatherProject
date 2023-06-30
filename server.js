const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
var key = "a20e1200baf796efc8df90602a8af5f9";
var endPoint = "https://api.openweathermap.org/data/2.5/weather?";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
   var city = req.body.city;
   var APIresponse = endPoint + "q=" + city + "&" + "appid=" + key;
   console.log(APIresponse);
});

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))