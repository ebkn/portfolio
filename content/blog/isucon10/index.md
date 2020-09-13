---
title: ISUCON10予選敗退した
date: "2020-09-13T17:31:00+09:00"
description: ISUCON10に初参加して、予選敗退しました。
---

こんにちは、ebikenです。

ISUCON10に初参加して、予選敗退しました。

## メンバー
同期の 143, tockn と3人で参加しました。

当日は Google Meet で音声を繋ぎながらやりました。上手くコミュニケーション取りながら進められたと思います。

## 役割
役割はこんな感じです。

#### ebiken
- 序盤の設定、デプロイ効率化、ローカル環境作り
- サーバーの構成変更
- アプリケーションのチューニング

#### 143
- アプリケーションのチューニング
- MySQLチューニング

#### tockn
- アプリケーションのチューニング

言語はGoを選びました。

## やったこと (時系列)

### 12:20~
まず全員でレギュレーションやスコア算出方法を確認しました。`POST /api/chair` や `POST /api/estate` が失敗すると致命的なエラーで失格になることを確認したり、botからのアクセスに503返して良いならNginxでやろう、みたいな話をしていました。

アプリの雰囲気を知るためにブラウザで開いたりもしました。最初からだいぶ表示早かったのとNext.jsで作られていたのには驚きました。

そのあと僕はサーバーにsshで入って、
- スペックの確認
- privateのGitHubリポジトリにpushできるように
- バックアップ
- Makefileでデプロイ、再起動ができるように
- slackcat, kataribe, pprof のインストール
- ローカル開発環境(docker-compose)の構築

とか環境周りを色々やりました。このあたりは練習したので結構スムーズでした。(用意しておいたやつは後で整理して公開するかも)

#### スペックの確認

こんな感じで確認とSlackへの投稿をしました。
```sh
make inspect
```
```Makefile
.PHONY: inspect
inspect:
  cat /etc/os-release | slackcat --tee --filename "OS"
  free -m | slackcat --tee --filename "memory"
  sudo lshw -class processor | slackcat --tee --filename "CPU"
  df | slackcat --tee --filename "disk size"
  cat /proc/sys/fs/file-max | slackcat --tee --filename "file-max"
  go version | slackcat --tee --filename "Go version"
  mysql --version | slackcat --tee --filename "MySQL version"
  ps aux | grep nginx | slackcat --tee --filename "Nginx processes"
```

#### バックアップ(Nginx,MySQLの設定、dbのdump)

万が一に備えて設定ファイル( `/etc/nginx` と `/etc/mysql` )とデータベースをバックアップしておきました。またローカルでDB触るためにdumpしたやつを `scp` で手元に持ってきました。


2人はこの時主にアプリケーションコードを読んでアプリのボトルネック(N+1とか)をScrapboxにリストアップ、NewRelicの導入とかをやってくれていました。

### 13:30~
僕はこの辺りをやっていました。
- 秘伝のタレを入れる
- NginxでBotからのリクエストに503返す
- Index貼る

#### 用意しておいた秘伝のタレ(Nginx, MySQL)を入れる

Nginx はコネクション数とかタイムアウトあたり、MySQL はクエリキャッシュとかコネクション周りの設定がいい感じになるように用意しておきました。(MySQL 周りは143が結構調べて準備してくれていました)

#### NginxでBotからのリクエストに503返すように

こんな感じで雑に対応しました。あとで他の参加者のブログを読んで、ちゃんと正規表現でやる場合はmapとかが使えるようです。Nginx力が足りない...
```nginx.conf
if ( $http_user_agent ~* (ISUCONbot|Mediapartners-ISUCON|ISUCONCoffee|ISUCONFeedSeeker|isubot|Isupider|bot|crawler|spider) ) {
  return 503;
}
```


これらを入れて少しスコアが上がったと思います。(正確な数字は覚えてない)

この間tocknは `POST /api/estate/nazotte` のN+1対応、143は `POST /api/chair/buy/:id` のトランザクションを無くしてくれてました。

確かこのあたりでベンチをちゃんと動かせるようになって、サーバーでhtopしてみたところMySQLがCPU使いまくっていることを確認しました。

### 14:30~
ここからDBのボトルネックを全員で潰していきます。

僕はまずMySQLを2台目のサーバーで動かすように構成変更し、`POST /api/chairs` と `POST /api/estates` のインサートが重いのを潰す作業に入りました。

csvをリクエストで受け取って1行ずつINSERTしていたので、CSVファイルをローカルのファイルシステムに書き出して `LOAD DATA INFILE` でINSERTするようにしました。

```go
folder := "/var/lib/mysql-files/"
filepath := fmt.Sprintf("%s%s.csv", folder, uuid.New().String())
tmpFile, err := os.Create(filepath)
if err != nil {
	c.Logger().Errorf("failed to crete temp file: %v", err)
	return c.NoContent(http.StatusInternalServerError)
}
defer func() {
	tmpFile.Close()
	os.Remove(filepath)
}()

if _, err := io.Copy(tmpFile, f); err != nil {
	c.Logger().Errorf("failed to copy file: %v", err)
	return c.NoContent(http.StatusInternalServerError)
}

_, err = db.ExecContext(c.Request().Context(), fmt.Sprintf(`
LOAD DATA INFILE '%s' INTO TABLE chair
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
`, filepath))
if err != nil {
	c.Logger().Errorf("failed to insert data from csv: %v", err)
	return c.NoContent(http.StatusInternalServerError)
}
```

書き出したファイルが権限の問題でMySQL側から読み込めなかったり、`FIELDS TERMINATED BY ','` とか `ENCLOSED BY '"'` をつけてなくて上手くCSVを読み込めなかったり、色々ハマりました。

`LOAD DATA INFILE` ではなくバルクインサートする方法もあったのですが、CSVファイルからの読み込みのほうが20倍速いとドキュメントに書かれていたのでこの方法を取りました。

https://dev.mysql.com/doc/refman/5.6/ja/insert-speed.html

2人に助けてもらいながらこれを倒し、ここで 1200 点を記録します。全体の13位まで上がったので、めちゃくちゃ盛り上がりました。もう少しで倒せそうなボトルネックいくつかあるし、このままいけば予選突破できるのでは、と思いましたが完全に慢心でした。

他にもこのタイミングでNginxでの静的ファイル配信もやりました。

この間 2人は `features` の絞り込みを軽くするために別テーブルで管理するようにしたり、 `GET /api/chair/search` と  `GET /api/estate/search` の高速化とか、細かいSQLのチューニングを頑張ってくれてました。

そしてこのあたりからベンチマークの不具合なのかアプリケーションのバグなのか、最後までスコア0点を記録し続けることになります。つらかった...

### 18:00~
ベンチマークがタイムアウトで致命的なエラー(=スコア0点)を記録し続けていて、原因がわからず頭を抱えていました。

アプリやDBのログに `invalid connection` とか `Aborted connection` とかが出てたり、DBのインスタンスのCPUが100%に張り付いていたので、DBに負荷がかかりすぎているのが原因と考え更にDBの負荷を下げるため色々試行錯誤していきます。

思い返すと、ここですぐ点数が出る状態までロールバックしたほうが良かったです。変更をどんどんマージしていき、負荷が下がってもよくわからないエラーでスコアが0のままという状態になってしまいました。

僕はこのときスロークエリのトップに来ていた `/api/recommended_estate/:id` に取り掛かりました。 whereの条件を半分に減らし、UNIONするようにしました。スコアは0のままでしたが、スロークエリの順番がだいぶ下がったので上手く動いていたと思います。

```go
var estates []Estate
w := chair.Width
h := chair.Height
d := chair.Depth

min_hd := h
if d < h {
	min_hd = d
}
min_wd := w
if d < w {
	min_wd = d
}
min_wh := w
if h < w {
	min_wh = h
}
query = `
(SELECT * FROM estate WHERE (door_width >= ? AND door_height >= ?) ORDER BY popularity DESC, id ASC LIMIT ?) UNION
(SELECT * FROM estate WHERE (door_width >= ? AND door_height >= ?) ORDER BY popularity DESC, id ASC LIMIT ?) UNION
(SELECT * FROM estate WHERE (door_width >= ? AND door_height >= ?) ORDER BY popularity DESC, id ASC LIMIT ?)
ORDER BY popularity DESC, id ASC LIMIT ?`
err = db.SelectContext(c.Request().Context(), &estates, query,
 	w, min_hd, Limit,
 	h, min_wd, Limit,
 	d, min_wh, Limit,
 	Limit,
)
```

終わったあと Discord で他の参加者が話していて気づいたのですが、MySQL5.7 では降順Indexが使えずここでの `popularity, id` のインデックスはちゃんと効いていなかったみたいです。(もっと高速化できた..) ちゃんと `Explain` で確認するべきでした。

他の参加者のブログを読むともっとスマートにここを改善していて感動しました。自分のアルゴリズム力、数学的な思考力が足りていないのを実感しました。

この時143は MySQL の設定周りを調査して `invalid connection` と `Aborted Connection` のエラーと戦ってくれていて、tocknは search のバグを直すのに頑張ってくれていました。

### 19:30~
序盤に潰したと思っていた `POST /api/estate/nazotte` の N+1 が実は動かず Revert していたのを知り、スロークエリにも上がっていたので対応することにしました。多角形の中に点があるかSQLでN回判定していたので、アプリケーション側でやるようにしました。

こんな感じで golang-geo を使って対応しましたが、ベンチマーカーが互換性チェックに失敗してしまったので泣く泣くRevertしました。

どこが間違っているのかは調査できてないです。(わかる方は教えていただけたら嬉しいです...)

https://github.com/kellydunn/golang-geo

```go
estatesInPolygon := make([]Estate, 0, len(estatesInBoundingBox))
if len(estatesInBoundingBox) > 0 {
	points := make([]*geo.Point, 0, len(coordinates.Coordinates))
	for _, co := range coordinates.Coordinates {
		p := geo.NewPoint(co.Latitude, co.Longitude)
		points = append(points, p)
	}

	polygon := geo.NewPolygon(points)
	for _, es := range estatesInBoundingBox {
		if polygon.Contains(geo.NewPoint(es.Latitude, es.Longitude)) {
			estatesInPolygon = append(estatesInPolygon, es)
		}
	}
}
```

また、後から知りましたが1クエリで取れるように対応することもできたみたいです。

### 20:00~
終了1h前となり、スコアが変わらず0だったのでかなり焦っていました。

ここから全員でなんとかスコアを出そうと変更をRevertしたりバグを見つけて修正を入れたりしました。NewRelic外したりNginxのアクセスログとかMySQLのスロークエリログを切ったりもここでやりました。

全体を見直していたところテーブル毎にDBを分割できることに気づいたのですが、それが20:30くらいだったので対応するのを諦めてしまいました。この対応をいれてスコアが伸びたというチームがいくつもあったので、もっと早く気付けなかったのが悔しいです。

結局一度1200点出て以降、スコアは0のまま終了しました。

## まとめ
今回初出場でしたがボトルネックを見つけていくつかちゃんと潰せたのは良かったです。ただ最終的には倒せなかったボトルネックの解消方法が、他の参加者のブログを読むと方針は合ってそうだったのでやりきれなかったのが非常に悔しいです。

今回ISUCONの練習を始めるまではほとんどサーバーのチューニングをやってきたことが無かったので、個人的にはかなり成長を感じました。少しだけNginxとかMySQLの気持ちがわかるようになった気がします。

メンバーの2人にはめちゃくちゃ感謝しています。何回も予選問題を解く練習に付き合ってくれましたし、当日もスムーズにコミュニケーションとりながら進めることができたと思います。

来年は本戦進んで優勝するぞ
