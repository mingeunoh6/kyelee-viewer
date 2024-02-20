<script>
	import { onMount } from 'svelte';
	import models from '$lib/components/models.js';
	onMount(() => {});
</script>

<main>
	<div class="model-list">
		{#each models as { name, src, place }}
			<div>
				<model-viewer
					{src}
					ar
					ar-modes="webxr scene-viewer quick-look"
					ar-placement={place}
					camera-controls
					tone-mapping="commerce"
					shadow-intensity="1"
				>
					<div class="progress-bar hide" slot="progress-bar">
						<div class="update-bar"></div>
					</div>

					<button slot="ar-button" class="ar-button"> VIEW IN AR </button>
				</model-viewer>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 1rem;
		background-color: white;
	}
	.model-list {
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: flex-end;
		flex-direction: column;

		gap: 1rem;
	}
	model-viewer {
		width: 50vw;
		height: 55vw;
		background-color: unset;
	}
</style>
