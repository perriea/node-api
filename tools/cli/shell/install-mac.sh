#!/bin/bash

# install composants minimum on this server
brew update
brew upgrade

brew install git npm mysql-server openssl

# clone repo and prepare MySQL server
cd ~/
git clone https://github.com/perriea/Node-API.git
cp ~/Node-API/tools/cli/mysql/config.cnf ~/.mysql-config.cnf
/etc/init.d/mysql restart

# Create database and user MySQL
mysql -u root "source ~/Node-API/tools/cli/mysql/init-user.sql"

npm install forever -g
npm install mocha -g

npm install
pm2 start cluster.js --watching