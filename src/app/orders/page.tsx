import { notFound } from 'next/navigation'
import { HydrationBoundary } from '@tanstack/react-query'
import { dehydrateQuery } from '@/lib/dehydrateQuery'
import { getOrders } from '../actions/orders'
import { OrdersList } from '@/core/pages/orders'
import { auth } from '@/auth'

export default async function OrdersPage() {

    const session = await auth() 

    const dehydratedState = await dehydrateQuery({
        queryKey: ['orders'],
        queryFn: ()=>getOrders({
          headers:{
            Authorization: `Bearer ${session?.accessToken?.token}`
          }
        }),
    })
      
    if (!dehydratedState) return notFound()

  return (
    <HydrationBoundary state={dehydratedState}>
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <OrdersList />
    </HydrationBoundary>
  )
}
