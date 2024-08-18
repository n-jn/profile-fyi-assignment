import Image from "next/image";
import CartItemInterface from "../models/CartItem";
import ProductInterface from "../models/Product";

export default function ProductCard(props: {product: ProductInterface, setShowSuccessMessage: Function}) {
    const { id, image, name, price } = props.product;

    function handleAddToCart() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

        if(cartItems.find((item: CartItemInterface) => item.id === id)) 
            localStorage.setItem("cartItems", JSON.stringify(cartItems.map((item: CartItemInterface) => item.id===id ? {...item, quantity: item.quantity+1} : item)))
        else 
            localStorage.setItem("cartItems", JSON.stringify([...cartItems, {...props.product, quantity: 1}]));

        props.setShowSuccessMessage(true);

        setTimeout(() => {
            props.setShowSuccessMessage(false);
       }, 3000);
    }

    return <div className="relative w-[200px] h-[300px] p-2 border-[1px] rounded-[10px]">
        <div className="relative w-full h-1/2 mb-2">
            <Image alt={`${name}`} src={image} fill={true} className="object-cover" />
        </div>
        <div>{name}</div>
        <div className="text-sm">&#8377;{price}</div>
        <button className="absolute bottom-2 right-2 hover:bg-gray-200 border-[2px] rounded-[5px] p-2" onClick={() => {handleAddToCart(); }}>Add to cart</button>
    </div>
}