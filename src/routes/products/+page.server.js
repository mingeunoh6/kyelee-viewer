export const load = async ({ fetch }) => {
	const title = 'List of products';

	// Fetching from the local serverless function endpoint `/api/products`.
	// In production or deployed environment, this URL works relative to the domain.
	const response = await fetch('/api/products');
	if (!response.ok) {
		// Handle potential errors in the fetch request gracefully
		throw new Error('Could not fetch products');
	}
	const data = await response.json();

	return {
		title,
		products: data.products
	};
};
