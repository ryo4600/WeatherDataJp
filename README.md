# WeatherDataJp

# サーバー側環境設定
利用するためには以下の環境変数が必要です。


## 開発環境 
build memo  
frontend config.jsonのSERVER_URLを空にしてnpm run buildを実行する

$ heroku config:add TZ=Asia/Tokyo

$ heroku run bash
Running bash on ⬢ my-heroku-app... up, run.1234 (Free)
~ $ date
Mon Nov 21 11:35:48 JST 2016