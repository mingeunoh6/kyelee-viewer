export const load = async ({ params, fetch }) => {
	const { productID } = params;
	const response = await fetch(`/api/products/${productID}`);
	const product = await response.json();
	console.log(product);
	return {
		product
	};
};
