const express = require("express");
const compression = require('compression');
const cors = require('cors');

const app = express();
const port = 80;
const appFolder = 'dist';

app.use(cors());
app.use(compression());
app.use(express.static(appFolder));

app.get('*', function (request, response, next) {
    response.sendfile(__dirname + '/' + appFolder + '/index.html');
});

app.listen(port, () => {
    console.log('App listening on port' + port);
});