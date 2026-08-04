/**
 * チャット作品のデータ型。
 *
 * ログイン時は DB に、未ログインのお試し利用では localStorage に保存する。
 * 保存先を差し替えられるよう、どちらでもこの型をそのまま使う。
 */

/** 吹き出しを左右どちらに出すか */
export type CharacterSide = 'self' | 'other';

/** 発言の種類 */
export type MessageType =
	/** ふつうの発言 */
	| 'text'
	/** 画像の添付 */
	| 'image'
	/** 「〇〇が退室しました」など。中央に出る */
	| 'system'
	/** 「今日」「1月1日(月)」など、会話の区切りに出る日付ラベル */
	| 'date';

/** 登場人物 */
export interface Character {
	id: string;
	name: string;
	/** self = 自分 (右)、other = 相手 (左) */
	side: CharacterSide;
	/** 吹き出しの色。CSS の色として使える文字列 */
	bubbleColor: string;
	/** アイコン画像。未設定なら null */
	avatarUrl: string | null;
	/** 一覧での並び順。0 から始まる連番 */
	sortOrder: number;
}

/** 発言 */
export interface Message {
	id: string;
	/** 話者。system と date では null */
	characterId: string | null;
	type: MessageType;
	/** text / system / date の本文。date なら "今日" や "1月1日(月)" が入る */
	body: string | null;
	/** type が 'image' のときの画像 URL */
	imageUrl: string | null;
	/**
	 * 吹き出しの脇に出す時刻。"12:34" のような表示用の文字列。
	 * 実際の送信時刻ではなく創作物の演出なので、日時型では持たない。
	 * 時刻を出したくない発言では null。
	 */
	time: string | null;
	/** 既読表示を出すか */
	isRead: boolean;
	/** 表示順。0 から始まる連番。並べ替えたら全件振り直す */
	sortOrder: number;
}

/** 作品 */
export interface Project {
	id: string;
	/** 作品の管理名。一覧に出るもので、チャット画面には出ない */
	title: string;
	/** チャット画面のヘッダーに出す名前。相手の名前やグループ名 */
	chatTitle: string;
	/**
	 * ヘッダーに出す人数。グループを表現するときに使う。
	 * 1対1なら null にして人数を出さない。
	 */
	memberCount: number | null;
	/** 画面レイアウト。$lib/themes の Layout.id と対応する */
	layoutId: string;
	/** 配色・着せ替え。$lib/themes の Skin.id と対応する */
	skinId: string;
	characters: Character[];
	messages: Message[];
}
