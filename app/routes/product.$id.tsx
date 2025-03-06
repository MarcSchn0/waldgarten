import React, {useEffect, useState} from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import {json, LoaderFunction, redirect} from '@remix-run/node';
import {Star, Truck, PackageCheck, ShieldCheck, Heart, ShoppingCart} from 'lucide-react';
import { Product } from '~/types/interfaces';
import {prisma} from "~/db.server";
import {Toast} from "~/components/Toast";

export const loader: LoaderFunction = async ({ params }) => {
    const item = await prisma.item.findUnique({ where: { id: parseInt(params.id as string) } });
    if (!item) {
        return redirect("/");
    }


    const hostUrl = process.env.PUBLIC_HOST_URL;

    return json({ item, hostUrl });
};

export default function ProductDetail() {
    const {item, hostUrl} = useLoaderData<{ item: Product, hostUrl: string }>();
    const [isWishlist, setIsWishlist] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // @ts-ignore
        const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
        if (savedCart[item.id]) {
            setQuantity(savedCart[item.id].quantity);
        }
    }, [item.id]);

// Update quantity, ensuring it's at least 1
    const updateQuantity = (newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantity(newQuantity);
    };

// Add to cart function
    const addToCart = () => {
        // @ts-ignore
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[item.id] = {quantity: quantity};
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        setShowToast(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-12">
                <Link to="/shop"
                      className="text-green-600 hover:text-green-700 mb-8 inline-flex items-center gap-2 font-medium">
                    <span className="text-lg">←</span> Zurück zum Shop
                </Link>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Image Section */}
                        <div className="relative">
                            <img
                                src={`${hostUrl}/imgs/${item.imageUrl}`}
                                alt={item.name}
                                className="w-full h-[500px] object-cover"
                            />
                            <button
                                onClick={() => setIsWishlist(!isWishlist)}
                                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                            >
                                <Heart
                                    className={`w-6 h-6 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                />
                            </button>
                        </div>

                        {/* Product Info Section */}
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600">(4.8/5)</span>
                            </div>

                            <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
                            <p className="text-gray-600 text-lg mb-6">{item.description}</p>

                            <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-3xl font-bold text-green-600">
                                {item.price.toFixed(2)}€
                            </span>
                                <span className="text-gray-500 line-through">
                               {(item.price * 1.2).toFixed(2)} €
                            </span>
                                <span
                                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                20% Rabatt
                            </span>
                            </div>

                            {/* Add to Cart Section */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border rounded-lg">
                                        <button className="px-4 py-2 text-xl hover:bg-gray-50"
                                                onClick={() => updateQuantity(quantity - 1)}>−
                                        </button>
                                        <span className="px-4 py-2 border-x">{quantity}</span>
                                        <button className="px-4 py-2 text-xl hover:bg-gray-50"
                                                onClick={() => updateQuantity(quantity + 1)}>+
                                        </button>
                                    </div>
                                    <button
                                        className="flex items-center justify-center bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors w-full"
                                        onClick={addToCart}>
                                        <ShoppingCart size={18} className="mr-2"/>
                                        In den Warenkorb
                                    </button>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-4 border-t pt-8">
                                <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-green-600"/>
                                    <span className="text-gray-600">Kostenloser Versand ab €50</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PackageCheck className="w-5 h-5 text-green-600"/>
                                    <span className="text-gray-600">Frische Garantie</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-green-600"/>
                                    <span className="text-gray-600">100% Bio-Qualität</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Produktdetails</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4">Herkunft</h3>
                            <p className="text-gray-600">
                                Unser {item.name} wird von ausgewählten Bio-Bauern in der Region angebaut.
                                Wir garantieren kurze Transportwege und maximale Frische.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Lagerung</h3>
                            <p className="text-gray-600">
                                Für optimale Haltbarkeit empfehlen wir die Lagerung bei 4-8°C im Gemüsefach
                                Ihres Kühlschranks.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Toast
                message="Produkt wurde dem Warenkorb hinzugefügt!"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}