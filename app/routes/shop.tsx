import { json, LoaderFunction } from "@remix-run/node";
import {Form, useLoaderData, useSearchParams} from "@remix-run/react";
import ItemCard from "~/components/item-card";
import {Search, SlidersHorizontal} from "lucide-react";
import {useState} from "react";
import fs from "fs";
import {prisma} from "~/db.server";
import ItemCard2 from "~/components/item-card-2";

interface Item { id: number; name: string; description: string; price: number; imageUrl: string; }

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const minPrice = Number(url.searchParams.get("minPrice")) || 0;
    const maxPrice = Number(url.searchParams.get("maxPrice")) || 1000;


    let items = await prisma.item.findMany();


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
                        <h2 className="text-xl font-semibold mb-6 text-green-800">Filter</h2>
                        <Form method="get" className="space-y-6">
                            {/* Search */}
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                    Suche Produkte
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
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Preis</h3>
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
                    <h1 className="text-3xl font-bold mb-8 text-green-800">Unsere Produkte</h1>
                    {items.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No products found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item) => (
                                <ItemCard2 key={item.id} item={item}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}