import type { Layout } from './types';

/** ヘッダーと入力欄にアイコンが並ぶ、メッセージアプリ風 */
export const messenger: Layout = {
	id: 'messenger',
	nameKey: 'layout_messenger'
};

/** 余白が広くシンプルな、SNS のダイレクトメッセージ風 */
export const social: Layout = {
	id: 'social',
	nameKey: 'layout_social'
};

/** 選択できるレイアウトの一覧。表示順はこの配列の順 */
export const layouts: Layout[] = [messenger, social];

/** 未指定・不正な ID のときに使うレイアウト */
export const defaultLayout = messenger;

export function findLayout(id: string): Layout {
	return layouts.find((l) => l.id === id) ?? defaultLayout;
}
