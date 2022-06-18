
const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1/todoDB');

const itemsSchema = new mongoose.Schema({
    name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({ name: "Welcome to the ToDo List" })

const item2 = new Item({ name: "Hit the + button to add an item" })

const item3 = ({ name: "Hit to delete an item" })

const defaultItems = [item1, item2, item3]


app.get('/', function (req, res) {
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Documents added")
                }
            });
            res.redirect('/');
        }
        else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
});

















app.post('/', function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    }
    else {
        items.push(item);
        res.redirect('/');
    }

});

app.get('/work', function (req, res) {
    res.render('list', { listTitle: 'Work List', newListItems: workItems })
});

app.get('/about', function (req, res) {
    res.render('about');
})







































app.listen(3000, function () {
    console.log('Server started at port 3000');
});
