FROM node:alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json /app/
COPY package-lock.json ./

RUN npm install

COPY . /app

EXPOSE 9000

CMD ["npm","run", "start:dev"]
