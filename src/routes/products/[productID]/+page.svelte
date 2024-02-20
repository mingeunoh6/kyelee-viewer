<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let data;
	const products = data.product;
	let srcUrl;
	onMount(() => {
		// Assuming your db.json server and SvelteKit app are served from the same domain,
		// and the `product.src` is a path like 'models/myModel.glb'
		srcUrl = `${window.location.origin}/${products.src}`;
	});
</script>

<model-viewer
	src={srcUrl}
	loading="eager"
	auto-rotate
	camera-controls
	ar
	ar-modes="webxr scene-viewer quick-look"
	ar-placement={products.place}
	tone-mapping="commerce"
	shadow-intensity="1"
>
</model-viewer>

<style>
	model-viewer {
		width: 100%;
		height: auto;
		aspect-ratio: 16/9;
	}
</style>
