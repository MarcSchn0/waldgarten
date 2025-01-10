import { json, type ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import {Button} from "~/components/ui/button";

interface ActionData {
    errors?: {
        name?: string;
        email?: string;
        message?: string;
    };
    success?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const errors: ActionData["errors"] = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!message) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
        return json<ActionData>({ errors });
    }

    // Here you would typically send the email or save to a database
    // For now, we'll just return success
    return json<ActionData>({ success: true });
};

export default function Contact() {
    const actionData = useActionData<ActionData>();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontaktiere uns</h1>
                    <p className="text-lg text-gray-600">Wir beantworten gerne weitere Fragen die Sie haben</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>

                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Telefonnummer</h3>
                                    <p className="text-gray-600">+43 123 4567890</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Email</h3>
                                    <p className="text-gray-600">waldgartenbio@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Location</h3>
                                    <p className="text-gray-600">Bromberg<br />Bucklige Welt</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Clock className="w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Öffnungszeiten</h3>
                                    <p className="text-gray-600">
                                        Montag - Freitag: 9 - 17 Uhr<br />
                                        Samstag: 10 - 16 Uhr<br />
                                        Sonntag: Geschlossen
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <Form method="post" className="space-y-6">
                            {actionData?.success && (
                                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                    <p className="text-green-700">Thank you for your message! We'll get back to you
                                        soon.</p>
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 h-10 block w-full rounded-md border border-gray-400 bg-gray-50 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                                {actionData?.errors?.name && (
                                    <p className="mt-1 text-sm text-red-600">{actionData.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mt-1 h-10 block w-full rounded-md border border-gray-400 bg-gray-50 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                                {actionData?.errors?.email && (
                                    <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Nachricht
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border border-gray-400 bg-gray-50 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                                {actionData?.errors?.message && (
                                    <p className="mt-1 text-sm text-red-600">{actionData.errors.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Send Message
                            </Button>
                        </Form>
                    </div>

                </div>

                {/* Map Section */}
                <div className="mt-12">
                    <div className="bg-white rounded-xl shadow-lg p-4 h-[400px] overflow-hidden">
                        <iframe
                            title="Store Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645454832937!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{border: 0}}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}