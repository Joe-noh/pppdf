FROM node:18 AS base

WORKDIR /usr/src/pppdf

RUN apt-get update && apt-get install -y dumb-init \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN wget -q https://noto-website-2.storage.googleapis.com/pkgs/NotoSerifCJKjp-hinted.zip \
  && unzip NotoSerifCJKjp-hinted.zip -d /usr/local/share/fonts/ \
  && rm NotoSerifCJKjp-hinted.zip \
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
