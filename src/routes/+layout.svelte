<div id="main-logo">
	<img src="kyeLogo.svg" alt="Kye Logo" />
</div>
<slot />

<style>
	#main-logo {
		position: fixed;
		top: 12px;
		left: 12px;
		z-index: 9999;
	}

	#main-logo img {
		height: 20vh;
	}
</style>
