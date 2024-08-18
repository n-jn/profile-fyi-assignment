import Image from "next/image";
import CartItemInterface from "../models/CartItem";

export default function CartItem({
  item,
  handleDeleteItem,
  handleUpdateQty,
}: {
  item: CartItemInterface;
  handleDeleteItem: Function;
  handleUpdateQty: Function;
}) {
  return (
    <div className="w-full h-[100px] border-[1px] flex gap-5 p-2">
      <div>
        <Image alt={item.name} src={item.image} height={50} width={50} />
      </div>
      <div>
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm flex">
          Quantity: &nbsp;
          <div className="border-[1px]">
            <span
              className="bg-gray-300 px-[8px] h-full cursor-pointer hover:bg-gray-400"
              onClick={() => {
                if (item.quantity > 1)
                  handleUpdateQty(item.id, item.quantity - 1);
                else if (item.quantity == 1) handleDeleteItem(item.id);
              }}
            >
              -
            </span>{" "}
            {item.quantity}{" "}
            <span
              className="bg-gray-300 px-[8px] h-full cursor-pointer hover:bg-gray-400"
              onClick={() => {
                handleUpdateQty(item.id, item.quantity + 1);
              }}
            >
              +
            </span>
          </div>
        </div>
        <div className="text-sm">&#8377;{item.price * item.quantity}</div>
      </div>
      <div
        className="absolute right-5 h-[20px] w-[20px] hover:bg-gray-300 rounded-md cursor-pointer"
        onClick={() => handleDeleteItem(item.id)}
      >
        <Image
          alt="delete cart item"
          src="/delete.png"
          fill={true}
          className="object-cover"
        />
      </div>
    </div>
  );
}
