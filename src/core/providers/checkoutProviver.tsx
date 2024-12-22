'use client'

import React, { createContext, useContext, useState } from 'react'
import { CreateOrderDTO, ShippingAddress, OrderItem, OrderStatus } from '@/types/orders'
import { useSession } from 'next-auth/react'
import { useCart } from './cartProvider'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/app/actions/products'

type CheckoutContextType = {
  orderData: CreateOrderDTO
  updateOrderData: (data: Partial<CreateOrderDTO>) => void
  isLoggedIn: boolean
  setIsguest: (value: boolean) => void,
  isguest: boolean
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isguest, setIsguest] = useState<boolean>(false)
  const {status, data} = useSession()
  const {cart} = useCart()
  const searchParams = useSearchParams()

  const productId = searchParams.get('product')

  const filter = {
    id: cart?.map(item => item?.productId).concat(productId??'')??[]
  }

  const {data: productData} = useQuery({
    queryKey: ['products', filter],
    queryFn: () => getProducts({
      headers:{
        Authorization: `Bearer ${data?.accessToken?.token}`
      },
      params:{
        filter
      }
    } ),
    enabled: !!filter?.id?.length,
  })

  const [orderData, setOrderData] = useState<CreateOrderDTO>({
    email: data?.user?.email ?? '',
    name: data?.user?.name ?? '',
    phone: data?.user?.phone ?? '',
    paymentId: 'cod',
    // couponCode: '',
    currency: 'AED',
    shippingAddress: {} as ShippingAddress,
    discount: 0,
    // paymentMethod: '',
    orderItems: [...(productData?.data?.data??[]).map(pdt =>{
      const found = cart?.find(item => item?.productId === pdt.id)
      return {
        productId: pdt.id,
        productName: pdt?.name,
        productSKU: pdt?.slug,
        quantity: found?.quantity || 1,
        price: pdt?.originalPrice,
        total: (found?.quantity||1) * pdt?.originalPrice,
        tax: 0
      }
    })],
    totalAmount: [...(productData?.data?.data??[]).map(pdt =>{
      const found = cart?.find(item => item?.productId === pdt.id)
      return {
        productId: pdt.id,
        productName: pdt?.name,
        productSKU: pdt?.slug,
        quantity: found?.quantity || 1,
        price: pdt?.originalPrice,
        total: (found?.quantity||1) * pdt?.originalPrice,
        tax: 0
      }
    })].reduce((a, b)=> a + b.total, 0),
    userId: data?.user?.id ?? '',
    status: OrderStatus.PENDING,
  })

  const updateOrderData = (data: Partial<CreateOrderDTO>) => {
    setOrderData(prevData => ({ ...prevData, ...data }))
  }

  return (
    <CheckoutContext.Provider value={{ orderData, updateOrderData, isLoggedIn: status === 'authenticated', isguest, setIsguest }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}

