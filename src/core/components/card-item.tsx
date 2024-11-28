import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, X } from 'lucide-react'; // Assuming you're using lucide-react for icons

// Define a type for the item in the cart
interface CartItemType {
  id: number;
  name: string;
  image: string;
}

// Define props for the CartItem component
interface CartItemProps {
  item: CartItemType;
  onAdd: () => void; // Function to add the item
  onRemove: () => void; // Function to remove the item
}

const CartItem: React.FC<CartItemProps> = ({ item, onAdd, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
      <div className="flex flex-col">
        <span className="font-semibold">{item.name}</span>
        <div className="flex mt-2">
          <button onClick={onRemove} className="bg-red-500 text-white px-1 w-[80px] py-1 rounded">Remove</button>
          <button onClick={onAdd} className="bg-black text-white px-1 py-1 w-[80px] rounded ml-2">Add</button>
        </div>
      </div>
    </div>
  );
};

// Define props for the CartSheet component
interface CartSheetProps {
  cartItems: CartItemType[];
  onCheckout: () => void; 
  isOpen: boolean;
  onClose: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({cartItems, onCheckout, isOpen, onClose }) => {

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent side={'right'}>
      {cartItems.length === 0 ? (
        <div className="text-center p-4">Your cart is empty.</div>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onAdd={() => console.log(`Add ${item.name}`)}
            onRemove={() => console.log(`Remove ${item.name}`)}
          />
        ))
      )}

      <button
        onClick={onCheckout}
        className="w-full bg-black text-white py-2 rounded  mt-52"
      >
        Checkout
      </button>
      
      <SheetClose asChild>
      </SheetClose>
    </SheetContent>
  </Sheet>
);

};

export default CartSheet;