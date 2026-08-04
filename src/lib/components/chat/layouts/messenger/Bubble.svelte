<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import type { Skin } from '$lib/themes';
	import type { Character, Message } from '$lib/types/chat';

	interface Props {
		skin: Skin;
		message: Message;
		character: Character | null;
		/** 同じ話者の連続した発言の 2 件目以降か。アイコンと名前を省く */
		continued: boolean;
		/** 相手の名前を吹き出しの上に出すか。グループのときだけ true */
		showName: boolean;
	}

	let { skin, message, character, continued, showName }: Props = $props();

	const isSelf = $derived(character?.side === 'self');

	// 自分の発言は色をキャラクター側で上書きできる。相手はスキンの色を使う
	const bubbleBackground = $derived(
		isSelf ? (character?.bubbleColor ?? skin.selfBubble) : skin.otherBubble
	);
	const bubbleForeground = $derived(isSelf ? skin.selfForeground : skin.otherForeground);
</script>

<div class="flex gap-2" class:flex-row-reverse={isSelf}>
	{#if !isSelf}
		<!-- 相手のアイコン。連続発言では場所だけ空けて揃える -->
		<div class="w-10 shrink-0">
			{#if !continued}
				{#if character?.avatarUrl}
					<img src={character.avatarUrl} alt="" class="h-10 w-10 rounded-full object-cover" />
				{:else}
					<div class="h-10 w-10 rounded-full bg-black/15"></div>
				{/if}
			{/if}
		</div>
	{/if}

	<div class="flex max-w-[70%] flex-col" class:items-end={isSelf}>
		{#if showName && !isSelf && !continued && character}
			<span class="mb-1 text-xs" style:color={skin.metaForeground}>{character.name}</span>
		{/if}

		<div class="flex items-end gap-1" class:flex-row-reverse={isSelf}>
			{#if message.type === 'image' && message.imageUrl}
				<img
					src={message.imageUrl}
					alt=""
					class="max-h-60 rounded-2xl object-cover"
					style:background={bubbleBackground}
				/>
			{:else}
				<div
					class="rounded-2xl px-3 py-2 text-sm wrap-break-word whitespace-pre-wrap"
					style:background={bubbleBackground}
					style:color={bubbleForeground}
				>
					{message.body}
				</div>
			{/if}

			<!-- 既読と時刻は吹き出しの外、下端に揃える -->
			<div
				class="flex shrink-0 flex-col text-[10px] leading-tight"
				class:items-end={!isSelf}
				style:color={skin.metaForeground}
			>
				{#if message.isRead}
					<span>{m.chat_read()}</span>
				{/if}
				{#if message.time}
					<span>{message.time}</span>
				{/if}
			</div>
		</div>
	</div>
</div>
