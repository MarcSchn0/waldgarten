import {Clock, Cookie, Info, Settings, Shield, Lock} from "lucide-react";


export default function Cookies() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="bg-green-50 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-6">Cookie-Richtlinie</h1>
                    <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
                        Informationen über die Verwendung von Cookies auf unserer Website
                    </p>
                </div>
            </section>

            {/* Cookie Policy Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {/* What are Cookies */}
                        <div className="flex items-start space-x-4">
                            <Cookie className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Was sind Cookies?</h2>
                                <div className="text-gray-600">
                                    <p className="mb-4">
                                        Cookies sind kleine Textdateien, die beim Besuch unserer Website auf Ihrem Gerät gespeichert werden.
                                        Sie dienen dazu, unsere Website benutzerfreundlicher, effektiver und sicherer zu machen.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cookie Types */}
                        <div className="flex items-start space-x-4">
                            <Settings className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Arten von Cookies</h2>
                                <div className="space-y-6 text-gray-600">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Notwendige Cookies</h3>
                                        <p>Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Funktionale Cookies</h3>
                                        <p>Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Analyse-Cookies</h3>
                                        <p>Diese Cookies helfen uns, die Nutzung unserer Website zu verstehen und zu verbessern.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cookie Usage */}
                        <div className="flex items-start space-x-4">
                            <Info className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Verwendungszweck</h2>
                                <div className="space-y-4 text-gray-600">
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Speicherung von Benutzereinstellungen</li>
                                        <li>Ermöglichung der Warenkorbfunktion</li>
                                        <li>Analyse der Websitenutzung</li>
                                        <li>Verbesserung unseres Angebots</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Cookie Duration */}
                        <div className="flex items-start space-x-4">
                            <Clock className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Speicherdauer</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        Die Speicherdauer variiert je nach Art des Cookies:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Session-Cookies: Werden nach Schließen des Browsers gelöscht</li>
                                        <li>Permanente Cookies: Bleiben für einen festgelegten Zeitraum gespeichert</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Privacy & Control */}
                        <div className="flex items-start space-x-4">
                            <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Datenschutz & Kontrolle</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        Sie haben die Möglichkeit, die Verwendung von Cookies in Ihren Browsereinstellungen zu kontrollieren:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Cookies blockieren oder löschen</li>
                                        <li>Benachrichtigungen für neue Cookies aktivieren</li>
                                        <li>Private Browsing-Modi nutzen</li>
                                    </ul>
                                    <p className="mt-4">
                                        Bitte beachten Sie, dass das Deaktivieren von Cookies die Funktionalität unserer Website einschränken kann.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Updates */}
                        <div className="flex items-start space-x-4">
                            <Lock className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Aktualisierungen</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        Wir behalten uns das Recht vor, diese Cookie-Richtlinie jederzeit anzupassen.
                                        Änderungen werden auf dieser Seite veröffentlicht.
                                    </p>
                                    <p className="font-semibold mt-6">
                                        Stand: März 2025
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}