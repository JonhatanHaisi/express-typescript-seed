FROM node:8.15.0-jessie-slim

WORKDIR /app

RUN npm i -g sequelize-cli
COPY ./release/dist.tar.gz /app
RUN tar -xzf dist.tar.gz 
RUN npm i --only=prod
