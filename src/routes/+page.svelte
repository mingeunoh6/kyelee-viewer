<script>
	import { onMount } from 'svelte';

	onMount(() => {});
</script>

<h1>Page</h1>
<model-viewer
	src="models/ChairWings.glb"
	ar
	ar-modes="webxr scene-viewer quick-look"
	camera-controls
	tone-mapping="commerce"
	shadow-intensity="1"
>
	<div class="progress-bar hide" slot="progress-bar">
		<div class="update-bar"></div>
	</div>
	<button slot="ar-button" id="ar-button"> View in your space </button>
</model-viewer>

<style>
	h1 {
		color: red;
	}
</style>
