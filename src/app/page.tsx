"use client"
import ContactUs from "@/core/components/contact-us";
import Footers from "@/core/components/footers";
import SearchComponent from "@/core/components/search";
import test from "@/app/testshoe.avif"
import ProductGrid, { Product } from "@/core/components/grid-container";

const products: Product[] = [
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

export default function Home() {

  return (
    <main className="">
  
      {/* E_STORE */}
      {/* <Footers />
      <ContactUs /> */}
      {/* <SearchComponent/> */}
      <ProductGrid products={products} />
    </main>
  )
}
