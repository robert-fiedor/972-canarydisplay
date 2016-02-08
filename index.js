var express = require('express');
var app = express();
var bodyParser  = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongojs = require('mongojs');

var db_canary = mongojs.connect('mongodb://' +
                                process.env.DB_LOGIN +
                                ':' +
                                process.env.DB_PASS +
                                '@ds059185.mongolab.com:59185/canaries', ['kanarki']);

var db_sanitychecks = mongojs.connect('mongodb://' +
    process.env.DB_LOGIN +
    ':' +
    process.env.DB_PASS +
    '@ds059185.mongolab.com:59185/canaries', ['sanitychecks']);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/sanitychecks', function(req, res) {
    db_sanitychecks.sanitychecks.insert(req.body);
    res.json({msg: "sanitychecks Updated"});
});

app.get('/sanitychecks', function(req, res) {
    db_sanitychecks.sanitychecks.find({}).limit(1).sort({$natural:-1},function (err, docs) {
        res.json(docs);
    });
});









//["sksk2"]


//app.post('/canary', function(req, res) {
//
//    console.log('sanity', req.body)
//
//    db_sanitychecks.sanitychecks.insert(req.body);
//    res.json({msg: "Customer Cart Updated"});
//});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

