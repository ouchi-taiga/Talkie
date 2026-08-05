import { describe, expect, it } from 'vitest';
import { findLayout, findSkin, layouts, skins, defaultLayout, defaultSkin } from './index';

describe('findLayout', () => {
	it('id が一致するレイアウトを返す', () => {
		expect(findLayout('social').id).toBe('social');
	});

	it('存在しない id ではデフォルトを返す', () => {
		expect(findLayout('does-not-exist')).toBe(defaultLayout);
	});
});

describe('findSkin', () => {
	it('id が一致するスキンを返す', () => {
		expect(findSkin('blue').id).toBe('blue');
	});

	it('存在しない id ではデフォルトを返す', () => {
		expect(findSkin('does-not-exist')).toBe(defaultSkin);
	});
});

describe('一覧の整合性', () => {
	it('レイアウトの id が重複していない', () => {
		const ids = layouts.map((l) => l.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('スキンの id が重複していない', () => {
		const ids = skins.map((s) => s.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('デフォルトが一覧に含まれている', () => {
		expect(layouts).toContain(defaultLayout);
		expect(skins).toContain(defaultSkin);
	});

	it('スキンはすべて同じ色のキーを持つ', () => {
		const keys = Object.keys(defaultSkin).sort();
		for (const skin of skins) {
			expect(Object.keys(skin).sort()).toEqual(keys);
		}
	});
});
