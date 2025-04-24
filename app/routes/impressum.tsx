import {Building2, Mail, MapPin, Phone, Scale} from "lucide-react";
import {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Impressum" },
        { name: "Impressum Page", content: "Impressum Infos" },
    ];
};

export default function Impressum() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="bg-green-50 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-6">Impressum</h1>
                    <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
                        Angaben gemäß § 5 TMG und verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                    </p>
                </div>
            </section>

            {/* Company Information */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="space-y-12">
                        {/* Business Details */}
                        <div className="flex items-start space-x-4">
                            <Building2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Unternehmensangaben</h2>
                                <div className="space-y-2 text-gray-600">
                                    <p>Waldgarten</p>
                                    <p>Alexander Hruska</p>
                                    <p>Stögersbach 15</p>
                                    <p>2833 Bromberg</p>
                                    <p>Österreich</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-green-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                                    <p className="text-gray-600">+43 664 88936837</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-green-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">E-Mail</h3>
                                    <p className="text-gray-600">waldgarten.2833@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-green-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Firmensitz</h3>
                                    <p className="text-gray-600">Bromberg, Österreich</p>
                                </div>
                            </div>
                        </div>

                        {/* Legal Information */}
                        <div className="flex items-start space-x-4">
                            <Scale className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Rechtliche Angaben</h2>
                                <div className="space-y-4 text-gray-600">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Unternehmensform</h3>
                                        <p>Einzelunternehmen</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Aufsichtsbehörde</h3>
                                        <p>Bezirkshauptmannschaft Wiener Neustadt</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Berufsrecht</h3>
                                        <p>Gewerbeordnung: www.ris.bka.gv.at</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold mb-4">Haftungsausschluss</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
                                    Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                                </p>
                                <p>
                                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                                    Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}