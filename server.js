//Express imports
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors({ origin: true }));

//MongoDB imports
const mongoose = require('mongoose');
const db = mongoose.connection;
const url =
  'mongodb+srv://root:HackHealth2019@cluster0-08anz.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true });

// Creating schemas
const mySchema = new mongoose.Schema({
  text: String,
  time: Date,
  trigger: String,
  tags: Array,
  counter: Number,
  comments: Array,
});
const PostSchema = mongoose.model('PostSchema', mySchema);

// Error handling
db.on('error', console.error);

// Function on db open
db.once('open', function () {
  console.log("Connected to DB");
});

// Process is a global object referring to the system process running
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('DB connection closed by Node process ending');
    process.exit(0);
  });
});

// Express REST endpoints
app.get('/api/getPosts', (req, res) => {
  PostSchema.find({}, function (err, posts) {
    posts = posts.filter(post => post && post.text !== "" && post.time)

    res.json({
      posts: posts.reverse(),
    });
  });
});

app.get('/api/getPost/:postId', (req, res) => {
  PostSchema.findById(req.params.postId, function (err, post) {
    if (!err) {
      res.json({
        post,
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

app.post('/api/submitPost', (request, response) => {
  PostSchema.create({
    ...request.body.postContent,
  }, (err, doc) => {
    if (!err) {
      response.status(200).json({ success: true });
    } else {
      response.status(400).json({ success: false });
    }
  });
});

app.post('/api/votePost', (req, response) => {
  PostSchema.findOneAndUpdate({ _id: req.body.postId }, { $inc: { counter: 1 } }, { new: true }, (err, doc) => {
    if (!err) {
      response.status(200).json({ success: true, post: doc });
    } else {
      response.status(400).json({ success: false, post: doc });
    }
  });
});

app.post('/api/commentPost', (req, response) => {
  PostSchema.findOneAndUpdate({ _id: req.body.postId }, { $push: { comments: req.body.comment } }, { new: true }, (err, doc) => {
    if (!err) {
      response.status(200).json({ success: true, post: doc });
    } else {
      response.status(400).json({ success: false, post: doc });
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/404.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);
