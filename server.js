var express = require('express');
var app = express();
var xml2js = require('xml2js');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.text({ type: 'text/xml' }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/postIt", function(request, response) {
  // console.log(request.body);
  // console.log(request.body.split("<thing>"));
  
  var things = request.body.split("<thing>");
  var i = 0;
  for (var thing in things){
    // console.log(things[i]);
    // console.log(things[i].split("<one>"));
    // var first = things[i].split("<one>")[0];
    
    var checks = [
      {"start" : "<one>", "end" : "</one>"},
      {"start" : "<two>", "end" : "</two>"},
      {"start" : "<three>", "end" : "</three>"}
    ];
    
    var y = 0;
    for (var start in checks){
      // console.log(checks[y]);
      var before = things[i].split(checks[y].start)[1];
      // console.log("This is First:" + first);
      if (before !== undefined){
        // console.log("This is Second:" + second);
        console.log(checks[y].start + ":" + before.split(checks[y].end)[0]);// after?
      }
      y++;
    }
    
    
    i++;
  }

  response.end("200");
})

app.get("/buildIt", function (request, response) {
  var http = require('http');
  var req = http.request("http://www.sltrib.com/rss/feed/", function (res) {
      var data = '';
      res.on('data', function (chunk) {
        console.log(data);
        data += chunk;
      });
      res.on('end', function () {
        console.log(data);
        response.end(data);
      });
  });
  req.on('error', function (e) {
    console.log(e.message);
  });
  req.end();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});