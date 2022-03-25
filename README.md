# マイクロサービスにおける認証の実装パターン

* セッション方式  
  ユーザの情報をサーバ側に保存し、クライアントにセッションID(ユーザ情報を含まない)を持たせる。
  * [分散セッション](https://github.com/heishi1HUMANITY/authentication_patterns/tree/distributed_session)
  * [SSO](https://github.com/heishi1HUMANITY/authentication_patterns/tree/sso)

* トークン方式  
  サーバのシークレットで署名したトークン(ユーザ情報を含む)をクライアントに持たせる。
  * [JWT](https://github.com/heishi1HUMANITY/authentication_patterns/tree/jwt)
  * [JWT + API Gateway](https://github.com/heishi1HUMANITY/authentication_patterns/tree/jwt%2Bapigateway)