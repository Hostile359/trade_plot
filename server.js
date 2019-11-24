var data;
var stat;

if (process.argv.length == 6 && process.argv[2] == "--data-path" && process.argv[4] == "--stat-path") {
	data = process.argv[3]
	stat = process.argv[5]
}else if (process.argv.length == 6 && process.argv[4] == "--data-path" && process.argv[2] == "--stat-path"){
	data = process.argv[5]
	stat = process.argv[3]	
}else {
    console.log("Usage: node your_prog.js --data-path path_to-data --stat-path path_to-stat");
    process.exit(-1);
}
 
console.log('Data: ' + data);
console.log('Stat: ' + stat);

var http = require("http");
var fs = require("fs");

http.createServer(function (request, response) {
    console.log("Request: " + request.url);
    var filePath = request.url.substr(1);
    if(filePath === "")
        filePath = "index.html";
    //console.log(filePath);
    if(request.url === "/stat") {
		console.log('Stat to send: ' + stat);
		response.end(stat);
		return;
	}else if(request.url === "/data") {
		console.log('Data to send: ' + data);
		response.end(data);
		return;
	}
	console.log("Send: " + filePath);
    fs.readFile(filePath, function (error, data) {
        response.end(data);
    });
    return;
}).listen(3000, function () {
    console.log("hello");
});
