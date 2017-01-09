#!/bin/bash

# install composants minimum on this server
sudo apt-get update
sudo apt-get upgrade -y

sudo apt-get install git npm mysql-server openssl -y

# clone repo and prepare MySQL server
cd ~/
git clone https://github.com/perriea/Node-API.git
cp ~/Node-API/tools/cli/mysql/config.cnf ~/.mysql-config.cnf
sudo /etc/init.d/mysql restart

# Create database and user MySQL
mysql -u root "source ~/Node-API/tools/cli/mysql/init-user.sql"

npm install pm2 -g
npm install mocha -g

npm install
pm2 start cluster.js --watching