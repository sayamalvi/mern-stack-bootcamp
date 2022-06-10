const express = require('express')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/bmiCalculator', function (req, res) {
    res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmiCalculator.html', function (req, res) {
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);

    var result = weight / (height * height);

    res.send('Your BMI is ' + result);
});

app.listen(3000, function () {
    console.log('Server running');
});




