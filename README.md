# My App ExpressJS

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f6c1038be450483f94ed950c45b0a3f3)](https://www.codacy.com/app/a.perrier89/node-api?utm_source=github.com&utm_medium=referral&utm_content=perriea/node-api&utm_campaign=badger)

## Installation

### TLS/SSL (HTTPS)

#### OpenSSL

Exécuter la commande suivante : `npm run ssl` pour générer les certificats SSL.

Les certificats seront placés dans `/Node-API/config/ssl/`.


#### Let's Encrypt

Installer Let's Encrypt via le gestionnaire de paquet `apt` en effectuant la commande : `apt-get install letsencrypt`.

Puis effectuer la commande pour générer les certificats : `letsencrypt-auto certonly --manual --email admin@example.com -d example.com`

Affecter les certificats sont déclarés dans le server comme ceci :

``` js
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/example.com/chain.pem')
};
```


### Docker

Au préalable [installer Docker](https://docs.docker.com/engine/installation/) selon votre OS. 

#### Build image

* Créer la nouvelle image en executant la commande `docker build -t <your_image_name> .`.
* Une nouvelle fois sur le terminal `docker run -p 8080:8080 -p 4433:4433 -d <your_image_name>`.


#### DockerHub

A chaque nouveau commit, une nouvelle build est réalisée sur DockerHub :
* Récupérer le container avec la commande `docker pull perriea/node-api` (`:tag` disponibles : dev, master, latest).
* Sur le terminal `docker run -p 8080:8080 -p 4433:4433 -d perriea/node-api`.


### Démarrage de l'application

#### Développement

Lancer l'application avec la commande : `nodemon server.js`

Le serveur se relancera à chaque modification du code.


#### Basic

Lancer l'application avec la commande : `npm start` ou `node server.js`


#### Production

Installer `forever` ou `pm2` pour lancer le serveur en background.

Lancer l'application avec la commande : `pm2 start cluster.js`

Un thread par coeur sera crée, exemple : 4 coeurs = 4 threads.


## Construction du projet

Ce projet a été réalisé avec les outils suivant :
* Node JS,
* Express,
* MySQL,
* Sequelize (ORM MySQL),
* Mocha (test unitaires),
* ReCluster (serveur Web clusterisé ZeroDown)
* Docker


Tout est déjà en place il n'y a pas plus qu'à utiliser :)

Bon dev !