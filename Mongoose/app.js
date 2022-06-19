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
const url = "mongodb+srv://Sayam:sayamAlvi@cluster0.chzyy2x.mongodb.net/?retryWrites=true&w=majority";
const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, params)
    .then(() => { console.log("Connected to the Database") })
    .catch((err) => console.log("Error connecting to the Database", err));

// declare schema - defines structure and attributes of a document
const itemsSchema = new mongoose.Schema({
    name: String,
});

// declare model
const Item = mongoose.model("Item", itemsSchema);

// name documents 
const item1 = new Item({ name: "Welcome to the ToDo List" });
const item2 = new Item({ name: "<- Hit the + button to add an item" });
const item3 = new Item({ name: "Hit to delete an item" });

// an array which will be passed as argument to insert data to database
const defaultItems = [item1, item2, item3]

// every new list that we create it will have a name and it will also have an array of item document associated with it 
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
})

// create a mongoose model of listSchema
const List = mongoose.model('List', listSchema);




// when user accesses the home route 
app.get('/', function (req, res) {

    //   the find method will find everything in the items collection because we have not put any condition in the curly braces.
    //  the function will contain the things which we will find inside the items collection
    Item.find({}, function (err, foundItems) {

        // if items collection is empty only then insert default items
        if (foundItems.length === 0) {

            // Insert default items in database
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Documents added")
                }
            });
            // Redirect to the home route and show items in the list
            res.redirect('/');
        }

        // else render list.ejs
        else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }
    });
});




// handles dynamic routes with express route parameters
app.get('/:customListName', function (req, res) {

    // use lodash to capitalize the route url so 'abc' and 'Abc' are one list
    const customListName = _.capitalize(req.params.customListName);

    // if the user accesses customListName this will create a list based of List model that we created above
    // findOne returns a document(object) if it is found 
    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            // if there is 
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save();

                // it will redirect back to the new route which is customListName route
                res.redirect('/' + customListName);
            }
            // else show an existing list
            else {
                res.render('list', { listTitle: foundList.name, newListItems: foundList.items })
            }
        }
    })
});





// handles post request when user adds and item with + button
app.post('/', function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    // no matter from which list the item came from we still have to create it as and item document
    const item = new Item({
        name: itemName
    });

    // if listName that triggered the post request is equals to "Today"(we probably in default list we will save the item and redirect to the root route)
    if (listName === "Today") {
        item.save();
        res.redirect('/');
    }

    // if listName is not Today then it came from a custom list , so we have to search for the list
    else {

        // this will look for the list with the name listName
        List.findOne({ name: listName }, function (err, foundList) {

            // it will add item to the custom list
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listName);
        })
    }

});





// handles post requests route when user checks a checkbox
app.post('/delete', function (req, res) {
    const deletedItem = req.body.checkbox;
    const listName = req.body.listName;

    // checks whether we are deleting and item from default list or custom list
    if (listName == "Today") {

        // if it is the default list, we will pass the id of deleted item in the below method
        Item.findByIdAndRemove(deletedItem, function (err) {
            if (!err) {
                console.log("Item successfully deleted");
            }
        })
        // and redirect to the root route
        setTimeout(function () {
            res.redirect('/');
        }, 500)
    }

    // if its a custom list
    else {

        // it will return only one list
        List.findOneAndUpdate(

            // the list should have the name listName 
            { name: listName },

            // we want to pull from items array(only array in our list document) by finding it through id
            { $pull: { items: { _id: deletedItem } } },
            function (err, foundList) {
                if (!err) {
                    res.redirect('/' + listName)
                }
            }
        );
    };
});





let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log(`Server started at ${port}`);
});
