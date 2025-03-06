import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Save, Bell, BellOff } from 'lucide-react';
import {getUser} from "~/utils/auth.server";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export async function loader({ request }: { request: Request }) {
    const user = await getUser(request); // Fetch the user on the server
    return json({ user });
}

export default function Profile() {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [formData, setFormData] = useState({
        username: 'MaxMustermann',
        email: 'max.mustermann@example.com',
        firstName: 'Max',
        lastName: 'Mustermann',
        currentPassword: '',
        newPassword: ''
    });
    const { user } = useLoaderData<typeof loader>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        // Here you would typically save the changes to your backend
    };

    const timeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Guten Morgen';
        if (hour < 18) return 'Guten Tag';
        return 'Guten Abend';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Welcome Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-green-900 mb-4">{timeOfDay()}, {user.firstName}!</h1>
                    <p className="text-lg text-green-600">Schön, dass du da bist.</p>
                </div>

                {/* Profile Content */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 rounded-full p-4">
                                <User className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">{user.firstName} {user.lastName}</h2>
                                <p className="text-green-600">@{user.username}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 focus:outline-none"
                        >
                            {isEditing ? 'Abbrechen' : 'Bearbeiten'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            {/* Personal Information Section */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Persönliche Informationen</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail-Adresse</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-transparent disabled:border-transparent disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={user.firstName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-transparent disabled:border-transparent disabled:text-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={user.lastName}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 disabled:bg-transparent disabled:border-transparent disabled:text-gray-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Password Section */}
                            {isEditing && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Passwort ändern</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Aktuelles Passwort</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleInputChange}
                                                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Neues Passwort</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleInputChange}
                                                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Preferences Section */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Einstellungen</h3>
                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        {notifications ? (
                                            <Bell className="h-6 w-6 text-green-600" />
                                        ) : (
                                            <BellOff className="h-6 w-6 text-gray-400" />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900">Newsletter</p>
                                            <p className="text-sm text-gray-500">
                                                {notifications ? 'Newsletter ist aktiviert' : 'Newsletter ist deaktiviert'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setNotifications(!notifications)}
                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                            notifications ? 'bg-green-600' : 'bg-gray-200'
                                        }`}
                                    >
                    <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            notifications ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        {isEditing && (
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Änderungen speichern
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}