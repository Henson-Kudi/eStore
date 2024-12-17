import { getBanners } from '@/app/actions/banners';
import { QueryClient, DehydratedState, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react';
import Carousel from './carousel';

const HeroSection: React.FC = async() => {

  const qc = new QueryClient()

  await qc.prefetchQuery({
    queryKey: ['banners'],
    queryFn: ()=>getBanners({
      params:{
        limit: 5,
        page: 1,
        isActive: true
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
      <Carousel />
    </HydrationBoundary>
  );
};

export default HeroSection;