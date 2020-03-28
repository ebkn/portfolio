---
title: gqlgen で GraphQLサーバーを運用した感想
date: "2019-12-01T00:00:00+09:00"
description: スタートアップで gqlgen を使ってGraphQLサーバーを運用しています。運用してきた感想を書きました。
---

これは [GraphQL Advent Calendar 2019](https://qiita.com/advent-calendar/2019/graphql) 1日目の記事です

こんにちは、[ebiken](https://twitter.com/ebikentennis) です。  
自分は今スタートアップでバックエンドエンジニアとして、[gqlgen](https://gqlgen.com/) を使ったGraphQLサーバーを運用しています。運用し始めて半年ほど経ったので感想とかを色々書いていこうと思います。  
具体的な技術スタックは、APIサーバー(Go) gqlgen、iOSアプリ(Swift) [apollo-ios](https://github.com/apollographql/apollo-ios)、管理画面(Vue) [vue-apollo](https://github.com/vuejs/vue-apollo) です。

まずは軽くGraphQLとgqlgenについて紹介します。

### GraphQL

[graphql.org](https://graphql.org)

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

GraphQLはAPIのためのクエリ言語/実装です。もともとFacebookが開発してOSS化されたもので、現在は [GraphQL Foundation](https://foundation.graphql.org/) が推進しています。

[GraphQLを推進する「GraphQL Foundation」設立、Facebookの手を離れLinux Foundation傘下へ](https://www.publickey1.jp/blog/18/graphqlgraphql_foundationfacebooklinux_foundation.html)

仕様や実装などについて書かれているおすすめの記事を載せておきます。
- [「GraphQL」徹底入門 ─ RESTとの比較、API・フロント双方の実装から学ぶ](https://employment.en-japan.com/engineerhub/entry/2018/12/26/103000)

### gqlgen

[gqlgen.com](https://gqlgen.com/)  
[GitHub](https://github.com/99designs/gqlgen/)

> gqlgen is a Go library for building GraphQL servers without any fuss.

gqlgenはスキーマファースト、型安全、コード生成という特徴を持ったGoのGraphQLサーバーライブラリです。

[gqlgen - getting started](https://gqlgen.com/getting-started/)

---

GraphQL, gqlgenの特徴についてそれぞれ運用してきた感想を書いていきます。

#### スキーマファースト
gqlgenはGraphQLのスキーマからコードを生成し、作成されたresolverのinterfaceを満たすように実装するというフローになります。そのようにschemaを最初に設計し、それをもとにサーバー/クライアントの実装を進めることをスキーマファースト開発といいます。  
開発チームの背景としてリモート開発がメイン、サーバー/クライアントを実装する人が別というのがあったため、スキーマファーストで開発を進めることは非常に重要でした。

具体的なフローはこんな感じです。

1. スキーマを書く

```graphql
query {
  ...
  users: UserConnection!
}
```

2. 新しいスキーマで `go generate` を行い、interfaceを満たす最低限の `resolver` を書く(具体的な実装はしない)

```go
func (r *queryResolver) Users(ctx context.Context) (*UserConnection, error) {
  panic("not implemented")
}
```

3. introspection - [apollo-tooling](https://github.com/apollographql/apollo-tooling) を利用してフロントエンドで使用する型を定義したファイルを作成する

```sh
$ apollo schema:download <schema.json ファイルのパス> \
  --endpoint <GraphQLサーバーのエンドポイント> \
  --header <認証用のヘッダー>
```

[apollo-tooling ドキュメント](https://github.com/apollographql/apollo-tooling#apollo-servicedownload-output)

4. サーバー/フロントの実装を進める

このようなフローになっているので、実装後にサーバー/クライアント間の擦り合せ(パラメータが違う、型が違うなど)をする必要がなくなりコミュニケーションコストを減らすことができています。

スキーマファースト開発について参考にした記事を貼っておきます。

[マイクロサービスにおけるWeb APIスキーマの管理 ─ GraphQL、gRPC、OpenAPIの特徴と使いどころ](https://employment.en-japan.com/engineerhub/entry/2019/08/22/103000)

##### n+1問題
GraphQLを使う際に発生する問題としてn+1問題が挙げられます。GraphQLはresolverを別々に実行していくため、同じリソースに対しても都度DB等へのリクエストを行ってしまうのは良くないです。  
n+1問題に対してgqlgenは [dataloaden](https://github.com/vektah/dataloaden) を使用して実装することを推奨しているのですが、こちらも `go generate` ベースで型安全なバッチ処理を簡単に実装する事ができるので凄く良いです。

[dataloaden](https://github.com/vektah/dataloaden)

#### pagination
GraphQLサーバーでページネーションをする場合、推奨されているのが [relay style pagination](https://graphql.org/learn/pagination/) です。仕様はFacebookが出しているものがあるのでそれを満たせば良いです。([Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm))  
しかし仕様に記述されているアルゴリズムはリストを全部取ってきて処理するという形式のため、パフォーマンス等を考慮するとRDBを使用している場合そのまま実装するわけにはいきません。そのため、`first/last/before/after` の指定に合わせてクエリを組み立てるよう自前で実装しました。

実装にはこちらで議論されているものを参考にしました。
- [graphql/graphql-relay-js Pagination implementation for real-life database #94](https://github.com/graphql/graphql-relay-js/issues/94)

このpaginationの実装に関してはgqlgenにpluginとして入れられるようになりそうな話が出ていました。  
[99designs/gqlgen #752](https://github.com/99designs/gqlgen/issues/752)


#### スキーマの設計
GraphQLの公式ページにはスキーマの書き方や機能について書いてあるものの、それを実際にどう使っていくのかといった情報はまだ少ないです。(特に日本語は)そのため最初はスキーマの設計に苦労しました。そのため何度かスキーマのリファクタリングをしています。

実際に使用しているスキーマの設計はこんな感じです。
- `ID` はglobalでユニークな値を指定する
- 引数には `XXInput` という名前で `input` オブジェクトを使用する

```graphql
# schema.graphql
mutation {
  updateUser(input: UpdateUserInput!): User!
}

# user.graphql
input UpdateUserInput {
  name: String!
}
```

- オブジェクトのリストを返したい場合はtypeを `Connection` として定義する
- pagination用のInputは `PaginationInput` として定義し引数に使用する

```graphql
# schema.graphql
query {
  users(page: PaginationInput!): UserConnection!
}

# page.graphql
input PaginationInput {
  first: Int
  last: Int
  before: String
  after: String
}
```

- `Connection`, `Edge`, `Node` interfaceを定義しpaginationものはそれを継承する

```graphql
# user.graphql
type User implements Node {
  identifier: ID!
  name: String!
}
type UserEdge implements Edge {
  cursor: String!
  node: User!
}
type UserConnection implements Connection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
}

# page.graphql
type PageInfo {
  startCursor: String!
  endCursor: String!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
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
  identifier: ID!
}
```

- orderが複数あるクエリの場合、 `orderBy` inputを指定する

```graphql
# schema.graphql
query {
  posts(page: PaginationInput!, orderBy: PostOrder!): PostConnection!
}

# post.graphql
input PostOrder {
  field: PostOrderFields!
}

enum PostOrderFields {
  CREATED_AT
  POPULARITY
}
```

このあたりを参考にしています。特に9月の技術書展7でvvakameさんが執筆されたGraphQLスキーマ設計ガイドは非常に参考になりました。

- [『GraphQLスキーマ設計ガイド』を技術書典7で頒布します](https://blog.vvaka.me/2019/09/20/graphql-schema-guide/)
- [GitHub GraphQL API v4](https://developer.github.com/v4/)
- [GraphQL best practices for GraphQL schema design](https://graphqlmastery.com/blog/graphql-best-practices-for-graphql-schema-design)

#### アクセス制御
管理画面からのみ一部のquery/mutationに対してアクセスを許可したいという要件があったため、`directive` を使用しました。  
一部のRoleからのみのアクセスを許可するのを以下のようにして実現しています。

```graphql
# directive の定義
directive @hasRole(role: Role!) on FIELD_DEFINITION

enum Role {
  ADMIN
}

# directiveの使用
mutation {
  updateUserByAdmin(input: UpdateUserByAdminInput!): User! @hasRole(role: ADMIN)
}
```

- [Directives](https://graphql.org/learn/queries/#directives)
- [gqlgen - Schema Directives](https://gqlgen.com/reference/directives/)

---

上記に書いた以外にもGraphQLを使った開発には多くのメリットがあり、特にDX(Developer Experience)が良いと思っています。  
[GraphiQL](https://github.com/graphql/graphiql)がドキュメントになり簡単に動作確認できますし、[graphql-faker](https://github.com/APIs-guru/graphql-faker)などを使用すれば簡単にmockサーバーを立ち上げることができます。  
そのような高いDXがあり、速い開発スピードも出せているので、GraphQL+gqlgenを選んで良かったと思っています。  
今から作るなら [Amplify](https://aws-amplify.github.io/docs/) あたりも良さそうと思っています。

