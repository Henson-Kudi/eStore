import { QueryClient, DehydratedState, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react';
import MostPopular from './most-popular';
import { getProducts } from '@/app/actions/products';
import { productStatusKeys } from '@/types';

const MostPopularProducts: React.FC = async() => {

  const qc = new QueryClient()

  await qc.prefetchQuery({
    queryKey: ['products'],
    queryFn: ()=>getProducts({
      params:{
        options:{
            limit: 5,
            page: 1,
        },
        filter:{
            status: productStatusKeys.ACTIVE
        }
      }
    }),
  })

  let dehydratedState:DehydratedState | null = null

  try {
    const state = dehydrate(qc)
    dehydratedState = JSON.parse(JSON.stringify(state))
  } catch (err) {
    console.log(err)
  }
  
  if (!dehydratedState) return notFound()

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* <HeroCarousel /> */}
      <MostPopular />
    </HydrationBoundary>
  );
};

export default MostPopularProducts;