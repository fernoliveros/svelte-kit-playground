<script lang="ts">
	// import Header from "$lib/header/Header.svelte";
	// import "../app.css";
	// export let env = import.meta.env.VITE_ENV;
</script>

<!-- <Header />

<main>
	<slot />
</main>

<footer>
	<p>environment: {env}</p>
</footer> -->

<main>
	<video controls autoplay>
		<source src="/src/lib/roll/roll.mp4" type="video/mp4" />
		Your browser does not support the video tag.
	</video>
	<div class="container">
		<span class="fact">FACT</span>
	</div>
	<img src="/src/lib/roll/face.png" />
</main>

<style>
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
