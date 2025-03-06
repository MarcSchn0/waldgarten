import { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { Menu, X, User, ShoppingCart } from "lucide-react";

export default function Navbar({ user }: { user?: { username: string } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const location = useLocation(); // Get current path

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        const totalItems = Object.values(cart).reduce((sum, item: any) => sum + item.quantity, 0);
        setCartCount(totalItems);
    };

    useEffect(() => {
        updateCartCount();

        // Listen for cart updates
        window.addEventListener("cartUpdated", updateCartCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    // Helper function to check if the current path matches
    const isActive = (path: string) => location.pathname === path ? "font-bold" : "";

    return (
        <nav className="bg-green-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Waldgartenbio
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/shop" className={`text-white hover:text-green-200 ${isActive("/shop")}`}>
                        Shop
                    </Link>
                    <Link to="/blog" className={`text-white hover:text-green-200 ${isActive("/blog")}`}>
                        Blog
                    </Link>
                    {user ? (
                        <Link to="/profile" className={`text-white hover:text-green-200 flex items-center ${isActive("/profile")}`}>
                            {user.username}
                        </Link>
                    ) : (
                        <Link to="/login" className={`text-white hover:text-green-200 flex items-center ${isActive("/login")}`}>
                            <User className="w-5 h-5 mr-1" />
                            <span>Login</span>
                        </Link>
                    )}

                    {/* Warenkorb (Shopping Cart) */}
                    <Link to="/cart" className={`relative text-white hover:text-green-200 ${isActive("/cart")}`}>
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
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
                        <Link to="/" className={`block text-white hover:text-green-200 py-2 ${isActive("/")}`}>
                            Home
                        </Link>
                        <Link to="/shop" className={`block text-white hover:text-green-200 py-2 ${isActive("/shop")}`}>
                            Shop
                        </Link>
                        <Link to="/blog" className={`block text-white hover:text-green-200 py-2 ${isActive("/blog")}`}>
                            Blog
                        </Link>
                        {user ? (
                            <span className={`block text-white py-2 ${isActive("/profile")}`}>{user.username}</span>
                        ) : (
                            <Link to="/login" className={`block text-white hover:text-green-200 py-2 flex items-center ${isActive("/login")}`}>
                                <User className="w-5 h-5 mr-1" />
                                <span>Login</span>
                            </Link>
                        )}

                        {/* Mobile Warenkorb (Shopping Cart) */}
                        <Link to="/cart" className={`flex items-center text-white hover:text-green-200 py-2 ${isActive("/cart")}`}>
                            <ShoppingCart className="w-5 h-5 mr-1" />
                            <span>Warenkorb</span>
                            {cartCount > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
