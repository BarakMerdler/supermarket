FROM node:8.7.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client

COPY package.json /srv/app/client
COPY package-lock.json /srv/app/client

RUN npm install

COPY . /srv/app/client

CMD ["npm", "start"]