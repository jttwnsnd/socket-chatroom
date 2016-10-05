<h1>Chatroom</h1>

<h2>Getting Started</h2>
<p>In your Terminal/Powerahell run this inside the folder, make sure you have Node/npm installed. Then run
<code>$ npm install<code>
to get your directory. Once done, initalize Node. <code>$ node server.js</code> and you should be listening on port 8080</p>

<h2>At 10,000ft</h2>
<p>A desktop, web chatroom that utilizes Socket.io and Node.js, where users can log in with a username, see other posts, and even share a drawing canvas that shares with each other.</p>

<h2>Technologies Used</h2>
<ul>
	<li>HTML</li>
	<li>CSS</li>
	<li>Node.js</li>
	<li>Socket.io</li>
</ul>

<h2>Challenges & Solutions</h2>
<h4>TL:DR</h4>
<h5>Socket methods and functions in index.html and server.js are what allowed users to chat back and forth and have accurate data based on the username of that user.</h5>
<p>Having messages be sent back and forth between users was a challenge that made this project be an actual chatroom. Doing so required us to have functions both in our index.html and our server.js for the interactions. With index.html, a function was intiated when the user submits the chat message. This then sends <code>socketio.emit('message_to_server', {message: message, name: name, date: date});</code> to server.js, which has a listener <code>socket.on('message_to_server', function(data){io.sockets.emit('message_to_client', {message: data.message, name: data.name, date: data.date})})</code> for the same message. This then sends back to index the message to all users connected. Another listener in index.html, <code>socketio.on('message_to_client', function(data){}</code> which then constructs the html for the post thourhg targets the chat's id <code>document.getElementById('chats').innerHTML</code>. It runs a test to see if the message is from the original sender, or someone else; and attaches the appropriate classes accordingly.</p>