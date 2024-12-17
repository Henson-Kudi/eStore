'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Step, Steps } from '@/core/components/steps'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getOrderById } from '@/app/actions/orders'
import { useSession } from 'next-auth/react'
import moment from 'moment'
import { OrderStatus } from '@/types/orders'

export function TrackOrderDetails() {
  const {id} = useParams<Record<string, string>>()
  const session = useSession()

  const {data, isLoading, isFetching, error, isError} = useQuery({
    queryKey: ['order', id],
    queryFn: async () => getOrderById(id, {
      headers: {
        Authorization:  `Bearer ${session.data?.accessToken?.token}`
      }
    }),
    enabled: !!id && !!session.data?.accessToken?.token
  })

  const order = data?.data

  if (isLoading || isFetching) return <div>Fix this: Loading...</div>

  if (isError || !data?.success) return <div>Fix this: {error?.message ?? data?.error?.message}</div>

  if (!order) return <div>404 (Not found)... Fix this</div>

  const orderStatuses = Object.values(OrderStatus).filter(stat => stat !== OrderStatus.CANCELLED) as string[]
  const currentStatusIndex = orderStatuses.indexOf(order.status)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Order ID:</p>
              <p>{order.refNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Order Date:</p>
              <p>{moment(new Date(order?.createdAt)).format('MMM Do YYYY')}</p>
            </div>
            <div>
              <p className="font-semibold">Total Amount:</p>
              <p>{order?.currency??'AED'}{order.totalAmount}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{order.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Steps currentStep={currentStatusIndex + 1}>
            {orderStatuses.map((status, index) => (
              <Step key={index} title={status} />
            ))}
          </Steps>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

