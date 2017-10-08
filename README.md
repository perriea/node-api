# My App ExpressJS [![Build Status](https://travis-ci.org/perriea/node-api.svg?branch=master)](https://travis-ci.org/perriea/node-api) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/f6c1038be450483f94ed950c45b0a3f3)](https://www.codacy.com/app/a.perrier89/node-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=perriea/node-api&amp;utm_campaign=Badge_Grade)

## Installation

### TLS/SSL (HTTPS)

#### OpenSSL

Run the command in your Terminal `npm run ssl` to generate SSL certificates.   
The certificates shall be placed in `/Node-API/app/config/ssl/`.

#### Let's Encrypt

Install Let's Encrypt via the `apt` package manager by issuing the command: `apt-get install letsencrypt`.   
Then, make the command to generate the certificates : `letsencrypt-auto certonly --manual --email admin@example.com -d example.com`

Assign certificates are declared in file`server.js` like this :

``` js
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/example.com/chain.pem')
};
```

### Sequelize CLI

#### Documentation

You can consult the Sequelize CLI documentation : [http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-cli](http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-cli)   
Repository : [https://github.com/sequelize/cli](https://github.com/sequelize/cli)


### Docker

First [install Docker](https://docs.docker.com/engine/installation/).

#### Build image

* Create the new image by executing the command `docker build -t <your_image_name> .`,
* Once again on the console `docker run -p 8080:8080 -p 4433:4433 -d <your_image_name>`.

#### DockerHub

A new image is created on the Docker Hub with each new commit:
* Download the remote image with the command `docker pull perriea/node-api`,
* On the console `docker run -p 8080:8080 -p 4433:4433 -d perriea/node-api`.


### Starting the application

#### Development

Launch the application with the command : `nodemon server.js`   
The server will restart each time the code is changed.

#### Basic

Launch the application with the command: `npm start` or ` node server.js`

#### Production

Install `forever` or `pm2` to start the server in background.   
Launch the application with the command: `pm2 start cluster.js`   
One thread per core will be created, example: 4 cores = 4 threads.

### Customize

Changing the value of the following environment variables :
- **NODE_ENV** (default: `development`),
- **APP_REDIS_HOST** (default: `127.0.0.1`),
- **APP_REDIS_PORT** (default: `6379`),
- **APP_HTTP_PORT** (default: `8080`),
- **APP_HTTPS_PORT** (default: `4433`),
- **APP_PATH_LOG** (default: `logs`),
- **APP_SESSION_SECRET** (default: `RANDOM`).

## Constitution

This project was realized with the following tools :
* NodeJS,
* Express,
* Sequelize (ORM & CLI),
* Request, Mocha (unit tests),
* ReCluster (Clustered Web server)
* Docker

Everything is already in place there is no more than to use :)

## License

**The MIT License (MIT)**   
Copyright (c) 2016-2017 Aurelien PERRIER