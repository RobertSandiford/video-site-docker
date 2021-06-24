ARG port=4000

FROM node:14

# set an env var for code to switch between docker mode and local dev mode
ENV environment docker

# make node-app folder
WORKDIR /usr/src/video-site/node-app

# copy package files and install deps
COPY package*.json ./
RUN npm install

# copy node-app files
COPY dist dist
COPY .env .env
RUN mkdir uploadsTemp

# copy project .env file (from ..)
WORKDIR /usr/src/video-site
COPY ../.env ./.env

# return to node-app folder
WORKDIR /usr/src/video-site/node-app

# export the node-app port
EXPOSE $port

# start!
CMD ["npm", "start"]