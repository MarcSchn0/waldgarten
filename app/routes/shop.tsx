import {json, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Form, Link, useLoaderData, useSearchParams} from "@remix-run/react";
import ItemCard2 from "~/components/item-card-2";
import { Search, SlidersHorizontal, ShoppingCart, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { prisma } from "~/db.server";
import * as process from "node:process";
import {Toast} from "~/components/Toast";
import PrimaryButton from "~/components/ui/primary-button";
import SecondaryButton from "~/components/ui/secondary-button";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export const meta: MetaFunction = () => {
    return [
        { title: "Shop" },
        { name: "Shop Page", content: "Alle Infos zu allen Produkten" },
    ];
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const minPrice = Number(url.searchParams.get("minPrice")) || 0;
    const maxPrice = Number(url.searchParams.get("maxPrice")) || 1000;

    let items = await prisma.item.findMany();

    // Apply filters
    items = items.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);
        const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
        return matchesSearch && matchesPrice;
    });

    const hostUrl = process.env.PUBLIC_HOST_URL;

    return json({ items, hostUrl });
};

export default function Shop() {
    const { items, hostUrl } = useLoaderData<{ items: Item[]; hostUrl: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; imageUrl: string; quantity: number }[]>([]);

    useEffect(() => {
        const loadCart = () => {
            const storedCart = localStorage.getItem("cart");
            if (!storedCart) {
                setCartItems([]); // Clear cart if empty
                return;
            }

            const cartData = JSON.parse(storedCart);
            const updatedCart = Object.entries(cartData).map(([id, quantity]) => {
                const product = items.find((item) => item.id === Number(id));
                return product ? { ...product, quantity: Number(quantity.quantity) } : null;
            }).filter(Boolean) as any[];

            setCartItems(updatedCart);
        };

        // Initial load
        loadCart();

        // Listen for cart updates
        window.addEventListener("cartUpdated", loadCart);
        return () => window.removeEventListener("cartUpdated", loadCart);
    }, [items]); // Runs when items change



    const currentSearch = searchParams.get("search") || "";
    const currentMinPrice = searchParams.get("minPrice") || "";
    const currentMaxPrice = searchParams.get("maxPrice") || "";



    function deleteCartItem(id : number) {
        // Get the cart from localStorage
        const cartString = localStorage.getItem("cart");
        const cart = cartString ? JSON.parse(cartString) : {};

// Remove a specific item (e.g., id "6")
        delete cart[id];

// Save back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));


    }

    return (
        <div className="container mx-auto px-2 py-8 flex gap-4">
            {/* Filters Sidebar (More space on the left) */}
            <aside className="w-72 hidden md:block sticky top-20 z-10">
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
                                    placeholder="Suche..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"/>
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

                        <PrimaryButton
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                        >
                            Filter anwenden
                        </PrimaryButton>
                    </Form>
                </div>
            </aside>

            {/* Products Grid (Main section) */}
            <div className="flex-[2]">
                <h1 className="text-3xl font-bold mb-8 text-green-800">Unsere Produkte</h1>
                {items.length === 0 ? (
                    <div
                        className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-center px-4 py-12">
                        <div className="max-w-md">
                            <div className="flex justify-center mb-6">
                                <svg
                                    className="w-16 h-16 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h18M9 3v18m6-18v18M3 9h18M3 15h18"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Keine Produkte gefunden</h2>
                            <p className="text-gray-600 mb-6">
                                Es sind momentan leider keine Produkte verfügbar. Bitte schau später noch
                                einmal vorbei oder entdecke unsere anderen Angebote.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link to="/preisliste">
                                    <PrimaryButton className="px-5 py-2 text-sm font-light">
                                        Zur Preisliste der Produkte
                                    </PrimaryButton>
                                </Link>

                                <Link to="/contact">
                                    <SecondaryButton  className="px-5 py-2 text-sm font-light">
                                        Kontaktiere uns
                                    </SecondaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <ItemCard2 key={item.id} item={item} url={hostUrl}/>
                        ))}
                    </div>
                )}
            </div>

            {/* Cart Sidebar - Hidden on small screens */}
            <div className="relative w-72 hidden xl:block sticky top-20 z-10">
                {/* Cart Sidebar */}
                <aside className="bg-white shadow-lg rounded-lg p-4 h-[76vh] overflow-y-auto">
                    <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                        <ShoppingCart className="w-6 h-6 mr-2"/> Warenkorb
                    </h2>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-600 text-center">Dein Warenkorb ist leer.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="text-green-800 font-medium">{item.name}</p>
                                        <p className="text-gray-500 text-sm">Menge: {item.quantity}</p>
                                        <p className="text-green-700 font-semibold">{(item.price).toFixed(2)} €</p>
                                    </div>
                                    <button onClick={() => deleteCartItem(item.id)}>
                                        <Trash className="text-red-500 hover:text-red-700 w-5 h-5"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </aside>

                {/* Static Total & Checkout Section */}
                {cartItems.length > 0 && (
                    <div className="bg-white shadow-lg rounded-lg p-4 mt-2">
                        <p className="text-lg font-semibold text-green-800">
                            Gesamt: {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} €
                        </p>
                        <Link
                            to="/cart"
                            className="mt-4 block text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                        >
                            Zum Warenkorb
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );




}
