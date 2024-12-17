'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getBanners } from "@/app/actions/banners"
import { useQuery } from "@tanstack/react-query"
import { FileType } from "@/types"
import envConf from "@/lib/env.conf"
import { useEffect, useState } from "react"

export default function HeroSection() {
    const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const {data, isError, error, isLoading} = useQuery({
        queryKey: ['banners'],
        queryFn: ()=>getBanners({
          params:{
            limit: 5,
            page: 1,
            isActive: true
          }
        }),
    })

    useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(intervalId)

  }, [api])

    if (isLoading) return <div>This is to be a hero section loader...</div>
    if (isError) return <div>{error.message}</div>
    if (!data?.data?.data?.length) return null // we don't want to display this section if there is no data in it

    const banners = data?.data?.data

  return (
    <section className="relative min-h-screen max-h-screen">
      <div className="p-t0 relative">
          
          <Carousel className="w-full h-full">
            <CarouselContent className="w-full h-full">
                {banners.map((banner, index) => (
                  <CarouselItem key={index} className="w-full h-full">
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      {
                        banner?.fileType === FileType.VIDEO ? (
                            <video src={`${envConf.apiBaseUrl}/users-service/files/${banner.imageUrl}`} controls autoPlay className="w-full h-full max-h-screen object-cover" />
                        ) : (
                            <Image
                                src={`${envConf.apiBaseUrl}/users-service/files/${banner.imageUrl}`}
                                alt={'Banner'}
                                width={0}
                                height={0}
                                sizes="100vh"
                                className="w-full h-auto max-h-screen min-w-full object-contain"
                              />
                        )
                      }
                      {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{banner.alt}</h2>
                      </div> */}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
          {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-1/2 -translate-y-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">Discover Your Style, Shop with Ease</h1>
            <p className="text-xl mb-8 text-blue-700">Explore our curated collection of trendsetting products with AI-powered recommendations.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Input placeholder="Search products..." className="flex-grow" />
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                Search
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline">Popular Categories</Button>
              <Button variant="outline">Daily Deals</Button>
              <Button variant="outline">New Arrivals</Button>
            </div>
          </div> */}
        {/* <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-12">
        </div> */}
        
      </div>
    </section>
  )
}

