<script>
	import { onMount } from 'svelte';
	import models from '$lib/components/models.js';

	let arButton;

	function activateAR(e) {
		let mv = e.target.parentElement.querySelector('model-viewer');

		if (mv.canActivateAR) {
			mv.activateAR();
		} else {
			alert('Try on mobile Chrome or Safari');
			mv.addEventListener('ar-status', (ev) => {
				if (ev.detail.status === 'scene-viewer-not-supported') {
					alert('Scene Viewer is not supported on this device');
				}
			});
		}
	}

	onMount(() => {});
</script>

<main>
	<div class="model-list">
		{#each models as { name, src, place }, index}
			<div class="model-group">
				<div>
					<a href={`/products/${index}`}>{name} 상세보기</a>
				</div>
				<button bind:this={arButton} on:click={activateAR}>{name} in AR</button>
				<div>
					<model-viewer
						{src}
						loading="eager"
						ar
						ar-modes="webxr scene-viewer quick-look"
						ar-placement={place}
						tone-mapping="commerce"
						shadow-intensity="1"
					>
						<div class="progress-bar hide" slot="progress-bar">
							<div class="update-bar"></div>
						</div>

						<button slot="ar-button" class="ar-button"> VIEW IN AR </button>
					</model-viewer>
				</div>
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
	.ar-button {
		display: none;
	}
	model-viewer {
		width: 50vw;
		height: 55vw;
		background-color: unset;
	}
</style>
