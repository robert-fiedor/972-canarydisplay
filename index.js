var express = require('express');
var app = express();

var mongojs = require('mongojs');

var db = mongojs.connect('mongodb://canary:canary1@ds059185.mongolab.com:59185/canaries', ['kanarki'])

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {

  db.kanarki.insert({yo:1})
  //mongodb://canary:canary1@ds059185.mongolab.com:59185/canaries

  response.render('pages/index',{
    tutu:process.env.ROB_PASS
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

console.log('rob');
