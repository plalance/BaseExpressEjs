var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

// Chargement de la page index.html
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index_socket.html');
});

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
        socket.pseudo = ent.encode(pseudo);
        socket.emit('new_user', pseudo);
        socket.broadcast.emit('new_user', pseudo);
    });

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('send_message', function(message) {
        var mess = {
            content: ent.encode(message),
            author: socket.pseudo
        };
        socket.broadcast.emit('new_message', mess);
    });
});

server.listen(8080);