// Require dependecies 
const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

// Use ejs engine
app.set('view engine', 'ejs');

// returns an object with input fields
app.use(bodyParser.urlencoded({ extended: true }));
// use local files stored in public folder 
app.use(express.static('public'));

// connect mongoose 
mongoose.connect('mongodb://127.0.0.1/todoDB');

// declare schema - defines structure and attributes of a document
const itemsSchema = new mongoose.Schema({
    name: String,
});

// declare model
const Item = mongoose.model("Item", itemsSchema);

// name documents 
const item1 = new Item({ name: "Welcome to the ToDo List" });
const item2 = new Item({ name: "<-Hit the + button to add an item" });
const item3 = new Item({ name: "Hit to delete an item" });

// make and array which will be passed as arguments to insert data to database
const defaultItems = [item1, item2, item3]

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
})

const List = mongoose.model('List', listSchema);

// when user accesses the home route 
app.get('/', function (req, res) {

    //   the find method will find everything in the items collection because we have not put any condition in the curly braces.
    //  the function will contain the things which we will find inside the items collection
    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {

            // Insert documents 
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Documents added")
                }
            });
            // Redirect to the home route 
            res.redirect('/');
        }
        else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
});


app.get('/:customListName', function (req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save();
                res.redirect('/' + customListName);
            }
            else {
                res.render('list', { listTitle: foundList.name, newListItems: foundList.items })
            }
        }
    })
});


app.post('/', function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect('/');
    }
    else {
        List.findOne({ name: listName }, function (err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listName);
        })
    }

});

app.post('/delete', function (req, res) {
    const deletedItem = req.body.checkbox;
    const listName = req.body.listName;

    if (listName == "Today") {
        Item.findByIdAndRemove(deletedItem, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Item deleted")
            }
        })
        setTimeout(function () {
            res.redirect('/');
        }, 500)
    }
    else {
        List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: deletedItem } } },
            function (err, foundList) {
                if (!err) {
                    res.redirect('/' + listName)
                }
            }
        );
    };
});







































app.listen(3000, function () {
    console.log('Server started at port 3000');
});
