const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');

const port = 3000;
var key = "a20e1200baf796efc8df90602a8af5f9";
var endPoint = "https://api.openweathermap.org/data/2.5/weather?";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=a20e1200baf796efc8df90602a8af5f9";

    https.get(url, function(response) {
        console.log(response.statusCode);
        
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://api.openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + weatherDescription +".</p>");
            res.write("<h1>Temperature in London is " + temperature + " degrees Celcius.</h1>")
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
    // res.send("Server running");
});

// app.post("/", function(req, res) {
//    var city = req.body.city;
//    var APIresponse = endPoint + "q=" + city + "&units=metric&" + "appid=" + key;
   
//    https.get(APIresponse, function(response) {
//     console.log(response.statusCode);
    
//     response.on('data', function(data){
//         const weatherData = JSON.parse(data);
//         const temperature = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;
//         console.log(temperature);
//         console.log(weatherDescription);

//         app.get("/", function(reqt, resp){
//             resp.send(temperature);
//         });
//     });
//    });
// });

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))