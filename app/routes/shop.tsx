import { json, LoaderFunction } from "@remix-run/node";
import {Form, useLoaderData, useSearchParams} from "@remix-run/react";
import ItemCard from "~/components/item-card";
import {Search, SlidersHorizontal} from "lucide-react";
import {useState} from "react";
import fs from "fs";

interface Item { id: number; name: string; description: string; price: number; image: string; }

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const minPrice = Number(url.searchParams.get("minPrice")) || 0;
    const maxPrice = Number(url.searchParams.get("maxPrice")) || 1000;

    // In a real application, you would fetch this data from a database or API
    let items: Item[] = [
        {
            id: 1,
            name: "Organische Tomaten",
            description: "Sweet and crunchy tomatos, perfect for snacking or cooking",
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

    // Apply filters
    items = items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);
        const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
        return matchesSearch && matchesPrice;
    });

    return json({ items });
};

export default function Shop() {
    const { items } = useLoaderData<{ items: Item[] }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    const currentSearch = searchParams.get("search") || "";
    const currentMinPrice = searchParams.get("minPrice") || "";
    const currentMaxPrice = searchParams.get("maxPrice") || "";

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="md:hidden flex items-center gap-2 text-green-700 font-medium"
                >
                    <SlidersHorizontal size={20} />
                    {isFilterOpen ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Filters Sidebar */}
                <aside className={`w-full md:w-80 lg:w-96 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-6 text-green-800">Filters</h2>
                        <Form method="get" className="space-y-6">
                            {/* Search */}
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                    Search Products
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        defaultValue={currentSearch}
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        id="minPrice"
                                        name="minPrice"
                                        defaultValue={currentMinPrice}
                                        placeholder="Min"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        name="maxPrice"
                                        defaultValue={currentMaxPrice}
                                        placeholder="Max"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                            >
                                Apply Filters
                            </button>
                        </Form>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-8 text-green-800">Our Products</h1>
                    {items.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No products found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item) => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}