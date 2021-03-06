var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    //client.query('SELECT * FROM test_table', function(err, result) {
    client.query('SELECT * FROM pg_catalog.pg_tables', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
