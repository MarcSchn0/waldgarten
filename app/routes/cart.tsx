import {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Einkaufswagen" },
        { name: "Cart Page", content: "Cart Items" },
    ];
};

export default function Cart() {

    return (
        <div>

        </div>
    );
}