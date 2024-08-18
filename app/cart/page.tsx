"use client";

import { useLayoutEffect, useEffect, useState } from "react";
import CartItemInterface from "../models/CartItem"
import CartItem from "../components/CartItem";

export default function Cart() {
    const [items, setItems] = useState<CartItemInterface[]>([]);

    function handleDeleteItem(id: number) {
        setItems(items => items.filter(item => item.id !== id));
        localStorage.setItem("cartItems", JSON.stringify(items.filter(item => item.id !== id)));
    }

    function handleUpdateQty(id: number, qty: number) {
        setItems(items => items.map(item => item.id !== id ? item : {...item , quantity: qty}));
        localStorage.setItem("cartItems", JSON.stringify(items.map(item => item.id !== id ? item : {...item , quantity: qty})));
    }

    // read stored cart items from local storage and save to state
    useEffect(() => {
        setItems(JSON.parse(localStorage.getItem("cartItems") || "[]"));
    }, []);

    let subtotal=0;

    return <>
        <div className="font-bold p-5 text-xl">Cart</div>
        {items.map((item: CartItemInterface) => {subtotal+=item.price*item.quantity; return <CartItem key={item.id} item={item} handleDeleteItem={handleDeleteItem} handleUpdateQty={handleUpdateQty} />;})}
        <div className="p-5">
            <p><span className="font-semibold">Subtotal:</span> {subtotal}</p>
            <p><span className="font-semibold">Discount:</span> <span className="text-sm">10%</span></p>
            <hr />
            <p><span className="font-semibold">Total:</span> {subtotal-(subtotal*0.1)}</p>
        </div>
    </>
}
