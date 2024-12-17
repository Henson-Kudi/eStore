import React from 'react'
import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import ProductsPage from '@/core/pages/products'
import { notFound } from 'next/navigation'
import { getProducts } from '../actions/products'
import { productStatusKeys } from '@/types'
import { dehydrateQuery } from '@/lib/dehydrateQuery'

async function AllProducts({searchParams}:{searchParams: Record<string, string | string[]>}) {
  const dehydratedState = await dehydrateQuery({
    queryKey: ['products'],
    queryFn: ()=>getProducts({
      params:{
        options:{
            limit: 5,
            page: 1,
            withBrand: true,
            withDiscounts: true,
            withCategories: true
        },
        filter:{
            status: productStatusKeys.ACTIVE
        }
      }
    }),
  })
  
  if (!dehydratedState) return notFound()

  
  return (
      
    <HydrationBoundary state={dehydratedState}>
      <ProductsPage />
    </HydrationBoundary>
  )
}

export default AllProducts
