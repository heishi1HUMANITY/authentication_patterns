FROM node:alpine

WORKDIR /workspace

COPY ./gateway /workspace

RUN apk update && \
    apk upgrade && \
    npm i && \
    npm run build
