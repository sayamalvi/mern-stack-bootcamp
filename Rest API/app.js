const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


mongoose.connect('mongodb://127.0.0.1/wikiDB')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("Error"));

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})
const Article = mongoose.model("Article", articleSchema);

// Request targeting all articles 

app.route('/articles')
    .get(function (req, res) {
        Article.find({}, function (err, foundArticles) {
            if (!err) {
                res.send(foundArticles)
            }
            else {
                res.send(err)
            }
        })
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added new articles");
            }
            else {
                res.send(err)
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.send("Successfully deleted all articles");
            }
            else {
                res.send(err)
            }
        })
    })


// Request targeting a specific article

app.route("/articles/:articleTitle")

    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            }
            else {
                res.send("No articles found related to your search")
            }
        })
    })
    .put(function (req, res) {
        Article.replaceOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            function (err) {
                if (!err) {
                    res.send("Successfully updated article")
                }
            }
        );
    })
    .patch(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
            function (err) {
                if (!err) {
                    res.send("Successfully updated articles");
                }
                else {
                    res.send(err);
                }
            }
        )
    })
    .delete(function (req, res) {
        Article.deleteOne({ title: req.params.articleTitle }, function (err) {
            if (!err) {
                res.send("Successfully deleted")
            }
            else {
                res.send(err)
            }
        })
    })



































app.listen(3000, function () {
    console.log("Listening on port 3000")
})