<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';

	// 言語の表示名。locales が増えたらここに足す
	const localeLabels: Record<string, string> = {
		ja: '日本語',
		en: 'English'
	};
</script>

<main class="mx-auto max-w-2xl p-8">
	<h1 class="text-3xl font-bold">{m.app_name()}</h1>
	<p class="mt-2 text-muted-foreground">{m.app_tagline()}</p>

	<!-- 言語切替の動作確認用。設定画面ができたらそちらへ移す -->
	<section class="mt-8">
		<h2 class="text-sm font-medium">{m.settings_language()}</h2>
		<div class="mt-2 flex gap-2">
			{#each locales as locale (locale)}
				<button
					class="rounded border px-3 py-1 text-sm disabled:opacity-50"
					disabled={getLocale() === locale}
					onclick={() => setLocale(locale)}
				>
					{localeLabels[locale] ?? locale}
				</button>
			{/each}
		</div>
		<p class="mt-2 text-xs text-muted-foreground">
			{m.action_try_now()} / {m.action_login()} / {m.nav_settings()}
		</p>
	</section>
</main>
