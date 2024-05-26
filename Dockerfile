FROM node:alpine

WORKDIR /usr/src/application

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

COPY ./client ./client

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3030

CMD ["npm", "start"]