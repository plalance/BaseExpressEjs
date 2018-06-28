var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index_socket.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');

    // On appelle l'evenement client "message"
    socket.emit('message', { content: 'Vous êtes bien connecté !', importance: '1' });
    // On notrifie TOUS LES CLIENTS avec le broadcast
    socket.broadcast.emit('message', { content: 'Un autre user est arrivé', importance: '2' });

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
        socket.emit('message', { content: 'Serveur : Bien reçu la notif :)', importance: '1' });
    });

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('petit_nouveau', function(pseudo) {
        socket.pseudo = pseudo;
        socket.emit('new_user', pseudo);
        socket.broadcast.emit('new_user', pseudo);
    });

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('send_message', function(message) {
        var mess = {
            content: message,
            author: socket.pseudo
        };
        socket.broadcast.emit('new_message', mess);
    });
});

server.listen(8080);