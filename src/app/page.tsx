
import React from 'react'
import { HeroSection, MostPopularCategories, Carousel, LoadMore } from "@/core/pages/landing-page/index"
import { Product } from "@/core/components/grid-container";

 export const products: Product[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },
  {
    id: 2,

    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },
  {
    id: 3,

    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },
  {
    id: 4,

    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },

]


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <div className='px-4 md:px10'>
        <Carousel />
        <MostPopularCategories products={products} text={'Most Popular'} />
        <LoadMore />
      </div>
    </div>
  )
}

export default HomePage