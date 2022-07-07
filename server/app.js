const winston = require('winston');
const { app } = require('./connections/express');
const { SERVER_PORT } = require('./models/_Constants');
const socket = require('../server/connections/sockets');

require('../uploads_directory')();

require('./startup/environment')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/mkdir')();
require('./startup/routes')(app);
require('./connections/database');

app.post(`/post`, (req, res) => {
  res.send({
    message: "You send these data's",
    body: req.body,
  });
});

app.get('/get', async (req, res) => {
  res.send({message: 'working'});
});

app.get(`/`, (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || SERVER_PORT;
const server = app.listen(PORT, () => {
    winston.info(`Server is up and running at port: ${PORT}`);
});
socket({ server, app });

module.exports = app;