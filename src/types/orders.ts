export type OrderItem = {
    "id": string,
    "orderId": string,
    "productId": string,
    "productName": string,
    "productSKU": string,
    "quantity": number,
    "price": number,
    "total": number,
    "tax": number
}

export type ShippingAddress = {
    "id": string,
    "orderId": string,
    "buildingName"?: string,
    "landmark"?: string,
    "roomNo"?: string,
    "floor"?: string,
    "address": string,
    "city": string,
    "state": string,
    "country": string,
    "zipCode"?: string
}

export type Order = {
    "id": string,
    refNumber: string
    "userId"?: string | null,
    "name": string,
    "email": string,
    "phone": string,
    "totalAmount": number,
    "discount": number,
    "currency": string,
    "status": string,
    "createdAt": string,
    "updatedAt": string,
    "paymentId": string,
    "orderItems": OrderItem[],
    "shippingAddress": ShippingAddress,
}

export enum OrderStatus {
    PENDING = "PENDING",
    PACKAGING = "PACKAGING", //Product is being packaged
    CANCELLED = "CANCELLED",
    OUT_FOR_DELIVERY = "OUT FOR DELIVERY",
    DELIVERED = "DELIVERED",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    INITIATED = "INITIATED",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    // PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
    // CHARGED_BACK = "CHARGED_BACK",
    // EXPIRED = "EXPIRED",
    // ABANDONED = "ABANDONED",
    // PROCESSING = "PROCESSING",
    // REVERSED = "REVERSED",
    // WAITING_FOR_CAPTURE = "WAITING_FOR_CAPTURE",
    // WAITING_FOR_CONFIRMATION = "WAITING_FOR_CONFIRMATION",
    // UNKNOWN = "UNKNOWN"
}

export type Payment = {
    id: string
    userId?: string
    name: string
    email: string
    mobile: string
    amount: string
    currency: string
    status: string
    paymentMethod: string
    provider: string
    providerPaymentId: string
    orderId?: string
    installments?: number
    createdAt: string
    updatedAt?: string
}

export type CreateOrderDTO = {
    userId?: string;
    name: string;
    email: string;
    phone: string;
    totalAmount: number;
    discount: number;
    currency: string;
    orderItems: Omit<OrderItem, 'id' | 'orderId'>[];
    shippingAddress: Omit<ShippingAddress, 'id' | 'orderId'>;
    paymentId: string;
    // paymentMethod: string;
    // couponCode?: string;
    status?: OrderStatus;
}
