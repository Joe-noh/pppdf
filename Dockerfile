FROM node:18

WORKDIR /usr/src/pppdf

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
