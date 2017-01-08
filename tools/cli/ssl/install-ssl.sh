#!/bin/bash

cd ../../../config/ssl
openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.crt -days 365
openssl rsa -in server.key -out newserver.key && mv newserver.key server.key
