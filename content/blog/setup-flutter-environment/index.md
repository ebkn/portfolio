---
title: Flutterの環境構築をした
date: "2020-02-01T19:00:00+09:00"
description: Flutterの環境構築をしました
---

Flutterの環境構築をしました

### Flutter
https://flutter.dev/

> Flutter is Google’s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.

Flutter は Google で開発されたOSSのUIフレームワークで、モバイルやweb、デスクトップなどマルチプラットフォームで動くアプリを作ることができます

---

環境
- macOS Catalina v10.15.2

基本的には Flutter 公式の[get-started](https://flutter.dev/docs/get-started/install/macos)を参照しました

やったことはこんな感じです

- Flutter SDK のインストール+設定
- Dart のインストール
- Android Studio, Xcode のセットアップ
- エディタ(Vim) の設定
- DevTools のインストール

### Flutter SDK のインストール+設定
https://flutter.dev/docs/get-started/install/macos#get-sdk からsdkを落としてくる

unzip
```sh
$ unzip /path/to/installed/zip/file
```

パスの設定
```sh
# シェルの設定ファイル(.zshrc, .bash_profile 等)に追記
# (unzipしたものをHOMEディレクトリに置いた)
export PATH="$PATH:$HOME/flutter/bin"
```

設定を読み込む
```sh
# シェルの設定ファイルを指定して読み込む
$ source /path/to/shell/config
```

flutter precache する
> The flutter tool downloads platform-specific development binaries as needed. For scenarios where pre-downloading these artifacts is preferable (for example, in hermetic build environments, or with intermittent network availability)

```
$ flutter precache`
```

### Dart のインストール
homebrew で Dart をインストールする
```sh
$ brew tap dart-lang/dart
$ brew install dart
```

### Android Studio, Xcode のセットアップ
`flutter doctor` を実行すると足りていない設定をリストアップしてくれるので、それに従っていくつかインストールする。 
自分の場合は Android Studio が入っていなかったので
```sh
$ brew cask install android-studio
```
とライセンス周りの warning が出ていたので
```sh
$ flutter doctor --android-licenses
```
を実行する

### エディタ(Vim) の設定
2つプラグインを入れました

#### [dart-vim-plugin](https://github.com/dart-lang/dart-vim-plugin)
Dart の syntax highlight や indent をいい感じにする公式のプラグイン

[dein.vim](https://github.com/Shougo/dein.vim) でインストール
```toml
[[plugins]]
repo = 'dart-lang/dart-vim-plugin'
on_ft = ['dart']
```

#### [coc-flutter](https://github.com/iamcco/coc-flutter)
[coc.nvim](https://github.com/neoclide/coc.nvim) の Flutter 用プラグイン

```sh
:CocInstall coc-flutter
```

coc-flutter にはファイルのsave時に Flutter の hot reload を実行してる機能があるらしいのですがうまく動かなかったので、[hot-reload.vim](https://github.com/reisub0/hot-reload.vim)を参考に`.vimrc`に設定を追加しました。
```.vimrc
function! TriggerFlutterHotReload() abort
  silent execute '!kill -SIGUSR1 $(pgrep -f "[f]lutter_tool.*run")'
 endfunction
 autocmd! BufWritePost *.dart call TriggerFlutterHotReload()
```

### DevTools のインストール
Flutter の DevTools (https://flutter.dev/docs/development/tools/devtools/cli) をいれると、Inspector, Performance, Logging とか超便利な機能が使えます。
```sh
$ flutter pub global activate devtools
```
起動は
```sh
$ flutter pub global run devtools
```
で、`127.0.0.1:9100`をブラウザで開く
