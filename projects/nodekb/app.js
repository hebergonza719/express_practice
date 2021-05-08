// NOTES - we should run nodemon so that the server refreshes everytime there is a save

const express = require('express');
const path = require('path');

// making an instance of express()
// expressed is used to make servers
// Init App
const app = express()

// Load View Engine
// views or templates
// __dirname === current directory
// this requires a view folder and an index.pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// this is an examplt of what happens when a user makes a request to
// the root url
// Home Route
app.get('/', (req, res) => {
  let articles = [
    {
      id: 1,
      title: 'Article One',
      author: "Me",
      body: 'This is article one'
    },
    {
      id: 2,
      title: 'Article Two',
      author: "You",
      body: 'This is article two'
    },
    {
      id: 3,
      title: 'Article Three',
      author: "Me",
      body: 'This is article three'
    }
  ];
  // changed res.send to res.render({filename})
  // we could also send it as an object
  res.render('index', {
    title: 'Articles',
    articles: articles
  });
});

// Add Route
app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article'
  });
});

// this is initializing the server, and consologging a custom message
// Start App
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});

