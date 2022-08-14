<script lang="ts">
	// import Header from "$lib/header/Header.svelte";
	// import "../app.css";
	// export let env = import.meta.env.VITE_ENV;

	import { browser } from "$app/env";
</script>

<!-- <Header />

<main>
	<slot />
</main>

<footer>
	<p>environment: {env}</p>
</footer> -->

<main>
	{#if browser}
		<!-- <iframe
			src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
			frameborder="0"
			allowfullscreen
		/> -->
		<video autoplay>
			<source src="roll.mp4" type="video/mp4" />
			<source src="roll.ogv" type="video/ogg" />
			Your browser does not support the video tag.
		</video>
		<div class="container">
			<span class="fact">FACT</span>
		</div>
		<img src="face.png" alt="my face" />
	{/if}
</main>

<style>
	iframe {
		aspect-ratio: 1.7;
	}
	.container {
		position: relative;
		display: flex;
		justify-content: center;
	}
	.fact {
		font-size: 5rem;
		font-weight: bolder;
		color: white;
		-webkit-text-stroke: 0.2rem black;
		position: absolute;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
