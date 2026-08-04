<script lang="ts">
	import { findLayout, findSkin } from '$lib/themes';
	import type { Character, Message } from '$lib/types/chat';
	import MessengerScreen from './layouts/messenger/Screen.svelte';

	interface Props {
		layoutId: string;
		skinId: string;
		title: string;
		memberCount: number | null;
		characters: Character[];
		messages: Message[];
		showHeader?: boolean;
		showFooter?: boolean;
	}

	let {
		layoutId,
		skinId,
		title,
		memberCount,
		characters,
		messages,
		showHeader = true,
		showFooter = true
	}: Props = $props();

	/**
	 * レイアウトごとの画面コンポーネント。
	 * 構造がレイアウトごとに違うので、値ではなくコンポーネントで持つ。
	 * レイアウトを追加したらここに足す。
	 */
	const screens = {
		messenger: MessengerScreen,
		// TODO: social 用の Screen を用意する。それまでは messenger で代用する
		social: MessengerScreen
	};

	const layout = $derived(findLayout(layoutId));
	const skin = $derived(findSkin(skinId));
	const Screen = $derived(screens[layout.id as keyof typeof screens] ?? MessengerScreen);
</script>

<Screen {skin} {title} {memberCount} {characters} {messages} {showHeader} {showFooter} />
