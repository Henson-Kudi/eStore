'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DiscountType, FileType } from '@/types'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import envConf from '@/lib/env.conf'
import { useQuery } from '@tanstack/react-query'
import { getProductBySlug } from '@/app/actions/products'
import { useCart } from '@/core/providers/cartProvider'
import { AxiosError } from 'axios'

export default function ProductDetailPage() {
  const { slug } = useParams<{slug: string}>()
    const router = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()

     const generateCallbackUrl = () => {
        const searchString = searchParams.toString();
        return `${path}${searchString?.length ? `?${searchString}` : ''}`;
    };

    const callbackUrl = generateCallbackUrl()

  const {addToCart} = useCart()
  
  const {data, error, isError, isLoading, isFetching} = useQuery({
    queryKey: ['product', slug],
    queryFn: ()=>getProductBySlug(slug, {
      params:{
        withBrand: true,
        withCategories: true,
        withDiscounts: true,
        withTaxes: true
      }
    }),
    enabled: !!slug,
  })

  const [selectedImage, setSelectedImage] = useState<number>(0)

  if (isFetching || isLoading) return <>Product Loader..... Fix this</>
  
  if (isError || !data?.success || !data.data) return <>Error: {error?.message}.... Fix this</>;
  
  
  const product = data?.data

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  const discountedPrice = product?.originalPrice - (product?.discounts?.map(item => item?.discountType === DiscountType.FIXED_AMOUNT ? +item?.discountValue : +product?.originalPrice * (+item?.discountValue / 100)).reduce((a, b)=> a+b,0)??0)

  const handleAddToCart = async(id: string) => {
    try {
      await addToCart(id)
    } catch (err) {
      console.log(err, 'error from card adding')
      if (err instanceof AxiosError && err?.status === 401) {
        router.push(`/sign-in${callbackUrl?.length ? `?callback_url=${callbackUrl}`: ''}`)
      }
    }
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              {
                product?.media[selectedImage]?.type === FileType.VIDEO ? (
                  <video src={`${envConf.apiBaseUrl}/users-service/files?url=${product?.media[selectedImage].url}`} controls className="w-full h-full object-cover" />
                ) : (
                  <Image
                    src={`${envConf.apiBaseUrl}/users-service/files?url=${product?.media[selectedImage]?.url}`}
                    alt={product?.media[selectedImage]?.altText}
                    width={0}
                    height={0}
                    sizes='100vh'
                    // layout="fill"
                    // objectFit="cover"
                    className="w-full h-full object-center object-cover"
                  />
                )
              }
            </div>
            <Carousel className="w-full">
              <CarouselContent className='p-2'>
                {product.media.map((media, index) => (
                  <CarouselItem key={index+media.url?.replaceAll('/','_')} className="basis-1/4">
                    <div
                      className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      {
                        media.type === FileType.VIDEO ? (
                          <video src={`${envConf.apiBaseUrl}/users-service/files?url=${media.url}`} className="w-full h-full object-cover" />
                        ) : (
                          <Image
                            src={`${envConf.apiBaseUrl}/users-service/files?url=${media.url}`}
                            alt={media.altText}
                            width={0}
                            height={0}
                            sizes='100vh'
                            // layout="fill"
                            // objectFit="cover"
                            className="w-full h-full object-center object-cover"
                          />
                        )
                      }
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.averageRating || 0)}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold">{product?.currency??'AED'}{discountedPrice}</span>
              {discountedPrice !== product?.originalPrice && (
                <span className="text-xl text-gray-500 line-through ml-2">{product?.currency??'AED'}{product.originalPrice}</span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex space-x-4 mb-6">
              <Button className="flex-1" onClick={()=>handleAddToCart(product?.id)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" /> Wishlist
              </Button>
              <Button variant="outline" onClick={()=>{
                if (typeof window !== undefined) {
                  navigator?.canShare({
                    title: product.name,
                    text: product.description,
                    url: window.location.href
                  }) && navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href
                  })
                }
              }}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">SKU</h3>
                <p>{product.SKU}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className='flex flex-wrap items-center justify-start gap-x-2 gap-y-1'>{product.categories.map(cat => <Badge key={cat.id}>{cat.name}</Badge>)}</div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Brand</h3>
                <p>{product.brand.name}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Stock</h3>
                <Badge variant={product.qtyInStock > 0 ? "success" : "destructive"}>
                  {product.qtyInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.attributes || {}).map(([key, value], i) => (
                    <div key={key+value+i}>
                      <h3 className="font-semibold">{key}</h3>
                      <p>{value}</p>
                    </div>
                  ))}
                  <div>
                    <h3 className="font-semibold">Weight</h3>
                    <p>{product.weight}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dimensions</h3>
                    <p>{product.dimensions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  Average Rating: {product.averageRating} ({product.reviewCount} reviews)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Here you would typically map through actual review data */}
                <p>Review content would go here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}