import { CollectionItems} from '@/core/pages/collections'
import { BreadcrumbWithCustomSeparator } from '@/core/pages/collections/bread-crumbs'
import Component from './component'
import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { productStatusKeys } from '@/types'
import { getProducts } from '../actions/products'

async function BreadcrumbComp() {
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
    <div className=' flex flex-col py-10 px-10'>
      <p className=' text-4xl text-center font-bold font-sans'>ALL Products</p>
      <HydrationBoundary state={dehydratedState}>
      {/* <HeroCarousel /> */}
      <Component />
    </HydrationBoundary>
    </div>
  )
}

export default BreadcrumbComp
