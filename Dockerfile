FROM node:8.6.0-alpine

COPY server /server

WORKDIR /server

RUN npm i --production

CMD node /server/app.js
