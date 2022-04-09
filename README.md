# JWT + API Gateway
![JWT + API Gateway](https://raw.githubusercontent.com/heishi1HUMANITY/assets/main/JWT%2BAPIGateway.drawio.png "JWT + API Gateway")

* セッション方式+トークン方式
* 認証サーバのシークレット(秘密鍵)で署名したトークンをgatewayに保持させる
* gatewayはトークンと紐付いたセッションIDを生成し、ユーザに保持させる
* gatewayではセッションIDをトークンに変換し、アプリケーションサーバへアクセスする
* アプリケーションサーバは公開鍵を使用し署名を検証する
* トークンにはユーザ情報が含まれるが、セッションには含まれない