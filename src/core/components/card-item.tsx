import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { images } from '../pages/landing-page/carousel';
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
    <div className="flex items-center justify-between p-4 border-b">
      <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
      <div className="flex flex-col">
        <span className="font-semibold">{item.name}</span>
        <div className="flex items-center mt-2">
          <button onClick={onRemove} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
          <button onClick={onAdd} className="bg-green-500 text-white px-2 py-1 rounded ml-2">Add</button>
        </div>
      </div>
    </div>
  );
};

// Define props for the CartSheet component
interface CartSheetProps {
  cartItems: CartItemType[]; // Array of items in the cart
  onCheckout: () => void; // Function to handle checkout
}

const CartSheet: React.FC<CartSheetProps> = ({ cartItems, onCheckout }) => {
  return (
    <Sheet>
      <SheetContent>
        <SheetHeader>
          <SheetTitle><ShoppingCart className='text-white'></ShoppingCart></SheetTitle>
          <SheetClose>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        {/* Display Cart Items */}
        {cartItems.length === 0 ? (
          <div className="text-center p-4">Your cart is empty.</div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={() => console.log(`Add ${item.name}`)} // Replace with actual add logic
              onRemove={() => console.log(`Remove ${item.name}`)} // Replace with actual remove logic
            />
          ))
        )}

        {/* Checkout Button */}
        <SheetFooter>
          <button 
            onClick={onCheckout} 
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Checkout
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;