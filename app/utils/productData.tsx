import ProductInterface from "../models/Product";

export async function getAllProducts(): Promise<ProductInterface[]> {
    try {
        const response = await fetch('/products.json'); // Adjust the path if necessary
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const products = await response.json(); // Parse the JSON data
        return products; // Use the `products` variable as needed
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
}

export async function getProductById(id: number): Promise<ProductInterface | undefined> {
    let product;
    await getAllProducts().then(products => product = products.find((item: ProductInterface) => item.id === id))
    return product;
}