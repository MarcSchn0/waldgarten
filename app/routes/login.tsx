import { Form, useActionData, Link } from "@remix-run/react";
import { json, ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    // Here you would typically validate the credentials and log the user in
    // For this example, we'll just return a success message
    return json({ message: "Anmeldung erfolgreich!" });
};

export default function Login() {
    const actionData = useActionData<typeof action>();

    return (
        <div></div>
    );
}

