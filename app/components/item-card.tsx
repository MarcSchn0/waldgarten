import { Link } from "@remix-run/react";
import {Item} from "~/types/interfaces";



export default function ItemCard({ item }: { item: Item }) {
    return (
        <Link
            to={`/product/${item.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
            <div className="p-6">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-green-600 font-bold">{item.price.toFixed(2)}€</p>
            </div>
        </Link>
    );
}