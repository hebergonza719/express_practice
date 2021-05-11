let mongoose = require('mongoose');

// Article Schema
let articleschema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

// provide name of the model (**beginning of this command) and the schema
let Article = module.exports = mongoose.model('Article', articleschema)