
//define ip and port to web service
//var ip_server = '127.0.0.1:8585';

var ip_server = require('system').env.PORT || 8080; // default back to 8080

//includes web server modules
var server = require('webserver').create();

//start web server
var service = server.listen(ip_server, function(request, response) {
  var links = [];
  //var casper = require('casper').create();
  
  
  var casper = require('casper').create({
    javascriptEnabled: false,
    page Settings: {
        loadImages:  false,
        loadPlugins: false
    },
    verbose: true,
    logLevel: 'debug'
});
  
  
  var content_page;
  
  var str = request.url;
  var url_to_scrap = str.split("/?url=");
  
//console
/*
casper.start(url_to_scrap[1], function() {
    //this.echo(this.getHTML());
});
*/
  casper.start(url_to_scrap[1]);

  casper.then(function() {
    // aggregate results for the 'casperjs' search
    //links = this.evaluate(getLinks); 
	content_page = this.getHTML(); 
  });

  casper.on("page.error", function(msg, trace) {
    response.write("fail");
    response.close();
});

  casper.run(function() {
    response.statusCode = 200;

    //sends results as JSON object
    response.write(content_page);
    response.close();
    this.exit();
  });
});
//console.log('Server running at http://' + ip_server+'/');
