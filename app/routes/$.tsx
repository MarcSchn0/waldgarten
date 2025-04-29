import React from 'react';
import { Home, ArrowLeft, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from "~/components/ui/primary-button";
import SecondaryButton from "~/components/ui/secondary-button";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="mb-8 relative">
                    <Leaf className="w-24 h-24 text-green-800 mx-auto transform -rotate-45" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-6xl font-bold text-gray-800">404</span>
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Seite nicht gefunden
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Entschuldigung, aber die von Ihnen gesuchte Seite existiert leider nicht.
                    Vielleicht wurde sie verschoben oder gelöscht.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <SecondaryButton className="text-sm font-light flex flex-row mb-4"
                        onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-5 h-5" />
                        Zurück
                    </SecondaryButton>

                    <PrimaryButton className="text-sm font-light flex flex-row mb-4"
                        onClick={() => navigate('/')}
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Zur Startseite
                    </PrimaryButton>
                </div>

                <div className="mt-12 text-gray-500">
                    <p>
                        Benötigen Sie Hilfe? Kontaktieren Sie uns unter{' '}
                        <a
                            href="mailto:waldgarten.2833@gmail.com"
                            className="text-green-600 hover:text-green-700 underline"
                        >
                            waldgarten.2833@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}