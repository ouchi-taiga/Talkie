/**
 * チャット画面の見た目を決める2つの軸。
 *
 * - Layout: 画面の構造。ヘッダーや入力欄に並ぶアイコン、吹き出しの形など
 * - Skin:   配色。将来は壁紙やフォントもここに入る (着せ替え)
 *
 * 2軸に分けているので、レイアウトを1つ足せば全スキンで使え、
 * スキンを1つ足せば全レイアウトで使える。
 */

/**
 * 画面レイアウト。
 *
 * レイアウトごとに Svelte コンポーネントを用意する。
 * ここが持つのは一覧表示と、コンポーネントを引くための ID だけ。
 */
export interface Layout {
	id: string;
	/** 選択画面に出す表示名の翻訳キー。messages/{locale}.json のキー */
	nameKey: string;
}

/**
 * 配色・着せ替え。
 *
 * 色はレイアウトをまたいで使い回せるので、こちらは値で持つ。
 * 各レイアウトのコンポーネントはこの値を props で受け取って描画する。
 * スキンを増やしてもコンポーネント側は変更しなくてよい。
 */
export interface Skin {
	id: string;
	/** 選択画面に出す表示名の翻訳キー */
	nameKey: string;

	/** トーク画面の背景 */
	background: string;
	/** ヘッダーの背景 */
	headerBackground: string;
	/** ヘッダーの文字・アイコンの色 */
	headerForeground: string;
	/** 自分の吹き出しの背景 */
	selfBubble: string;
	/** 自分の吹き出しの文字色 */
	selfForeground: string;
	/** 相手の吹き出しの背景 */
	otherBubble: string;
	/** 相手の吹き出しの文字色 */
	otherForeground: string;
	/** 時刻・既読など、控えめに出す文字の色 */
	metaForeground: string;
	/** システムメッセージ・日付ラベルの背景 */
	systemBackground: string;
	/** システムメッセージ・日付ラベルの文字色 */
	systemForeground: string;
	/** 入力欄の背景 */
	footerBackground: string;
	/** 入力欄の文字・アイコンの色 */
	footerForeground: string;
}
