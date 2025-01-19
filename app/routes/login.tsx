import { useActionData } from "@remix-run/react";
import {ActionFunctionArgs, json, LoaderFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {getUser, login} from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
    return (await getUser(request)) ? redirect('/') : null
}


export const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        // Validate input
        if (!email || !password) {
            return json(
                { message: "Bitte geben Sie Ihre Anmeldedaten ein.", success: false },
                { status: 400 }
            );
        }

        if (typeof email !== "string" || typeof password !== "string") {
            return json(
                { message: "Ungültige Eingaben. Bitte versuchen Sie es erneut.", success: false },
                { status: 400 }
            );
        }

        // Call loginUser to authenticate the user
        return await login({email, password});

    } catch (error) {
        console.error("Login action error:", error);
        return json(
            { message: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.", success: false },
            { status: 500 }
        );
    }
};

export default function Login() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 pt-16">
            <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Anmeldung bei Waldgartenbio</h1>

                <form method="post" className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-Mail-Adresse
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Geben Sie Ihre E-Mail ein"

                            className="mt-1 w-full border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Passwort
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Geben Sie Ihr Passwort ein"

                            className="mt-1 w-full border-gray-300 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {actionData?.message && (
                        <div
                            className={`text-sm mt-2 p-2 rounded-md text-center ${
                                actionData.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                            {actionData.message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black-500"
                    >
                        Anmelden
                    </Button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-500">
                    Neu bei Waldgartenbio? <a href="/register" className="text-blue-600 hover:underline">Konto erstellen</a>
                </p>
            </div>
        </div>
    );
}




