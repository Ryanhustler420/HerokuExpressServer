const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(favicon(path.join(__dirname, 'images', 'database.png')));
app.use(express.static('images'));
app.use(express.static('styles'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.post(`/post`, (req, res) => {
  res.send({
    message: "You send these data's",
    body: req.body,
  });
});

app.get(`/`, (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`server is running at PORT: ${port}`);
});
