import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import {Link} from "@remix-run/react";

export default function Footer () {
    return (
        <footer className="bg-green-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Unternehmensinfo */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Unternehmen</h3>
                        <ul className="space-y-2">
                            <li><a href="/about-us" className="hover:text-green-200 transition-colors">Über uns</a></li>
                            <li><a href="/contact" className="hover:text-green-200 transition-colors">Kontakt</a></li>
                            <li><a href="/blog" className="hover:text-green-200 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Rechtliches */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Rechtliches</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-green-200 transition-colors">Datenschutzrichtlinien</a></li>
                            <li><a href="#" className="hover:text-green-200 transition-colors">Nutzungsbedingungen</a></li>
                            <li><a href="#" className="hover:text-green-200 transition-colors">Cookie-Richtlinien</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4 md:col-start-3">
                        <h3 className="text-white font-semibold text-lg">Verbinden</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com/waldgartenbio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                <Instagram className="w-5 h-5"/>
                            </a>
                            <a
                                href="https://www.facebook.com/waldgartenbio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                <Facebook className="w-5 h-5"/>
                            </a>
                            <a
                                href="mailto:schneeweis.business@gmail.com"
                            >
                                <Mail className="w-5 h-5"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">&copy; {new Date().getFullYear()} Waldgartenbio. Alle Rechte
                            vorbehalten.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
