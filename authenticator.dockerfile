FROM node:alpine

WORKDIR /workspace

COPY ./authenticator /workspace

RUN apk update && \
    apk upgrade && \
    npm i && \
    npm run build
