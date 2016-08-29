var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.text({ type: 'text/xml' }));

app.post("/postIt", function(request, response) {
  var keyItems = [];
  var things = request.body.split("<thing>");
  var i = 0;
  for (var thing in things){
    var checks = [
      {"start" : "<one>", "end" : "</one>"},
      {"start" : "<two>", "end" : "</two>"},
      {"start" : "<three>", "end" : "</three>"}
    ];
    var y = 0;
    for (var start in checks){
      var before = things[i].split(checks[y].start)[1];
      if (before !== undefined){
        // console.log(checks[y].start + ":" + before.split(checks[y].end)[0]);
        
        keyItems.push(before.split(checks[y].end)[0]);
      }
      y++;
    }
    i++;
    if (keyItems[0] !== undefined){
      buildXML(keyItems);
    }
  }
  console.log(keyItems);
  // buildXML(keyItems);
  response.end("200");
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function buildXML(keys){
  var xml = "<?xml version='1.0'?>\n  <Lorem>\n    <ipsum>dolor sit amet</ipsum>\n    <consectetur>adipiscing elit</consectetur>\n    <adipiscing>" + keys[0] + "</adipiscing>\n    <ullamco>" + keys[1] + "</ullamco>\n    <sed>\n      <do>eiusmod tempor incididunt ut labore et dolore magna aliqua</do>\n      <officia>" + keys[2] + "</officia>\n      <Ut>enim ad minim veniam</Ut>\n      <quis>nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</quis>\n    </sed>\n    <Duis>\n      <aute>\n        <in>reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</in>\n        <Excepteur>sint occaecat cupidatat non</Excepteur>\n      </aute>\n      <dolor>\n        <irure>sunt in culpa qui officia deserunt</irure>\n        <proident>mollit anim id est laborum</proident>\n      </dolor>\n    </Duis>\n  </Lorem>";
  console.log(xml);
}