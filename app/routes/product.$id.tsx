import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import {Item} from "~/types/interfaces";



export const loader: LoaderFunction = async ({ params }) => {
    // In a real application, you would fetch this data from a database or API
    const items: Item[] = [
        {
            id: 1,
            name: "Organic Carrots",
            description: "Sweet and crunchy carrots, perfect for snacking or cooking",
            price: 2.99,
            image: "http://localhost:5173/tomato-image.jpg?height=200&width=300",
        },
        {
            id: 2,
            name: "Fresh Spinach",
            description: "Nutrient-packed spinach leaves, great for salads and smoothies",
            price: 3.49,
            image: "?height=200&width=300",
        },
        {
            id: 3,
            name: "Ripe Tomatoes",
            description: "Juicy, flavorful tomatoes, ideal for sandwiches and sauces",
            price: 4.99,
            image: "?height=200&width=300",
        },
        {
            id: 4,
            name: "Organic Broccoli",
            description: "Crisp and nutritious broccoli florets, perfect for steaming or roasting",
            price: 3.99,
            image: "?height=200&width=300",
        },
        {
            id: 5,
            name: "Fresh Lettuce",
            description: "Crisp and refreshing lettuce leaves for salads and sandwiches",
            price: 2.49,
            image: "?height=200&width=300",
        },
        {
            id: 6,
            name: "Organic Bell Peppers",
            description: "Colorful and crunchy bell peppers, great for snacking or cooking",
            price: 3.99,
            image: "?height=200&width=300",
        },
    ];

    const item = items.find(item => item.id === parseInt(params.id || ""));

    if (!item) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ item });
};

export default function ProductDetail() {
    const { item } = useLoaderData<{ item: Item }>();

    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto px-4 py-8">
                <Link to="/shop" className="text-green-600 hover:underline mb-4 inline-block">&larr; Back to Shop</Link>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <p className="text-2xl text-green-600 font-bold mb-4">${item.price.toFixed(2)}</p>
                        <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}