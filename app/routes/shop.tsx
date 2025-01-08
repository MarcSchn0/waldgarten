import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ItemCard from "~/components/item-card";
import {Item} from "~/types/interfaces";



export const loader: LoaderFunction = async () => {
    // In a real application, you would fetch this data from a database or API
    const items: Item[] = [
        {
            id: 1,
            name: "Organic Carrots",
            description: "Sweet and crunchy carrots, perfect for snacking or cooking",
            price: 2.99,
            image: "http://localhost:5173/logo-dark.png??height=200&width=300",
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

    return json({ items });
};

export default function Shop() {
    const { items } = useLoaderData<{ items: Item[] }>();

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-green-800">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </main>
    );
}