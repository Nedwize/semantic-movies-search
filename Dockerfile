# Specify the platform to not get chromadb-default-embed import err
FROM node:18-buster 

WORKDIR /usr/src/app

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

COPY ./client ./client

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3030

CMD ["npm", "start"]