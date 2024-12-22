'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useCheckout } from '@/core/providers/checkoutProviver'
import { ShippingAddress } from '@/types/orders'
import { usePathname, useSearchParams } from 'next/navigation'

export const PersonalInfoStep: React.FC<{handleNext: ()=>void}> = ({handleNext}) => {
  const { isLoggedIn, isguest, orderData, setIsguest, updateOrderData } = useCheckout()

  const path = usePathname()
  const searchParams = useSearchParams()

  const generateCallbackUrl = () => {
    const searchString = searchParams.toString();
    return `${path}${searchString?.length ? `?${searchString}` : ''}`;
  };

  const callbackUrl = generateCallbackUrl()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateOrderData({ [name]: value })
  }

  const handleShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateOrderData({
      shippingAddress: {
        ...orderData.shippingAddress,
        [name]: value,
      } as ShippingAddress,
    })
  }

  if (!isLoggedIn && !isguest) {
    return (
        <Card>
          <CardHeader>
            <CardTitle>Not Logged In</CardTitle>
            <CardDescription>
              You're not currently logged in. Would you like to log in or continue as a guest?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href={`/sign-in${callbackUrl?.length && `?callback_url=${callbackUrl}`}`} className="text-blue-600 hover:underline">
              Log in and return to order
            </Link>
            <Button onClick={() => setIsguest(true)} className="w-full">
              Continue as Guest
            </Button>
          </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={orderData.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={orderData.email || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={orderData.phone || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={orderData.shippingAddress?.address || ''}
              onChange={handleShippingAddressChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={orderData.shippingAddress?.city || ''}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={orderData.shippingAddress?.state || ''}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={orderData.shippingAddress?.country || ''}
                onChange={handleShippingAddressChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={orderData.shippingAddress?.zipCode || ''}
                onChange={handleShippingAddressChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleNext} className="w-full">
        Next
      </Button>
    </div>
  )
}

