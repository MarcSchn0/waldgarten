import { json, type ActionFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";

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
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Infos</h2>

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
                                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                />
                                {actionData?.errors?.name && (
                                    <p className="mt-1 text-sm text-red-600">{actionData.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                                {actionData?.errors?.email && (
                                    <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Nachricht
                                </Label>
                                <Textarea
                                    name="message"
                                    id="message"
                                    rows={4}
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13441.727175531373!2d16.212879926700257!3d47.620574634816716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476cf87b5b0e7ff5%3A0x3a8b9ba2ae60e0fd!2sBromberg%2C%20Austria!5e0!3m2!1sen!2s!4v1645454832937!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            allowFullScreen
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}