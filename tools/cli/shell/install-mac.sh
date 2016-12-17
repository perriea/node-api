#!/bin/bash

# on installe les composant min sur le serveur
brew update
brew install git
brew install npm
brew install mysql-server
brew install openssl

# on clone notre depot et on prepare MySQL
cd ~/
git clone https://github.com/perriea/Node-API.git
cp ~/Node-API/tools/cli/mysql/config.cnf ~/.mysql-config.cnf
/etc/init.d/mysql restart

# on crée la base de donnée avec son utilisateur
mysql -u root "source ~/Node-API/tools/cli/mysql/init-user.sql"

npm install forever -g
npm install mocha -g

npm install
npm start
