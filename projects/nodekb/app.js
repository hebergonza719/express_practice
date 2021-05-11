// NOTES - we should run nodemon so that the server refreshes everytime there is a save

const express = require('express');
const path = require('path');
// this is used to interact with mongodb and to create db models in our application
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// this makes an instance of mongoose ...
mongoose.connect('mongodb://localhost/nodekb');
// this creates a connection that can be opperated on
let db = mongoose.connection;

// Check Connection
db.once('open', () => {
  console.log('connected to mongodb');
})

// Check for db errors
db.on('error', (err) => {
  console.log(err);
});

// making an instance of express()
// expressed is used to make servers
// Init App
const app = express();

// Brins in Models
let Article = require('./models/article');

// Load View Engine
// views or templates
// __dirname === current directory
// this requires a view folder and an index.pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// this is an examplt of what happens when a user makes a request to
// the root url
// Home Route
app.get('/', (req, res) => {
  // this takes a query, but since we want all we use an empty object{}
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        // articles comes from the query
        articles: articles
      });
    }
  });
  // // changed res.send to res.render({filename})
  // // we could also send it as an object
  // res.render('index', {
  //   title: 'Articles',
  //   articles: articles
  // });
});

// Add Route
app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Add Submit POST Route
app.post('/articles/add', (req, res) => {
  let article = new Article();
  // req.body = This is what it is being sent
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// this is initializing the server, and consologging a custom message
// Start App
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});

