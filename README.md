# JWT + API Gateway
![JWT + API Gateway](https://user-images.githubusercontent.com/52996208/160060840-e6d9a189-2490-4ff8-982c-1d231ce123bc.png "JWT + API Gateway")

* セッション方式+トークン方式
* 認証サーバのシークレット(秘密鍵)で署名したトークンをgatewayに保持させる
* gatewayはトークンと紐付いたセッションIDを生成し、ユーザに保持させる
* gatewayではセッションIDをトークンに変換し、アプリケーションサーバへアクセスする
* アプリケーションサーバは公開鍵を使用し署名を検証する
* トークンにはユーザ情報が含まれるが、セッションには含まれない