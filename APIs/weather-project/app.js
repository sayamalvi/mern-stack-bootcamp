const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

});

app.post('/', function (req, res) {
    const query = req.body.cityName;

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&APPID=4e486bf2a1e1d985301594dd3b94f99c&units=metric';

    https.get(url, function (response) {

        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            res.set('Content-type', 'text/html');

            res.write(`The weather is currently ${weatherDescription}`);
            res.write(`<h1>The temperature in ${query} is ${temp} degree celsius</h1>`);
            res.write(`<img src = ${imageURL}>`);

            res.end();

        });
    });
})























































app.listen(3000, function () {
    console.log('server running on port 3000');
});