import {ReactNode} from "react";
import clsx from "clsx";


export default function PrimaryButton({children, className, type, }: { children: ReactNode; className?: string; type?: string }) {

    return <button type={type} className={clsx("bg-green-800 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 px-6 py-3",className)}>
        {children}
    </button>
}