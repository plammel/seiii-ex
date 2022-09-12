const express = require('express');
const routesClients = require('./routes/client')
const routesMembers = require('./routes/member')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/clients', routesClients);
app.use('/members', routesMembers);
app.get('/status', (req, res) => res.json({status: 'OK'}));

// handle error
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
}

app.use(errorHandler);

module.exports = app;