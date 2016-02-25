const express = require('express');
const cors = require('cors');
var app = express();
var router = express.Router();
app.use(cors());

const port = process.env.PORT || 5000;

var articles = {
    articles: [{
        "name": "Nextbit Robin review: a smartphone in the clouds",
        "author": "Dan Seifert",
        "timestamp": "2012-04-23T18:25:43.511Z",
        "article": "this is the first article content"
    }, {
        "name": "Japanese arcades aren't dead, and here's why",
        "author": "Sam Byford",
        "timestamp": "2012-04-23T18:25:43.511Z",
        "article": "this is the second article content"
    }, {
        "name": "First Click: What will HTC look like in two years?",
        "author": "Thomas Ricker",
        "timestamp": "2012-04-23T18:25:43.511Z",
        "article": "this is the third article content"
    }]
}

var quotes = {
    quotes: [{
        "quote": "Design is not just what it looks like and feels like. Design is how it works.",
        "author": "Steve Jobs",
        "timestamp": "2012-04-23T18:25:43.511Z"
    }, {
        "quote": "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
        "author": "Alan Turing",
        "timestamp": "2012-04-23T18:25:43.511Z"
    }, {
        "quote": "My greatest pain in life is that I will never be able to see myself perform live.",
        "author": "Kanye West",
        "timestamp": "2012-04-23T18:25:43.511Z"
    }, {
        "quote": "If we don’t make mistakes daily, we aren’t pushing the boundary and challenging the system enough.",
        "author": "Antonio J. Lucio",
        "timestamp": "2012-04-23T18:25:43.511Z"
    }]
}




router.get('/', function(req, res) {
    res.json({
        status: 'Argh.. m80! Welcome to the Keep Appy API!'
    });
});

router.get('/quotes', function(req, res) {
    res.json(quotes);
});

router.get('/articles', function(req, res) {
    res.json(articles);
});

app.use('/api/v1', router);

app.listen(port);
console.log('App Running @ ~> ' + port);
