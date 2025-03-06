import React from 'react';
import { BookOpen, Newspaper, RefreshCw } from 'lucide-react';
import {Button} from "~/components/ui/button";

export default function Blog() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-green-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Unser Blog</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Bleiben Sie auf dem Laufenden mit aufschlussreichen Artikeln, Branchenneuigkeiten und Expertenperspektiven.
                        </p>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <Newspaper className="h-16 w-16 text-gray-400" />
                                <div className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-2">
                                    <RefreshCw className="h-4 w-4 text-gray-500 animate-spin" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Demnächst verfügbar
                        </h2>

                        <p className="text-gray-600 mb-8">
                            Wir arbeiten daran, spannende Inhalte für Sie zu erstellen. Unser Redaktionsteam
                            verfasst sorgfältig ausgearbeitete Artikel, die einen echten Mehrwert für unsere Leser bieten werden.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <BookOpen className="h-5 w-5 mr-2 text-gray-500" />
                                Newsletter abonnieren
                            </button>
                            <Button>
                                Thema vorschlagen
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Additional Content */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Bleiben Sie informiert</h3>
                        <p className="text-gray-600">
                            Melden Sie sich für unseren Newsletter an, um Benachrichtigungen über neue Artikel zu erhalten.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Mitmachen</h3>
                        <p className="text-gray-600">
                            Sind Sie Experte auf Ihrem Gebiet? Wir freuen uns über Gastbeiträge von Branchenprofis.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Vernetzen</h3>
                        <p className="text-gray-600">
                            Folgen Sie uns in den sozialen Medien für aktuelle Updates und Blicke hinter die Kulissen.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}