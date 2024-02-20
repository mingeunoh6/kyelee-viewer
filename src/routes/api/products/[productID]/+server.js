import productsData from '$lib/data/db.json';

export function GET({ params }) {
	const { productID } = params;

	const product = productsData.products.find((p) => p.id === Number(productID));

	if (product) {
		return new Response(JSON.stringify(product), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		return new Response(JSON.stringify({ error: 'Product not found' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
