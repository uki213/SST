# HTML Template (ejs + less + scss)

## はじめに

ejsとless・scssを組み合わせた静的サイト作成用テンプレートです。  
srcディレクトリ内のファイルをbulboを用いて変換し、buildフォルダへ出力します。  
node.jsのバージョンは4以上を使用してください（6系を推奨）。  

## 使用方法

node.jsをインストールします。  
node.jsのバージョンは4.xを推奨します（2016/03現在）

package.jsonのnpmモジュールをローカルフォルダへインストールします。

  > npm install

npm startを実行するとファイルがビルドされ、そのまま監視モードになります。

  > npm start

## 動作内容

srcからbuildフォルダへは*.ejsと*.less、*.scss以外のファイルがコピーされます。  
通常起動時の監視モードではローカルサーバが起動し、localhost:7100でアクセスできます。  

## npm-scripts

npm-scriptsの中で主要な機能は下記になります。

### npm run build

完成状態のファイルをbuildに生成します。  

  > npm run build

### npm run lint

eslintでsrc内のjavascriptをチェックします。  
ルールはAirBnbを使用

  > npm run lint

