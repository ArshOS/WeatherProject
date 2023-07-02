const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

    const endPoint = "https://api.openweathermap.org/data/2.5/weather?";
    const query = req.body.cityName;
    const apiKey = "<API KEY>";
    const unit  = "metric";

    const url = endPoint + "q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function(response) {
        console.log(response.statusCode);
        
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

            res.write("<p>The weather is currently " + weatherDescription +".</p>");
            res.write("<h1>Temperature in " + query + " is " + temperature + " degrees Celcius.</h1>")
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
