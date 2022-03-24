#!/bin/sh
mkdir -p ./authenticator/key
mkdir -p ./app/key
echo "generate ECDSA using P-256 secret"
openssl ecparam -name prime256v1 -genkey -noout -out ./authenticator/key/secret.pem
echo "generate ECDSA using P-256 public"
openssl ec -in ./authenticator/key/secret.pem -pubout -out ./app/key/public.pem