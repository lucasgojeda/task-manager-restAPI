FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i -g nodemon

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
