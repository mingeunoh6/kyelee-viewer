<script>
	import { afterUpdate, onMount, tick } from 'svelte';

	export let data;
	let readyCount = 0;

	const products = data.products;

	function checkAllLoaded() {
		const models = document.querySelectorAll('model-viewer');
		let loadedCount = 0;

		models.forEach((model) => {
			if (model.loaded) {
				loadedCount++;
			}
		});

		if (loadedCount === models.length) {
			console.log('All model-viewer elements loaded completely');
			document.querySelector('.loading-overlay').style.opacity = '0';
			document.querySelector('.loading-overlay').style.pointerEvents = 'none';
			setTimeout(() => {
				document.querySelector('.loading-overlay').style.display = 'none';
			}, 500);
		}
	}

	onMount(async () => {
		console.log('on mount');
		const models = document.querySelectorAll('model-viewer');

		models.forEach((model) => {
			model.addEventListener('load', () => {
				readyCount++;
				if (readyCount === models.length) {
					checkAllLoaded();
				}
			});
		});
	});

	afterUpdate(() => {
		tick().then(() => {
			checkAllLoaded();
		});
	});
</script>

<div class="loading-overlay">
	<div class="loader-container">
		<svg class="spinner" viewBox="0 0 50 50">
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color: #1AE1CE; stop-opacity: 1" />
					<stop offset="100%" style="stop-color: #FFFFFF; stop-opacity: 0" />
				</linearGradient>
			</defs>
			<circle
				class="path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				stroke="url(#gradient)"
				stroke-width="4"
			></circle>
		</svg>
	</div>
</div>

<main>
	{#each products as product}
		<div class="model-group">
			<div>
				<a href={`/products/${product.id}`}>{product.name}</a>
			</div>
			<model-viewer
				on:load={(e) => {
					console.log(e);
				}}
				on:poster-dismissed={() => {
					console.log('poster dismissed');
				}}
				id={`model-${product.id}`}
				src={product.src}
				loading="eager"
				auto-rotate
				poster={product.poster}
				ar
				ar-modes="webxr scene-viewer quick-look"
				ar-placement={product.place}
				tone-mapping="commerce"
				shadow-intensity="1"
			>
				<div class="progress-bar" slot="progress-bar">
					<div
						class="update-bar
				"
					></div>
				</div>
				<button slot="ar-button" class="ar-button"> VIEW IN AR </button>
			</model-viewer>
		</div>
		<div class="border" />
	{/each}
</main>

<style>
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		opacity: 1;
		transition: opacity 0.5s;
	}

	.loader-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh; /* Adjust as needed */
	}

	.spinner {
		width: 50px; /* Size of the spinner */
		height: 50px; /* Size of the spinner */
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.path {
		stroke-linecap: round;
	}

	.border {
		background-color: black;
		height: 0.5px;
		margin-top: 8px;
		margin-bottom: 8px;
	}
	main {
		padding: 1rem;
		background-color: white;
	}
	.model-group {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	model-viewer {
		width: 50vw;
		height: 55vw;
		background-color: unset;
	}

	.ar-button {
		display: none;
	}

	a {
		color: rgba(67, 67, 67, 0.8);
		border-color: rgba(67, 67, 67, 0.5);
	}
</style>
