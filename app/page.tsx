"use client";

import ProductCard from "./components/ProductCard";
import ProductInterface from "./models/Product";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "./utils/productData";

// Home page displaying the products on sale
export default function Home() {
  const [products, setProducts] = useState<ProductInterface[]>([]);   // products stored as state variable
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    getAllProducts().then(products => setProducts(products));
  }, []);

  // Initialize cartItems in local storage upon first visit
  // Using local storage saves the cart items across browser sessions
  useEffect(() => {
    if(typeof window!==undefined && localStorage.getItem("cartItems") === null)
        localStorage.setItem("cartItems", JSON.stringify([]));
  }, []);

  return (
    <div className="m-2 grid place-items-center gap-y-[20px] grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <Link href="/cart" className="fixed top-2 right-2 z-10 rounded-full border-[1px] bg-white hover:bg-gray-500 hover:cursor-pointer">
        <span className="absolute -top-2 -right-2 z-20 inline-flex h-5 w-5 rounded-full text-xs font-bold text-center">{typeof window!==undefined ? JSON.parse(localStorage.getItem("cartItems") || "[]").length : 0}</span>
        <Image alt="cart" src="/cart.png" height={50} width={50} className="rounded-full" />
      </Link>
      {products.map((product: ProductInterface) => <ProductCard key={product.id} product={product} setShowSuccessMessage={setShowSuccessMessage} />)}
      {showSuccessMessage && <div className="bg-white fixed bottom-5 px-5 py-2 border-2 rounded-md">&#9989; Item added successfully</div>}
    </div>
  );
}
