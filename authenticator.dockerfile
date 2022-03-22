FROM node:alpine

WORKDIR /workspace

ENV SESSION_SECRET "sercret"

COPY ./authenticator /workspace

RUN apk update && \
    apk upgrade && \
    npm i && \
    npm run build
