
import React from 'react'
import { HeroSection, MostPopularCategories, Carousel, LoadMore } from "@/core/pages/landing-page/index"
import { products } from '@/lib/constants'


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <div className='px-4 py-10 md:px10'>
        <Carousel />
        <MostPopularCategories products={products} text={'Most Popular'} />
        <LoadMore />
      </div>
    </div>
  )
}

export default HomePage