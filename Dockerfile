FROM node:alpine

WORKDIR /usr/src/application

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

COPY ./client ./client

RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]