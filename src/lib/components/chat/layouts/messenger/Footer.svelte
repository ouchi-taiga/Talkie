<script lang="ts">
	import { Plus, Camera, Image, Smile, Mic } from '@lucide/svelte';
	import type { Skin } from '$lib/themes';

	interface Props {
		skin: Skin;
	}

	let { skin }: Props = $props();
</script>

<!-- 見た目だけの入力欄。実際には入力できない -->
<footer
	class="flex items-center gap-3 px-3 py-2"
	style:background={skin.footerBackground}
	style:color={skin.footerForeground}
>
	<Plus size={24} strokeWidth={1.5} />
	<Camera size={24} strokeWidth={1.5} />
	<Image size={24} strokeWidth={1.5} />

	<div class="flex-1 rounded-full border border-current/20 px-3 py-1.5">
		<span class="text-sm opacity-0">.</span>
	</div>

	<Smile size={24} strokeWidth={1.5} />
	<Mic size={24} strokeWidth={1.5} />
</footer>
