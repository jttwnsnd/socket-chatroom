var http = require('http');
var fs = require('fs');

//server is the what happens when someone lods up the page in a browser.
//server is listening below for http traffic at port XXXX.
var server = http.createServer(function(req, res){
	fs.readFile('index.html', 'utf-8', function(error, data){
		// console.log(error);
		// console.log(data);
		if(error){
			res.writeHead(500,{'content-type': 'text/html'})
			res.end(error);
		}else{
			res.writeHead(200,{'content-type':'text/html'});
			res.end(data);
		}
	})
})

//Include the socketio module
var socketIo = require('/lib/socket.io');
//listen to the server which is listening on port XXXX
var io = socketIo.listen(server);
var socketUsers = [];
// we need to deal with a new socket connection
io.sockets.on('connect',function(socket){
	console.log(socket.id);
	socketUsers.push({
		socketID: socket.id,
		name: 'Anonymous'
	})
	io.sockets.emit('users', socketUsers);

	console.log('someone has connected via a socket!');
	socket.on('message_to_server', function(data){
		io.sockets.emit('message_to_client', {
			message: data.message,
			name: data.name,
			date: data.date
		})
	})

	//someone just changed their name
	socket.on('user_to_server', function(name){
		console.log(socket.id);
		for(var i = 0; i< socketUsers.length; i++){
			if(socketUsers[i].socketID == socket.id){
				var temp = socketUsers[i].name
				socketUsers[i].name = name;
				console.log(temp + ' has updated name to ' + socketUsers[i].name);
				break;
			}else{

			}
		}
		io.sockets.emit('users', socketUsers);
	})
	socket.on('disconnect', function(){
		console.log('a user has disconnected');
		for(var i = 0; i< socketUsers.length; i++){
			if(socketUsers[i].socketID == socket.id){
				console.log(socketUsers[i].name + ' has disconnected');
				socketUsers.splice(i, 1);
				break;
			}
		}
		io.sockets.emit('users', socketUsers);
	})
})

server.listen(8080);
console.log('listening on port 8080');