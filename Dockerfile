ARG port=4000

FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $port

CMD ["npm", "start"]