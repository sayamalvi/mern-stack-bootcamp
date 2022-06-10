const express = require('express');
const app = express();

app.get('/', function (request, response) {
    response.send('hello');
});

app.get('/contact', function (req, res) {
    res.send('contact me at:sayamalvi07@gmail.com');
});

app.get('/about', function (req, res) {
    res.send('I am a frontend dev');
});
app.get('/hobbies', function (req, res) {
    res.send(`<ul>
    <li>Coding</li>
    <li>Bikes</li>
    </ul>`);
});

app.listen(3000, function () {
    console.log('server started');
});

