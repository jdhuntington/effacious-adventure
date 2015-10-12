var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var redis = require("redis");
var client = redis.createClient();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// handle post
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    client.lrange('main', 0, 10, function(err, result) {
        res.render('index', { items: result });
    });
});

app.post('/value', function(req, res) {
    client.lpush('main', req.body.data);
    console.log(req.body);
    res.redirect('/');
});

var server = app.listen(7777, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
