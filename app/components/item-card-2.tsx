import { Product } from "~/types/interfaces";
import { Heart, ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "@remix-run/react";

interface ItemCardProps {
    item: Product;
    url: string;
}

export default function ItemCard2({ item, url }: ItemCardProps) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${item.id}`);
    };

    const addToCart = () => {
        const cartString = localStorage.getItem("cart");
        const cart = cartString ? JSON.parse(cartString) : {};
        if(cart[item.id]===undefined) {
            cart[item.id] = {quantity: 1};
        }
        else {
            cart[item.id].quantity += 1;
        }
        //cart[item.id] = {quantity: 1};
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        //setShowToast(true);
    };

    return (
        <div
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={handleCardClick}
        >
            <div className="relative h-64 overflow-hidden rounded-t-xl">
                <img
                    src={`${url}/imgs/${item.imageUrl}?height=200&width=300`}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to wishlist functionality
                    }}
                >
                    <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {item.price.toFixed(2)} €
                </div>
            </div>

            {/* Content container with flex-grow to push the button to the bottom */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                    {item.name}
                </h3>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">{item.description}</p>

                {/* Ensure the button stays at the bottom */}
                <div className="mt-auto">
                    <button
                        className="w-full bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-md"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart();
                            // Add to cart functionality
                        }}
                    >
                        <ShoppingCart size={18} />
                        In den Warenkorb
                    </button>
                </div>
            </div>
        </div>
    );
}
