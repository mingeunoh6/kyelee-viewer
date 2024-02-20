<script>
	import { onMount } from 'svelte';
	import ModelViewer from '$lib/components/modelList.svelte';

	export let data;
	const products = data.products;
	onMount(() => {});
</script>

{data.title}

{#each products as product}
	<div>
		<a href={`/products/${product.id}`}>{product.name} 상세보기</a>
	</div>
	<model-viewer
		src={product.src}
		loading="eager"
		ar
		ar-modes="webxr scene-viewer quick-look"
		ar-placement={product.place}
		tone-mapping="commerce"
		shadow-intensity="1"
	>
	</model-viewer>
{/each}

<style>
</style>
