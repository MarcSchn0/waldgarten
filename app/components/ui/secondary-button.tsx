import { ReactNode } from "react";
import clsx from "clsx"; // optional utility to combine classNames safely

export default function SecondaryButton({children, className, onClick, }: { children: ReactNode; className?: string; onClick?: () => void }) {
    return (
        <button onClick={onClick}
            className={clsx(
                "bg-white text-green-800 rounded-lg text-lg font-semibold hover:bg-green-100 transition duration-300 border-2 px-6 py-3",
                className
            )}
        >
            {children}
        </button>
    );
}