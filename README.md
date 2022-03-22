# Single Sign On(SSO)
![SSO](https://user-images.githubusercontent.com/52996208/159438480-3b371dc7-23c0-4616-bf2c-e0ec433e808c.png "SSO")

* セッションストア
* authenticatorのみでセッションを管理
* appはセッションIDをauthenticatorに対して問い合わせ、ユーザIDを取得する
* セッションIDにはユーザ情報を含まない