var net = require("net");
var port = 3000;
var fs = require("fs");
var users = [];
var server = net.createServer()
server.on("connection", function(connection){
	console.log("we have a new connection!");
	users.push(connection);
	connection.on("data", function(clientData){
		var stringIt = clientData.toString().trim();
		console.log(clientData.toString());
		var read = fs.readFileSync("chat.json", "utf8");
        var parsed = JSON.parse(read);
		for(var i=0; i<users.length; i++){
			users[i].write(stringIt);
		    var messageObject = { 
		        user : i ,
		        message : stringIt
	        }

		} 
			parsed.push(messageObject);
	        var stringifyIt = JSON.stringify(parsed);
	        console.log(stringifyIt);
	        fs.writeFileSync("chat.json", stringifyIt);
	})

})

//









server.listen(port, function(){
	console.log("this works");
})