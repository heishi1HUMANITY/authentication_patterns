FROM node:alpine

WORKDIR /workspace

COPY ./app /workspace

RUN apk update && \
    apk upgrade && \
    npm i && \
    npm run build
