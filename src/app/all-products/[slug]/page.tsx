import { getProductBySlug } from '@/app/actions/products'
import ProductDetails from '@/core/pages/datails-page/ProductDetails'
import { dehydrateQuery } from '@/lib/dehydrateQuery'
import { HydrationBoundary } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function ProductDetailsPage({params}:{params: {slug: string}}) {
  const {slug} = params

  const dehydratedState = await dehydrateQuery({
    queryKey: ['products', slug],
    queryFn: ()=>getProductBySlug(slug, {
      params:{
        withBrand: true,
        withCategories: true,
        withDiscounts: true,
        withTaxes: true
      }
    }),
  })

  if (!dehydratedState)  return notFound()

  return (
    <HydrationBoundary state={dehydratedState}>
        <ProductDetails />
    </HydrationBoundary>
  )
}
