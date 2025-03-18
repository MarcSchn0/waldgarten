import {AlertCircle, FileText, Scale, ScrollText, ShieldCheck} from "lucide-react";


export default function Nutzungsbedingungen() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="bg-green-50 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-6">Nutzungsbedingungen</h1>
                    <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
                        Bitte lesen Sie diese Nutzungsbedingungen sorgfältig durch, bevor Sie unsere Dienste in Anspruch nehmen.
                    </p>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {/* General Terms */}
                        <div className="flex items-start space-x-4">
                            <ScrollText className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Allgemeine Bestimmungen</h2>
                                <div className="prose prose-green max-w-none text-gray-600">
                                    <p className="mb-4">
                                        Mit der Nutzung unserer Website und Dienste akzeptieren Sie diese Nutzungsbedingungen vollständig.
                                        Der Waldgarten Shop behält sich das Recht vor, diese Bedingungen jederzeit ohne vorherige Ankündigung zu ändern.
                                    </p>
                                    <p>
                                        Diese Nutzungsbedingungen regeln die Nutzung der Website www.waldgarten-shop.at sowie aller damit verbundenen Dienste und Angebote.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Account & Orders */}
                        <div className="flex items-start space-x-4">
                            <ShieldCheck className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Bestellungen und Kundenkonten</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        Bei der Erstellung eines Kundenkontos sind Sie verpflichtet, wahrheitsgemäße Angaben zu machen.
                                        Sie sind für die Geheimhaltung Ihrer Zugangsdaten verantwortlich.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Bestellungen sind erst nach unserer Bestätigung verbindlich</li>
                                        <li>Alle angegebenen Preise verstehen sich inkl. MwSt</li>
                                        <li>Lieferungen erfolgen nur innerhalb Österreichs</li>
                                        <li>Wir behalten uns das Recht vor, Bestellungen abzulehnen</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Rights & Obligations */}
                        <div className="flex items-start space-x-4">
                            <Scale className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Rechte und Pflichten</h2>
                                <div className="space-y-4 text-gray-600">
                                    <h3 className="text-xl font-semibold mb-2">Ihre Rechte</h3>
                                    <ul className="list-disc pl-5 space-y-2 mb-4">
                                        <li>14-tägiges Widerrufsrecht bei Onlinebestellungen</li>
                                        <li>Anspruch auf datenschutzkonforme Behandlung Ihrer Daten</li>
                                        <li>Transparente Kommunikation über Bestellstatus</li>
                                    </ul>

                                    <h3 className="text-xl font-semibold mb-2">Ihre Pflichten</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Wahrheitsgemäße Angaben bei der Registrierung</li>
                                        <li>Keine missbräuchliche Nutzung der Website</li>
                                        <li>Einhaltung der Zahlungsbedingungen</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Liability */}
                        <div className="flex items-start space-x-4">
                            <AlertCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Haftung</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        Wir übernehmen keine Haftung für die ununterbrochene Verfügbarkeit der Website.
                                        Technische Störungen, die nicht in unserem Einflussbereich liegen, können die Nutzung zeitweise einschränken.
                                    </p>
                                    <p>
                                        Für die Aktualität und Richtigkeit der dargestellten Produktinformationen wird keine Gewähr übernommen.
                                        Abbildungen können vom tatsächlichen Produkt abweichen.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Final Provisions */}
                        <div className="flex items-start space-x-4">
                            <FileText className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Schlussbestimmungen</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p>
                                        Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein,
                                        so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
                                    </p>
                                    <p>
                                        Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts.
                                        Gerichtsstand ist, soweit gesetzlich zulässig, Wiener Neustadt.
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