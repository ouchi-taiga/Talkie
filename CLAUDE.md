# CLAUDE.md

## プロジェクト

チャット小説メーカー (Talkie)。LINE 風のチャット画面を作成し、リアルタイムプレビュー・
PNG 書き出し・1発言ずつのアニメーション再生を行う Web アプリ。

- **何を作るか** → [docs/requirements.md](docs/requirements.md)
- **どう作るか** → [docs/design.md](docs/design.md)

**現状: Vercel へのデプロイ疎通、多言語対応 (Paraglide)、チャットプレビューの
表示 (3a) まで完了。エディタは未実装。**

実装は [docs/design.md](docs/design.md) §8 の順で進める。
**次は「3b. エディタ本体」(発言・キャラの CRUD、D&D 並べ替え、レスポンシブ)。**
`social` レイアウトも未実装 (`ChatScreen.svelte` に TODO)。

## 構成

**SvelteKit のフルスタック構成。** バックエンドを別に立てない。

```text
ブラウザ (Svelte 5 + Tailwind + shadcn-svelte)
    ↓
Vercel (SvelteKit サーバーサイド = バックエンド)
    ↓ Drizzle ORM
Supabase (PostgreSQL + Storage)
```

認証は **Better Auth**、ORM は **Drizzle**、多言語は **Paraglide JS**。
いずれも `sv add` の公式アドオンで導入する。並べ替えは **svelte-dnd-action**。

## 技術方針

- **Svelte 5 Runes 必須。** [vite.config.ts](vite.config.ts) で `runes: true` を強制済み
  (`node_modules` 以外)。`export let` / `$:` / ストアの `$` 構文は使わず、
  `$state` / `$derived` / `$props` / `$effect` を使う。
- **UI は shadcn-svelte** (`style: vega`, `baseColor: neutral`, icons: lucide)。
  コンポーネントは必要な時に個別追加する: `npx shadcn-svelte@latest add button`
- **`svelte.config.js` は無い。** SvelteKit の設定は [vite.config.ts](vite.config.ts) の
  `sveltekit()` 内に統合されている (新形式)。探しても無いので新規作成しないこと。
- **エディタはトーク画面そのもの。** 編集用の画面を別に持たず、トーク画面の上で
  直接編集する。編集モード (つまみ・点線・枠線を出す) とプレビューモード
  (何も足さない = 書き出される絵) を切り替える。詳細は §6.2。
- **レスポンシブは必須要件。** トーク画面は常時表示。作品設定の置き場所だけが
  変わる (PC は左パネル、狭い画面はオーバーレイ)。
  **判定は画面幅で行い、タッチデバイス判定では分岐しない** (SSR と相性が悪く、
  ハイブリッド端末で破綻する)。
- **並べ替えは `svelte-dnd-action`。** マウスとタッチの両対応が必須要件のため。
  上下ボタンでの代替は不可。実装上の注意 (再代入必須・キー必須・`delayTouchStart`) は
  [docs/design.md](docs/design.md) §6.3 を参照。
- **UI の文字列は直接書かない。** Paraglide の `messages/{ja,en}.json` に書き、
  `m.key()` で呼ぶ。`src/lib/paraglide/` は生成物なので編集しない。詳細は §6.8。

## 実装ルール

設計書 §2.1 のレイヤー分離を守る。将来 ORM やバックエンドを差し替えられる状態を保つため。

- **DB アクセスは `$lib/server/db/` に閉じる。** Drizzle 固有のコードを他の場所に書かない
- **ビジネスロジックを `+page.server.ts` に書かない。** `$lib/server/services/` に置く
- **認可はアプリ層で行う。** RLS は使わない (ORM 経由だとバイパスされるため)。
  **すべてのクエリで所有者 (`userId`) を検証する**。子テーブルの操作でも親の所有者を見る
- **お試しモード (`/try`) とログイン後のエディタは同じコンポーネントを使う。**
  保存先だけを差し替える (DB / localStorage)。画面を2つ作らない
- **チャット画面の見た目は Layout × Skin の2軸。** Layout (画面構造) は
  レイアウトごとの Svelte コンポーネント、Skin (配色) は値で持ち props で渡す。
  **`if (layoutId === '...')` の分岐を書かない。** 詳細は §3.5

## 絶対に守ること: 実在サービスの商標を使わない

チャット画面のデザインを再現するが、**実在サービスのロゴ・名称は一切使わない**。
将来の課金を見据えたリスク回避。詳細は [docs/design.md](docs/design.md) §7。

- **ロゴ・アイコン画像を同梱しない。** アイコンはユーザーがアップロードする
- **テーマ名は中立にする。** `green` / `blue` / `dark` 等。「LINE風」等は使わない
- **コード・コメント・UI・ドキュメントに実在サービス名を書かない**

## コマンド

```sh
npm run dev          # 開発サーバー (--host 付き)
npm run check        # svelte-check (型チェック)
npm run lint         # prettier --check && eslint
npm run format       # prettier --write
npm run test:unit -- --run   # vitest (client: chromium実機 / server: node)
npm test             # unit + e2e
```

## 注意点

- **テストは chromium 実機を使う。** vitest の client プロジェクトが
  `browser.enabled: true` のため、Playwright のブラウザ本体と OS 共有ライブラリが
  必要。[.devcontainer/post-create.sh](.devcontainer/post-create.sh) で導入済みだが、
  `libnspr4.so` 不足のエラーが出たら `sudo npx playwright install-deps chromium` を実行。
- **テストは `expect` が必須。** `requireAssertions: true` のため、アサーションが
  無いテストは失敗する。
- **テストファイルの命名で実行環境が変わる。**
  `*.svelte.{test,spec}.ts` → ブラウザ / `*.{test,spec}.ts` → node
- **Markdown を書いたら `npm run format` を実行する。** Prettier が表を整形する。
  `npm run lint` に含まれるため、未整形だと CI が落ちる。
- **雛形の残骸あり。** `src/lib/vitest-examples/` と `src/routes/demo/` は
  `sv create` のサンプル。実装開始時に削除してよい。
- `src/routes/layout.css` が Tailwind のエントリ (慣例的な `app.css` ではない)。
- **Drizzle は pre-1.0。** 安定版 (0.45.x) を使い、beta は入れない。
  `drizzle-kit push` は開発時のみ (列を silent に drop する)。本番は `generate` → `migrate`。
- **iOS の画像保存に注意。** PNG 書き出しは要件の中核だが、iOS Safari では
  「写真に保存」が出ないことがある。生成画像を `<img>` で表示して長押し保存させる経路を
  主にする。詳細は [docs/design.md](docs/design.md) §6.4。
