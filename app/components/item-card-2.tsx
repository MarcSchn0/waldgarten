import {Item} from "~/types/interfaces";
import {Heart, ShoppingCart} from "lucide-react";
import React from "react";

interface ItemCardProps {
    item: Item;
}

export default function ItemCard2({ item }: ItemCardProps) {
    return (
        <div
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            /*onClick={() => onSelect(item)}*/
        >
            <div className="relative h-64 overflow-hidden rounded-t-xl">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    onClick={(e) => {
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
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                    {item.name}
                </h3>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">{item.description}</p>
                <button
                    className="mt-4 w-full bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-md"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart functionality
                    }}
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}