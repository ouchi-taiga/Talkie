<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';
	import ChatScreen from '$lib/components/chat/ChatScreen.svelte';
	import { layouts, skins } from '$lib/themes';
	import { sampleCharacters, sampleMessages } from '$lib/themes/sample';

	const localeLabels: Record<string, string> = {
		ja: '日本語',
		en: 'English'
	};

	// 表示確認用。あとで作品データから受け取る
	let layoutId = $state(layouts[0].id);
	let skinId = $state(skins[0].id);
	let showHeader = $state(true);
	let showFooter = $state(true);
	let isGroup = $state(false);
</script>

<main class="mx-auto max-w-5xl p-6">
	<h1 class="text-2xl font-bold">{m.app_name()}</h1>
	<p class="mt-1 text-sm text-muted-foreground">{m.app_tagline()}</p>

	<div class="mt-6 grid gap-6 md:grid-cols-[16rem_1fr]">
		<div class="space-y-5 text-sm">
			<section>
				<h2 class="mb-2 font-medium">{m.settings_language()}</h2>
				<div class="flex flex-wrap gap-2">
					{#each locales as locale (locale)}
						<button
							class="rounded border px-3 py-1 disabled:opacity-40"
							disabled={getLocale() === locale}
							onclick={() => setLocale(locale)}
						>
							{localeLabels[locale] ?? locale}
						</button>
					{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-2 font-medium">Layout</h2>
				<div class="flex flex-wrap gap-2">
					{#each layouts as layout (layout.id)}
						<button
							class="rounded border px-3 py-1 disabled:opacity-40"
							disabled={layoutId === layout.id}
							onclick={() => (layoutId = layout.id)}
						>
							{layout.id}
						</button>
					{/each}
				</div>
			</section>

			<section>
				<h2 class="mb-2 font-medium">Skin</h2>
				<div class="flex flex-wrap gap-2">
					{#each skins as skin (skin.id)}
						<button
							class="rounded border px-3 py-1 disabled:opacity-40"
							disabled={skinId === skin.id}
							onclick={() => (skinId = skin.id)}
						>
							{skin.id}
						</button>
					{/each}
				</div>
			</section>

			<section class="space-y-1">
				<label class="flex items-center gap-2">
					<input type="checkbox" bind:checked={showHeader} />
					ヘッダーを表示
				</label>
				<label class="flex items-center gap-2">
					<input type="checkbox" bind:checked={showFooter} />
					入力欄を表示
				</label>
				<label class="flex items-center gap-2">
					<input type="checkbox" bind:checked={isGroup} />
					グループ (相手の名前を出す)
				</label>
			</section>
		</div>

		<!-- スマホの画面を模した枠 -->
		<div class="mx-auto h-150 w-full max-w-93.75 overflow-hidden rounded-xl border shadow-sm">
			<ChatScreen
				{layoutId}
				{skinId}
				title={isGroup ? 'なかよしグループ' : 'ともだち'}
				memberCount={isGroup ? 4 : null}
				characters={sampleCharacters}
				messages={sampleMessages}
				{showHeader}
				{showFooter}
			/>
		</div>
	</div>
</main>
