import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function LoadMore() {
  return (
    <div className=' flex items-center py-10 justify-center'>
      <Link href={"/all-products"}>
      <Button variant={'default'} size={'lg'} className='cursor-pointer'>
        Load More
      </Button>
      </Link>
    </div>
  )
}

export default LoadMore
