var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path        = require('path');
var route = express.Router();
var app = express();
var member_route = require('./app/routes/routes')
mongoose.connect('mongodb://192.168.0.105:27018/test', {  useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/members',member_route);

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    next();
});
app.listen('9400',function () {
    console.log("listeng port at 9400");
});
