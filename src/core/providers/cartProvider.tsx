'use client'

import { getCart as get, addToCart as add, clearCart as clear, deleteCart as remove, updateCart as update } from "@/app/actions/cart"
import { ReturnValue } from "@/types"
import { Cart } from "@/types/cart"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

interface Props{
    children: React.ReactNode
}

interface CartContext{
    cart: Cart[],
    removeFromCart: (id: string)=> Promise<ReturnValue<Cart | null>>,
    addToCart: (productId:string)=>Promise<ReturnValue<Cart | null>>,
    updateCart: (params: {id:string, quantity:number})=>Promise<ReturnValue<Cart | null>>,
    clearCart:()=>Promise<ReturnValue<{count: number} | null>>,
    isFetching: boolean,
    isLoading: boolean,
    isError: boolean,
    error?: Error,
    cartOpen: boolean,
    toggleCart: (value: boolean)=>void
}

const CartContext = createContext<CartContext|null>(null)

export function CartProvider({children}:Props){
    const session = useSession()
    const [cartOpen, setCartOpen] = useState(false)
    const pathname = usePathname()


    const userId = session?.data?.user?.id;

    const {data, error, isError,  isLoading, isFetching} = useQuery({
        queryKey: ['cart'],
        queryFn: () => get({
            headers:{
                Authorization: `Bearer ${session.data?.accessToken?.token}`
            }
        }),
        enabled: !!session.data?.accessToken?.token
    })

    const updateMutation = useMutation({
        mutationKey: ['cart'],
        mutationFn: ({id, quantity}:{id:string, quantity: number}) => {
            
            return update(id, {quantity}, {
                headers: {
                    Authorization: `Bearer ${session.data?.accessToken?.token}`
                }
            })
        }
    })

    const addMutation = useMutation({
        mutationKey: ['cart'],
        mutationFn: (data:Partial<Omit<Cart, 'id'>>) => {
            
            return add(
                {
                    ...data,
                    userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.data?.accessToken?.token}`
                    }
                }
            )
        }
    })

    const removeMutation = useMutation({
        mutationFn: (id:string) => {
            return remove(id, {
                headers: {
                    Authorization: `Bearer ${session.data?.accessToken?.token}`
                }
            })
        }
    })

    const clearMutation = useMutation({
        mutationFn: () => {
            return clear({
                headers: {
                    'x-user-id': userId,
                    Authorization: `Bearer ${session.data?.accessToken?.token}`
                }
            })
        }
    })

    async function addToCart(productId:string):Promise<ReturnValue<Cart|null>>{

        const data = await addMutation.mutateAsync({productId: productId, quantity: 1, userId})

        toggleCart(true)

        return data
    }

    async function updateCart({id, quantity}:{id:string, quantity:number}){
        // update cart
        if (quantity < 1) {
            return (await removeMutation.mutateAsync(id))
        }

        return (await updateMutation.mutateAsync({id, quantity}))

    }

    async function clearCart(){
        return (await clearMutation.mutateAsync())
    }

    async function removeFromCart(id:string){
        return (await removeMutation.mutateAsync(id))
    }

    function toggleCart(value: boolean){
        setCartOpen(value)
    }

    const contextValue = useMemo(
        () => ({
            cart: data?.data?.data || [],
            removeFromCart,
            addToCart,
            updateCart,
            clearCart,
            isFetching,
            isLoading,
            isError: !data?.success,
            error: error || data?.error,
            cartOpen,
            toggleCart
        }),
        [data, isFetching, isLoading, isError, error, cartOpen, session]
    );

    useEffect(()=>{
        cartOpen && toggleCart(false)

    }, [pathname])

    return(
        
        <CartContext.Provider value={{...contextValue}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext<CartContext|null>(CartContext)
    if(!context){
        throw new Error('useCart must be used within a CartProvider')
    }

    return context
}