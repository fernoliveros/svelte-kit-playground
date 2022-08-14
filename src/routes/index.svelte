<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import List from "$lib/list/List.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<!-- <video src={"src/lib/roll/roll.mp4"} /> -->
<video controls autoplay>
	<source src="/src/lib/roll/roll.mp4" type="video/mp4" />
	Your browser does not support the video tag.
</video>

<!-- 
<section>
	<List />
</section> -->
<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
