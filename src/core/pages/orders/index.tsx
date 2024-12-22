'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/app/actions/orders'
import moment from 'moment'
import { useSession } from 'next-auth/react'

export function OrdersList() {
  const [searchTerm, setSearchTerm] = useState('')
  const session = useSession()

  const {data} = useQuery({
    queryKey: ['orders'],
    queryFn: ()=>getOrders({
      headers:{
        Authorization: `Bearer ${session.data?.user?.accessToken?.token}`
      }
    }),
    enabled: !!session.data?.accessToken?.token
  })

  const orders = data?.data?.data ?? []

  const filteredOrders = orders

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`/orders/track-order/${order?.id}`} className='text-blue-800 hover:underline'>{order.refNumber}</Link>
                </TableCell>
                <TableCell>{moment(new Date(order.createdAt)).format('MMM Do YYYY')}</TableCell>
                <TableCell>{order?.currency ?? 'AED'}{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </CardContent>
    </Card>
  )
}

