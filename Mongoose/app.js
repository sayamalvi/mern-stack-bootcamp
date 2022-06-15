const mongoose = require('mongoose');


const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/todoDB')

const itemsSchema = {
    name: String
}

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name: "Welcome to your To Do List"
})
const item2 = new Item({
    name: "Hit the + button to delete an item"
})
const item3 = new Item({
    name: "<--Hit this to delete and item"
})
const defaulItems = [item1, item2, item3];

Item.insertMany(defaulItems,function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Successfully logged items to database")
    }
})

app.get('/', function (req, res) {
    res.render("list", { listTitle: "Today", newListItems: defaulItems });
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
