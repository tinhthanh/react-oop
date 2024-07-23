# Fetching the latest node image on alpine linux
FROM node:18-alpine AS builder
RUN apk add --no-cache git

ARG ENV=dev
RUN echo "Environment to build is $ENV"

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build:$ENV

EXPOSE 80
EXPOSE 82

CMD [ "node", "server.cjs" ]