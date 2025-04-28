import React from 'react';
import {Leaf, Truck, PackageCheck, Users, Star} from 'lucide-react';
import {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Über uns" },
        { name: "About us Page", content: "Infos über Waldgarten" },
    ];
};

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-green-800 py-20">
                <div className="container mx-auto px-4"><h1 className="text-4xl text-white font-bold text-center mb-6">Über
                    Uns</h1> <p className="text-xl text-center text-white max-w-3xl mx-auto"> Willkommen im
                    Waldgarten Shop in Bromberg! Wir sind ein junges Unternehmen, das mit Herz und Leidenschaft
                    frisches, heimisches Gemüse und weitere natürliche Produkte anbaut und verkauft. Unser Fokus liegt
                    auf nachhaltiger Landwirtschaft und regionaler Qualität, direkt aus der Natur. </p></div>
            </section>

            {/* Values Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Unsere Werte</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="flex justify-center mb-4">
                                <Leaf className="w-12 h-12 text-green-800"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Nachhaltigkeit</h3>
                            <p className="text-gray-600">
                                Wir setzen uns für umweltfreundliche Praktiken und nachhaltige Landwirtschaft ein.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="flex justify-center mb-4">
                                <Users className="w-12 h-12 text-green-800" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Gemeinschaft</h3>
                            <p className="text-gray-600">
                                Wir unterstützen lokale Bauern und schaffen faire Partnerschaften.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="flex justify-center mb-4">
                                <PackageCheck className="w-12 h-12 text-green-800" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Qualität</h3>
                            <p className="text-gray-600">
                                Nur die besten und frischesten Produkte kommen in unseren Shop.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Features */}
            <section className="bg-green-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Unser Service</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex items-start space-x-4">
                            <Truck className="w-8 h-8 text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Schnelle Abholung</h3>
                                <p>
                                    Sie können ihre Produkte einfach bei uns bestellen und direkt abholen.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <PackageCheck className="w-8 h-8 text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Qualitätskontrolle</h3>
                                <p>
                                    Jedes Produkt wird sorgfältig auf Qualität geprüft.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Was unsere Kunden sagen</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <Star className="w-6 h-6 text-yellow-500 mb-2" />
                            <p className="text-gray-600 mb-4">"Die Qualität der Produkte ist fantastisch! Frisch, lecker
                                und regional – genau das, was ich gesucht habe."</p>
                            <h3 className="text-lg font-semibold text-gray-800">- Anna K.</h3>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <Star className="w-6 h-6 text-yellow-500 mb-2" />
                            <p className="text-gray-600 mb-4">"Ich liebe den persönlichen Service und die nachhaltige
                                Philosophie. Hier kaufe ich immer wieder gerne ein!"</p>
                            <h3 className="text-lg font-semibold text-gray-800">- Markus T.</h3>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <Star className="w-6 h-6 text-yellow-500 mb-2" />
                            <p className="text-gray-600 mb-4">"Ein toller Laden mit einer großartigen Auswahl an
                                Bio-Produkten. Absolut empfehlenswert!"</p>
                            <h3 className="text-lg font-semibold text-gray-800">- Sophie L.</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}