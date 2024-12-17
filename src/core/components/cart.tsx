import React, { Suspense } from 'react';
import { Cart } from '@/types/cart';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/app/actions/products';
import { Product } from '@/types/products';
import { FileType } from '@/types';
import envConf from '@/lib/env.conf';
import { useCart } from '../providers/cartProvider';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define props for the CartItem component
interface CartItemProps {
  item: Cart;
  product?: Product
  onAdd: () => void; // Function to add the item
  onRemove: () => void; // Function to remove the item
}

const CartItem: React.FC<CartItemProps> = ({ item, onAdd, onRemove, product }) => {
  const image = product?.media?.find((media) => media.type === FileType.IMAGE)?.url ?? ''

  const {removeFromCart, updateCart} = useCart()
  
  return (
    <>
      <div className="flex items-center justify-between p-2 border-b">
        <Image
          sizes='100vh'
          width={0}
          height={0}
          src={image ?  `${envConf.apiBaseUrl}/users-service/files?url=${image}` : '/placeholder.svg'}
          alt={'product image'}
          className="h-16 w-16 object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{product?.name??'No Name'}</span>
          <div className="flex mt-2">
            <button onClick={onRemove} className="bg-red-500 text-white px-1 w-[80px] py-1 rounded">Remove</button>
            <button onClick={onAdd} className="bg-black text-white px-1 py-1 w-[80px] rounded ml-2">Add</button>
          </div>
        </div>
      </div>
    </>
  );
};

// Define props for the CartSheet component
interface CartSheetProps {
  // cartItems: Cart[];
}

const ShoppingCartData: React.FC<CartSheetProps> = ({}) => {
  const {toggleCart, cart:cartItems} = useCart()

  const {data} = useQuery({
    queryKey: ['products'],
    queryFn: ()=>getProducts({
      params:{
        filter: {
          id: cartItems.map(item => item.productId)
        }
      }
    }),
    enabled: cartItems.length > 0
  })

  const products = data?.data?.data ?? []

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Card>
        {
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={() => console.log(`Add ${item.productId}`)}
              onRemove={() => console.log(`Remove ${item.productId}`)}
              product={products?.find(pdt => pdt?.id === item?.productId)}
            />
          ))
        }
        <Link
          href={'/checkout'}
          className="w-full bg-black text-white py-2 rounded  mt-52"
        >
          Checkout
        </Link>
      </Card>
    </Suspense>
);

};

export default ShoppingCartData;