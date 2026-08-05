import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ChatScreen from './ChatScreen.svelte';
import type { Character, Message } from '$lib/types/chat';

const characters: Character[] = [
	{
		id: 'me',
		name: 'わたし',
		side: 'self',
		bubbleColor: '#8de055',
		avatarUrl: null,
		sortOrder: 0
	},
	{
		id: 'you',
		name: 'あいて',
		side: 'other',
		bubbleColor: '#ffffff',
		avatarUrl: null,
		sortOrder: 1
	}
];

function message(overrides: Partial<Message> & Pick<Message, 'id'>): Message {
	return {
		characterId: 'you',
		type: 'text',
		body: 'ほんぶん',
		imageUrl: null,
		time: null,
		isRead: false,
		sortOrder: 0,
		...overrides
	};
}

function setup(messages: Message[], memberCount: number | null = null) {
	return render(ChatScreen, {
		layoutId: 'messenger',
		skinId: 'green',
		title: 'トーク',
		memberCount,
		characters,
		messages
	});
}

describe('ChatScreen', () => {
	it('発言の本文を表示する', async () => {
		const screen = setup([message({ id: 'm1', body: 'これ見た？' })]);
		await expect.element(screen.getByText('これ見た？')).toBeInTheDocument();
	});

	it('1対1では相手の名前を出さない', async () => {
		const screen = setup([message({ id: 'm1' })], null);
		await expect.element(screen.getByText('あいて')).not.toBeInTheDocument();
	});

	it('グループでは相手の名前を出す', async () => {
		const screen = setup([message({ id: 'm1' })], 4);
		await expect.element(screen.getByText('あいて')).toBeInTheDocument();
	});

	it('同じ話者の連続した発言では名前を繰り返さない', async () => {
		const screen = setup(
			[message({ id: 'm1', sortOrder: 0 }), message({ id: 'm2', sortOrder: 1, body: 'つづき' })],
			4
		);
		await expect.element(screen.getByText('つづき')).toBeInTheDocument();
		// 2件とも相手の発言だが、名前は最初の1件だけに出る
		await expect.element(screen.getByText('あいて')).toBeInTheDocument();
		expect(screen.container.textContent?.match(/あいて/g)).toHaveLength(1);
	});

	it('日付ラベルを表示する', async () => {
		const screen = setup([message({ id: 'm1', type: 'date', characterId: null, body: '今日' })]);
		await expect.element(screen.getByText('今日')).toBeInTheDocument();
	});

	it('時刻を表示する', async () => {
		const screen = setup([message({ id: 'm1', time: '12:34' })]);
		await expect.element(screen.getByText('12:34')).toBeInTheDocument();
	});
});
