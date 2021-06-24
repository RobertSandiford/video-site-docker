ARG port=4000

FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY dist dist
COPY .env .env
RUN mkdir uploadsTemp

EXPOSE $port

CMD ["npm", "start"]