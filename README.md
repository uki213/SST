# まだ途中なので使ってはいけない！
# HTML Template (ejs + less)

## はじめに

ejsとless・scssを組み合わせた静的サイト作成用テンプレートです。  
srcディレクトリ内のファイルをgulpを用いて変換し、buildフォルダへ出力します。  
node.jsのバージョンは4系列最新版を利用してください。  

## 使用方法

node.jsをインストールします。  
node.jsのバージョンは4.xを推奨します（2016/03現在）

package.jsonのnpmモジュールをローカルフォルダへインストールします。

  > npm install

npm startを実行するとファイルがビルドされ、そのまま監視モードになります。

  > npm start

## 動作内容

srcからbuildフォルダへは*.ejsと*.less以外のファイルがコピーされます。  
srcフォルダ内でのパスの位置関係を保持したまま、distフォルダにファイルが置かれます。

通常起動時の監視モードではローカルサーバが起動し、localhost:8080でdistフォルダにアクセスできます。  
また、初回起動時にはブラウザを開きます。

## 自動デプロイ

gitlab上で管理されている場合に関してはgitlab ciを使用し、自動的にでプロされたファイルがサーバ上にストックされる。  
https://gitlab.com/Novita/StaticSiteGenerator/pipelines?scope=branches  
アドレスはプロジェクト毎に代わるので上記はあくまで参考。  
正しいURLはgitlab上のプロジェクトから遷移すること。

## npm-scripts

npm-scriptsの中で主要な機能は下記になります。

### npm run ejs

ejsのみ変換を行います。  
_（アンダーバー）が頭に付くファイルはdistフォルダには移りません。  
テンプレートやモジュールファイルとして使用できます。

  > npm run ejs

### npm run less

lessのみ変換を行います。  
_（アンダーバー）が頭に付くファイルはdistフォルダには移りません。  
変換後のファイルはminify化されます。  
デバッグ用にSOURCEMAPが出力されます。

  > npm run less

### npm run scss(sass)

scssのみ変換を行います。  
_（アンダーバー）が頭に付くファイルはdistフォルダには移りません。  
変換後のファイルはminify化されます。  
デバッグ用にSOURCEMAPが出力されます。

  > npm run scss

### npm run build

gulp ejs、gulp less、gulp scss、gulp copyを行い、完成状態のファイルをbuildに生成します。  
納品時用オプションの為、SOURCEMAPは出力されません。

  > npm run build

### npm run lint

eslintでsrc内のjavascriptをチェックします。  
ルールはsemistandardを使用

  > npm run lint

