'use client'
import {ProductCard} from '@/core/components/product-card'
import React from 'react'
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/app/actions/products';
import { productStatusKeys } from '@/types';
import ProductsGrid from '../../products/products-grid';

const MostPopular: React.FC= () => {
  const {data, error, isLoading, isFetching, isError} = useQuery({
    queryKey: ['products'],
    queryFn: ()=>getProducts({params:{
        filter: {
            status: productStatusKeys.ACTIVE
        },
        options: {
            limit: 5,
            page: 1,
            withBrand: true,
            withCategories: true,
            withDiscounts: true
        }
    }}),
  })

  if (isLoading || isFetching) return <div>Fix this: Loading...</div>

  if (isError || !data?.success) return <div>Fix this: {error?.message}</div>

  const products = data?.data?.data ?? []


  return (
    <ProductsGrid products={products} />
  )
}

export default MostPopular
