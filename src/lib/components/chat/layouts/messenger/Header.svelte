<script lang="ts">
	import { ChevronLeft, Search, Phone, Calendar, Menu } from '@lucide/svelte';
	import type { Skin } from '$lib/themes';

	interface Props {
		skin: Skin;
		title: string;
		memberCount: number | null;
	}

	let { skin, title, memberCount }: Props = $props();
</script>

<header
	class="flex items-center gap-2 px-2 py-2"
	style:background={skin.headerBackground}
	style:color={skin.headerForeground}
>
	<ChevronLeft size={24} strokeWidth={1.5} />

	<div class="flex min-w-0 flex-1 items-center gap-1">
		<span class="truncate text-base font-medium">{title}</span>
		{#if memberCount !== null}
			<span class="shrink-0 text-sm opacity-70">{memberCount}</span>
		{/if}
	</div>

	<Search size={22} strokeWidth={1.5} />
	<Phone size={22} strokeWidth={1.5} />
	<Calendar size={22} strokeWidth={1.5} />
	<Menu size={22} strokeWidth={1.5} />
</header>
