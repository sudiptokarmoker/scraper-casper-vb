/*var casper = require('casper').create();

casper.start('http://theultralinx.com/2012/10/random-inspiration-51-architecture-cars-girls-style-gear/', function() {
    this.echo(this.getHTML());
});

casper.run();*/
var port = 8080;

var casper = require("casper").create({
  onRunComplete: function() {
    // Don't exit on complete.
  }
});
casper.start("http://theultralinx.com/2012/10/random-inspiration-51-architecture-cars-girls-style-gear/");
casper.run(function() {
  //console.log("finished");
});

var pictureNum = 0;
require("webserver").create().listen(port, function(request, response) {
  var src = "my_picture_" + (pictureNum++) + ".png";
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(this.getHTML());
  response.close();

  casper.run();
});
//console.log("listening on port", port);
