'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckoutProvider } from '@/core/providers/checkoutProviver'
import { PersonalInfoStep } from '@/core/components/orders/personalInfoStep'
import { PaymentStep } from '@/core/components/orders/paymentStep'
import { OrderSummary } from '@/core/components/orders/orderSummary'

export const Checkout: React.FC = () => {
  const [step, setStep] = React.useState<'personal-info' | 'payment'>('personal-info')

  return (
    <CheckoutProvider>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue={step} value={step} className="w-full" onValueChange={(value)=>setStep(value as 'personal-info' | 'payment')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
              <TabsContent value="personal-info">
                <PersonalInfoStep handleNext={()=>setStep('payment')} />
              </TabsContent>
              <TabsContent value="payment">
                <PaymentStep />
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  )
}

