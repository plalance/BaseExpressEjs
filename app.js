var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.render('homepage.ejs', {});
});

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('compteur.ejs', {compteur: req.params.nombre, noms: noms});
});

// Exemple route dynamique
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});

// 404 par défaut
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);