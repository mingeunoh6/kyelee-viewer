<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let data;
	const products = data.product;
	let srcUrl;

	function activateAR(e) {
		let mv = document.getElementById('product-wrapper').querySelector('model-viewer');

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
	function goShop() {
		let url = products.url;
		window.open(url, '_blank', 'noopener,noreferrer');
	}

	function goBack() {
		window.history.back();
	}

	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	onMount(() => {
		// Assuming your db.json server and SvelteKit app are served from the same domain,
		// and the `product.src` is a path like 'models/myModel.glb'
		srcUrl = `${window.location.origin}/${products.src}`;

		scrollToTop();
	});
</script>

<div id="product-wrapper">
	<div class="backBtn" on:click={goBack}>
		<svg viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M10.7534 23.5227L0.473135 13.1523C-0.157711 12.5159 -0.157711 11.4841 0.473135 10.8477L10.7534 0.477287C11.3842 -0.159095 12.407 -0.159095 13.0379 0.477287C13.6687 1.11367 13.6687 2.14545 13.0379 2.78183L5.51527 10.3704L42 10.3704V13.6296L5.51527 13.6296L13.0379 21.2182C13.6687 21.8546 13.6687 22.8863 13.0379 23.5227C12.407 24.1591 11.3842 24.1591 10.7534 23.5227Z"
				fill="black"
			/>
		</svg>
	</div>
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
		<div class="progress-bar hide" slot="progress-bar">
			<div class="update-bar"></div>
		</div>
		<button slot="ar-button" class="ar-button"> View in AR </button>
	</model-viewer>

	<div id="product-detail">
		<div class="titleGroup">
			<h1>{products.name}</h1>
			<p class="product-size">
				<span>W {products.w}mm</span>
				<span>D {products.D}mm</span>
				<span>H {products.H}mm</span>
			</p>
		</div>

		<div class="buttonGroup">
			<button class="arBtn" on:click={activateAR}>View in AR</button>

			<button class="shopBtn" on:click={goShop}>Shop</button>
		</div>
	</div>
</div>

<style>
	#product-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	model-viewer {
		width: 100%;
		height: auto;
		aspect-ratio: 3/4;
		background-color: unset;
	}
	.ar-button {
		display: none;
	}
	#product-detail {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 9999;

		margin-bottom: 36px;
	}

	.titleGroup {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.2rem;
		margin: 16px 0;
	}

	#product-detail h1 {
		text-align: center;
		font-size: 1.3rem;
		font-family: 'stratos', sans-serif;
		font-weight: 200;
		font-style: normal;
	}
	.product-size {
		font-family: 'stratos', sans-serif;
		font-weight: 100;
		font-style: normal;
		color: rgba(67, 67, 67, 0.8);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		gap: 0.3rem;
		flex-grow: 1;
	}
	.product-size span {
		flex-grow: 1;
	}

	.buttonGroup {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;

		gap: 0.6rem;
		margin: 8px 0;
	}
	.arBtn {
		font-family: 'stratos', sans-serif;
		font-weight: 300;
		font-style: normal;
		font-size: 1rem;
		width: 150px;
		height: 52px;
		background-color: rgba(26, 225, 206, 0.8);

		border: none;
		border-radius: 50px;
		box-shadow: 0px 3px 10px -6px rgba(0, 0, 0, 0.8);
		-webkit-box-shadow: 0px 3px 10px -6px rgba(0, 0, 0, 0.8);
		-moz-box-shadow: 0px 3px 10px -6px rgba(0, 0, 0, 0.8);
		color: black;
		cursor: pointer;
	}

	.shopBtn {
		font-family: 'stratos', sans-serif;
		font-weight: 300;
		font-style: normal;
		font-size: 1rem;
		width: 150px;
		height: 52px;
		background-color: white;
		border: none;
		border-radius: 50px;
		box-shadow: 0px 3px 10px -6px rgba(0, 0, 0, 0.8);
		-webkit-box-shadow: 0px 3px 10px -6px rgba(0, 0, 0, 0.8);
		-moz-box-shadow: 0px 3px 10px -6px rgba(0, 0, 0, 0.8);
		color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	.backBtn {
		position: fixed;
		top: 12px;
		right: 12px;
		z-index: 9999;
		cursor: pointer;
		padding: 8px;
	}

	.backBtn svg {
		width: 30px;
	}
</style>
