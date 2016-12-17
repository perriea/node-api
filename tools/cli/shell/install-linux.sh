#!/bin/bash

# on installe les composant min sur le serveur
sudo apt-get update
apt-get install git
apt-get install npm
apt-get install mysql-server
apt-get install openssl

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
