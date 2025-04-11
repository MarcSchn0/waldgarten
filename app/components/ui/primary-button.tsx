import {ReactNode} from "react";
import clsx from "clsx";


export default function PrimaryButton({children, className,}: { children: ReactNode; className?: string; }) {

    return <button className={clsx("bg-green-800 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 px-6 py-3",className)}>
        {children}
    </button>
}