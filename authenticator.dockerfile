FROM node:alpine

WORKDIR /workspace

ENV REDIS_PORT 6379
ENV SESSION_SECRET "sercret"

COPY ./authenticator /workspace

RUN apk update && \
    apk upgrade && \
    npm i && \
    npm run build
