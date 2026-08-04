import type { Character, Message } from '$lib/types/chat';

/**
 * テーマの表示確認に使うサンプル会話。
 * 全ての発言タイプと、連続発言・既読・時刻を含める。
 */

export const sampleCharacters: Character[] = [
	{
		id: 'c1',
		name: 'わたし',
		side: 'self',
		bubbleColor: '#8de055',
		avatarUrl: null,
		sortOrder: 0
	},
	{
		id: 'c2',
		name: 'ともだち',
		side: 'other',
		bubbleColor: '#ffffff',
		avatarUrl: null,
		sortOrder: 1
	}
];

export const sampleMessages: Message[] = [
	{
		id: 'm1',
		characterId: null,
		type: 'date',
		body: '今日',
		imageUrl: null,
		time: null,
		isRead: false,
		sortOrder: 0
	},
	{
		id: 'm2',
		characterId: 'c2',
		type: 'text',
		body: 'これ見た？',
		imageUrl: null,
		time: '12:00',
		isRead: false,
		sortOrder: 1
	},
	{
		id: 'm3',
		characterId: 'c2',
		type: 'text',
		body: 'めちゃくちゃ話題になってるやつ',
		imageUrl: null,
		time: '12:00',
		isRead: false,
		sortOrder: 2
	},
	{
		id: 'm4',
		characterId: 'c1',
		type: 'text',
		body: 'まだ見てない\nそんなにすごいの？',
		imageUrl: null,
		time: '12:01',
		isRead: true,
		sortOrder: 3
	},
	{
		id: 'm5',
		characterId: 'c2',
		type: 'text',
		body: 'ヤバすぎるんだが',
		imageUrl: null,
		time: '12:02',
		isRead: false,
		sortOrder: 4
	},
	{
		id: 'm6',
		characterId: null,
		type: 'system',
		body: 'ともだち が写真を送信しました',
		imageUrl: null,
		time: null,
		isRead: false,
		sortOrder: 5
	},
	{
		id: 'm7',
		characterId: 'c1',
		type: 'text',
		body: 'たしかにこれはすごい',
		imageUrl: null,
		time: '12:05',
		isRead: true,
		sortOrder: 6
	}
];
