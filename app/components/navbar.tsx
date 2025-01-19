import { useState } from "react";
import { Link } from "@remix-run/react";
import { Menu, X, User } from "lucide-react";

export default function Navbar({ user }: { user?: { username: string } }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-green-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Waldgartenbio
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/shop" className="text-white hover:text-green-200">
                        Shop
                    </Link>
                    <Link to="/blog" className="text-white hover:text-green-200">
                        Blog
                    </Link>
                    {user ? (
                            <Link to="/profile" className="text-white hover:text-green-200 flex items-center">
                        <span className="text-white font-bold">{user.username}</span>
                            </Link>
                    ) : (
                        <Link to="/login" className="text-white hover:text-green-200 flex items-center">
                            <User className="w-5 h-5 mr-1" />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-2">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block text-white hover:text-green-200 py-2">
                            Home
                        </Link>
                        <Link to="/shop" className="block text-white hover:text-green-200 py-2">
                            Shop
                        </Link>
                        <Link to="/blog" className="block text-white hover:text-green-200 py-2">
                            Blog
                        </Link>
                        {user ? (
                            <span className="block text-white py-2">{user.username}</span>
                        ) : (
                            <Link
                                to="/login"
                                className="block text-white hover:text-green-200 py-2 flex items-center"
                            >
                                <User className="w-5 h-5 mr-1" />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
