FROM node:8.1.2-alpine
MAINTAINER Aurelien PERRIER <a.perrier89@gmail.com>

RUN apk add --no-cache --update openssl

# Create app directory
RUN mkdir -p /srv/app
WORKDIR /srv/app

# Bundle app source
COPY . /srv/app

# Install packages
RUN npm install

# Install SSL
RUN sh "$(pwd)/tools/ssl/install.sh"

EXPOSE 8080 4433
CMD ["npm", "start"]