# hamu house

## hamu house is hamu's house

### 作りたいアプリ概要

#### 困ったときに何をすればいいのか明確にするための、自由度の高いランキングサイト：Dein（仮名）

* コンセプト：変幻自在のプラットフォーム
* 名前の意味：脱却のdeと滞在する空間のinで、よりよいプラットフォームを求めていくことを願ってつけました。
* カラー：単調なモノクロ
* アイコン：黒い線の丸　例：〇

##### 検索キーワードのランキングを提供する

* 困ったとき、キーワード検索を使うと対処法が見つかりやすい
* しかし検索するときにどんなキーワードを入力すればいいのかわからない
* キーワード検索は入力するのが面倒

**キーワードを入力しなくても、他ユーザーがすでに使用したキーワード検索を利用して検索**できるようにする。
ユーザーが状況と検索キーワードを登録し、それを[if-then](https://yuchrszk.blogspot.com/2017/05/if-then.html "目標達成にはやっぱり「if-thenプランニング」が最強説")形式でランキングにし、他のユーザーが使用できるようにする。
ユーザーの使用率でランキングの順位を決める。
if-thenの例：薄毛を治すとき＞[パレオな男　薄毛](https://duckduckgo.com/?q=%E3%83%91%E3%83%AC%E3%82%AA%E3%81%AA%E7%94%B7+%E8%96%84%E6%AF%9B&ia=web "duckduckgo.com")

##### ペルソナ設定を明確にしたランキングを提供する

* 既存のランキングは誰のための物なのかわからない
* Amazonのランキングなどは老若男女問わず統計したものを表示している。
* 画一的なランキングを一掃したい。

**一人一人の特徴に合わせたランキング**を提供するアプリを作る。
ユーザーがペルソナを入力し、ペルソナが近いユーザーの統計をランキングにして提供する。

##### 正しい情報を得るためにファクトチェックの精度を上げる

* 偽の情報で正しい行動をとることができないことがある　例：嘘の健康情報
* フェイクニュースの問題が取りざたされているが、フェイクと判断するファクトチェックの精度の高さがわからない
* 科学のデータには信頼レベルがあり（[参考](https://yuchrszk.blogspot.com/2016/01/blog-post_12.html "「パレオな男」の正しい読み方")）、信頼レベルにより真偽の判断をする

信頼レベルを％で示した情報ランキングなどを提供する。情報の例：健康、ニュース
ある情報に対する関係度の高いデータを信頼レベルを加味してランキングにする。
データの提出元や作成方法から信頼レベルをユーザーの投票で決める。

##### 比較してよりよいデザインをユーザー自身が選択できるようにする

* Googleなど既存のキーワード検索のデザインは不愛想
* 人はコントロールできてる感が好き（[BYAF法](https://yuchrszk.blogspot.com/2017/06/22000.html "22,000人のデータ分析でわかった最強の説得術「ＢＹＡＦ法」")、イケヤ効果）
* 多すぎる選択肢を一気に提供すべきではない（[参考](https://yuchrszk.blogspot.com/2015/02/blog-post_17.html "選択肢が多すぎて何も選べないときは「トーナメント方式」を使うといいよ！")）

スプリットレイアウトで比較する。一つは現在の設定のページ、もう一つは新しい設定のページ。
新旧の設計を比較してよりよい設計を評価して採用できるようにする。
CSSをユーザーが選択できるようにして、人気のCSSをランキングにしてよりよいデザインを採用する
ユーザー設定をランキング化して自動設定できるようにし、よりよい設定を明確にする

##### ユーザーに真の選択権を与え、アプリの民主主義化を図る

* 既存のアプリは設計者が与えたものをユーザーが利用するだけ
* ユーザーができる設定は限られている

アプリの深い設計レベルからユーザーが選択できるようにする。
よりよい仕組みを考えるために集合知を利用する。ユーザーたちの意見をまとめるための多数決を使う。その一つの方法がランキング化。全体主義で画一的にならないようグループ化でランキングを細分化する。

##### 人を助ける機会を提供し、幸福感を高める

* 小さなことでも他人へ具体的な親切をすることで幸福感が増す（[ヘルパーズハイ](https://yuchrszk.blogspot.com/2018/03/blog-post_3.html "最強の幸福術「ヘルパーズハイ」を作り出す科学的に正しい方法とは？")）

ユーザーの選択が他者の利益に繋がるようにする。
自分の選択がランキングに影響を与えていることを実感できるようリアルタイムで数値の表示を変更していく。
小さな行動が大きな結果に結びつくことをアピールする。

#### 創発

##### 分散型のプラットフォームを提供する

* 中央集権的なサイトは民主主義的ではない
* サイト運営のリスクを分散したい

サイトの運用が困難になったときや、よりよいサイトを作ってもらえるように、クローンサイトを手軽に作れるようにする。
クローンサイト同士を比較してよりよいサイトを評価できるようにする。
オープンソースで開発し、JSON形式でサイトの設定を出力できるようにする。
最終的にＰ２Ｐで分散化する。