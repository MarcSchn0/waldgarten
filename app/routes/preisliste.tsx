import {FileDown, FileText} from "lucide-react";

export default function Preisliste() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="bg-green-50 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-6">Preisliste</h1>
                    <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
                        Hier finden Sie eine vollständige Übersicht unserer Produkte und Preise
                    </p>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-8">
                            <FileText className="w-16 h-16 text-green-600 mx-auto mb-4"/>
                            <h2 className="text-2xl font-semibold mb-4">Aktuelle Preisliste</h2>
                            <p className="text-gray-600 mb-6">
                                Laden Sie unsere vollständige Preisliste als PDF herunter.
                                Die Liste enthält alle verfügbaren Produkte mit detaillierten Preisangaben.
                            </p>
                            <p className="text-sm text-gray-500 mb-8">
                                Stand: März 2025
                            </p>
                        </div>

                        <a
                            href="/preisliste.pdf"
                            download
                            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            <FileDown className="w-5 h-5 mr-2"/>
                            Preisliste herunterladen
                        </a>

                        <p className="text-sm text-gray-500 mt-6">
                            PDF-Format (ca. 1.5 MB)
                        </p>
                    </div>

                    <div className="mt-12 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Hinweis</h3>
                        <p className="text-gray-600">
                            Alle Preise verstehen sich in Euro (€) inklusive der gesetzlichen Mehrwertsteuer.
                            Preisänderungen und Irrtümer vorbehalten. Es gelten unsere AGB.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};