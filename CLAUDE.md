# CLAUDE.md

## プロジェクト

SNS風・自作チャット小説メーカー (Talkie)。LINE風のチャット画面を作成し、リアルタイム
プレビュー・PNG書き出し・1発言ずつのアニメーション再生を行うツール。

要件定義は [docs/requirements.md](docs/requirements.md) を参照。

**現状: 環境整備のみ完了。MVP機能は未実装。**

## 技術方針

- **Svelte 5 Runes 必須。** [vite.config.ts](vite.config.ts) で `runes: true` を強制済み
  (`node_modules` 以外)。`export let` / `$:` / ストアの `$` 構文は使わず、
  `$state` / `$derived` / `$props` / `$effect` を使う。
- **UI は shadcn-svelte** (`style: vega`, `baseColor: neutral`, icons: lucide)。
  要件定義書には当初 DaisyUI と書かれていたが shadcn-svelte に決定済み。DaisyUI は使わない。
  コンポーネントは必要な時に個別追加する: `npx shadcn-svelte@latest add button`
- **バックエンドなし。** データは `localStorage` に保存し、サーバー通信を発生させない。
  画像生成もクライアントサイドで完結させる。
- **`svelte.config.js` は無い。** SvelteKit の設定は [vite.config.ts](vite.config.ts) の
  `sveltekit()` 内に統合されている (新形式)。探しても無いので新規作成しないこと。

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
- **雛形の残骸あり。** `src/lib/vitest-examples/` と `src/routes/demo/` は
  `sv create` のサンプル。実装開始時に削除してよい。
- `src/routes/layout.css` が Tailwind のエントリ (慣例的な `app.css` ではない)。
