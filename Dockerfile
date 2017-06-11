FROM node:8.1.0-alpine

RUN apk add --no-cache --update py-pip python openssl

# Create app directory
RUN mkdir -p /srv/app
WORKDIR /srv/app

# Bundle app source
COPY . /srv/app

# Install packages
RUN npm install

# Install SSL
RUN sh $(pwd)/tools/ssl/install.sh

EXPOSE 8080 4433
CMD [ "npm", "start" ]