const mongoose = require('mongoose');

const dbURL = 'mongodb://127.0.0.1/fruitsDB';
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dbURL, connectionParams)
    .then(() => console.log("Connected"))
    .catch((e) => console.log('Error', e));


const fruitSchema = mongoose.Schema({
    name: String,
    review: {
        type: Number,
        min: 1,
        max: 10
    },
    rating: Number
})

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 4,
    review: "Pretty solid as a fruit"
});


// const peopleSchema = mongoose.Schema({
//     name: String,
//     age: Number
// })

// const People = mongoose.model("People", peopleSchema);

// const people = new People({
//     name: "Sayam",
//     age: 19
// })


Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err)
    }
    else {
        mongoose.connection.close();
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        })
    }
})


fruit.save();




































































































































