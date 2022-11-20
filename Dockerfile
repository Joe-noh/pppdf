FROM node:18 AS base

WORKDIR /usr/src/pppdf

RUN apt-get update && apt-get install -y dumb-init \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN wget -q 'https://fonts.google.com/download?family=Noto+Serif+JP' -O noto.zip \
  && unzip noto.zip -d /usr/local/share/fonts/ \
  && rm -f noto.zip \
  && fc-cache -f -v

RUN wget -q 'https://fonts.google.com/download?family=Roboto' -O roboto.zip \
  && unzip roboto.zip -d /usr/local/share/fonts/ \
  && rm -f roboto.zip \
  && fc-cache -f -v

FROM base AS build

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

FROM base AS production

ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0

COPY package*.json .
RUN npm ci --production

COPY --from=build /usr/src/pppdf/build .

EXPOSE $PORT

CMD ["dumb-init", "npm", "run", "start"]
