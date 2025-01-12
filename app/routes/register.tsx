import {ActionFunctionArgs} from "@remix-run/node";
import {useActionData} from "@remix-run/react";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {validatePassword} from "~/utils/validation.server";
import {Info} from "lucide-react";
import {registerUser} from "~/utils/auth.server";

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    const errors: Record<string, string> = {};

    if (!firstName) errors.firstName = "Bitte geben Sie Ihren Vornamen ein.";
    if (!lastName) errors.lastName = "Bitte geben Sie Ihren Nachnamen ein.";
    if (!email) errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    if (!password) {
        errors.password = "Bitte geben Sie Ihr Passwort ein.";
    } else if (!validatePassword(password)) {
        errors.password =
            "Das Passwort erfüllt nicht die erforderlichen Kriterien.";
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
            values: {firstName, lastName, email, password},
        };
    }
    if(typeof firstName === "string" && typeof lastName === "string" && typeof email === "string" && typeof password === "string") {
        return await registerUser({firstName,lastName,email,password});
    }


    return null; // Process the form further (e.g., register user).
}

export default function Register() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 pt-16">
            <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Registrierung bei Waldgartenbio</h1>

                <form method="post" className="space-y-4">
                    <div>
                        <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            Vorname
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Geben Sie Ihren Vornamen ein"
                            defaultValue={actionData?.values?.firstName || ""}
                            className={`mt-1 w-full border-gray-300 focus:ring-green-500 focus:border-green-500 ${
                                actionData?.errors?.firstName ? "border-red-500" : ""
                            }`}
                        />
                        {actionData?.errors?.firstName && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Nachname
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Geben Sie Ihren Nachnamen ein"
                            defaultValue={actionData?.values?.lastName || ""}
                            className={`mt-1 w-full border-gray-300 focus:ring-green-500 focus:border-green-500 ${
                                actionData?.errors?.lastName ? "border-red-500" : ""
                            }`}
                        />
                        {actionData?.errors?.lastName && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.lastName}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-Mail-Adresse
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Geben Sie Ihre E-Mail ein"
                            defaultValue={actionData?.values?.email || ""}
                            className={`mt-1 w-full border-gray-300 focus:ring-green-500 focus:border-green-500 ${
                                actionData?.errors?.email ? "border-red-500" : ""
                            }`}
                        />
                        {actionData?.errors?.email && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.email}</p>
                        )}
                    </div>

                    <div className="relative">
                        <div className="flex flex-row gap-1">
                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Passwort
                            </Label>
                            <div className="relative group">
                                <Info className="h-3.5 w-3.5"/>
                                <div
                                    className="absolute hidden group-hover:block bg-gray-50 border border-gray-300 text-sm text-gray-700 p-2 rounded-md shadow-lg w-64">
                                    Das Passwort muss mindestens 8 Zeichen lang sein, Groß- und Kleinbuchstaben, eine
                                    Zahl und ein Sonderzeichen enthalten.
                                </div>
                            </div>
                        </div>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Geben Sie Ihr Passwort ein"
                            className={`mt-1 w-full border-gray-300 focus:ring-green-500 focus:border-green-500 ${
                                actionData?.errors?.password ? "border-red-500" : ""
                            }`}
                        />
                        {actionData?.errors?.password && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.password}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black-500"
                    >
                        Registrieren
                    </Button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-500">
                    Bereits ein Konto? <a href="/login" className="text-blue-600 hover:underline">Anmelden</a>
                </p>
            </div>
        </div>
    );
}
