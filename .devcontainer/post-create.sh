#!/usr/bin/env bash
# dev container 作成時のセットアップ。
# ~/.claude は named volume なのでコンテナ再作成後も中身が残る。
# 各コマンドは冪等 (2回目以降は「already installed」で正常終了) なため、
# volume が使い回されても再実行して問題ない。
set -euo pipefail

# volume マウント直後は root 所有になっているため node に戻す
sudo chown -R node:node /home/node/.claude

# Svelte 公式の Claude Code プラグイン (Svelte 5 / Runes のドキュメント・スキル)。
# .claude/settings.json の enabledPlugins で有効化済みなので、実体を取得するだけ。
claude plugin marketplace add sveltejs/ai-tools
claude plugin install svelte@svelte

# 依存関係。package-lock.json に忠実に入れる
npm ci

# Playwright のブラウザ本体と OS 共有ライブラリ。
# vitest の client プロジェクトが chromium 実機を使うため、これが無いと
# npm run test:unit すら起動できない (libnspr4.so 不足で exit 127)。
# ~/.cache と apt パッケージはボリューム外なのでリビルドごとに必要。
sudo npx playwright install-deps chromium
npx playwright install chromium

echo "✅ post-create セットアップ完了"
