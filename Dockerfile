FROM node:boron

RUN apt-get update
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD ./package.json /usr/src/app/
RUN npm install
RUN npm install -g pm2

# Bundle app source
COPY . /usr/src/app

RUN openssl req -nodes -new -x509 -newkey rsa:4096 -keyout server.key -out server.crt -days 365 -subj "/C=FR/ST=IDF/L=Paris/O=My Inc/OU=DevOps/CN=localhost/emailAddress=example@gmail.com"
RUN mv server.key config/ssl
RUN mv server.crt config/ssl

EXPOSE 8080 4433
CMD [ "npm", "run", "cluster" ]