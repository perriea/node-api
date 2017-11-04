FROM node:8.6.0-alpine

LABEL Aurelien PERRIER <a.perrier89@gmail.com>

# Install dependencies
RUN apk add --no-cache --update openssl

# Move workdir
WORKDIR /srv/app

# Bundle app source
COPY . /srv/app

# Install packages
RUN npm install

# Install SSL
RUN npm run ssl

# Generate doc
RUN npm run doc:generate

EXPOSE 8080 4433

ENTRYPOINT ["npm", "start"]