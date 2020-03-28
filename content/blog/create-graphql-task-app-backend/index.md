---
title: GraphQLでタスク管理アプリを作る -バックエンド編- [Go + gqlgen]
date: "2019-12-21T00:00:00+09:00"
description: Go+gqlgenでタスク管理アプリのバックエンドを作ります
---

[Qiita](https://qiita.com/ebkn/items/0b30bdbf0dae5df73d2e) に投稿したものと同様の内容です。

こちらは [DeNA 20 新卒 Advent Calender 2019](https://qiita.com/advent-calendar/2019/dena-20-shinsostu) の21日目の記事です。

こんにちは、[ebiken](https://qiita.com/ebkn) です。

バックエンド編とフロントエンド編の２つに分けて、GraphQLを使ったタスク管理アプリを作っていきます。

まずはバックエンド編で、Go + gqlgenを使用してGraphQLサーバーを実装していきます。フロントエンド編は [Climber22](https://qiita.com/Climber22) さんが明日投稿するので、そちらと合わせてGraphQLアプリを作ってみてください。

コードは公開しています。
[GitHub](https://github.com/ebkn/graphql-app-advent-calendar-2019)

今回使用する主な言語/ライブラリはこんな感じです。

- Go 1.13.4
- DB
    - MySQL 8.0.13
- ORM
    - [jinzhu/gorm](https://github.com/jinzhu/gorm)
- httpサーバー
    - [labstack/echo](https://github.com/labstack/echo)
- DBマイグレーション
    - [golang-migrate/migrate](https://github.com/golang-migrate/migrate)
- サーバーのホットリロード
    - [oxequa/realize](https://github.com/oxequa/realize)
- structのバリデーション
    - [go-playground/validator](https://github.com/go-playground/validator)
- ユニークIDの生成
    - [teris-io/shortid](https://github.com/teris-io/shortid)


# GraphQL とは
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143774/61399bd3-4319-b99f-28a0-63ca747ecabe.png" width="150">

[graphql.org](https://graphql.org)

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

GraphQLはAPIのためのクエリ言語/実装です。もともとFacebookが開発してOSS化されたもので、現在は [GraphQL Foundation](https://foundation.graphql.org/) が開発を推進しています。
GraphQLを使うことで、型安全なリクエストやエディタの補完、ドキュメント生成などの周辺ツール等様々な恩恵を受けることができます。

- [「GraphQL」徹底入門 ─ RESTとの比較、API・フロント双方の実装から学ぶ](https://employment.en-japan.com/engineerhub/entry/2018/12/26/103000)
- [GraphQL Advent Calendar 2019](https://qiita.com/advent-calendar/2019/graphql)

# gqlgen とは

[gqlgen.com](https://gqlgen.com/)

> gqlgen is a Go library for building GraphQL servers without any fuss.

gqlgenは **スキーマファースト**、**型安全**、**コード生成** という特徴を持ったGoのGraphQLサーバーライブラリです。
スキーマファーストとは、`スキーマ作成` ➝ `go generate でコード生成` ➝ `具体的な処理を実装` というように、スキーマを最初に定義し、それをもとに開発していくスタイルのことをいいます。
他のGoで書かれたGraphQLサーバーライブラリとの比較が [gqlgenの公式サイト](https://gqlgen.com/feature-comparison/) にあるので参考にしてみてください。

導入事例

- https://tech.mercari.com/entry/2018/10/24/111227
- https://tech.mfkessai.co.jp/2018/08/go-gqlgen-graphql/


# アプリの仕様
シンプルなタスク管理アプリです。

#### 機能一覧
- タスクの一覧表示
    - ページネーションも実装する
- タスクの並び替え
    - 作成日が新しい順
    - 期限が早い順
- タスクの作成
- タスクの更新

これらの機能をGraphQLのスキーマに落とし込むとこんな感じになります。

<details><summary>スキーマ</summary><div>

```schema.graphql
query {
  tasks(input: TasksInput!, orderBy: TaskOrderFields!, page: PaginationInput!): TaskConnection!
}

mutation {
  createTask(input: CreateTaskInput!): Task!
  updateTask(input: UpdateTaskInput!): Task!
}
```
```task.graphql
type Task implements Node {
  id: ID!
  title: String!
  notes: String!
  completed: Boolean!
  due: Time!
}
type TaskEdge implements Edge {
  cursor: String!
  node: Task!
}
type TaskConnection implements Connection {
  pageInfo: PageInfo!
  edges: [TaskEdge]!
}

input TasksInput {
  completed: Boolean
}

enum TaskOrderFields {
  LATEST
  DUE
}

input CreateTaskInput {
  title: String!
  notes: String
  completed: Boolean
  due: Time
}

input UpdateTaskInput {
  taskID: ID!
  title: String
  notes: String
  completed: Boolean
  due: Time
}
```
```page.graphql
type PageInfo {
  endCursor: String!
  hasNextPage: Boolean!
}

interface Connection {
  pageInfo: PageInfo!
  edges: [Edge]!
}
interface Edge {
  cursor: String!
  node: Node!
}
interface Node {
  id: ID!
}

input PaginationInput {
  first: Int
  after: String
}
```
</div>
</details>

詳しくは各機能の実装時に説明していきます。

では、実装を進めていきます。


## 1. プロジェクトの設定
まずは `Docker`, `docker-compose` を使用してGoの環境を作ります。

<details><summary>`Dockerfile`</summary><div>

```Dockerfile
FROM golang:1.13.4-alpine3.10 as build

WORKDIR /app

RUN apk update --no-cache \
  && apk add --no-cache \
    git \
    gcc \
    musl-dev

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN GOOS=linux GOARCH=amd64 go build -o app main.go

RUN GO111MODULE=off go get github.com/oxequa/realize
RUN GO111MODULE=off go get -tags 'mysql' -u github.com/golang-migrate/migrate/cmd/migrate
```
</div>
</details>

<details><summary>`docker-compose.yml`</summary><div>

```docker-compose.yml
---
version: '3.7'

services:
  app:
    container_name: graphql-app-backend
    build:
      context: ./app
      target: build
    volumes:
      - ./app:/app
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: root
      DB_NAME: graphql-app-development
    ports:
      - 3000:3000
    depends_on:
      - db
    links:
      - db
    tty: true

  db:
    container_name: graphql-app-db
    image: mysql:8.0.13
    volumes:
      - ./db/mysql/data:/var/lib/mysql
      - ./db/mysql/my.cnf:/etc/mysql/conf.d/my.cnf
    environment:
      MYSQL_USER: root
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: graphql-app-development
    ports:
      - 3306:3306
    tty: true
```
</div>
</details>

Go Modulesの設定を行い、echoで簡単なHTTPサーバーを立てます。
<details><summary>`main.go`</summary><div>
[echo](https://github.com/labstack/echo) を使って簡単なHTTPサーバーを立てます。
各 middleware については echo のドキュメントを参照してください
https://echo.labstack.com/middleware

```main.go
package main

import (
    "net/http"

    "github.com/labstack/echo"
    "github.com/labstack/echo/middleware"
)

func main() {
    e := echo.New()

    e.Use(middleware.Recover())
    e.Use(middleware.Logger())
    e.Use(middleware.Gzip())

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{os.Getenv("CORS_ALLOW_ORIGIN")},
        AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
    }))

    e.GET("/health", func(c echo.Context) error {
        return c.NoContent(http.StatusOK)
    })

    e.HideBanner = true
    e.Logger.Fatal(e.Start(":3000"))
}
```
</div>
</details>

開発中のホットリロードを行うため、realizeの設定ファイルも配置します。
<details><summary>`realize.yml`</summary><div>

```realize.yml
---
settings:
  legacy:
    force: false
    interval: 0s

schema:
  - name: app
    path: .
    commands:
      install:
        status: true
        method: go build -o app main.go
      run:
        status: true
        method: ./app
    watcher:
      extensions:
        - go
      paths:
        - /
      ignored_paths:
        - .realize
```
</div>
</details>

サーバーの立ち上げやmigrationコマンドは`Makefile`にまとめておきます
<details><summary>`Makefile`</summary><div>

```Makefile
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=graphql-app-development
DB_CONN=mysql://${DB_USER}:${DB_PASSWORD}@tcp\(${DB_HOST}:${DB_PORT}\)/${DB_NAME}

.PHONY: run
run:
    docker-compose up --build -d

.PHONY: start
start:
    docker-compose exec app realize start --run

# migrationファイルの作成
.PHONY: migrate-create
migrate-create:
    docker-compose exec app migrate create -ext sql -dir migrations ${FILENAME}

# migrationの実行
.PHONY: migrate-up
migrate-up:
    docker-compose exec app migrate --source file://migrations --database ${DB_CONN} up

# migration(rollback)の実行
.PHONY: migrate-down
migrate-down:
    docker-compose exec app migrate --source file://migrations --database ${DB_CONN} down 1
```
</div>
</details>

ファイル構造はこんな感じになります。

```sh
$ tree backend
.
├── .gitignore
├── Makefile
├── README.md
├── app
│   ├── .realize.yaml
│   ├── Dockerfile
│   ├── go.mod
│   ├── go.sum
│   └── main.go
├── db
│   └── mysql
│       └── my.cnf
└── docker-compose.yml
```

`backend`ディレクトリで`make`を実行すると`app`サービスと`db`サービスが立ち上がり、`make start`でサーバーが立ち上がればOKです。

```sh
$ make start
docker-compose exec app realize start --run
[14:28:00][APP] : Watching 9 file/s 6 folder/s
[14:28:00][APP] : Install started
[14:28:01][APP] : Install completed in 0.748 s
[14:28:01][APP] : Running..
[14:28:02][APP] : ⇨ http server started on [::]:3000
```

## 2. `tasks` テーブルの作成
続いて、タスクを保存する`tasks`テーブルを作っていきます。
先程`Makefile`に書いた`make migrate-create` コマンドを実行してtasksテーブル作成用のmigrationファイルを作ります。

```sh
$ FILENAME=create_tasks make migrate-create
```

実行すると`migrations`ディレクトリ以下に`<timestamp>_create_tasks.up.sql`, `<timestamp>_create_tasks.down.sql`の２つが作成されるので、それぞれup/down用のSQLを書きます

<details><summary>`2019xxxx_create_tasks.{up,down}.sql`</summary><div>

```2019xxxx_create_tasks.up.sql
CREATE TABLE tasks (
  id         INT NOT NULL AUTO_INCREMENT,
  identifier varchar(255) BINARY NOT NULL,
  title      varchar(255) NOT NULL,
  notes      text NOT NULL,
  completed  tinyint(1) NOT NULL DEFAULT 0,
  due        timestamp NULL DEFAULT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  deleted_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uix_tasks_identifier (identifier)
) ENGINE=InnoDB;
```
```2019xxxx_create_tasks.down.sql
DROP TABLE IF EXISTS tasks;
```
</div>
</details>

`Makefile`に書いた`migrate-up`コマンドを実行してテーブルを作成します。

```sh
$ make migrate-up
```

テーブルがこんな感じで作成されていればOKです。

```sql
mysql> desc tasks;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| identifier | varchar(255) | NO   | UNI | NULL    |                |
| title      | varchar(255) | NO   |     | NULL    |                |
| notes      | text         | NO   |     | NULL    |                |
| completed  | tinyint(1)   | NO   |     | 0       |                |
| due        | timestamp    | YES  |     | NULL    |                |
| created_at | timestamp    | NO   |     | NULL    |                |
| updated_at | timestamp    | NO   |     | NULL    |                |
| deleted_at | timestamp    | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
9 rows in set (0.02 sec)
```

## 3. gqlgen の設定
続いて、 gqlgenの設定をやっていきます。基本的にはgqlgenのチュートリアルと変わらないです。
[gqlgen getting started](https://gqlgen.com/getting-started/)

まずは、`gqlgen init`コマンドでプロジェクトのテンプレートを作成します。

```sh
$ docker-compose exec app go run github.com/99designs/gqlgen init
```
実行すると以下のファイルが作成されます

- `gqlgen.yml`
  - gqlgenの設定ファイル
- `generated.go`
  - GraphQLを実行するランタイム (`go generate`で更新する)
- `models_gen.go`
  - 不足しているmodel (GraphQLのtype, input, enumなど) の構造体 (`go generate`で更新する)
- `resolver.go`
  - resolver (今後query, mutationを実装していく部分)
- `schema.graphql`
  - テンプレートで設定されるTodoなどのGraphQLスキーマを定義している
- `server/server.go`
  - サーバーを立ち上げている

これらをそれぞれ編集します。

- `generated.go` ➝ `resolver/generated.go` に配置し、パッケージを変更する
- `models_gen.go` ➝ `model/models_gen.go` に配置し、パッケージ名を変更する

<details><summary>`gqlgen.yml`</summary><div>
resolver/model packageを作成して分割する

```gqlgen.yml
---
schema:
  - "schema/*.graphql"

exec:
  filename: resolver/generated.go
  package: resolver

model:
  filename: model/models_gen.go
  package: model

resolver:
  filename: resolver/resolver.go
  type: Resolver
```
</div>
</details>

<details><summary>`resolver.go`</summary><div>
`resolver/resolver.go` に配置し、以下のように変更する

```resolver.go
//go:generate go run github.com/99designs/gqlgen

package resolver

type Resolver struct{}

type queryResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }

func New() *Resolver {
  	return &Resolver{}
}

func (r *Resolver) Mutation() MutationResolver {
  	return &mutationResolver{r}
}

func (r *Resolver) Query() QueryResolver {
  	return &queryResolver{r}
}
```
</div>
</details>

<details><summary>`schema.graphql`</summary><div>
不要な type, query, mutation を削除し、`schema/schema.graphql` に空の Query と Mutation を追記する

```schema.graphql
type Query {}

type Mutation {}
```
</div>
</details>

<details><summary>`server/server.go` ➝ `main.go` に追記</summary><div>
`server/server.go` を削除し、`main.go`に GraphQL サーバーを立ち上げる処理を追記する
今回は `/graphql` というエンドポイントにします。

```main.go
package main

import (
    "app/resolver"
    "net/http"

    "github.com/99designs/gqlgen/handler"
    "github.com/labstack/echo"
    "github.com/labstack/echo/middleware"
)

func main() {
    e := echo.New()

    e.Use(middleware.Recover())
    e.Use(middleware.Logger())
    e.Use(middleware.Gzip())

    e.GET("/health", func(c echo.Context) error {
        return c.NoContent(http.StatusOK)
    })

    e.POST("/graphql", func(c echo.Context) error {
        config := resolver.Config{
          Resolvers: resolver.New(),
        }
        h := handler.GraphQL(resolver.NewExecutableSchema(config))
        h.ServeHTTP(c.Response(), c.Request())

        return nil
    })

    e.HideBanner = true
    e.Logger.Fatal(e.Start(":3000"))
}
```
</div>
</details>

`app`以下のディレクトリ構造が以下のようになっていればOKです。

```sh
$ tree app
.
├── .realize.yaml
├── Dockerfile
├── go.mod
├── go.sum
├── gqlgen.yml
├── main.go
├── migrations
│   ├── <timestamp>_create_tasks.down.sql
│   └── <timestamp>_create_tasks.up.sql
├── model
│   └── models_gen.go
├── resolver
│   ├── generated.go
│   └── resolver.go
└── schema
    └── schema.graphql
```

これでgqlgenの設定が終わりました。ここから各 `query`, `mutation` の実装を進めていきます。
ここからは基本的に、

1. `/app/schema/*.graphql` でスキーマを追加/編集
2. `make generate` でコード生成
3. 作成/変更されたinterfaceを満たすようにresolverを実装する

という形で実装を進めていきます。

今後実行しやすいように `go generate` コマンドも `Makefile` に追加しておきます。

```Makefile
# 追記
.PHONY: generate
generate:
	docker-compose exec app go generate ./...
```

## 4. Task model の作成
続いて、DB周りの設定とTask modelを作成していきます。

まずはDB周りの設定を`config/db.go`に配置します。
<details><summary>`config/db.go`</summary><div>

```db.go
package config

import (
    "fmt"
    "os"

    _ "github.com/go-sql-driver/mysql"

    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func InitDB() error {
    conn, err := gorm.Open("mysql", dbsn())
    if err != nil {
        return err
    }

    db = conn.Set("gorm:auto_update", false)

    return nil
}

func dbsn() string {
    return fmt.Sprintf(
        "%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_NAME"),
    )
}

func DB() *gorm.DB {
	return db
}
```
```main.go
...
func main() {
    e := echo.New()

    if err := config.InitDB(); err != nil {
        panic(err.Error())
    }
    ...
```
</div>
</details>

続いて、 Task modelを `model/task.go` に作成します。

<details><summary>`model/task.go`</summary><div>
`model/task.go` に Task model を作成します。
また、 GORM の`BeforeSave` hook を使用して構造体のバリデーションを行います。
validator の初期化は`model/model.go`で行います。

```model/task.go
package model

import "time"

type Task struct {
    ID         int
    Identifier string `validate:"required,max=255"`
    Title      string `validate:"required,max=255"`
    Notes      string `validate:"max=65535"`
    Completed  bool
    Due        *time.Time
    CreatedAt  time.Time
    UpdatedAt  time.Time
    DeletedAt  *time.Time
}

func (t *Task) BeforeSave() error {
    return validator.Struct(t)
}
```
```model/model.go
package model

import (
    v "gopkg.in/go-playground/validator.v9"
)

var validator *v.Validate

func init() {
    validator = v.New()
}
```
</div>
</details>

次に`Task`typeをスキーマを追加し、作成したmodelと紐付けます。

まずは`schema/task.graphql`を作成します。

```task.graphql
type Task {
  id: ID!
  title: String!
  notes: String!
  completed: Boolean!
  due: Time
}
```

Time型はgqlgenのbuilt-in Scalar Typeを使用するので`schema.graphql`に追記します。

- https://gqlgen.com/reference/scalars/#time

```schema.graphql
# 追記
scalar Time
```

GraphQLの`type`と`model`を紐付けるのは`gqlgen.yml`で設定します。
`Task`の`id`はグローバルでユニークな値を使いたいため、モデルの`id`ではなく`identifier`を返したいです。
そのため`resolver: true`を指定し、`id`の値を解決するのはresolverでやるようにします。

<details><summary>`gqlgen.yml`</summary><div>
`gqlgen.yml`に追記します。

```gqlgen.yml
...
models:
  Task:
    model: app/model.Task
    fields:
      id:
        resolver: true
```
</div>
</details>

変更したら `make generate` して`resolver/generated.go`を更新します。
`TaskResolver` interfaceが作成されるので、`resolver/task.go`で実装します。

<details><summary>`resolver/task.go`</summary><div>

```task.go
package resolver

import (
    "app/model"
    "context"
)

type taskResolver struct{ *Resolver }

func (r *Resolver) Task() TaskResolver {
    return &taskResolver{r}
}

func (r *taskResolver) ID(ctx context.Context, obj *model.Task) (string, error) {
    if obj == nil {
      return "", nil
    }

    return obj.Identifier, nil
}
```
</div>
</details>

## 5. タスク作成機能の実装 (`createTask` mutation)
続いてタスク作成機能(`createTask` mutation) を実装していきます。

まずはmutationのスキーマを作成します。

```schema.graphql
...
type Mutation {
  createTask(input: CreateTaskInput!): Task! # 追記
}
```
```task.graphql
# 追記
input CreateTaskInput {
  title: String!
  notes: String
  completed: Boolean
  due: Time
}
```

`createTask(title: String!, ...): Task!` のようにinputを使わずに定義することもできますが、 inputとしてまとめておくと可読性が上がりますし、コードを生成した際にinputのオブジェクトや構造体が作られるので扱いやすくなります。

スキーマを作成したので次にコードを生成します。

```sh
$ make generate
```

`MutationResolver` interfaceに`createTask`が追加されるので、`resolver/resolver.go`で実装します。

<details><summary>`resolver/resolver.go`</summary><div>

```resolver.go
func (r *mutationResolver) CreateTask(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
    db := config.DB()

    id, err := config.ShortID().Generate()
    if err != nil {
        return &model.Task{}, err
    }

    task := model.Task{
        Identifier: id,
        Title:      input.Title,
        Due:        input.Due,
    }
    if input.Notes != nil {
        task.Notes = *input.Notes
    }
    if input.Completed != nil {
        task.Completed = *input.Completed
    }

    if err := db.Create(&task).Error; err != nil {
        return &model.Task{}, err
    }

    return &task, nil
}
```
</div>
</details>

これで `createTask` mutationの実装ができたので、[GraphiQL](https://github.com/graphql/graphiql)や[graphql-playground](https://github.com/prisma-labs/graphql-playground) 等で動作を確認してみてください。

![createTask mutation](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143774/292528d4-ff2e-2464-d646-a86a7e86406a.png)

## 6. タスク更新機能の実装 (`updateTask` mutation)
続いてタスク更新機能(`updateTask` mutation) を実装していきます。

`createTask`と同様、まずはスキーマを作成します。

```schema.graphql
...
type Mutation {
  ...
  updateTask(input: UpdateTaskInput!): Task! # 追記
}
```
```task.graphql
# 追記
input UpdateTaskInput {
  taskID: ID!
  title: String
  notes: String
  completed: Boolean
  due: Time
}
```

スキーマを作成したので次にコードを生成します。

```sh
$ make generate
```

`MutationResolver` interfaceに`updateTask`が追加されるので、`resolver/resolver.go`で実装します。

<details><summary>`resolver/resolver.go`</summary><div>
`CreateTask` と違い、`map[string]interface{}` 型のパラメータを `Updates()` に渡していますが、これは `GORM` の　`Updates`　がゼロ値を指定した場合アップデートが走らないという仕様のためです。
もっと良い書き方があれば教えてほしいです、、

- http://jinzhu.me/gorm/crud.html#update

```resolver.go
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error) {
    db := config.DB()

    var task model.Task
    if err := db.Where("identifier = ?", input.TaskID).First(&task).Error; err != nil {
        return &model.Task{}, err
    }

    params := map[string]interface{}{}
    if input.Title != nil {
        params["title"] = *input.Title
    }
    if input.Notes != nil {
        params["notes"] = *input.Notes
    }
    if input.Completed != nil {
        params["completed"] = *input.Completed
    }
    if input.Due == nil {
        params["due"] = nil
    } else {
        params["due"] = *input.Due
    }

    if err := db.Model(&task).Updates(params).Error; err != nil {
        return &model.Task{}, err
    }

    return &task, nil
}
```
</div>
</details>

これで `updateTask` mutationの実装ができたので、[GraphiQL](https://github.com/graphql/graphiql)や[graphql-playground](https://github.com/prisma-labs/graphql-playground) 等で動作を確認してみてください。

![updataTask mutation](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143774/575b2403-6556-e53b-f211-3f9a9762746f.png)


## 7. タスク一覧表示の実装 (`tasks` query)
続いてタスク一覧表示機能(`tasks` query) を実装していきます。

一覧表示の機能ではページネーションを実装します。GraphQLでページネーションを行う場合、`relay style pagination`とよばれるカーソルベースのページネーションで実装することが多いです。今回はそのうち、前から読んでいく(`first`, `after` を使用するもの)もののみ実装します。

relay style paginationについてはこちらを参考にしました。
- [relay style pagination の仕様](https://facebook.github.io/relay/graphql/connections.htm)
- [Let's Paginate! - GraphQLでページネーションをやってみよう！ - Qiita](https://qiita.com/gipcompany/items/ffee8cf0b1522a741e12)
- [Relay Cursor Connectionsの仕様と実装方法について - Qiita](https://qiita.com/wawoon/items/d00bd180dcac48a3068e)

ではまずスキーマから定義していきます。

```schema.graphql
type Query {
  tasks(input: TasksInput!, orderBy: TaskOrderFields!,  page: PaginationInput!): TaskConnection!
}
...
```
```task.graphql
type Task implements Node { # implements Node を追記
...
}
# 追記
type TaskEdge implements Edge {
  cursor: String!
  node: Task!
}

type TaskConnection implements Connection {
  pageInfo: PageInfo!
  edges: [TaskEdge]!
}

input TasksInput {
  completed: Boolean
}

enum TaskOrderFields {
  LATEST
  DUE
}
...
```
```page.graphql
type PageInfo {
  endCursor: String!
  hasNextPage: Boolean!
}

interface Connection {
  pageInfo: PageInfo!
  edges: [Edge]!
}

interface Edge {
  cursor: String!
  node: Node!
}

interface Node {
  id: ID!
}

input PaginationInput {
  first: Int
  after: String
}
```

ページネーション部分を共通化するため、`interface`を使っています。
また、他にもやり方はありますがページネーションを含むクエリには`PaginationInput`という型のinputを作ることで共通化しています。
(今回は`Task` modelしか無いのであまり意味はないですが..)

変更したら`resolver/generated.go`を更新します。

```sh
$ make generate
```

まずは`Task` modelが`Node`を実装するように変更します。
<details><summary>`model/task.go`</summary><div>

```task.go
func (Task) IsNode() {} // 追記
```
</div>
</details>

続いてページネーションを実装していきます。

フローを簡単に説明するとこうなります。

1. カーソルをデコードしてキーを取り出し、それをもとにSQLを組み立てる
2. SQLを投げる
3. 結果の配列からConnectionに変換する

今回は`作成日が新しい順`と`期限が早い順`による並び替えを実装するのですが、それぞれ単純にソートするカラムで`where/order`を指定すれば良いというわけではありません。

前者の場合はidで降順にソートします。idはユニークな値なのでカーソルにはidが含まれているので問題なくカーソルページネーションできます。
しかし後者の場合、`created_at` で昇順にソートすることはできますが、ユニークな値ではないのでカーソルページネーションがうまく動きません。
いくつか実装の方法はありますが、今回はカーソルのフォーマットとSQLを工夫することでユニークじゃない値でソートするカーソルページネーションを実装しました。

具体的に以下のようなカーソルとSQLを組み立てるようにしています。

#### id(unique)で降順にソートする

- カーソル
  - `task:5`
- SQL
  - `SELECT * FROM tasks WHERE id > 5 ORDER BY id DESC;`

#### created_at(non-unique)で昇順にソートする

- カーソル
  - `task:5:created_at:123456` (1234..はunix timestamp)
- SQL
  - `SELECT * FROM tasks WHERE (UNIX_TIMESTAMP(created_at) < 123456) OR (UNIX_TIMESTAMP(created_at) = 123456 AND id < 5) ORDER BY created_at IS NULL ASC, id ASC;`


<details><summary>`resolver/resolver.go`</summary><div>

```resolver/resolver.go
func (r *queryResolver) Tasks(ctx context.Context, input model.TasksInput, orderBy model.TaskOrderFields, page model.PaginationInput) (*model.TaskConnection, error) {
    db := config.DB()

    if input.Completed != nil {
        db = db.Where("completed = ?", *input.Completed)
    }

    var err error

    switch orderBy {
    case model.TaskOrderFieldsLatest:
        db, err = pageDB(db, "id", desc, page)
        if err != nil {
            return &model.TaskConnection{PageInfo: &model.PageInfo{}}, err
        }

        var tasks []*model.Task
        if err := db.Find(&tasks).Error; err != nil {
            return &model.TaskConnection{PageInfo: &model.PageInfo{}}, err
        }

        return convertToConnection(tasks, orderBy, page), nil
    case model.TaskOrderFieldsDue:
        db, err = pageDB(db, "UNIX_TIMESTAMP(due)", asc, page)
        if err != nil {
            return &model.TaskConnection{PageInfo: &model.PageInfo{}}, err
        }

        var tasks []*model.Task
        if err := db.Find(&tasks).Error; err != nil {
            return &model.TaskConnection{PageInfo: &model.PageInfo{}}, err
        }

        return convertToConnection(tasks, orderBy, page), nil
    default:
        return &model.TaskConnection{PageInfo: &model.PageInfo{}}, errors.New("invalid order by")
    }
}
```
```resolver/page.go
package resolver

import (
    "app/model"
    "encoding/base64"
    "errors"
    "fmt"
    "strconv"
    "strings"

    "github.com/jinzhu/gorm"
)

type direction string

var (
    // 今回は不要 asc direction = "asc"
    desc direction = "desc"
)

func pageDB(db *gorm.DB, col string, dir direction, page model.PaginationInput) (*gorm.DB, error) {
    var limit int
    if page.First == nil {
        limit = 11
    } else {
        limit = *page.First + 1
    }

    if page.After != nil {
        resource1, resource2, err := decodeCursor(*page.After)
        if err != nil {
            return db, err
        }

        if resource2 != nil {
            switch dir {
            case asc:
                db = db.Where(
                     fmt.Sprintf("(%s > ?) OR (%s = ? AND id > ?)", col, col),
                     resource1.ID,
                     resource1.ID, resource2.ID,
                )
            case desc:
                db = db.Where(
                    fmt.Sprintf("(%s < ?) OR (%s = ? AND id < ?)", col, col),
                    resource1.ID,
                    resource1.ID, resource2.ID,
                )
            }
        } else {
            switch dir {
            case asc:
                db = db.Where(fmt.Sprintf("%s > ?", col), resource1.ID)
            case desc:
                db = db.Where(fmt.Sprintf("%s < ?", col), resource1.ID)
            }
        }
    }

    switch dir {
    case asc:
        db = db.Order(fmt.Sprintf("%s IS NULL ASC, id ASC", col))
    case desc:
        db = db.Order(fmt.Sprintf("%s DESC, id DESC", col))
    }

    return db.Limit(limit), nil
}

type cursorResource struct {
    Name string
    ID   int
}

func createCursor(first cursorResource, second *cursorResource) string {
    var cursor []byte
    if second != nil {
        cursor = []byte(fmt.Sprintf("%s:%d:%s:%d", first.Name, first.ID, second.Name, second.ID))
    } else {
        cursor = []byte(fmt.Sprintf("%s:%d", first.Name, first.ID))
    }

    return base64.StdEncoding.EncodeToString(cursor)
}

func decodeCursor(cursor string) (cursorResource, *cursorResource, error) {
    bytes, err := base64.StdEncoding.DecodeString(cursor)
    if err != nil {
        return cursorResource{}, nil, err
    }

    vals := strings.Split(string(bytes), ":")

    switch len(vals) {
    case 2:
      id, err := strconv.Atoi(vals[1])
      if err != nil {
          return cursorResource{}, nil, errors.New("invalid_cursor")
      }

      return cursorResource{Name: vals[0], ID: id}, nil, nil
    case 4:
      id, err := strconv.Atoi(vals[1])
      if err != nil {
          return cursorResource{}, nil, errors.New("invalid_cursor")
      }

      id2, err := strconv.Atoi(vals[3])
      if err != nil {
          return cursorResource{}, nil, errors.New("invalid_cursor")
      }

      return cursorResource{
          Name: vals[0],
          ID:   id,
      }, &cursorResource{
          Name: vals[2],
          ID:   id2,
      }, nil
    default:
        return cursorResource{}, nil, errors.New("invalid_cursor")
    }
}

func convertToConnection(tasks []*model.Task, orderBy model.TaskOrderFields, page model.PaginationInput) *model.TaskConnection {
    if len(tasks) == 0 {
        return &model.TaskConnection{PageInfo: &model.PageInfo{}}
    }

    pageInfo := model.PageInfo{}
    if page.First != nil {
        if len(tasks) >= *page.First+1 {
            pageInfo.HasNextPage = true
            tasks = tasks[:len(tasks)-1]
        }
    }

    switch orderBy {
    case model.TaskOrderFieldsLatest:
        taskEdges := make([]*model.TaskEdge, len(tasks))

        for i, task := range tasks {
            cursor := createCursor(
                cursorResource{Name: "task", ID: task.ID},
                nil,
            )
            taskEdges[i] = &model.TaskEdge{
                Cursor: cursor,
                Node:   task,
            }
        }

        pageInfo.EndCursor = taskEdges[len(taskEdges)-1].Cursor

        return &model.TaskConnection{PageInfo: &pageInfo, Edges: taskEdges}
    case model.TaskOrderFieldsDue:
        taskEdges := make([]*model.TaskEdge, 0, len(tasks))

        for _, task := range tasks {
          if task.Due == nil {
              pageInfo.HasNextPage = false
              return &model.TaskConnection{PageInfo: &pageInfo, Edges: taskEdges}
          }

          cursor := createCursor(
              cursorResource{Name: "task", ID: int(task.Due.Unix())},
              &cursorResource{Name: "due", ID: task.ID},
          )

          taskEdges = append(taskEdges, &model.TaskEdge{
              Cursor: cursor,
              Node:   task,
          })
        }

        pageInfo.EndCursor = taskEdges[len(taskEdges)-1].Cursor

        return &model.TaskConnection{PageInfo: &pageInfo, Edges: taskEdges}
    }

    return &model.TaskConnection{PageInfo: &model.PageInfo{}}
}
```
</div>
</details>

これで `tasks` queryの実装ができたので、[GraphiQL](https://github.com/graphql/graphiql)や[graphql-playground](https://github.com/prisma-labs/graphql-playground) 等で動作を確認してみてください。

#### latest (作成日が新しい順)
![tasks order by latest query](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143774/090db507-5bc0-9638-8ac8-5bf27b9feefe.png)

#### due (期限が早い順)
![tasks order by due query](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143774/e59fbcb1-480d-0cdd-5062-802aceaecdb9.png)

---

これでタスク管理アプリのバックエンドの実装ができました。
`スキーマ作成`➝`go generate でコード生成`➝`resolverの実装` というGraphQLのスキーマファースト開発を体験してもらえたら嬉しいです。
最後のページネーションの部分は各modelごとに作成する必要があるので若干大変ですが、`go generate`で自動生成する仕組みを作ればそれほど負担にはならないと思います。

明日は [Climber22](https://qiita.com/Climber22) さんのフロントエンド編です。
今回のバックエンド編と合わせて作ってみてください。

---

gqlgenでGraphQLサーバーを運用した感想を [GraphQL Advent Calendar 2019](https://qiita.com/advent-calendar/2019/graphql) 1日目の記事として書いたので、こちらも是非読んでください。
[gqlgen で GraphQLサーバーを運用した感想 - blog.ebiken.dev](https://blog.ebiken.dev/blog/operating-graphql-server-with-gqlgen/)


