import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getUser } from "~/utils/auth.server";
import { Package2Icon, BookOpenIcon, LayoutDashboardIcon } from "lucide-react";
import {getProducts} from "~/utils/admin.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request);
    if (user === undefined || !user || user.role !== "Admin") {
        return redirect("/");
    }

    return json({ ok: 200 });
}

export default function Admin() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center">
                        <LayoutDashboardIcon className="h-8 w-8 text-indigo-600" />
                        <h1 className="ml-3 text-2xl font-bold text-gray-900">Admin-Dashboard</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Products Card */}
                    <Link
                        to="/admin/products"
                        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                <Package2Icon className="h-8 w-8 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-gray-900">Produkte verwalten</h2>
                                <p className="mt-1 text-gray-600">Produkte ansehen, hinzufügen, bearbeiten und löschen</p>
                            </div>
                        </div>
                    </Link>

                    {/* Blogs Card */}
                    <Link
                        to="/admin/blogs"
                        className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                                <BookOpenIcon className="h-8 w-8 text-emerald-600" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold text-gray-900">Blog verwalten</h2>
                                <p className="mt-1 text-gray-600">Blogbeiträge erstellen, bearbeiten und verwalten</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Schnellübersicht</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm font-medium text-gray-600">Produkte Gesamt</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">--</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm font-medium text-gray-600">Veröffentlichte Blogs</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">--</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm font-medium text-gray-600">Blog-Entwürfe</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">--</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm font-medium text-gray-600">Zuletzt aktualisiert</p>
                            <p className="mt-1 text-sm font-medium text-gray-900">{new Date().toLocaleDateString('de-DE')}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}