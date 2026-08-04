import type { Skin } from './types';

/** 明るい背景に緑の吹き出し */
export const green: Skin = {
	id: 'green',
	nameKey: 'skin_green',

	background: '#8ca6bd',
	headerBackground: '#8ca6bd',
	headerForeground: '#ffffff',
	selfBubble: '#8de055',
	selfForeground: '#000000',
	otherBubble: '#ffffff',
	otherForeground: '#000000',
	metaForeground: '#ffffff',
	systemBackground: 'rgba(0, 0, 0, 0.2)',
	systemForeground: '#ffffff',
	footerBackground: '#ffffff',
	footerForeground: '#8a8a8a'
};

/** 白背景に青の吹き出し */
export const blue: Skin = {
	id: 'blue',
	nameKey: 'skin_blue',

	background: '#ffffff',
	headerBackground: '#ffffff',
	headerForeground: '#000000',
	selfBubble: '#3797f0',
	selfForeground: '#ffffff',
	otherBubble: '#efefef',
	otherForeground: '#000000',
	metaForeground: '#8e8e8e',
	systemBackground: 'transparent',
	systemForeground: '#8e8e8e',
	footerBackground: '#ffffff',
	footerForeground: '#8e8e8e'
};

/** 暗い背景 */
export const dark: Skin = {
	id: 'dark',
	nameKey: 'skin_dark',

	background: '#1c1c1e',
	headerBackground: '#2c2c2e',
	headerForeground: '#ffffff',
	selfBubble: '#0b84ff',
	selfForeground: '#ffffff',
	otherBubble: '#3a3a3c',
	otherForeground: '#ffffff',
	metaForeground: '#8e8e93',
	systemBackground: 'rgba(255, 255, 255, 0.1)',
	systemForeground: '#8e8e93',
	footerBackground: '#2c2c2e',
	footerForeground: '#8e8e93'
};

/** 選択できるスキンの一覧。表示順はこの配列の順 */
export const skins: Skin[] = [green, blue, dark];

/** 未指定・不正な ID のときに使うスキン */
export const defaultSkin = green;

export function findSkin(id: string): Skin {
	return skins.find((s) => s.id === id) ?? defaultSkin;
}
