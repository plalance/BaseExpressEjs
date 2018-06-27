var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres

var app = express();

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}));

// Parseur d'url 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  		extended: true
  	})
);

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
app.use(function(req, res, next){
    if (typeof(req.session.todos) == 'undefined') {
        req.session.todos = [];
    }
    next();
});

// Générateur d'ids
var todoIdInrement = 0;

app.get('/', function(req, res) {
    res.render('homepage.ejs', {todos: req.session.todos});
});

// Méthodfe post d'ajout de todo
app.post('/add_todo', function(req, res) {

	var newTodo = {
		id: todoIdInrement,
		name: req.body.todoName 
	};

	todoIdInrement++;
	
	console.log("Ajoute la todo :");
	console.log(newTodo);
	
	req.session.todos.push(newTodo);
	console.log(req.session.todos);

	// redirection homepage
	res.redirect('/');
});

app.get('/remove_todo/:todo_id', function(req, res) {
	console.log('Suprresion de la todo d\'id : ' + req.params.todo_id);
	console.log('les todos\n');
	console.log(req.session.todos);

	 for (var i = 0; i < req.session.todos.length; i++) {
        if (req.session.todos[i].id == req.params.todo_id) {
        	console.log('La todo : ');
        	console.log(req.session.todos[i]);
        	console.log('à été supprimée');
        	req.session.todos.splice(i, 1);
        }
    }

    console.log('Les todos\n');
	console.log(req.session.todos);
    
   // redirection homepage
	res.redirect('/');

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