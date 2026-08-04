<script lang="ts">
	import type { Skin } from '$lib/themes';
	import type { Message } from '$lib/types/chat';

	interface Props {
		skin: Skin;
		message: Message;
	}

	let { skin, message }: Props = $props();
</script>

<!-- システムメッセージと日付ラベル。どちらも中央に出る -->
<div class="flex justify-center">
	<span
		class="rounded-full px-3 py-1 text-xs"
		style:background={skin.systemBackground}
		style:color={skin.systemForeground}
	>
		{message.body}
	</span>
</div>
