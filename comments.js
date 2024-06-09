// Create web server that can accept comments
// and store them in a file
// Comments should be stored in a file called comments.json
// Comments should be stored as an array of objects
// Each object should have the following keys: username, comment, timestamp
// The timestamp should be the current time when the comment was submitted
// When a GET request is made to /comments, the server should send back the contents of comments.json
// When a POST request is made to /comments, the server should add a new comment to comments.json

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const commentsPath = 'comments.json';

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments');
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.timestamp = new Date();

  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments');
    } else {
      let comments = JSON.parse(data);
      comments.push(newComment);

      fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing comments');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// To test this server, we can use a tool like Postman to make GET
