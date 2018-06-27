# Informations

Petit projet pour mon apprentissage du développement d'application avec Node.js

## Modules

- Framework Express pour simplifier la gestion HTTP / Routes / Requests (doc: http://expressjs.com/en/api.html)
- Moteur de template EJS (Embedded JavaScript) (doc: http://ejs.co/#install)
- Implémentation de socket.io pour échanges temps réel client / serveur (app_socket.js)

## Installation

		- cloner le projet
		- npm install (pour installer les dépendances via NPM)
		- node app.js (pour : todolist GET / POST / Session + boucles et bases)
		- node app_socket.js (pour base avec socket.io / échanges clients serveur et events)

### Pages

		- Homepage
		- Page EJS avec récupération de paramètre GET (chambre)
		- Page EJS avec boucle + passage de tableau de params à la vue

Sur la homepage, un lien dirige vers chaque page avec une petite description de ce qui se passe (paramètre GET, boucle, passage d'infos à la vue...)