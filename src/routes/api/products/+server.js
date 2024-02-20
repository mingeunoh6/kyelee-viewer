// Import the JSON data
import productsData from '$lib/data/db.json';

export function GET() {
	// Return the products array wrapped in an object
	// Note: Adjust the path if your db.json structure is different
	return new Response(JSON.stringify({ products: productsData.products }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
