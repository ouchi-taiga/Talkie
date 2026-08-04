<script lang="ts">
	import type { Skin } from '$lib/themes';
	import type { Character, Message } from '$lib/types/chat';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import Bubble from './Bubble.svelte';
	import SystemLine from './SystemLine.svelte';

	interface Props {
		skin: Skin;
		title: string;
		memberCount: number | null;
		characters: Character[];
		/** sortOrder 順に並んでいる前提 */
		messages: Message[];
		showHeader?: boolean;
		showFooter?: boolean;
	}

	let {
		skin,
		title,
		memberCount,
		characters,
		messages,
		showHeader = true,
		showFooter = true
	}: Props = $props();

	const characterById = $derived(new Map(characters.map((c) => [c.id, c])));

	/**
	 * グループなら相手の名前を吹き出しの上に出す。
	 * 1対1では誰の発言か自明なので出さない (実際のチャットもそうなっている)。
	 */
	const isGroup = $derived(memberCount !== null);

	/**
	 * 同じ話者の発言が続いているかを先に求めておく。
	 * 直前が別の話者・システム・日付なら区切りとみなす。
	 */
	const rows = $derived(
		messages.map((message, i) => {
			const previous = messages[i - 1];
			const continued =
				previous?.type === message.type &&
				message.type !== 'system' &&
				message.type !== 'date' &&
				previous?.characterId === message.characterId;

			return {
				message,
				character: message.characterId ? (characterById.get(message.characterId) ?? null) : null,
				continued
			};
		})
	);
</script>

<div class="flex h-full flex-col" style:background={skin.background}>
	{#if showHeader}
		<Header {skin} {title} {memberCount} />
	{/if}

	<div class="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
		{#each rows as row (row.message.id)}
			{#if row.message.type === 'system' || row.message.type === 'date'}
				<SystemLine {skin} message={row.message} />
			{:else}
				<Bubble
					{skin}
					message={row.message}
					character={row.character}
					continued={row.continued}
					showName={isGroup}
				/>
			{/if}
		{/each}
	</div>

	{#if showFooter}
		<Footer {skin} />
	{/if}
</div>
